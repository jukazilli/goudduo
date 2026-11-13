/** Explicit display adapters; persisted prescription units remain seconds, metres and kg. */
export function parseNumeric(text: string): number {
  return /^\d+(?:[.,]\d+)?$/.test(text.trim()) ? Number(text.trim().replace(',', '.')) : Number.NaN;
}
export function formatRest(seconds: number): string {
  if (!Number.isSafeInteger(seconds) || seconds < 0) return '';
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(value => String(value).padStart(2, '0')).join(':');
}
export function parseRest(text: string): number {
  if (!/^\d{2,}:[0-5]\d:[0-5]\d$/.test(text.trim())) return Number.NaN;
  const [hours, minutes, seconds] = text.trim().split(':').map(Number);
  const result = hours! * 3600 + minutes! * 60 + seconds!;
  return Number.isSafeInteger(result) ? result : Number.NaN;
}
