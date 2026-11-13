/** Temporary presentation order only; never commits a preference or mutates entities. */
export function routinesLayout(ids: readonly string[], primaryId: string | null, expandedId: string | null) {
  const primary = ids.includes(primaryId ?? '') ? primaryId : ids[0] ?? null;
  const secondary = ids.filter(id => id !== primary);
  const visual = [...secondary];
  const index = expandedId ? visual.indexOf(expandedId) : -1;
  if (index >= 0 && index % 2 === 1) [visual[index - 1], visual[index]] = [visual[index]!, visual[index - 1]!];
  const half = visual.filter(id => id !== expandedId);
  return { primaryId: primary, ids: primary ? [primary, ...visual] : [], orphanId: half.length % 2 === 1 ? half.at(-1)! : null };
}
