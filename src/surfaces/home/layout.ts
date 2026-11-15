export const topWidgets = ['ranking', 'status', 'weight'] as const;
export const lowerWidgets = ['measures', 'library', 'photos', 'records'] as const;
export const homeOrder = [...topWidgets, 'workout', ...lowerWidgets, 'consistency'] as const;
export type HomeWidget = Exclude<typeof homeOrder[number], 'workout'>;
/** V5.3 groups; temporary visual order only. No routine layout or domain mutation. */
export function homeBentoLayout(expanded: HomeWidget | null) {
  if (expanded && topWidgets.some(id => id === expanded)) return {
    ids: [expanded, ...topWidgets.filter(id => id !== expanded), 'workout', ...lowerWidgets, 'consistency'] as readonly typeof homeOrder[number][],
    mode: 'top' as const, orphan: null,
  };
  if (expanded && lowerWidgets.some(id => id === expanded)) {
    const remainder = lowerWidgets.filter(id => id !== expanded);
    return { ids: [...topWidgets, 'workout', expanded, ...remainder, 'consistency'] as readonly typeof homeOrder[number][], mode: 'lower' as const, orphan: remainder.at(-1)! };
  }
  return { ids: homeOrder, mode: expanded ? 'lower' as const : null, orphan: null };
}
