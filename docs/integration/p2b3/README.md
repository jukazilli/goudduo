# P2-B3 — Home Rotinas Bento V7.4

**Implementação para homologação visual do proprietário.** Coordenação [#29](https://github.com/jukazilli/goudduo/issues/29). A [PR #34](https://github.com/jukazilli/goudduo/pull/34) foi auditada no head `2b280e104e57ce7768d96f53689d59721e0053c1`: escopo original de 22 arquivos, CI aprovada, sem conflitos ou alterações inesperadas. Foi marcada pronta e integrada por merge controlado em **3d7a16813fcb9b8ec006ba1a36f4f581194f4576**. [Homologação técnica registrada](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6863795049). A homologação não aprovou interfaces visuais de Editor/Biblioteca.

Branch `feat/p2b3-routines-bento-v74` criada desse merge. P1-R1/PR #31, P2-A-R1/PR #32 e domínio P2-B1/PR #33 continuam bases homologadas; a main anterior era 86d0b968d402ab7bf2edf323d80a4be429c81acb. A PR de implementação P2-B3 permanece Draft e não pode ser mesclada automaticamente.

## O que existe no React

Home Rotinas integrada em `/rotinas`, acessível pela TabBar oficial: principal e secundárias, Bento in-place, reflow local, órfão full-width, recolhimento/restauração, semana por rotina, prévia de exercícios reais do catálogo demonstrativo e estados vazios. Não é outra página/aplicação: usa o mesmo AppShell, BrowserNavigation, DemoProvider e reducer.

`PrototypeApp` fornece a superfície ao slot existente e conserva somente expandedId como apresentação em memória. `RoutinesHome`, layout puro e CSS próprio ficam em src/surfaces/routines/. Dados estão exclusivamente no estado compartilhado. Fixtures são sintéticas e explicitamente nomeadas como demonstração, com IDs estáveis e nenhuma pessoa/mídia real.

## Documentos

- [Contrato da Home Rotinas](HOME-ROUTINES-CONTRACT.md)
- [Comparação visual V7.4 e capturas](V74-VISUAL-COMPARISON.md)
- [Estado e navegação](STATE-AND-NAVIGATION.md)
- [Regressões, testes e segurança](REGRESSION-REPORT.md)
- [Gates para P2-B4](NEXT-GATES.md)

## Limites preservados

Editor, Biblioteca e nomeação visuais não foram implementados. Ver treino/Adicionar treino chegam ao Editor indisponível, sem botão Salvar ou sucesso falso; só preparam/reutilizam rascunho/contexto, sem criar prescrição salva. Menu de operações e Criar rotina estão desabilitados; CRUD, ordem intencional salva, mudança de principal e capas próprias aguardam recorte adequado.

Não houve Home Treinos V5.3, Feed/Publicações, Business, Pulse, autenticação, backend, persistência ou nova hospedagem. Nenhum código/asset privado transportado; não houve cherry-pick histórico. Fontes públicas e Lucide existentes são usados, sem fotografia/ilustração/brand reconstruído. Cloudflare não foi alterada e nenhum comando extra de publicação foi criado; somente o dry-run da CI preexistente pode executar.

## Execução

Node 24.22.x/pnpm 11.25.x fixados. `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, `pnpm run build`, `pnpm run build:lab`, `node --test tests/bundle.test.mjs`, `pnpm exec playwright test`. `pnpm dev` abre a aplicação integrada. Lab separado permite Cenário de Rotinas (várias/uma/nenhuma), sem esses controles no app comum.

A aparência e as adaptações técnicas listadas na comparação ainda exigem revisão do proprietário. Não se declara fidelidade pixel a pixel, QA físico ou produto em produção. P2-B4 não foi iniciada.
