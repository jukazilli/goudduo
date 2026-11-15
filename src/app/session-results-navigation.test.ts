import { describe, expect, it } from 'vitest';
import { pagePath, parentPage, parseLocation } from './navigation';
import { shellPolicy } from './surface-contracts';
describe('contextual History result routes', () => {
  it('round-trips opaque session IDs using the same router and existing contextual Shell', () => {
    const page = parseLocation(new URL('https://example.test/historico/session-123')).page;
    expect(page).toEqual({ destination: 'session-result', sessionId: 'session-123' });
    expect(pagePath(page)).toBe('/historico/session-123'); expect(parentPage(page)).toEqual({ destination: 'history' });
    expect(shellPolicy(page)).toMatchObject({ mode: 'contextual', header: 'contextual', tabBar: false });
  });
  it('rejects malformed IDs and keeps direct History distinct from execution and result routes', () => {
    for (const path of ['/historico/a%2Fb','/historico/a/b','/historico/'+'x'.repeat(81)]) expect(parseLocation(new URL(path,'https://example.test')).page.destination).toBe('not-found');
    expect(parseLocation(new URL('https://example.test/historico')).page.destination).toBe('history');
    expect(parseLocation(new URL('https://example.test/sessao/session-123')).page.destination).toBe('session');
    expect(() => pagePath({ destination: 'session-result', sessionId: 'a/b' })).toThrow();
  });
});
