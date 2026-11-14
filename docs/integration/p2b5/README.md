# P2-B5 — Biblioteca contextual Motion V7.4

Entrega para revisão do proprietário; coordenação [#29](https://github.com/jukazilli/goudduo/issues/29). Branch `feat/p2b5-contextual-exercise-library-v74`, criada da main homologada **fba23be34bbd370e2dccef4d94d2c6a23265e6c1**. Nenhum merge da implementação P2-B5 ou deploy autorizado/executado.

## Homologação técnica P2-B4

A [PR #37](https://github.com/jukazilli/goudduo/pull/37) foi reauditada no head **2c7115f504ccf9ef6c34447835fe466f23dd3a09**, base 313d234be321d89c2d3c4ca49e7ef2963b728d4d, [CI aprovada no mesmo SHA](https://github.com/jukazilli/goudduo/actions/runs/43519831948), sem conflitos. Diff, escopo, proteção do Shell e hashes das evidências foram reconferidos; PR #36 continua fechada sem merge. A #37 foi marcada pronta e integrada por merge controlado em **fba23be34bbd370e2dccef4d94d2c6a23265e6c1**. [Registro oficial](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6870212608). Issue permanece aberta.

Homologados: Editor React, medições, reps independentes, remoção/ordem, drafts isolados, confirmação/nomeação, commit/retorno e descarte confirmado. A homologação não aprovou Biblioteca então ausente, catálogo profissional, substitutos, cópia/referência, limite definitivo de nome ou refinamento visual final.

## Implementado

Biblioteca real no aplicativo comum: sheet ~75%, busca local tolerante a caixa/acentos, sugestões determinísticas, resultados com dados do catálogo compartilhado, inclusão por draft/add, check derivado do draft, bloqueio de repetição e feedback transitório somente após inclusão efetiva. Múltiplas inclusões mantêm pesquisa/scroll/foco e o painel aberto.

É possível criar treinos de um ou vários exercícios, configurar os parâmetros no Editor e salvar pelo fluxo homologado, retornando à rotina/dia corretos. Nenhum preenchimento do Lab é necessário para essa jornada comum. Valores obrigatórios começam em branco e precisam ser configurados; não há prescrição válida inventada para mascarar lacunas.

- [Contrato de catálogo e parâmetros](LIBRARY-CONTRACT.md)
- [Busca, inclusão e feedback](SEARCH-AND-ADDITION.md)
- [Overlay, foco e estado](OVERLAY-AND-STATE.md)
- [Jornadas completas](END-TO-END-JOURNEYS.md)
- [Referência e comparação visual](V74-VISUAL-COMPARISON.md)
- [Testes e segurança](REGRESSION-REPORT.md)
- [Gates P2-B6](NEXT-GATES.md)

Catálogo demonstrativo, não definitivo. A Biblioteca independente e seleção de equipamentos não foram implementadas ou substituídas. Equipamento continua somente leitura por ID; substitutos permanecem indisponíveis. Sem backend, autenticação, persistência, mídia privada ou nova dependência.

Node/pnpm fixados no repositório. Executar `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, `pnpm run build`, `pnpm run build:lab`, `node --test tests/bundle.test.mjs`, `pnpm exec playwright test`. `pnpm dev` abre o mesmo aplicativo integrado. Cloudflare somente dry-run do workflow existente; nenhum preview público foi publicado.
