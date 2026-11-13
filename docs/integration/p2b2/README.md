# P2-B2 — adapters contextuais de Rotinas

Entrega estrutural para revisão, **sem superfícies finais, merge ou deploy**. Coordenação [#29](https://github.com/jukazilli/goudduo/issues/29). Base: P2-B1 [PR #33](https://github.com/jukazilli/goudduo/pull/33), integrada pelo proprietário em `86d0b968d402ab7bf2edf323d80a4be429c81acb`. Workspace estava limpo; branch `feat/p2b2-contextual-routine-adapters` criada da main nesse SHA. A árvore do merge é idêntica ao head P2-B1 `91ec755e50ec68a205063deb2e5bfb2b20ea20b7`.

CI do head P2-B1 aprovada na [execução43352952328](https://github.com/jukazilli/goudduo/actions/runs/43352952328). O merge86d0b968 não possuía check próprio no preflight; não confundimos essas evidências. Nenhuma PR P2-B2 concorrente foi encontrada; as PRs abertas de laboratório/Acesso/Perfil não foram integradas ou modificadas.

## Diagnóstico apresentado antes de editar

| Contrato | Já disponível | Limitação | Correção mínima executada |
| --- | --- | --- | --- |
| Header contextual | Variante Editor, chevron, título/check e disabled | Não conhece rascunho/gates | Adapter fornece configuração, sem header paralelo |
| Salvar | Reducer prepare/confirm-single/naming/commit | Sem transporte de intenção/etapa | Observar resultado real do reducer e solicitar painel correto |
| OverlayHost | Lifecycle, inert, foco/trap, scroll lock, backdrop, Escape/gesto/back | Conteúdo fixo dos três painéis Home | Resolvedor contextual opt-in; Home mantém fallback atual |
| Biblioteca | Sheet existente | Sem altura contextual/conteúdo | size=library,75% útil, consumidor técnico separado |
| Confirmação | Estado confirm-single | Sem ligação com conteúdo | Contrato confirmar/continuar, sem commit implícito |
| Nomeação | Estado naming e commit atômico | Sem sugestão/retorno | Sugestão por dia, submit final e retorno após resultado válido |
| Draft/contexto | IDs, rotina/dia e revisão | Não ligados à entrada de navegação | Referências efêmeras por chave, sem rascunho em URL/history |
| Retorno | BrowserNavigation, back/forward e scroll | Sem origem completa do Editor | Origem+posição em memória; Back preserva draft |
| Safe areas/motion | Fundação P1-R1 | Precisa aceitar consumidor real | Mesmos insets, tokens e motor; somente tamanho local opt-in |

## Implementação e limites

- [Contratos dos adapters](ADAPTER-CONTRACTS.md)
- [Navegação e rascunhos](NAVIGATION-AND-DRAFTS.md)
- [Lifecycle de overlays](OVERLAY-LIFECYCLE.md)
- [Regressão e verificações](REGRESSION-REPORT.md)
- [Próximos gates / P2-B3](NEXT-GATES.md)

Nenhuma Home Bento, Editor completo, lista/busca de Biblioteca, Pulse ou autenticação foi implementada. O app comum mantém placeholders, inclusive Editor sem ação falsa de salvar. Consumidores sintéticos novos só aparecem ao ativar **Cenário técnico de adapters** no Visual Lab; não representam UI homologada. Estado continua em um único Context/useReducer e navegação na mesma History API.

Nenhum código/asset privado transportado, nenhuma biblioteca adicionada. Shell/TabBar/identidade/Home/Publicações/Business preservados; ajustes compartilhados são explicitados nos documentos. Cloudflare permanece configurada como antes e somente dry-run é permitido.
