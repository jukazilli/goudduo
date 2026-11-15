# P3-S2 — Resultados e Histórico em memória

Base **7bf760269fade3a9c8b38b770e3fb1c869cd1aa9**, merge controlado exclusivo da [PR #42](https://github.com/jukazilli/goudduo/pull/42), após corrigir o gate obrigatório de confirmação. Head original307fb57 foi substituído por **492d024bd5fcaa8e7971dbeed98d8265a66b936c**, cuja [CI43743715368](https://github.com/jukazilli/goudduo/actions/runs/43743715368) passou133 unitários/185 Playwright/4 bundle, typecheck/builds e dry-run preexistente. [Homologação na Issue #29](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6898971886), mantida aberta.

Correção antes do merge: toda ação session/finish e session/discard exige confirmed:true no reducer, mesmo na execução completa. Negativa não altera a sessão; confirmação positiva e estado terminal idempotente cobertos. UI e demais políticas S1 preservadas.

Branch `feat/p3s2-session-results-history`. React19/TypeScript/Vite, Node24.22.1/pnpm11.25.0 e lockfile preservados. Build app em dist/app e Lab separado em dist/lab; nenhum pacote, backend ou configuração de hospedagem novo.

Implementado: projeções readonly de resultados, Histórico de sessões finished do titular atual, ordenação endedAt/ID, detalhe contextual por ID opaco, valores prescritos versus realizados, estado parcial/pulado/não realizado, retorno com seleção/foco/scroll e conexão do resumo terminal ao Histórico. Dados permanecem exclusivamente em DemoState.trainingSessions; não existe lista de resultados paralela.

- [Contrato de resultado](SESSION-RESULTS-CONTRACT.md), [dados/privacidade](HISTORY-DATA-AND-PRIVACY.md).
- [Navegação](HISTORY-NAVIGATION.md), [completa versus parcial](COMPLETED-VS-PARTIAL.md).
- [Snapshot](SNAPSHOT-INTEGRITY.md), [jornadas](END-TO-END-JOURNEYS.md).
- [Regressões](REGRESSION-REPORT.md), [capturas e UI](VISUAL-COMPARISON.md), [gates](NEXT-GATES.md).

**Histórico em memória não equivale a histórico persistente.** Reload ou nova instância não recupera registros. Sessões descartadas e ativas não aparecem como resultados finalizados. Nada é enviado a Perfil, Pulse, Feed, Progresso ou Ranking. Não equivale ao MVP completo.

Execução local: pnpm install --frozen-lockfile; pnpm dev. Validação: pnpm typecheck; pnpm test; pnpm run build; pnpm run build:lab; node --test tests/bundle.test.mjs; pnpm exec playwright test. Cloudflare apenas dry-run preexistente da CI. Sem deploy, merge desta implementação ou início de nova fase.

## Validação final local

| Verificação | Resultado |
| --- | --- |
| Instalação frozen-lockfile | Aprovada; lockfile inalterado |
| Typecheck | Aprovado |
| Vitest | **163 testes aprovados**, 17 arquivos |
| Build app / Visual Lab | Ambos aprovados; guards de isolamento mantidos |
| Bundle | **4 testes aprovados** |
| Playwright integral | **210 testes aprovados**, cinco larguras, sem retries |
| Coleta regional | **40 capturas e 40 análises axe**, zero violações nos estados capturados e zero erros de página |
| Diff, fontes e assets | Conferência documental e de escopo; hashes no manifesto de evidências |

As 25 novas jornadas Playwright somam-se às 185 anteriores. A cobertura Vitest passou de 133 para 163. Chromium automatizado não aprova Safari/iPhone/Android físicos, VoiceOver/TalkBack, teclado virtual ou safe areas reais. Cloudflare permanece limitado ao dry-run preexistente da CI; nenhum deploy.
