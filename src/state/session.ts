import type { ExecutionValues, TrainingSession } from '../domain/session';
import type { Weekday } from '../domain/training';
import type { DemoState } from './model';
import { selectSessionPrescription } from './selectors';
import { readEntity } from './training';
type Timed = { readonly sessionId: string; readonly now: number };
export type SessionAction =
  | ({ readonly type: 'session/create'; readonly routineId: string; readonly day: Weekday; readonly origin: TrainingSession['origin'] } & Timed)
  | ({ readonly type: 'session/start' | 'session/pause' | 'session/resume' | 'session/rest-expire' | 'session/rest-skip' } & Timed)
  | ({ readonly type: 'session/input'; readonly exerciseId: string; readonly setId: string; readonly values: ExecutionValues } & Timed)
  | ({ readonly type: 'session/record' | 'session/set-select'; readonly exerciseId: string; readonly setId: string } & Timed)
  | ({ readonly type: 'session/select' | 'session/skip'; readonly exerciseId: string } & Timed)
  | ({ readonly type: 'session/reorder'; readonly ids: readonly string[] } & Timed)
  | ({ readonly type: 'session/finish' | 'session/discard'; readonly confirmed: boolean } & Timed);
export function isSessionAction(action: { readonly type: string }): action is SessionAction { return action.type.startsWith('session/'); }
export type SessionCommand = SessionAction extends infer A ? A extends SessionAction ? Omit<A, 'sessionId' | 'now'> : never : never;
export const sessionIsLive = (session: TrainingSession) => !['finished','discarded'].includes(session.status);
export const sessionActiveMs = (session: TrainingSession, now: number) => session.activeMs + (session.runningSince === null ? 0 : Math.max(0, now - session.runningSince));
export const restRemainingMs = (session: TrainingSession, now: number) => session.rest ? session.rest.deadline === null ? session.rest.remainingMs : Math.max(0, session.rest.deadline - now) : 0;
export function sessionSummary(session: TrainingSession) {
  const exercises = Object.values(session.exercises);
  const sets = exercises.flatMap(item => item.sets.filter(set => set.recordedAt !== undefined));
  return { sets, performedExercises: exercises.filter(item => item.sets.some(set => set.recordedAt !== undefined)), skippedExercises: exercises.filter(item => item.skipped),
    complete: exercises.length > 0 && exercises.every(item => !item.skipped && item.sets.every(set => set.recordedAt !== undefined)) };
}
export function validExecution(item: TrainingSession['exercises'][string], values: ExecutionValues) {
  const positive = (value: number | undefined) => value !== undefined && Number.isFinite(value) && value > 0;
  if (values.loadKg !== undefined && (!Number.isFinite(values.loadKg) || values.loadKg < 0)) return false;
  switch (item.prescribed.measurement) {
    case 'time': return positive(values.durationSeconds) && values.repetitions === undefined && values.distanceMeters === undefined;
    case 'distance': return positive(values.distanceMeters) && values.repetitions === undefined && values.durationSeconds === undefined;
    default: return positive(values.repetitions) && Number.isInteger(values.repetitions) && values.durationSeconds === undefined && values.distanceMeters === undefined;
  }
}
function put(state: DemoState, session: TrainingSession): DemoState {
  return { ...state, trainingSessions: { ...state.trainingSessions, [session.id]: session }, activeTrainingSessionId: sessionIsLive(session) ? session.id : state.activeTrainingSessionId === session.id ? null : state.activeTrainingSessionId };
}
export function reduceSession(state: DemoState, action: SessionAction): DemoState {
  if (!Number.isSafeInteger(action.now) || action.now < 0 || !/^[A-Za-z0-9_-]{1,80}$/.test(action.sessionId)) return state;
  if (action.type === 'session/create') {
    if (readEntity(state.trainingSessions, action.sessionId) || (state.activeTrainingSessionId && readEntity(state.trainingSessions, state.activeTrainingSessionId))) return state;
    const prescription = selectSessionPrescription(state, action.routineId, action.day);
    if (!prescription || action.sessionId === prescription.workoutId || prescription.exercises.some(item => !Number.isSafeInteger(action.now + item.restSeconds * 1000)) || prescription.exercises.reduce((total, item) => total + item.sets, 0) > 1000 || !Number.isFinite(action.origin.scroll) || action.origin.scroll < 0) return state;
    const exercises = Object.fromEntries(prescription.exercises.map((item, index) => {
      const id = `${action.sessionId}:exercise:${index}`;
      const values: ExecutionValues = { ...(item.loadKg !== undefined ? { loadKg: item.loadKg } : {}), ...(item.measurement === 'time' ? { durationSeconds: item.durationSeconds } : item.measurement === 'distance' ? { distanceMeters: item.distanceMeters } : { repetitions: item.repsMin }) };
      return [id, { id, prescriptionItemId: item.id, exerciseId: item.exerciseId, name: readEntity(state.exercises, item.exerciseId)!.name, prescribed: item,
        selectedSetId: `${id}:set:0`, sets: Array.from({ length: item.sets }, (_, i) => ({ id: `${id}:set:${i}`, index: i, values: { ...values } })), skipped: false }];
    }));
    const order = Object.keys(exercises);
    return put(state, { id: action.sessionId, userId: state.user.id, workoutName: readEntity(state.workouts, prescription.workoutId)!.name, prescription, exercises, order, activeExerciseId: order[0]!,
      createdAt: action.now, startedAt: null, endedAt: null, status: 'prepared', activeMs: 0, runningSince: null, lastEventAt: action.now, rest: null, origin: { ...action.origin } });
  }
  const session = readEntity(state.trainingSessions, action.sessionId);
  if (!session || session.userId !== state.user.id || !sessionIsLive(session) || action.now < session.lastEventAt) return state;
  const save = (patch: Partial<TrainingSession>) => put(state, { ...session, ...patch, lastEventAt: action.now });
  switch (action.type) {
    case 'session/start': return session.status === 'prepared' ? save({ status: 'running', startedAt: action.now, runningSince: action.now }) : state;
    case 'session/pause': return ['running','resting'].includes(session.status) ? save({ status: 'paused', activeMs: sessionActiveMs(session, action.now), runningSince: null,
      rest: session.rest ? { deadline: null, remainingMs: restRemainingMs(session, action.now) } : null }) : state;
    case 'session/resume': return session.status === 'paused' ? save({ status: session.rest && session.rest.remainingMs > 0 ? 'resting' : 'running', runningSince: action.now,
      rest: session.rest && session.rest.remainingMs > 0 ? { ...session.rest, deadline: action.now + session.rest.remainingMs } : null }) : state;
    case 'session/rest-expire': case 'session/rest-skip':
      return session.status === 'resting' && (action.type === 'session/rest-skip' || restRemainingMs(session, action.now) === 0) ? save({ status: 'running', rest: null }) : state;
    case 'session/select': return readEntity(session.exercises, action.exerciseId) ? save({ activeExerciseId: action.exerciseId }) : state;
    case 'session/reorder': return action.ids.length === session.order.length && new Set(action.ids).size === session.order.length && action.ids.every(id => Object.hasOwn(session.exercises, id)) ? save({ order: [...action.ids] }) : state;
    case 'session/set-select': {
      const item = readEntity(session.exercises, action.exerciseId);
      return item?.sets.some(set => set.id === action.setId) ? save({ exercises: { ...session.exercises, [item.id]: { ...item, selectedSetId: action.setId } } }) : state;
    }
    case 'session/input': case 'session/record': {
      const item = readEntity(session.exercises, action.exerciseId);
      if (session.status !== 'running' || !item || item.skipped || item.id !== session.activeExerciseId || item.selectedSetId !== action.setId) return state;
      const set = item.sets.find(entry => entry.id === action.setId);
      if (!set || set.recordedAt !== undefined) return state;
      if (action.type === 'session/record' && !validExecution(item, set.values)) return state;
      const sets = item.sets.map(entry => entry.id !== set.id ? entry : action.type === 'session/input' ? { ...entry, values: { ...action.values } } : { ...entry, recordedAt: action.now });
      const restMs = item.prescribed.restSeconds * 1000;
      return save({ exercises: { ...session.exercises, [item.id]: { ...item, sets } }, ...(action.type === 'session/record' && restMs > 0 ? { status: 'resting' as const, rest: { remainingMs: restMs, deadline: action.now + restMs } } : {}) });
    }
    case 'session/skip': {
      const item = readEntity(session.exercises, action.exerciseId);
      if (!item || session.status !== 'running' || item.sets.every(set => set.recordedAt !== undefined)) return state;
      const next = session.order.find((id, i) => i > session.order.indexOf(item.id) && !session.exercises[id]!.skipped) ?? session.order.find(id => id !== item.id && !session.exercises[id]!.skipped) ?? item.id;
      return save({ exercises: { ...session.exercises, [item.id]: { ...item, skipped: true } }, activeExerciseId: next });
    }
    case 'session/finish': case 'session/discard': {
      if (action.confirmed !== true) return state;
      return save({ status: action.type === 'session/finish' ? 'finished' : 'discarded', endedAt: action.now, activeMs: sessionActiveMs(session, action.now), runningSince: null, rest: null });
    }
  }
}
