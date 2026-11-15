import { useEffect, useRef, useState } from 'react';
import { useDemoDispatch, useDemoState } from '../state/DemoProvider';
import { readEntity } from '../state/training';
import { selectSessionPrescription } from '../state/selectors';
import { restRemainingMs, sessionIsLive, type SessionCommand } from '../state/session';
import type { Weekday } from '../domain/training';
import { useNavigation } from './NavigationProvider';
export function useTrainingSession(onReturnRoutine?: (routineId: string) => void) {
  const state = useDemoState(), dispatch = useDemoDispatch();
  const { navigation, location } = useNavigation();
  const candidate = location.page.destination === 'session' ? readEntity(state.trainingSessions, location.page.sessionId) : undefined;
  const session = candidate?.userId === state.user.id ? candidate : undefined;
  const activeCandidate = state.activeTrainingSessionId ? readEntity(state.trainingSessions, state.activeTrainingSessionId) : undefined;
  const active = activeCandidate?.userId === state.user.id ? activeCandidate : undefined;
  const pending = useRef<string | null>(null);
  const [now, setNow] = useState(Date.now);
  const [startError, setStartError] = useState<string | null>(null);
  useEffect(() => {
    const id = pending.current;
    if (!id) return;
    pending.current = null;
    if (!readEntity(state.trainingSessions, id)) { setStartError('Não foi possível iniciar esta prescrição.'); return; }
    dispatch({ type: 'session/start', sessionId: id, now: Date.now() });
    navigation.navigate({ page: { destination: 'session', sessionId: id }, panel: null });
  }, [state.trainingSessions, dispatch, navigation]);
  useEffect(() => {
    if (active && (location.page.destination !== 'session' || location.page.sessionId !== active.id) && ['running','resting'].includes(active.status)) {
      dispatch({ type: 'session/pause', sessionId: active.id, now: Date.now() });
    }
  }, [active, location.page, dispatch]);
  useEffect(() => {
    setNow(Date.now());
    if (!session || !['running','resting'].includes(session.status)) return;
    // One UI clock on the mounted session only; authoritative time derives from timestamps.
    const tick = () => {
      const time = Date.now(); setNow(time);
      if (session.status === 'resting' && restRemainingMs(session, time) === 0) dispatch({ type: 'session/rest-expire', sessionId: session.id, now: time });
    };
    const timer = window.setInterval(tick, 250); return () => window.clearInterval(timer);
  }, [session?.id, session?.status, session?.rest?.deadline, dispatch]);
  const send = (command: SessionCommand) => { if (session) dispatch({ ...command, sessionId: session.id, now: Date.now() }); };
  const resumeActive = () => {
    if (!active) return;
    if (active.status === 'paused') dispatch({ type: 'session/resume', sessionId: active.id, now: Date.now() });
    else if (active.status === 'prepared') dispatch({ type: 'session/start', sessionId: active.id, now: Date.now() });
    navigation.navigate({ page: { destination: 'session', sessionId: active.id }, panel: null });
  };
  const begin = (routineId: string, day: Weekday) => {
    if (pending.current) return;
    const prescription = selectSessionPrescription(state, routineId, day);
    if (!prescription) { setStartError('Não há prescrição válida para iniciar.'); return; }
    setStartError(null);
    if (active && sessionIsLive(active)) {
      if (active.prescription.routineId === routineId && active.prescription.day === day && active.prescription.workoutId === prescription.workoutId) resumeActive();
      else navigation.openPanel('session-conflict');
      return;
    }
    const id = crypto.randomUUID(); pending.current = id;
    dispatch({ type: 'session/create', sessionId: id, routineId, day, now: Date.now(), origin: { destination: location.page.destination === 'home' ? 'home' : 'rotinas', scroll: navigation.scrollPosition() } });
  };
  const leave = () => {
    if (!session) return;
    if (['running','resting'].includes(session.status)) send({ type: 'session/pause' });
    dispatch({ type: 'training/select', routineId: session.prescription.routineId, day: session.prescription.day });
    if (session.origin.destination === 'rotinas') onReturnRoutine?.(session.prescription.routineId);
    navigation.navigate({ page: session.origin.destination === 'home' ? { destination: 'home', context: 'treinos' } : { destination: 'rotinas' }, panel: null }, false, { scroll: session.origin.scroll });
  };
  return { session, active, now, send, begin, resumeActive, leave, navigation, startError };
}
export type TrainingSessionAdapter = ReturnType<typeof useTrainingSession>;
