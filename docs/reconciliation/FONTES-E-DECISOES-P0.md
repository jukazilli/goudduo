# Fontes, congelamento e decisões — P0

Consulta em 12/11/2026 UTC. Handoff Mestre e missão P0 fornecidos pelo proprietário nesta conversa são instruções expressas: autorizam somente documentação, commit/branch e PR Draft; substituem o executor histórico e a indefinição antiga de stack. A Issue coordenadora é [goudduo #29](https://github.com/jukazilli/goudduo/issues/29), consultada com `updated_at=2026-11-12T02:20:06Z`.

## Preflight e método reproduzível

1. Clone autenticado de ambos os repositórios; árvores limpas no início. Consultas REST paginadas via GitHub CLI: Issues e PRs de todos os estados, branches, comentários de Issues e, para PRs abertas, detalhe, arquivos, comentários e reviews. Foram coletados 213 recursos adicionais de comentários/detalhe/arquivos/reviews; coleta bruta privada fica fora desta PR.
2. Leitura integral dos dois READMEs, AGENTS e GEMINI da origem; catálogo, tipos de navegação, App/ApprovedApp, HomeShell e trechos das superfícies/domínios relevantes nas branches. Consultados documentos das PRs de referência e histórias decisórias determinantes; não se alega leitura humana integral de cada comentário histórico coletado.
3. `git ls-tree`, `git show`, `git diff`, `git log --left-right --cherry-mark` e `git merge-base --is-ancestor` para congelar existência/ancestralidade. Nenhuma integração executada.
4. Toda referência de arquivo é vinculada a commit, não à branch mutável. Issues/comentários são editáveis: IDs, `updated_at` e hash do texto consultado abaixo delimitam o snapshot. O hash não cria imutabilidade no GitHub nem transfere autoridade do proprietário.
5. Não executados nesta P0: instalação de dependências de aplicação, build/typecheck/Vitest, QA funcional/visual/browser/Safari, backend, deployment. As verificações executadas são documentais/Git/estáticas.

## Estados das mains

| Repo | SHA main congelado | Conteúdo constatado |
|---|---|---|
| [GODUOIT](https://github.com/jukazilli/GODUOIT) privado | `c0936896240e525353b237d92dff31fe0211eb94` | Visual Lab React/TS/Vite; catálogo, Home/Publicações, Acesso, Onboarding, Biblioteca e assets |
| [goudduo](https://github.com/jukazilli/goudduo) público | `5fa1b70f6b860ee26e4c7fde222042a1da104099` | Cinco arquivos: README, duas wordmarks, Manifesto e Plataforma estratégica |

## Governança e regras de branch

- [AGENTS origem congelado](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/AGENTS.md): blob `869ef6ed109914f0efd3949c18511ff75caaad8b`. Mesmo blob nos heads G#138–#161 abertos consultados; exceção G#130: `23e8490d01c4fdacbc970a10f92ab282f8839f4f`, frente IA fora do escopo.
- [GEMINI histórico](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/GEMINI.md), `.agents/skills/dupplla-ui-governance/SKILL.md`, `.gemini/skills/mobile-safe-area/SKILL.md` e `.github/pull_request_template.md` consultados. As regras técnicas de safe area, zoom acessível, estados/QA e fidelidade seguem pertinentes; marca antiga e executor Gemini não substituem o handoff atual. Skill antiga menciona hover; instrução móvel mais específica proíbe hover em touchscreen.
- A main goudduo não tem AGENTS/CONTRIBUTING/template próprio. [AGENTS proposto N#2](https://github.com/jukazilli/goudduo/blob/aed33fcca6c7579f7672b8b29a60cd238aed3be7/AGENTS.md) blob `769e76ed63ac983c6322e05cd72188a3ad56d020`; não integrado nas demais PRs. Lidos também FOUNDATIONS, AI-HANDOFF-GATE, FIGMA-BENTO-V03, proposta TOKENS e processo dessa branch; são contexto com status de proposta, não baseline automaticamente vigente.
- Pacote em `docs/reconciliation/` é explicitamente solicitado em #29, não manifesto paralelo de tela. Decisões canônicas permanecem nas Issues; esta PR não altera README institucional nem promove estudos.

## Evidências determinantes de decisão

| Tema | Registro | Leitura vigente |
|---|---|---|
| Marca atual | [README congelado](https://github.com/jukazilli/goudduo/blob/5fa1b70f6b860ee26e4c7fde222042a1da104099/README.md), [PR #4](https://github.com/jukazilli/goudduo/pull/4) merged | APROVADO: o goudduo, minúsculas, Seu parceiro na vida real.; feminino/frase antiga SUBSTITUÍDOS |
| Splash | [N#1](https://github.com/jukazilli/goudduo/issues/1), [PR #5](https://github.com/jukazilli/goudduo/pull/5) | V3 visual APROVADA; texto antigo SUBSTITUÍDO; aplicação V4 PENDENTE |
| Acesso | [N#6 comentário 6769109528](https://github.com/jukazilli/goudduo/issues/6#issuecomment-6769109528) | APROVADO local: Treine. Conecte-se. Viva.; convidado sem contrato de permissões |
| Cadastro | [N#9 comentário 6770469178](https://github.com/jukazilli/goudduo/issues/9#issuecomment-6770469178) e corpo | APROVADO quatro campos/sem Google, visual V0.3; cadastro servidor pendente |
| Handle/idade | [G#19 6514059752](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6514059752), [6514339870](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6514339870), [G#20 6538545870](https://github.com/jukazilli/GODUOIT/issues/20#issuecomment-6538545870) | APROVADO: 18+, @3–24, normalização, unicidade servidor, mudança 30 dias; sem prova de implementação |
| OTP | [N#13](https://github.com/jukazilli/goudduo/issues/13), [G#26 feedbacks 6545735968](https://github.com/jukazilli/GODUOIT/issues/26#issuecomment-6545735968) | APROVADO visual V0.4 e feedbacks; seis dígitos/90s; TTL/tentativas ESTUDO |
| Recuperação | [G#25](https://github.com/jukazilli/GODUOIT/issues/25) e reconciliação [N#6 6768345579](https://github.com/jukazilli/goudduo/issues/6#issuecomment-6768345579) | OTP permanece; CTA posterior Continuar diverge de Enviar código no README/código |
| Legal | [N#12](https://github.com/jukazilli/goudduo/issues/12), [N#16](https://github.com/jukazilli/goudduo/issues/16), [N#17](https://github.com/jukazilli/goudduo/issues/17) | APROVADO editorial/UI; revisão jurídica/operacional PENDENTE; minutas não vigentes |
| Onboarding | [N#19](https://github.com/jukazilli/goudduo/issues/19), [PR #21](https://github.com/jukazilli/goudduo/pull/21) | APROVADO referência três cenas opcionais; assets reais WebP e destino final pendentes |
| Home | [G#54 6756524720](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720), [refinamento 6756663557](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756663557) | DIREÇÃO V5.3 APROVADA; não aprova todos widgets |
| Progresso | [G#159 6756662990](https://github.com/jukazilli/GODUOIT/issues/159#issuecomment-6756662990), [G#156 6751210358](https://github.com/jukazilli/GODUOIT/issues/156#issuecomment-6751210358) | Escopo mínimo APROVADO; UI/regras pendentes; sequência atual #29 governa P0 |
| Shell | [G#72 6566854507](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6566854507), [6747090000](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6747090000) | APROVADO cinco destinos e menu Criar; implementação/QA separados |
| Publicações | [G#55 6538513392](https://github.com/jukazilli/GODUOIT/issues/55#issuecomment-6538513392), [recuperação 6551942019](https://github.com/jukazilli/GODUOIT/issues/55#issuecomment-6551942019) e main efetiva | Contrato preservado; PNG recuperado existe na main apesar do comentário histórico dizer pendente |
| Rotinas | [N#28](https://github.com/jukazilli/goudduo/issues/28), [HTML 3f8b2c7](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html) | V7.4 APROVADA UX/UI; descoberta de navegação ESTUDO; React/integrado/testado ainda não |
| Sessão | [G#75 6726891810](https://github.com/jukazilli/GODUOIT/issues/75#issuecomment-6726891810), [6727371044](https://github.com/jukazilli/GODUOIT/issues/75#issuecomment-6727371044) | Direção/código candidato; pronto para main no relato não é integrado nem homologado |
| Perfil | [N#20](https://github.com/jukazilli/goudduo/issues/20), [N#26 termo de 11/11](https://github.com/jukazilli/goudduo/issues/26), documento G4 N#22 | R2 APROVADA no escopo descrito; comentários de 10/11 ainda dizem proposta; não atribuir aprovação a esses comentários antigos |
| Duplas/profissional | [N#23](https://github.com/jukazilli/goudduo/issues/23), [N#24](https://github.com/jukazilli/goudduo/issues/24), [N#27](https://github.com/jukazilli/goudduo/issues/27) | Múltiplos pares/aceite/dissolução DIREÇÃO; verificação e central reais PENDENTES |
| Motion | [N#25 6785114875](https://github.com/jukazilli/goudduo/issues/25#issuecomment-6785114875) | DIREÇÃO APROVADA; ~300/310ms e reduce; implementação global PENDENTE |
| Tokens | [N#7 6768138206](https://github.com/jukazilli/goudduo/issues/7#issuecomment-6768138206) | v0.1/v0.3 globais ainda PROPOSTA/ESTUDO; azul local aprovado por telas não homologa tudo |

## Referências de arquivos verificadas em commits

Git blob identifica conteúdo; SHA-256 é calculado sobre os bytes do arquivo. Não prova homologação, licença ou paridade visual. Os HTMLs abaixo são referências, não código transplantável. O PNG recuperado de Publicações tem hash diferente do master originalmente registrado; não se alega equivalência binária.

| Repo | Commit | Caminho | Git blob | SHA-256 | Natureza |
|---|---|---|---|---|---|
| goudduo | `5fa1b70f6b860ee26e4c7fde222042a1da104099` | [`assets/brand/goudduo/goudduo-wordmark-black.svg`](https://github.com/jukazilli/goudduo/blob/5fa1b70f6b860ee26e4c7fde222042a1da104099/assets/brand/goudduo/goudduo-wordmark-black.svg) | `04276a5ac2a927294f48e7fec2c2281754ad75c3` | `7dd6a7948ab63a5b776e3adc4c22137752cb941c1fd67df1f00a2f173d58ee47` | SVG oficial |
| goudduo | `5fa1b70f6b860ee26e4c7fde222042a1da104099` | [`assets/brand/goudduo/goudduo-wordmark-white.svg`](https://github.com/jukazilli/goudduo/blob/5fa1b70f6b860ee26e4c7fde222042a1da104099/assets/brand/goudduo/goudduo-wordmark-white.svg) | `7a07c1ec6c42f16ec7b536f93b7e60049228168f` | `e116f73cbd5f799a5058560d85a13c7faa68df6ff29a097563e8bb5cc59c0bb5` | SVG oficial |
| GODUOIT | `c0936896240e525353b237d92dff31fe0211eb94` | [`lab/evidence/approved/home-publicacoes-v1/home_publicacoes_v1_aprovada.png`](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/lab/evidence/approved/home-publicacoes-v1/home_publicacoes_v1_aprovada.png) | `b907d8e43cdc403d265ac190fea95cb9de2a6c8c` | `a7efa9b9663066313d27740812db695546ec8a5623c30aec56cce916e7ce22bf` | PNG recuperado; não declarar idêntico ao master histórico |
| GODUOIT | `abfd989fb1b3e87d617dfd93c0527554b2e283b2` | [`docs/handoffs/home-treinos-v5.3-direcao-ui-ux-homologada.md`](https://github.com/jukazilli/GODUOIT/blob/abfd989fb1b3e87d617dfd93c0527554b2e283b2/docs/handoffs/home-treinos-v5.3-direcao-ui-ux-homologada.md) | `a420a60e80d9c1c8ecfb056f0077eeb5b39ec26d` | `a577eee4d79500f3010f1e559144fe84c6c1b946741cc07d2d0194b51f691534` | Handoff documental; HTML exato ausente |
| goudduo | `3f8b2c7c93a33a713c780305e672e1ec7998ceaf` | [`prototypes/rotinas/motion-v7-4/index.html`](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html) | `122275b3cb03bd996b477375d1bbc73ae29c5c3e` | `42ac581d3c76a3852da221ba68495025bbfa26f2d96aeda9c43ba0261a5a849d` | HTML UX/UI homologado |
| goudduo | `94f304e46c21e039dc58ab67e5596eef97765301` | [`lab/screens/splash-screen/goudduo-splash-v3-homologada.html`](https://github.com/jukazilli/goudduo/blob/94f304e46c21e039dc58ab67e5596eef97765301/lab/screens/splash-screen/goudduo-splash-v3-homologada.html) | `bf3fe142177b617fc1cf28866aa8843f4309fb3e` | `699034cb1278c5821ea047cea21ba6f9e34d0f4a29b5166920321e65422ddc35` | HTML de referência; status por superfície |
| goudduo | `94f304e46c21e039dc58ab67e5596eef97765301` | [`lab/screens/splash-screen/goudduo-splash-v4-frase-parceiro-candidata.html`](https://github.com/jukazilli/goudduo/blob/94f304e46c21e039dc58ab67e5596eef97765301/lab/screens/splash-screen/goudduo-splash-v4-frase-parceiro-candidata.html) | `92c719a51bf762c633eb744b374553a194012119` | `d678ec58780f7e60d5e5def2ec5a9a48391b1d619c7ce4f10864ead9a275b40f` | HTML de referência; status por superfície |
| goudduo | `8eee298ac3a9d2a681c8251fb5db4696feac4b9a` | [`lab/screens/access-mobile/goudduo-acesso-mobile-v02-homologado-copy.html`](https://github.com/jukazilli/goudduo/blob/8eee298ac3a9d2a681c8251fb5db4696feac4b9a/lab/screens/access-mobile/goudduo-acesso-mobile-v02-homologado-copy.html) | `59092151685200b2bdf33939c944cd8685d152e3` | `e409591ee470e3b6e8316ac23a273e88268a2f04d4c9e01b32377668e833ce19` | HTML de referência; status por superfície |
| goudduo | `90e0327dbd7089afb83a8d91315c324120c8d22b` | [`lab/screens/access-mobile/goudduo-acesso-mobile-v03-cadastro-proposta.html`](https://github.com/jukazilli/goudduo/blob/90e0327dbd7089afb83a8d91315c324120c8d22b/lab/screens/access-mobile/goudduo-acesso-mobile-v03-cadastro-proposta.html) | `cb9c856432481f28be56e843aeee5ffe840a78dd` | `a757462025168a76a2df5fe32a527d921a32ca07a4debfd57d1d28c466767bfc` | HTML de referência; status por superfície |
| goudduo | `12dd98f8b1b51f2085efd3bc1d954f03128b42e8` | [`lab/screens/access-mobile/goudduo-acesso-mobile-v04-otp-proposta.html`](https://github.com/jukazilli/goudduo/blob/12dd98f8b1b51f2085efd3bc1d954f03128b42e8/lab/screens/access-mobile/goudduo-acesso-mobile-v04-otp-proposta.html) | `2e4da117a6b7e48a2eb5c04cc08a0cf80a5e8ca4` | `dee9b7fe409c2fc53b497d6fe60e62d3af78b375f7c0ebb09ad269707a6c3735` | HTML de referência; status por superfície |
| goudduo | `c7c2e6cec7a7b802799ab91af175a75fec19fd82` | [`lab/screens/legal/goudduo-leitor-legal-privacidade-v01-proposta.html`](https://github.com/jukazilli/goudduo/blob/c7c2e6cec7a7b802799ab91af175a75fec19fd82/lab/screens/legal/goudduo-leitor-legal-privacidade-v01-proposta.html) | `d04c8e8ae78124a2fab546d0f56ab33172b51a12` | `5eea6dcb213fe8fee2407953126961fd1ccd070f4dc87e0712f95a62e6dea947` | HTML de referência; status por superfície |
| goudduo | `4ebef98b06b4db723ff98cb1881fc08aba114a90` | [`lab/screens/onboarding/goudduo-onboarding-v01-proposta.html`](https://github.com/jukazilli/goudduo/blob/4ebef98b06b4db723ff98cb1881fc08aba114a90/lab/screens/onboarding/goudduo-onboarding-v01-proposta.html) | `446b8cc53188e48ac88816864772ae94ea2565bf` | `5f16ca4e72ebd2f50b04d09a936ef5a558375ad2c634fa51881e152f0e4cc507` | HTML de referência; status por superfície |
| goudduo | `df69c0809c425e2fe910913f16ec0a210d672229` | [`lab/screens/profile/goudduo-perfil-p0-v03-r2-editar-interesses-profissional.html`](https://github.com/jukazilli/goudduo/blob/df69c0809c425e2fe910913f16ec0a210d672229/lab/screens/profile/goudduo-perfil-p0-v03-r2-editar-interesses-profissional.html) | `d77571fbd61c426c94fd83e9cfbb8018caba960e` | `64e6bad77fca9be2a84d8c0df1547417ebf27ec57e5cc18ed0c9f0d5de3acefb` | HTML de referência; status por superfície |

## Branches consultadas (nome e head real)

Todas as branches remotas foram listadas; a análise técnica concentrou-se nas PRs acima e preview de Rotinas. Não se auditou código integral de cada branch histórica sem vínculo com a missão.

| Repo | Branch | SHA |
|---|---|---|
| GODUOIT | `brand/goduoit-rota-a-proposta` | `91ea056df4bba88fd5e61c0b52bf2e427f6d8539` |
| GODUOIT | `design/perfil-html-p0-v02-20261108` | `faa2276ecb56d6aaf6a3dd90d082c0693973bf02` |
| GODUOIT | `design/routines-add-exercises-carousel-v4-20261108` | `37d7d131595e8842992c7b54509e80461e31f4fc` |
| GODUOIT | `design/session-starkah-composition-v03-20261107` | `846338eab5278a636f222d1bb09f512c0e4bd5c3` |
| GODUOIT | `docs/formalizacao-marca-goduoit-fase-1` | `c5abd77ca8b8dd06588abc4b49b9d1891e1b296c` |
| GODUOIT | `docs/gemini-visual-master-gate-20261031` | `f44582a21172c839c65a937cf60428158d28854b` |
| GODUOIT | `docs/goduoit-header-qa` | `29024a593bf0aa664167407c83a21bb1cfc0f767` |
| GODUOIT | `docs/goduoit-technical-handoff` | `b9d443f044cf8607d8294a25d9a528842debede4` |
| GODUOIT | `docs/home-treinos-v53-ui-ux-homologada-20261109` | `abfd989fb1b3e87d617dfd93c0527554b2e283b2` |
| GODUOIT | `docs/mvp-visual-lab-governanca-20261109` | `04f725c77e8ed833aedb06dae396644fc93f6669` |
| GODUOIT | `docs/qa-demonstrativo-auditoria-fase-5-20261102` | `ea49df0e9d01efda9c4fb707348c5e47a2db6a74` |
| GODUOIT | `docs/reconcile-approved-brand-20261101` | `17f31b8e3765f9f0e09755a86ca5489ad3c326e9` |
| GODUOIT | `docs/restore-approved-home-masters-20261031` | `2274c7842ef38b83c8f7ea6c0e9363c148af618f` |
| GODUOIT | `docs/visual-lab-fase-0-auditoria-20261102` | `65c26b829b8e9ecab7fe844b85330db9cfd08fed` |
| GODUOIT | `docs/visual-references-access-20261101` | `f5b4181fdd80e745586af37db0fb14a5d400fad8` |
| GODUOIT | `docs/visual-references-splash-20261101` | `0b681a205fe6696f22c8443378d66063764c3c37` |
| GODUOIT | `feat/brand-identity-registry` | `d3cf1b02a383161071197bdac71afad9dbd70e69` |
| GODUOIT | `feat/goduoit-home-header` | `daa4c3f299690c73f22e0520fb4b6bcfc8cfbfcb` |
| GODUOIT | `feat/goduoit-login-candidate` | `13a7cd3f3ecdf48ec5b83e1e53fbc9639a721ac4` |
| GODUOIT | `feat/goduoit-primary-brand-adoption` | `73d6c92c45b6fd064f9a71615c921f4b9677353a` |
| GODUOIT | `feat/goduoit-splash-candidate` | `0f6ef65247b0b48fe564bc202fd3945c9deba77f` |
| GODUOIT | `feat/goduoit-web-preview` | `d8f21b6dee841fdd91c98e002763f47a5055e783` |
| GODUOIT | `feat/gooduu-ai-submodule` | `6d3ad4867ed28f9d6efb0d21a9e449641e315a6c` |
| GODUOIT | `feat/home-create-menu-routines-lucide-76-127-121` | `588bfda4416a9d73c72f3bc791e7c9d4bab2719d` |
| GODUOIT | `feat/profile-surface-homeshell` | `69833d2110671a5380a6b8b873c6712681bf57c1` |
| GODUOIT | `feat/pulse-exclusivo-publicacoes` | `102390b71c9e3a27d446b64112183d574a12c6b3` |
| GODUOIT | `feat/rotinas-goduoit` | `aff5ed57f0e415b995d7f90bf72cc7c985cf17c3` |
| GODUOIT | `feat/routines-add-exercises-v4` | `2b8890929bb8c04c2539965af5379869b82dd13b` |
| GODUOIT | `feat/routines-editor-v5` | `6eb16edb640daadf445397ce03b5f44f01990df6` |
| GODUOIT | `feat/sessao-v04-densidade-carrossel-navegacao` | `b09820f5dc38ad0e43c49fdf560a15b477f3f7f2` |
| GODUOIT | `feat/session-ux-carousel-autopause-20261108` | `3456074fa34d2efc79662c9ddc0137f9feba5cbd` |
| GODUOIT | `feat/visual-lab-biblioteca-exercicios` | `8c1ea67cb4c1aa03160d370fa1427676edef15ef` |
| GODUOIT | `feat/visual-lab-flow-connection-20261102` | `584c74dc702c35e71486ab1b4ad89d3d649f0bbe` |
| GODUOIT | `feat/visual-lab-modo-debug` | `01e6045673f6f43e309c7eae8f7ca539ecfd993b` |
| GODUOIT | `feat/visual-lab-reconciliacao-rotinas-sessao-home` | `3456074fa34d2efc79662c9ddc0137f9feba5cbd` |
| GODUOIT | `feat/visual-lab-rotinas-r0-01j` | `d9b34db249f4a1ef1f9a1dc312f9af2103b71d69` |
| GODUOIT | `feat/visual-lab-sessao-treino-75` | `8f00045eabfa9e1c2a33e66619b3c7bba3bb4c29` |
| GODUOIT | `feat/visual-lab-shell-navigation-20261102` | `ce706462a1f1f46e14a3a915eea3e8ce2e75ab8b` |
| GODUOIT | `feat/visual-lab-workbench-20261101` | `921bc0522ca401dedef84206d29d827792dcc753` |
| GODUOIT | `fix/exercise-library-detail-regression` | `68f2769abdf41d9ba5e034fbb535a08992142b7f` |
| GODUOIT | `fix/ios-input-focus-zoom-20261109` | `08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38` |
| GODUOIT | `fix/ios-input-focus-zoom-reconciliation` | `468b17dde93c3305f865f390a8240b6cf2284d5b` |
| GODUOIT | `fix/routines-composer-header-simplified-20261109` | `0308e2c4f667e35497d254f24e78d18208272b96` |
| GODUOIT | `fix/visual-lab-barra-inferior-ios` | `24230112bb3094f38c2f14e2b2ef598e585b2bcb` |
| GODUOIT | `fix/visual-lab-calibration-pr-a-20261102` | `5db13ac6dcfa86f1930519cd3ecb4e56efb33dff` |
| GODUOIT | `fix/visual-lab-home-fidelity` | `51d89c5da01b99915c0f97ecb5f5630ab079068a` |
| GODUOIT | `fix/visual-lab-isolar-modo-debug` | `a60e83c6fa58bbd0c5f495797957241e0186cd55` |
| GODUOIT | `fix/visual-lab-viewport-calibration` | `1c26a2081d3667aee2763c6ebc0726df74c66a10` |
| GODUOIT | `integration/goduoit-motion-reconciliation` | `6b0e23d4fe3d2e8cf21afa1b66558ede85f5134a` |
| GODUOIT | `main` | `c0936896240e525353b237d92dff31fe0211eb94` |
| GODUOIT | `reconcile/pr-153-routines-composer-header` | `c5f7ca6c8cab5e7b72891f38b8f3974b79745570` |
| GODUOIT | `research/exercise-gif-fps-pilot-20261108` | `4934ebc55fc2a1ae90dd8cc5aa60565d2801b2b4` |
| GODUOIT | `upload-png` | `0dd6e3c570a8512356167015cd8322c81bc850b7` |
| GODUOIT | `visual-lab/rotinas-referencia-r0-01j-20261107` | `d64a1ec548d7d1cd4513ee75c737aea057b067f3` |
| goudduo | `docs/brand-parceiro-masculino-20261110` | `9e4a048b8689227ef50d5a8bf2e5e7ecbcff349f` |
| goudduo | `docs/cadastro-mobile-v03-proposta-20261110` | `fc26a8ec37a47449a25e67db3b1c25f812e4657f` |
| goudduo | `docs/homologacao-identidade-manifesto-20261110` | `6da7e8ba396fc1980cfe606d9170a339b37058e0` |
| goudduo | `docs/legal-privacy-terms-v01-20261110` | `df900f2018aa78552ab404f7064453c1cff09106` |
| goudduo | `docs/processo-redesign-superficies-20261110` | `aed33fcca6c7579f7672b8b29a60cd238aed3be7` |
| goudduo | `docs/splash-v3-homologada-20261110` | `94f304e46c21e039dc58ab67e5596eef97765301` |
| goudduo | `lab/acesso-mobile-v02-homologacao-20261110` | `8eee298ac3a9d2a681c8251fb5db4696feac4b9a` |
| goudduo | `lab/cadastro-mobile-v03-proposta-20261110` | `90e0327dbd7089afb83a8d91315c324120c8d22b` |
| goudduo | `lab/legal-reader-privacy-v01-proposta-20261110` | `c7c2e6cec7a7b802799ab91af175a75fec19fd82` |
| goudduo | `lab/onboarding-v01-proposta-20261110` | `4ebef98b06b4db723ff98cb1881fc08aba114a90` |
| goudduo | `lab/otp-mobile-v04-proposta-20261110` | `12dd98f8b1b51f2085efd3bc1d954f03128b42e8` |
| goudduo | `lab/perfil-complete-v01-proposta-20261110` | `df69c0809c425e2fe910913f16ec0a210d672229` |
| goudduo | `main` | `5fa1b70f6b860ee26e4c7fde222042a1da104099` |
| goudduo | `preview/rotinas-motion-v7` | `1a0409f8b7d971f7883ec8d78fd88c0854868005` |

## Snapshot das Issues determinantes

Hashes dos corpos consultados (UTF-8), não uma transcrição privada. Comentários determinantes estão linkados acima; textos históricos coletados não são publicados.

| Repo / Issue | Estado | updated_at | SHA-256 corpo |
|---|---|---|---|
| [GODUOIT #15](https://github.com/jukazilli/GODUOIT/issues/15) | open | 2026-11-01T18:13:00Z | `014430a2afafc0f9a6ddb484d63edbfb87da2d466238eee69de5dd2a159eb994` |
| [GODUOIT #19](https://github.com/jukazilli/GODUOIT/issues/19) | closed | 2026-11-01T18:13:02Z | `8e1af423bdd06c7df604560640bd78a56e547a7a82299061afb323cefc533366` |
| [GODUOIT #20](https://github.com/jukazilli/GODUOIT/issues/20) | closed | 2026-11-01T04:43:36Z | `5e32eb1ed344286cb67472a6c8722bb77f116a3984176d52ab7be5548fb6ae0b` |
| [GODUOIT #21](https://github.com/jukazilli/GODUOIT/issues/21) | closed | 2026-11-01T18:13:04Z | `f1a8d9f8bdb4e0651b47ac8e973b503d447256eac314d78491c91c5e59f83068` |
| [GODUOIT #22](https://github.com/jukazilli/GODUOIT/issues/22) | closed | 2026-11-01T04:43:40Z | `f1beb8f580e1f332e93c37054c8c38e241dbea32ab6420f941a9b19393ce33df` |
| [GODUOIT #25](https://github.com/jukazilli/GODUOIT/issues/25) | closed | 2026-11-01T18:13:08Z | `07d2516ca2967dbb20533a7c05f6da76342c77e0b178ea7a7bb173694d4abfed` |
| [GODUOIT #26](https://github.com/jukazilli/GODUOIT/issues/26) | closed | 2026-11-01T04:43:42Z | `ac2acc609afe17d2b87ecc815c7320ea1fded863491fe5ce5a29f9dba7207d65` |
| [GODUOIT #27](https://github.com/jukazilli/GODUOIT/issues/27) | closed | 2026-11-01T18:13:06Z | `b6b06533328eda66e9b15db9d01fdebb0d50e199a5a5060d75619027be3124f8` |
| [GODUOIT #28](https://github.com/jukazilli/GODUOIT/issues/28) | closed | 2026-11-01T04:43:47Z | `1c6e2ddf62523924a6f4dbf0523bc4546f101b3b3802ce8b70e6a7d1a859da4d` |
| [GODUOIT #31](https://github.com/jukazilli/GODUOIT/issues/31) | closed | 2026-11-01T04:43:48Z | `33cb3df4c19058559a846d5713f4dc8de6eabed677535446971ee86d63c01b4f` |
| [GODUOIT #54](https://github.com/jukazilli/GODUOIT/issues/54) | closed | 2026-11-10T01:51:41Z | `0d3129aac83bdf482193c7cb8c3c97276f003423e72b14ced1219a788804142d` |
| [GODUOIT #55](https://github.com/jukazilli/GODUOIT/issues/55) | closed | 2026-11-01T18:13:12Z | `c29d19d1712b9801949db9ccbcafe453c4e077f58ff6365da7659b871fc65023` |
| [GODUOIT #72](https://github.com/jukazilli/GODUOIT/issues/72) | open | 2026-11-10T01:44:45Z | `9411e591d3a174018a168b6cb2dc5fbef2cb717741be694c13638248f08a1303` |
| [GODUOIT #73](https://github.com/jukazilli/GODUOIT/issues/73) | open | 2026-11-09T17:41:33Z | `8d335b71911f06722f224824c72c264ada6ea998244efb55d701f27138af8a5a` |
| [GODUOIT #74](https://github.com/jukazilli/GODUOIT/issues/74) | open | 2026-11-09T17:41:37Z | `4105b11eec490fd3e340bbbc5bbded0a00b9bff0a188ef49fbd74366facd3337` |
| [GODUOIT #75](https://github.com/jukazilli/GODUOIT/issues/75) | open | 2026-11-09T20:57:23Z | `83a78ee19c26f1d7bb309eb627943093da51af65a6921d2fce723c8be990fed7` |
| [GODUOIT #76](https://github.com/jukazilli/GODUOIT/issues/76) | open | 2026-11-09T17:41:25Z | `70456f89650b26f04b3e2ae7a145f99700b143de660610a18be695ebf610f292` |
| [GODUOIT #77](https://github.com/jukazilli/GODUOIT/issues/77) | open | 2026-11-09T20:57:21Z | `ddf8f05ed599907fdd64d096e580796bf26ca798ac74a1d5cd363c1c731614f8` |
| [GODUOIT #78](https://github.com/jukazilli/GODUOIT/issues/78) | open | 2026-11-01T22:25:41Z | `aa9919fc6dc5fdb5584dde53c7e12aa8b7e57ab5a603bbe815ca710ee365891f` |
| [GODUOIT #79](https://github.com/jukazilli/GODUOIT/issues/79) | open | 2026-11-02T18:16:54Z | `b8736a0072d21fc4b1e497270956053114862f8dd371978ac9f7da5bebe13d57` |
| [GODUOIT #80](https://github.com/jukazilli/GODUOIT/issues/80) | open | 2026-11-02T18:16:51Z | `5f1360ceb540dbcbac529ce4cb2f3daf2e01db62135c2743e00e2cd1a5e07f9c` |
| [GODUOIT #81](https://github.com/jukazilli/GODUOIT/issues/81) | open | 2026-11-08T03:28:12Z | `6f063117866ab2520892a06f31fa7925b2deb41a6460d5e076adf209d5270d23` |
| [GODUOIT #83](https://github.com/jukazilli/GODUOIT/issues/83) | open | 2026-11-03T00:35:41Z | `5032f42720c7ba188cdab00d0384fa8b5f88b758b71d1f7f120767cadbed83e8` |
| [GODUOIT #84](https://github.com/jukazilli/GODUOIT/issues/84) | open | 2026-11-08T04:51:43Z | `dbe16910e1e6929acfec2c2129d97eb1a713add9f331eeba09bdfeb6a7b88d9a` |
| [GODUOIT #90](https://github.com/jukazilli/GODUOIT/issues/90) | open | 2026-11-08T15:33:01Z | `640d44fe906b29a4979d492d7dac0157983590c6bca139d3ed966b47c75091e6` |
| [GODUOIT #120](https://github.com/jukazilli/GODUOIT/issues/120) | open | 2026-11-07T23:42:01Z | `67eef4c073de1cb092ea9759782833df368f4f8c52a0241f9229fcdac6debd17` |
| [GODUOIT #121](https://github.com/jukazilli/GODUOIT/issues/121) | open | 2026-11-10T01:44:41Z | `3bc3a1c7bca3992ca01793158234ad72ee814ba9582cb98391a00098edc42c0a` |
| [GODUOIT #124](https://github.com/jukazilli/GODUOIT/issues/124) | open | 2026-11-06T20:09:59Z | `aee13bd806059d61507f3ab7fa0871502455483d64153db826822a1a61372313` |
| [GODUOIT #125](https://github.com/jukazilli/GODUOIT/issues/125) | open | 2026-11-07T20:50:07Z | `39e0399cf18687e497951eea1fb55b42afc5db6e4060e0df44e58da436454bef` |
| [GODUOIT #126](https://github.com/jukazilli/GODUOIT/issues/126) | open | 2026-11-06T20:10:08Z | `7b904fb1378aba146dd9e54a6aadbd2dcc2d47c1780596c5684cdb304e20f04a` |
| [GODUOIT #127](https://github.com/jukazilli/GODUOIT/issues/127) | open | 2026-11-09T17:41:27Z | `8841568a768abbd5b2d19afd8ebdbba234c1e25923c0a7542c89d816ab87d2ce` |
| [GODUOIT #128](https://github.com/jukazilli/GODUOIT/issues/128) | open | 2026-11-08T22:11:26Z | `d62c633c10dc1614ded535c996359c78f1c7fa54fbb8fdc776dd1bddce67dc9c` |
| [GODUOIT #131](https://github.com/jukazilli/GODUOIT/issues/131) | open | 2026-11-06T20:10:11Z | `52974923f60a1dd80c663dcd31a9681772ae382a33804f7211657fd8c8c21743` |
| [GODUOIT #133](https://github.com/jukazilli/GODUOIT/issues/133) | open | 2026-11-06T20:08:03Z | `5b543bd8d29a5f3b3e62e76832f8e8686085f6e0a820be510182d1e7a629ef26` |
| [GODUOIT #143](https://github.com/jukazilli/GODUOIT/issues/143) | open | 2026-11-09T20:57:09Z | `f1044493b6ac418a11b6df077a3050d78bb4b31b60d2dac6e0d6f63abeb673c3` |
| [GODUOIT #144](https://github.com/jukazilli/GODUOIT/issues/144) | open | 2026-11-08T15:32:55Z | `c08c729f26a42c20c53ff71b30952f9adc4bdb9ebb18ab9e67f3600d85260ae2` |
| [GODUOIT #156](https://github.com/jukazilli/GODUOIT/issues/156) | open | 2026-11-10T01:52:00Z | `92f86890e70081aef5afe219d42bc20c8239c6c822c6a2a59a1da5ddc57239f2` |
| [GODUOIT #157](https://github.com/jukazilli/GODUOIT/issues/157) | open | 2026-11-09T20:57:28Z | `b208656161cd2ecd3b9d49951aedf356fda1216bee7c979751dc551113400bf2` |
| [GODUOIT #159](https://github.com/jukazilli/GODUOIT/issues/159) | open | 2026-11-10T01:52:02Z | `4024c18b07e0a02c1f257a080a3a5e5ae788908ce2c95f7cd12b8f48befa8cee` |
| [GODUOIT #160](https://github.com/jukazilli/GODUOIT/issues/160) | open | 2026-11-10T01:44:43Z | `ba99a89d8b0a88e6a4b7966eb6b0e20a86cbb564dcf5b6b166d98180505d0606` |
| [goudduo #1](https://github.com/jukazilli/goudduo/issues/1) | open | 2026-11-10T04:43:06Z | `3636f3cb014c92bb4b288651f7a692ce748d3de2f513bb87c3eadc3f431d9831` |
| [goudduo #6](https://github.com/jukazilli/goudduo/issues/6) | open | 2026-11-10T13:52:25Z | `59323e1494f816177b78562bd8641f0bea8ed99b7f8962c3c1c348f8ca8af55d` |
| [goudduo #7](https://github.com/jukazilli/goudduo/issues/7) | open | 2026-11-10T13:07:40Z | `f1881acd66586aa2f16defbc7ecd7c43eb48e9a3bdbdf1341c68aebd3b341038` |
| [goudduo #9](https://github.com/jukazilli/goudduo/issues/9) | open | 2026-11-10T14:49:51Z | `858605c6796ba1ff2b4d52739e558a2dc61b92b0cd52b733235f3bf5a9a7a025` |
| [goudduo #12](https://github.com/jukazilli/goudduo/issues/12) | open | 2026-11-11T00:16:36Z | `b06ff6cc080c964c17e88203358fc666baafd048b71252bdbc115d614133519c` |
| [goudduo #13](https://github.com/jukazilli/goudduo/issues/13) | open | 2026-11-10T15:11:56Z | `c31f312e4f258575cb7ff0c60dbe545ea9e2039b3f075209759aa45bd169878e` |
| [goudduo #16](https://github.com/jukazilli/goudduo/issues/16) | open | 2026-11-11T00:15:48Z | `29ea5cf2c490194b440e806c3d390722b484971e991b7a38156808e7a758544f` |
| [goudduo #17](https://github.com/jukazilli/goudduo/issues/17) | open | 2026-11-11T00:15:50Z | `d1d0c7bd6a5deec3dbbe9d51d396f45879fd0a64f03a2912daa316245f03a75e` |
| [goudduo #19](https://github.com/jukazilli/goudduo/issues/19) | open | 2026-11-11T01:24:46Z | `381783c19a0b68f6600650f91b65fa3505656543bb326d29ba55a6c113d1d525` |
| [goudduo #20](https://github.com/jukazilli/goudduo/issues/20) | open | 2026-11-11T03:09:31Z | `49bf9d4a6f4a1516f79a7199096b55c174835d9480e7e1b4041c1f88c008c48e` |
| [goudduo #23](https://github.com/jukazilli/goudduo/issues/23) | open | 2026-11-11T02:22:08Z | `e46f2aa1fc1289597e7074bdc9bcdfaab3cb54ca367e9c1bba66ba43ce3d64da` |
| [goudduo #24](https://github.com/jukazilli/goudduo/issues/24) | open | 2026-11-11T02:00:11Z | `6d45bbb61d66bf3c209e22f416dce3c6275595668681d3cb1ff587746d1eb9d2` |
| [goudduo #25](https://github.com/jukazilli/goudduo/issues/25) | open | 2026-11-11T02:22:11Z | `a72d08ee2e42baf021cc77e1e5b91a3defb1a02ec8889a614b8e2b0d09298456` |
| [goudduo #26](https://github.com/jukazilli/goudduo/issues/26) | open | 2026-11-11T03:09:28Z | `73c7a977113311586707fe953915d980b787f68b3aeda5b36f2a656adb0d150a` |
| [goudduo #27](https://github.com/jukazilli/goudduo/issues/27) | open | 2026-11-11T02:51:19Z | `61523d58e767cef37614b9450cf6fc02b403f2b345eaccea6d8b0782396d4357` |
| [goudduo #28](https://github.com/jukazilli/goudduo/issues/28) | open | 2026-11-11T23:03:21Z | `eee38ca9b58ede15ecde7373ac4ae092672ff14224265cd9e9086779933fd6b2` |
| [goudduo #29](https://github.com/jukazilli/goudduo/issues/29) | open | 2026-11-12T02:20:06Z | `461ca634fba71865066a1e8ab9a1b0eabeae50e716ad24f70b3b4119fd4ff18d` |

## Acesso e limitações efetivamente constatados

- GitHub: leitura dos dois repositórios e clone autenticado disponíveis. Escrita documental em branch/PR será comprovada pela entrega, não inferida de permissão declarada.
- Projects V2 #6: leitura tentou `gh project view 6 --owner jukazilli --format json`, retornou `Resource not accessible by integration (user.projectV2)`. Nenhum cartão/automação consultado ou alterado; status não verificado.
- `gh issue view --comments` sem campos selecionados falhou por `projectCards` clássico; investigação continuou via REST paginada, com leitura bem-sucedida das Issues/comentários. Não é bloqueio de acesso às Issues.
- Cloudflare: plugin `whoami` autenticado; GET `/accounts`, GET `/accounts/<account>/workers/scripts` e GET `/accounts/<account>/pages/projects` tiveram sucesso. Três Workers e zero Pages retornados na conta acessível. IDs/identidade da conta omitidos por minimização. **Leitura não comprova Workers/Pages Write, instalação GitHub App, plano ou autorização de deploy**. Não foi testada escrita.
- Cloudflare Docs consultada pelo plugin; comparação e links na [estratégia](ESTRATEGIA-PREVIEWS-CLOUDFLARE-P0.md). Skill utilizada: Cloudflare (skill do plugin conectado; documentação pública na estratégia). Nenhuma criação/mutação de recursos.
- Skill local de [safe area](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/.gemini/skills/mobile-safe-area/SKILL.md) e governança consultadas para o plano de QA; nenhum componente foi alterado por elas.
- Não reinspecionados: Figma original, PNG de Login de chat, HTML exato V5.3 da Library e acervo Drive. Referências documentais descrevem esses materiais; isso não equivale a acesso/renderização P0. Sem afirmação de paridade visual.
- Não feita auditoria jurídica/licenças ou varredura integral de segredos de todo histórico. São gates antes de mover/publicar código, não bloqueio da documentação solicitada. Esta PR não inclui código/fixtures/assets privados nem transcrições brutas.
