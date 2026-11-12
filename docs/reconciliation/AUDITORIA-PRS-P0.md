# Auditoria de PRs e branches — P0

Snapshot REST/Git de 12/11/2026 UTC. [Fontes congeladas](FONTES-E-DECISOES-P0.md). Todos os heads abertos listados abaixo **não são ancestrais da main congelada**: portanto, nenhum está integrado. `clean`/`mergeable_state` é metadado GitHub contra a base da PR, não prova de compatibilidade entre PRs nem autorização de merge.

## Resumo das dependências comprovadas

GODUOIT (ancestralidade via `git merge-base --is-ancestor`):

```text
#140 + #142 → #146 → #151 → #153 → #154
                         └→ #152
#140 + #142 → base f593e594 → #148 (diverge do head atual #146)
#161 e #158: documentos independentes; #139: correção de Lab paralela
```

Os símbolos `+`/setas acima descrevem ancestralidade observada, não merges executados nesta missão. #146 e #148 compartilham base histórica, porém nenhum dos heads contém o outro. #152 contém #151, mas não #153/#154. Números de PR não determinam ordem segura de aplicação.

goudduo:

```text
#8 → #11 → #14
#15 → #18
#2, #5, #10, #21 e #22: branches independentes
preview/rotinas-motion-v7: referência sem PR associada no snapshot
```

## Inventário de PRs abertas

SHAs de base são os retornados pelo endpoint de cada PR; podem diferir da main atual (ex.: G#130). Base nomeada `main` não significa que o head contém o SHA atual.

| Repo / PR | Estado | Base real / SHA | Head real / SHA | Arquivos | mergeable_state consultado |
|---|---|---|---|---:|---|
| [GODUOIT #130](https://github.com/jukazilli/GODUOIT/pull/130) | open / não Draft | `main`<br>`0a46efb6b7f59207e5a1323cedb1675c3eca1a0a` | `feat/gooduu-ai-submodule`<br>`6d3ad4867ed28f9d6efb0d21a9e449641e315a6c` | 29 | `unknown` |
| [GODUOIT #138](https://github.com/jukazilli/GODUOIT/pull/138) | open / Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `visual-lab/rotinas-referencia-r0-01j-20261107`<br>`d64a1ec548d7d1cd4513ee75c737aea057b067f3` | 1 | `clean` |
| [GODUOIT #139](https://github.com/jukazilli/GODUOIT/pull/139) | open / Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `fix/visual-lab-isolar-modo-debug`<br>`a60e83c6fa58bbd0c5f495797957241e0186cd55` | 4 | `clean` |
| [GODUOIT #140](https://github.com/jukazilli/GODUOIT/pull/140) | open / não Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `feat/visual-lab-rotinas-r0-01j`<br>`d9b34db249f4a1ef1f9a1dc312f9af2103b71d69` | 6 | `clean` |
| [GODUOIT #141](https://github.com/jukazilli/GODUOIT/pull/141) | open / Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `design/session-starkah-composition-v03-20261107`<br>`846338eab5278a636f222d1bb09f512c0e4bd5c3` | 1 | `clean` |
| [GODUOIT #142](https://github.com/jukazilli/GODUOIT/pull/142) | open / não Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `feat/visual-lab-sessao-treino-75`<br>`8f00045eabfa9e1c2a33e66619b3c7bba3bb4c29` | 6 | `clean` |
| [GODUOIT #145](https://github.com/jukazilli/GODUOIT/pull/145) | open / Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `research/exercise-gif-fps-pilot-20261108`<br>`4934ebc55fc2a1ae90dd8cc5aa60565d2801b2b4` | 3 | `clean` |
| [GODUOIT #146](https://github.com/jukazilli/GODUOIT/pull/146) | open / não Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `feat/visual-lab-reconciliacao-rotinas-sessao-home`<br>`3456074fa34d2efc79662c9ddc0137f9feba5cbd` | 12 | `clean` |
| [GODUOIT #147](https://github.com/jukazilli/GODUOIT/pull/147) | open / Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `design/perfil-html-p0-v02-20261108`<br>`faa2276ecb56d6aaf6a3dd90d082c0693973bf02` | 1 | `clean` |
| [GODUOIT #148](https://github.com/jukazilli/GODUOIT/pull/148) | open / Draft | `feat/visual-lab-reconciliacao-rotinas-sessao-home`<br>`f593e59433aaee9360a040294a22fb0858f37ac9` | `feat/sessao-v04-densidade-carrossel-navegacao`<br>`b09820f5dc38ad0e43c49fdf560a15b477f3f7f2` | 4 | `dirty` |
| [GODUOIT #150](https://github.com/jukazilli/GODUOIT/pull/150) | open / Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `design/routines-add-exercises-carousel-v4-20261108`<br>`37d7d131595e8842992c7b54509e80461e31f4fc` | 1 | `clean` |
| [GODUOIT #151](https://github.com/jukazilli/GODUOIT/pull/151) | open / não Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `feat/routines-add-exercises-v4`<br>`2b8890929bb8c04c2539965af5379869b82dd13b` | 12 | `clean` |
| [GODUOIT #152](https://github.com/jukazilli/GODUOIT/pull/152) | open / não Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `feat/profile-surface-homeshell`<br>`69833d2110671a5380a6b8b873c6712681bf57c1` | 16 | `clean` |
| [GODUOIT #153](https://github.com/jukazilli/GODUOIT/pull/153) | open / Draft | `feat/routines-add-exercises-v4`<br>`2b8890929bb8c04c2539965af5379869b82dd13b` | `fix/routines-composer-header-simplified-20261109`<br>`0308e2c4f667e35497d254f24e78d18208272b96` | 4 | `clean` |
| [GODUOIT #154](https://github.com/jukazilli/GODUOIT/pull/154) | open / Draft | `fix/routines-composer-header-simplified-20261109`<br>`0308e2c4f667e35497d254f24e78d18208272b96` | `fix/ios-input-focus-zoom-20261109`<br>`08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38` | 6 | `clean` |
| [GODUOIT #158](https://github.com/jukazilli/GODUOIT/pull/158) | open / Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `docs/mvp-visual-lab-governanca-20261109`<br>`04f725c77e8ed833aedb06dae396644fc93f6669` | 1 | `clean` |
| [GODUOIT #161](https://github.com/jukazilli/GODUOIT/pull/161) | open / não Draft | `main`<br>`c0936896240e525353b237d92dff31fe0211eb94` | `docs/home-treinos-v53-ui-ux-homologada-20261109`<br>`abfd989fb1b3e87d617dfd93c0527554b2e283b2` | 1 | `clean` |
| [goudduo #2](https://github.com/jukazilli/goudduo/pull/2) | open / Draft | `main`<br>`eb787a47f7729b24f876e851068e8d18d29fc2a9` | `docs/processo-redesign-superficies-20261110`<br>`aed33fcca6c7579f7672b8b29a60cd238aed3be7` | 8 | `clean` |
| [goudduo #5](https://github.com/jukazilli/goudduo/pull/5) | open / não Draft | `main`<br>`5fa1b70f6b860ee26e4c7fde222042a1da104099` | `docs/splash-v3-homologada-20261110`<br>`94f304e46c21e039dc58ab67e5596eef97765301` | 3 | `clean` |
| [goudduo #8](https://github.com/jukazilli/goudduo/pull/8) | open / não Draft | `main`<br>`5fa1b70f6b860ee26e4c7fde222042a1da104099` | `lab/acesso-mobile-v02-homologacao-20261110`<br>`8eee298ac3a9d2a681c8251fb5db4696feac4b9a` | 2 | `clean` |
| [goudduo #10](https://github.com/jukazilli/goudduo/pull/10) | open / Draft | `main`<br>`5fa1b70f6b860ee26e4c7fde222042a1da104099` | `docs/cadastro-mobile-v03-proposta-20261110`<br>`fc26a8ec37a47449a25e67db3b1c25f812e4657f` | 1 | `clean` |
| [goudduo #11](https://github.com/jukazilli/goudduo/pull/11) | open / Draft | `lab/acesso-mobile-v02-homologacao-20261110`<br>`8eee298ac3a9d2a681c8251fb5db4696feac4b9a` | `lab/cadastro-mobile-v03-proposta-20261110`<br>`90e0327dbd7089afb83a8d91315c324120c8d22b` | 2 | `clean` |
| [goudduo #14](https://github.com/jukazilli/goudduo/pull/14) | open / Draft | `lab/cadastro-mobile-v03-proposta-20261110`<br>`90e0327dbd7089afb83a8d91315c324120c8d22b` | `lab/otp-mobile-v04-proposta-20261110`<br>`12dd98f8b1b51f2085efd3bc1d954f03128b42e8` | 2 | `clean` |
| [goudduo #15](https://github.com/jukazilli/goudduo/pull/15) | open / Draft | `main`<br>`5fa1b70f6b860ee26e4c7fde222042a1da104099` | `docs/legal-privacy-terms-v01-20261110`<br>`df900f2018aa78552ab404f7064453c1cff09106` | 5 | `clean` |
| [goudduo #18](https://github.com/jukazilli/goudduo/pull/18) | open / Draft | `docs/legal-privacy-terms-v01-20261110`<br>`df900f2018aa78552ab404f7064453c1cff09106` | `lab/legal-reader-privacy-v01-proposta-20261110`<br>`c7c2e6cec7a7b802799ab91af175a75fec19fd82` | 2 | `clean` |
| [goudduo #21](https://github.com/jukazilli/goudduo/pull/21) | open / Draft | `main`<br>`5fa1b70f6b860ee26e4c7fde222042a1da104099` | `lab/onboarding-v01-proposta-20261110`<br>`4ebef98b06b4db723ff98cb1881fc08aba114a90` | 2 | `clean` |
| [goudduo #22](https://github.com/jukazilli/goudduo/pull/22) | open / Draft | `main`<br>`5fa1b70f6b860ee26e4c7fde222042a1da104099` | `lab/perfil-complete-v01-proposta-20261110`<br>`df69c0809c425e2fe910913f16ec0a210d672229` | 10 | `clean` |

## Parecer por PR e arquivos modificados

Os caminhos são metadados de rastreabilidade. Não se reproduz código privado. Alegações de testes no texto das PRs são **relatos históricos**, não reexecução P0.

### GODUOIT #130 — feat(gooduu): calibragem experimental de resumos sociais adaptativos e tool calling (#115)

- **Objetivo/estado:** Gooduu experimental pós-MVP.
- **Estratégia:** Arquivamento como histórico para P0.
- **Aproveitamento e substituições:** Nenhuma implementação de IA é necessária à consolidação autorizada.
- **Dependências, conflitos e regressões:** Base antiga e AGENTS diferente, alterações em HomeShell/Rotinas/catalog; não usar como atalho de integração nem levar gooduu ao build público.
- **Arquivos modificados contra a base real:**

  - `.agents/skills/github-kanban/SKILL.md`
  - `gooduu/CALIBRATION.md`
  - `gooduu/COMMUNITY_INTERACTIONS.md`
  - `gooduu/DISCOVERY.md`
  - `gooduu/FASE_3_PLAN.md`
  - `gooduu/README.md`
  - `gooduu/TOOL_ARCHITECTURE_AND_BOUNDARIES.md`
  - `gooduu/logs/interactions.jsonl`
  - `gooduu/logs/session_audit.md`
  - `gooduu/package.json`
  - `gooduu/src/fixtures/mock-posts-comments.ts`
  - `gooduu/src/index.ts`
  - `gooduu/src/middleware/tool-dispatcher.ts`
  - `gooduu/src/orchestrator.ts`
  - `gooduu/src/social-summary.ts`
  - `gooduu/src/system-prompt.ts`
  - `gooduu/src/tools.ts`
  - `gooduu/tests/social-summaries.test.ts`
  - `gooduu/tests/tool-dispatcher.test.ts`
  - `gooduu/wrangler.toml`
  - `public/gooduu.html`
  - `scripts/kanban.ps1`
  - `scripts/serve_gooduu.cjs`
  - `src/App.test.tsx`
  - `src/catalog/registry.ts`
  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/routines/RoutinesSurface.test.tsx`
  - `src/surfaces/routines/RoutinesSurface.tsx`
  - `src/surfaces/routines/routines.css`

### GODUOIT #138 — [Visual Lab][Rotinas] Referência HTML navegável R0-01J — busca e ajuda contextual

- **Objetivo/estado:** HTML Rotinas R0-01J candidato.
- **Estratégia:** Arquivamento como histórico.
- **Aproveitamento e substituições:** Rastreia a entrada de #140.
- **Dependências, conflitos e regressões:** V7.4 é baseline vigente; não escolher branch pela idade ou número da PR.
- **Arquivos modificados contra a base real:**

  - `lab/references/rotinas/rotinas-visual-lab-referencia.html`

### GODUOIT #139 — fix(visual-lab): isola a rolagem do Modo Debug no iOS

- **Objetivo/estado:** Isolar bancada e scroll no modo Debug iOS.
- **Estratégia:** Adaptação seletiva se reproduzido o problema.
- **Aproveitamento e substituições:** Não é dependência de produto; pode ajudar Lab e isolamento do viewport.
- **Dependências, conflitos e regressões:** Não substituir teste físico por zoom emulado; não remover acessibilidade de zoom.
- **Arquivos modificados contra a base real:**

  - `src/App.test.tsx`
  - `src/App.tsx`
  - `src/preview/ImmersiveVariantPreview.tsx`
  - `src/preview/immersive-variant-preview.css`

### GODUOIT #140 — feat(visual-lab): reproduz e integra experiência navegável de Rotinas R0-01J (#74, #120, #121, #127)

- **Objetivo/estado:** Rotinas R0-01J React.
- **Estratégia:** Adaptação seletiva histórica.
- **Aproveitamento e substituições:** Contratos/domínio e testes reaproveitáveis pelas linhas posteriores.
- **Dependências, conflitos e regressões:** Head ancestral de #146/#148/#151/#152/#153/#154; evitar reaplicar. R0-01J não é referência final.
- **Arquivos modificados contra a base real:**

  - `src/App.test.tsx`
  - `src/fixtures/routines-demo.ts`
  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/routines/RoutinesSurface.test.tsx`
  - `src/surfaces/routines/RoutinesSurface.tsx`
  - `src/surfaces/routines/routines-surface.css`

### GODUOIT #141 — [Visual Lab][Sessão] Referência STARKAH-foco v0.3 — gelo, descanso central e UX intuitiva

- **Objetivo/estado:** HTML Sessão v0.3 candidato.
- **Estratégia:** Arquivamento como histórico.
- **Aproveitamento e substituições:** Direção de exercício em foco/descanso substitui mídia.
- **Dependências, conflitos e regressões:** Nenhum asset STARKAH ou mídia sintética passa a ser aprovado por referência de composição.
- **Arquivos modificados contra a base real:**

  - `lab/references/session/goduoit-sessao-starkah-visual-v03.html`

### GODUOIT #142 — feat(visual-lab): implementar Sessão de Treino (#75) conectada ao CTA Começar treino da Home V3.5

- **Objetivo/estado:** Primeira Sessão React conectada à Home.
- **Estratégia:** Adaptação seletiva histórica.
- **Aproveitamento e substituições:** Tipos e testes podem esclarecer origem de #146.
- **Dependências, conflitos e regressões:** Head já é ancestral de #146/#148; não reaplicar a pilha inteira. Referência v0.3 candidata, não prova funcional.
- **Arquivos modificados contra a base real:**

  - `src/App.test.tsx`
  - `src/fixtures/training-session-demo.ts`
  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/training-session/TrainingSessionSurface.test.tsx`
  - `src/surfaces/training-session/TrainingSessionSurface.tsx`
  - `src/surfaces/training-session/training-session.css`

### GODUOIT #145 — research(exercise-media): piloto de fluidez e QA do acervo de GIFs #128

- **Objetivo/estado:** Pesquisa de mídia/GIF, sem produção.
- **Estratégia:** Arquivamento como histórico.
- **Aproveitamento e substituições:** Relato de interpolação óptica reprovada alerta sobre direitos/qualidade.
- **Dependências, conflitos e regressões:** Não publicar GIFs/MP4 do Drive; o piloto não comprova licença ou adequação biomecânica.
- **Arquivos modificados contra a base real:**

  - `tools/exercise-media/README.md`
  - `tools/exercise-media/inspect_gif.py`
  - `tools/exercise-media/interpolate_pilot.py`

### GODUOIT #146 — feat(visual-lab): reconciliar Rotinas (#74), Sessao de Treino (#75) e Home Treinos (#54)

- **Objetivo/estado:** Reconciliação Rotinas/Sessão/Home. Contém código das linhas #140/#142; não está na main.
- **Estratégia:** Adaptação seletiva.
- **Aproveitamento e substituições:** Aproveitar tipos, mapeamento treino→sessão, snapshots e regras válidas. Carrossel/hero V3.5 e Retomar lime não são a composição final V5.3. Home mantém demoRoutines próprio, enquanto RoutinesSurface mantém outra cópia: criação não alimenta Home por contrato compartilhado.
- **Dependências, conflitos e regressões:** Converge funcionalmente com #148 mas não contém seu head. Evitar aplicar ambas; reconciliar diffs de quatro arquivos e preservar a semântica de pausa/retomada. UI e dados da Home exigem adaptação.
- **Arquivos modificados contra a base real:**

  - `src/App.test.tsx`
  - `src/catalog/registry.ts`
  - `src/fixtures/routines-demo.ts`
  - `src/fixtures/training-session-demo.ts`
  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/home/home-shell.css`
  - `src/surfaces/routines/RoutinesSurface.test.tsx`
  - `src/surfaces/routines/RoutinesSurface.tsx`
  - `src/surfaces/routines/routines-surface.css`
  - `src/surfaces/training-session/TrainingSessionSurface.test.tsx`
  - `src/surfaces/training-session/TrainingSessionSurface.tsx`
  - `src/surfaces/training-session/training-session.css`

### GODUOIT #147 — [Perfil][Visual Lab] Versionar referência HTML candidata P0 v0.2 (#77)

- **Objetivo/estado:** HTML Perfil P0 v0.2 candidato.
- **Estratégia:** Arquivamento como histórico.
- **Aproveitamento e substituições:** Origem de composição dos cinco contextos preservados no goudduo.
- **Dependências, conflitos e regressões:** Não é master homologado da origem; referências N#22/#26 governam a evolução atual.
- **Arquivos modificados contra a base real:**

  - `lab/references/profile/goduoit-perfil-p0-v02.html`

### GODUOIT #148 — feat(session): V0.4 compacta, carrossel e pausa ao navegar (#75)

- **Objetivo/estado:** Sessão v0.4 empilhada sobre a branch de #146; base SHA f593e594 anterior ao head atual da #146.
- **Estratégia:** Adaptação seletiva.
- **Aproveitamento e substituições:** Há código de carrossel, mapa/reorder, snapshots e testes. Nenhum commit patch-equivalente entre as partes divergentes foi identificado por git log --cherry-mark; sem inferir equivalência funcional.
- **Dependências, conflitos e regressões:** A API informa comparação limpa contra sua base, mas as duas linhas divergem: 4 arquivos, 415 inserções/334 remoções no diff entre heads. Testes/build não executados segundo o próprio corpo; homologação de dispositivo pendente.
- **Arquivos modificados contra a base real:**

  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/training-session/TrainingSessionSurface.test.tsx`
  - `src/surfaces/training-session/TrainingSessionSurface.tsx`
  - `src/surfaces/training-session/training-session.css`

### GODUOIT #150 — docs(ux): referência V4 do carrossel de adicionar exercícios

- **Objetivo/estado:** Referência HTML V4 de adicionar exercícios.
- **Estratégia:** Arquivamento como histórico.
- **Aproveitamento e substituições:** Útil para proveniência de #151.
- **Dependências, conflitos e regressões:** V7.4 substitui escolhas de UX conflitantes; não implementar HTML V4 nem importar CSS global.
- **Arquivos modificados contra a base real:**

  - `lab/screens/routines/states/add-exercises/assets/add-exercises-carousel-v4-reference.html`

### GODUOIT #151 — feat(routines): implementar editor Adicionar exercicios V4 no Visual Lab

- **Objetivo/estado:** Editor V4: herda #146 e implementa campos, navegação e busca de exercícios.
- **Estratégia:** Adaptação seletiva.
- **Aproveitamento e substituições:** Aproveitar modelos, validação, ordenação e separação do catálogo. A busca no topo, o rodapé Salvar treino e a nomeação anterior não são o contrato final Motion V7.4.
- **Dependências, conflitos e regressões:** Não importar layout integral. V7.4 pede Adicionar exercício no rodapé, sheet 75%, check e nomeação ao final. #152 já contém seu head; #153/#154 são deltas adicionais.
- **Arquivos modificados contra a base real:**

  - `src/App.test.tsx`
  - `src/catalog/registry.ts`
  - `src/fixtures/routines-demo.ts`
  - `src/fixtures/training-session-demo.ts`
  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/home/home-shell.css`
  - `src/surfaces/routines/RoutinesSurface.test.tsx`
  - `src/surfaces/routines/RoutinesSurface.tsx`
  - `src/surfaces/routines/routines-surface.css`
  - `src/surfaces/training-session/TrainingSessionSurface.test.tsx`
  - `src/surfaces/training-session/TrainingSessionSurface.tsx`
  - `src/surfaces/training-session/training-session.css`

### GODUOIT #152 — feat(profile): integrar experiencia de Perfil ao HomeShell no Visual Lab (#77)

- **Objetivo/estado:** Perfil React integrado ao HomeShell; cinco contextos. Herda #151 e #146, embora a base formal seja main.
- **Estratégia:** Adaptação seletiva.
- **Aproveitamento e substituições:** ProfileSurface, profile-demo e callbacks fornecem estrutura reutilizável para próprio/visitado/pro/dupla. Delta goudduo R2 precisa ser portado por contrato, não por scripts aditivos do HTML.
- **Dependências, conflitos e regressões:** CONFLITO CONCRETO: o patch altera FEED_POSTS e acrescenta posts de Osman/Janderson/Ana/dupla. Essas fixtures extras não são autorizadas a substituir o Feed baseline: mantê-las só em cenário Lab. PR também modifica HomeShell/CSS, registry, Rotinas e Sessão; não é delta isolado de Perfil. Não contém #153/#154. Outro risco concreto: `getProfileByIdOrHandle` devolve o perfil próprio como fallback; Lia, autora do Feed baseline, não consta em ALL_DEMO_PROFILES. Preservar Feed exige reconciliar IDs e tratar ausente, nunca abrir outro perfil silenciosamente.
- **Arquivos modificados contra a base real:**

  - `src/App.test.tsx`
  - `src/catalog/registry.ts`
  - `src/fixtures/profile-demo.ts`
  - `src/fixtures/routines-demo.ts`
  - `src/fixtures/training-session-demo.ts`
  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/home/home-shell.css`
  - `src/surfaces/profile/ProfileSurface.test.tsx`
  - `src/surfaces/profile/ProfileSurface.tsx`
  - `src/surfaces/profile/profile-surface.css`
  - `src/surfaces/routines/RoutinesSurface.test.tsx`
  - `src/surfaces/routines/RoutinesSurface.tsx`
  - `src/surfaces/routines/routines-surface.css`
  - `src/surfaces/training-session/TrainingSessionSurface.test.tsx`
  - `src/surfaces/training-session/TrainingSessionSurface.tsx`
  - `src/surfaces/training-session/training-session.css`

### GODUOIT #153 — fix(routines): simplificar header da montagem sem botão + (#121)

- **Objetivo/estado:** Correção de header do editor sobre #151; oculta header compartilhado apenas em library e adiciona chevron/título.
- **Estratégia:** Adaptação seletiva.
- **Aproveitamento e substituições:** Aproveitar callback de estado do editor, isolamento do header e alvo de toque.
- **Dependências, conflitos e regressões:** Seu header tem contrapeso vazio e busca superior; V7.4 exige check e botão inferior. Não copiar layout superado; preservar retorno/rascunho e manter + fora do editor.
- **Arquivos modificados contra a base real:**

  - `src/surfaces/home/HomeShell.tsx`
  - `src/surfaces/routines/RoutinesSurface.test.tsx`
  - `src/surfaces/routines/RoutinesSurface.tsx`
  - `src/surfaces/routines/routines-surface.css`

### GODUOIT #154 — fix(ios): prevenir zoom de foco em campos touch abaixo de 16px

- **Objetivo/estado:** Correção CSS coarse pointer para inputs menores que 16px sobre #153.
- **Estratégia:** Adaptação seletiva.
- **Aproveitamento e substituições:** Aproveitar princípio e deltas mínimos, roteiro iOS e teste existente. Não reduzir campos já maiores.
- **Dependências, conflitos e regressões:** Afeta CSS global, approved, biblioteca e rotinas; exigir regressão Publicações/teclado. É independente da investigação #139. Próprio corpo não declara execução de testes/build/iPhone.
- **Arquivos modificados contra a base real:**

  - `lab/qa/ios-input-focus-zoom.md`
  - `src/approved/approved-app.css`
  - `src/ios-input-zoom.test.ts`
  - `src/styles.css`
  - `src/surfaces/exercise-library/exercise-library.css`
  - `src/surfaces/routines/routines-surface.css`

### GODUOIT #158 — docs(mvp): formalizar escopo mínimo, Progresso e homologação participativa (#156 #159)

- **Objetivo/estado:** Plano documental MVP/Progresso, Draft.
- **Estratégia:** Adaptação seletiva documental.
- **Aproveitamento e substituições:** Escopo de Progresso e relações úteis como inventário.
- **Dependências, conflitos e regressões:** Não transformar roadmap/MVP de backend em requisito de implementação do protótipo. Sequenciamento atual é #29.
- **Arquivos modificados contra a base real:**

  - `README.md`

### GODUOIT #161 — docs(ui): homologar Home Treinos V5.3 e direção visual futura para Rotinas

- **Objetivo/estado:** Handoff documental da Home V5.3.
- **Estratégia:** Reutilização direta como referência documental.
- **Aproveitamento e substituições:** O contrato é APROVADO como direção UI/UX, não código. O único arquivo alterado é handoff.
- **Dependências, conflitos e regressões:** Não contém HTML final V5.3 nem implementação. Preservar limites de #159 e alteração única transversal do chevron. Referências de marca/executor antigas cedem ao handoff atual.
- **Arquivos modificados contra a base real:**

  - `docs/handoffs/home-treinos-v5.3-direcao-ui-ux-homologada.md`

### goudduo #2 — docs(design-system): foundations, tokens, Do/Don't e gate obrigatório de IA

- **Objetivo/estado:** Processo/AGENTS/Design System/Figma v0.3 propostos, Draft.
- **Estratégia:** Adaptação seletiva documental.
- **Aproveitamento e substituições:** Princípios, Do/Don’t e status por token.
- **Dependências, conflitos e regressões:** Não integrado. TOKENS.json v0.1 difere da proposta v0.3 e aprovações locais; correção visual do Figma pendente segundo histórico, sem reinspeção P0. Não promover números globais por inferência.
- **Arquivos modificados contra a base real:**

  - `AGENTS.md`
  - `docs/design-system/AI-HANDOFF-GATE.md`
  - `docs/design-system/FIGMA-BENTO-V03.md`
  - `docs/design-system/FOUNDATIONS.md`
  - `docs/design-system/HOME-V53-SOURCE-AUDIT.md`
  - `docs/design-system/REFERENCE-LOGIN-EXTRACTION.json`
  - `docs/design-system/TOKENS.json`
  - `docs/process/REDESIGN-SUPERFICIES.md`

### goudduo #5 — feat(lab): versiona Splash V3 homologada e V4 com nova frase

- **Objetivo/estado:** Splash V3 aprovada + V4 candidata.
- **Estratégia:** Reimplementação orientada por contrato.
- **Aproveitamento e substituições:** V3 preserva composição; SVG oficial está na main.
- **Dependências, conflitos e regressões:** Base reportada main é atual, mas merge-base é 7df9f45; head não contém main atual. V4 não homologada; não publicar V3 com frase revogada. Raster offline não é asset de produção.
- **Arquivos modificados contra a base real:**

  - `docs/surfaces/SPLASH-V3-HOMOLOGADA.md`
  - `lab/screens/splash-screen/goudduo-splash-v3-homologada.html`
  - `lab/screens/splash-screen/goudduo-splash-v4-frase-parceiro-candidata.html`

### goudduo #8 — feat(lab): homologa Acesso Mobile V0.2 com 'Treine. Conecte-se. Viva.'

- **Objetivo/estado:** HTML Acesso V0.2 com copy homologada.
- **Estratégia:** Reimplementação orientada por contrato.
- **Aproveitamento e substituições:** Referência visual, erros/sessão expirada e navegação de laboratório.
- **Dependências, conflitos e regressões:** welcome/convidado não aprovam permissões. Google removido por decisão posterior N#9; não usar snapshot inteiro como regra atual.
- **Arquivos modificados contra a base real:**

  - `docs/surfaces/ACESSO-MOBILE-V02-HOMOLOGACAO.md`
  - `lab/screens/access-mobile/goudduo-acesso-mobile-v02-homologado-copy.html`

### goudduo #10 — docs(signup): Cadastro Mobile com quatro campos e regras de 18+ / @usuário

- **Objetivo/estado:** Cadastro documental, sem HTML.
- **Estratégia:** Adaptação seletiva documental.
- **Aproveitamento e substituições:** Regras de quatro campos e origem das decisões.
- **Dependências, conflitos e regressões:** N#11 contém o HTML homologado; não tratar duplicação documental como segundo contrato concorrente.
- **Arquivos modificados contra a base real:**

  - `docs/surfaces/CADASTRO-MOBILE-V03-PROPOSTA.md`

### goudduo #11 — feat(lab): Cadastro Mobile V0.3 com @, 18+ e e-mail/senha

- **Objetivo/estado:** Cadastro V0.3 homologado, empilhado sobre #8.
- **Estratégia:** Reimplementação orientada por contrato.
- **Aproveitamento e substituições:** Quatro campos, validação local e retorno.
- **Dependências, conflitos e regressões:** Sem cadastro/OTP reais; preservar #8 exceto retirada de provedores expressamente aprovada. QA multi-viewport histórico teve execução parcial.
- **Arquivos modificados contra a base real:**

  - `docs/surfaces/CADASTRO-MOBILE-V03-PROPOSTA.md`
  - `lab/screens/access-mobile/goudduo-acesso-mobile-v03-cadastro-proposta.html`

### goudduo #14 — feat(lab): OTP Mobile V0.4 — 6 dígitos, estados inline, reenvio 90 s

- **Objetivo/estado:** OTP V0.4 homologado, empilhado sobre #11.
- **Estratégia:** Reimplementação orientada por contrato.
- **Aproveitamento e substituições:** Entrada seis dígitos e sete feedbacks, cooldown e preservação de cadastro.
- **Dependências, conflitos e regressões:** Código/reenviar simulados; não transportar TTL/tentativas hipotéticos ou dependência do relógio cliente como segurança.
- **Arquivos modificados contra a base real:**

  - `docs/surfaces/OTP-MOBILE-V04-PROPOSTA.md`
  - `lab/screens/access-mobile/goudduo-acesso-mobile-v04-otp-proposta.html`

### goudduo #15 — docs(legal): Termos, Privacidade, LGPD e exclusão de dados — minutas v0.1

- **Objetivo/estado:** Minutas legais V0.1 homologadas editorialmente.
- **Estratégia:** Adaptação seletiva documental.
- **Aproveitamento e substituições:** Inventário de dados, direitos e gates operacionais.
- **Dependências, conflitos e regressões:** Não vigentes juridicamente nem autorizadas para cadastro real. Menção a Cloudflare/Supabase não homologa um backend contratado.
- **Arquivos modificados contra a base real:**

  - `docs/legal/GATE-LEGAL-UX-OPERACIONAL-V01.md`
  - `docs/legal/MATRIZ-DADOS-RETENCAO-V01.md`
  - `docs/legal/POLITICA-DE-PRIVACIDADE-V01.md`
  - `docs/legal/README.md`
  - `docs/legal/TERMOS-DE-USO-V01.md`

### goudduo #18 — feat(lab): leitor de Termos e área Seus Dados — UI v0.1 para avaliação

- **Objetivo/estado:** Leitor legal e Seus dados, homologados visualmente, sobre #15.
- **Estratégia:** Reimplementação orientada por contrato.
- **Aproveitamento e substituições:** Retorno sem perda de formulário, alternância de documentos e limites demonstrativos.
- **Dependências, conflitos e regressões:** Fetch depende de branch de minutas; resumo offline não é política integral. Fixar versão de demonstração; nenhuma exclusão real.
- **Arquivos modificados contra a base real:**

  - `docs/surfaces/LEITOR-LEGAL-PRIVACIDADE-V01-PROPOSTA.md`
  - `lab/screens/legal/goudduo-leitor-legal-privacidade-v01-proposta.html`

### goudduo #21 — feat(lab): onboarding V0.1 — apresentação de experiências sem formulário

- **Objetivo/estado:** Apresentação opcional de três cenas V0.1.
- **Estratégia:** Reimplementação orientada por contrato.
- **Aproveitamento e substituições:** Narrativa/gestos e desenho homologados.
- **Dependências, conflitos e regressões:** Não restaurar 29 telas. Placeholder conceitual não é imagem final; saída Home necessita confirmação no contrato da superfície.
- **Arquivos modificados contra a base real:**

  - `docs/surfaces/ONBOARDING-MOBILE-V01-PROPOSTA.md`
  - `lab/screens/onboarding/goudduo-onboarding-v01-proposta.html`

### goudduo #22 — feat(lab): Perfil V0.3-R2 homologado — Editar, Interesses e Conta profissional

- **Objetivo/estado:** Perfil incremental V0.1/V0.2/V0.3/R2 com motion.
- **Estratégia:** Reimplementação orientada por contrato + adaptação do React G#152.
- **Aproveitamento e substituições:** Referência R2 homologada em N#26 e doc G4 no head df69c080. Contextos de Perfil preservados.
- **Dependências, conflitos e regressões:** Corpo e comentários antigos ainda dizem R2 proposta; registro expresso de 11/11 em N#26 e documento G4 supersedem esse status somente no escopo aprovado. README da branch não deve sobrescrever main atual; não copiar scripts de interceptação do HTML.
- **Arquivos modificados contra a base real:**

  - `README.md`
  - `docs/design-system/MOTION-V01.md`
  - `docs/surfaces/PERFIL-P0-COMPLETE-DUPLAS-V02-PROPOSTA.md`
  - `docs/surfaces/PERFIL-P0-COMPLETE-DUPLAS-V03-HOMOLOGADO-COM-RESSALVAS.md`
  - `docs/surfaces/PERFIL-P0-COMPLETE-V01-PROPOSTA.md`
  - `docs/surfaces/PERFIL-P0-V03-R2-EDITAR-INTERESSES-PROFISSIONAL-PROPOSTA.md`
  - `lab/screens/profile/goudduo-perfil-p0-v01-complete-proposta.html`
  - `lab/screens/profile/goudduo-perfil-p0-v02-complete-duplas-proposta.html`
  - `lab/screens/profile/goudduo-perfil-p0-v03-homologado-ressalvas.html`
  - `lab/screens/profile/goudduo-perfil-p0-v03-r2-editar-interesses-profissional.html`

## Hotspots e plano de resolução (sem executar integração)

| Hotspot | Linhas concorrentes | Problema observado | Risco | Recomendação futura |
|---|---|---|---|---|
| HomeShell.tsx | G#146/#148/#151/#152/#153 | Navegação, sessão e Perfil no mesmo componente; estados locais; #152 altera Feed | Perder sessão, rascunho, retorno ou baseline Publicações | Isolar navegação/store primeiro; portar comportamentos por delta e testar Feed antes/depois |
| RoutinesSurface + CSS + testes | G#146/#151/#152/#153/#154 | Heranças cumulativas e UI V4 anterior ao V7.4 | Reintroduzir busca superior e salvamento antigo | Usar tipos/regras válidas; UI React orientada pelo contrato N#28 |
| TrainingSessionSurface + CSS/testes | G#146/#148/#151/#152 | Linhas divergentes, alterações funcionalmente semelhantes sem identidade de patches | Duplo handler, pausa ou cronômetro inconsistentes | Comparar cenários/testes das duas linhas, escolher comportamento por contrato, não arquivo mais recente |
| CSS global/styles/approved | G#154 e novos DS/motion | Regra touch global e tokens históricos | Zoom, clipping, reset de contraste ou Feed | Aplicar deltas mínimos; escopo por superfície e QA iPhone físico |
| README e governança | N#2/#22 versus main | Documentos de branch incluem estados intermediários | Reverter marca/processo ou homologar proposta | Não sobrescrever main por documentos herdados; registrar decisões incrementais em recorte próprio |
| Artefatos de referência | N#5/#8/#11/#14/#18/#21/#22 | HTMLs acumulam cópias das jornadas e scripts aditivos | Múltiplos shells e estado divergente | Implementar uma aplicação modular, referências imutáveis só para comparação |

Não foi usado `git merge`, `git cherry-pick`, `merge-tree`, rebase ou push em main. A auditoria usa log, diff, árvores e ancestralidade. **Conflitos potenciais de conteúdo** foram inferidos de sobreposição e diffs; não se afirma uma lista de conflitos de merge resolvida ou ensaiada. O estado GitHub de cada PR pode mudar após o snapshot.

## Alterações nunca integradas e descarte seguro

Todos os heads abertos acima são externos à main congelada. Fechar/arquivar PRs antigas exige decisão posterior; **nenhuma foi fechada**. G#140/#142 não devem ser aplicadas novamente ao usar um descendente. N#11/#14 e N#18 requerem revisão do delta contra a base empilhada, não apenas contra main. Branch de Rotinas tem head `1a0409f8b7d971f7883ec8d78fd88c0854868005`, mas o HTML homologado é fixado em `3f8b2c7c93a33a713c780305e672e1ec7998ceaf`; head de branch não substitui esse contrato.
