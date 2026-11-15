/** Presentation infrastructure only: never reload an active in-memory journey. */
export async function registerPwa() {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
    const check = () => { if (navigator.onLine) void registration.update().catch(() => undefined); };
    window.addEventListener('online', check);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
    // Browser throttling does not determine correctness: visibility/online/reload also check updates.
    window.setInterval(() => { if (document.visibilityState === 'visible') check(); }, 30 * 60 * 1000);
    check();
  } catch {
    // The online app remains usable if SW installation is blocked (e.g. expired Access session).
    window.dispatchEvent(new Event('goudduo:pwa-unavailable'));
  }
}
