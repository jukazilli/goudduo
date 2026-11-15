import type { SessionResult } from '../../domain/session-result';
import type { ExecutionValues } from '../../domain/session';
export function durationText(ms: number) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(value => String(value).padStart(2, '0')).join(':');
}
export function executionText(values: Readonly<ExecutionValues>) {
  const measurement = values.repetitions !== undefined ? `${values.repetitions} repetições` : values.durationSeconds !== undefined ? `${values.durationSeconds} s` : `${values.distanceMeters} m`;
  return measurement + (values.loadKg !== undefined ? ` · ${values.loadKg} kg` : '');
}
export const completionText = (result: SessionResult) => result.completion === 'complete' ? 'Todas as séries registradas' : result.completion === 'partial' ? 'Com séries não realizadas' : 'Sem séries registradas';
export function RecordedFacts({ result }: { result: SessionResult }) {
  return <dl><dt>Tempo ativo</dt><dd>{durationText(result.activeMs)}</dd><dt>Séries realizadas</dt><dd>{result.recordedSetCount}</dd><dt>Exercícios com séries realizadas</dt><dd>{result.performedExerciseCount}</dd><dt>Exercícios pulados</dt><dd>{result.skippedExerciseCount}</dd></dl>;
}
export function RecordedExercises({ result }: { result: SessionResult }) {
  return <>{result.exercises.filter(item => item.sets.some(set => set.actual !== null)).map(item => <article key={item.id}><h3>{item.name}</h3><ul>{item.sets.filter(set => set.actual !== null).map(set => <li key={set.id}>Série {set.index + 1}: {executionText(set.actual!)}</li>)}</ul></article>)}</>;
}
export function CompletionTime({ at }: { at: number }) {
  return <time dateTime={new Date(at).toISOString()}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium' }).format(at)}</time>;
}
