# P1-R1 — Reconciliação estrutural do Shell

**Em revisão, não homologada.** Missão autorizada pelo proprietário em 12/11/2026, continuidade da [PR Draft #31](https://github.com/jukazilli/goudduo/pull/31). Snapshot anterior P1: `79f865e88eb286548d1d92df0e148255bab29a7e`. Main pública permanece no merge documental P0 `f04307eca83dbd8cc442f5f034e1665b3acb5c47`; origem privada consultada: `c0936896240e525353b237d92dff31fe0211eb94`. Nenhum merge, port privado, integração de superfícies ou deploy faz parte deste recorte.

## 1. Diagnóstico antes de corrigir

Já corretos: React/TS/Vite e dependências fixas; ordem de cinco destinos e Match com Map central; três contextos da Home; SVG público e Jakarta/Lucide; History API com back/forward/rotas diretas; Context/reducer único; fixtures sintéticas; Lab isolado; lifecycle de overlays/foco/inert/reduced-motion e saída 310ms; build allowlisted sem mapas/cópia de public.

Lacunas efetivas: header da Home e TabBar impostos a todas as rotas; Page representava apenas cinco destinos; corpo comum recebia padding obrigatório; nenhuma integração de header/footer por superfície; UserRound divergia do User observado; barra P1 tinha 64px antes de inset contra 50px da referência técnica; ativo #006DA9 divergia do #00A8E8 explicitamente aprovado para navegação; Home já ativa não voltava ao topo; nova visita por tab reiniciava scroll. CSS genérico button/a/:focus-visible/.button/.field poderia contaminar futuros componentes transportados.

Pendências de implementação, não defeitos desta missão: Bento, Feed, autenticação, cenas de onboarding, Editor/Biblioteca reais, viewer Pulse e demais serviços. Uma casca neutra não prova paridade dessas telas. Não substituímos essas pendências por réplicas.

## 2. Matriz P1 × origem × contrato

| Componente | P1 anterior | GODUOIT observado | Contrato homologado / fonte | Divergência e ação R1 |
|---|---|---|---|---|
| TabBar | Ordem certa; 64px; UserRound; ativo orientação | Cinco posições, Map central, 50px + inset, User no fallback; CSS visual 24px/2 | [#72 decisão](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6566854507) | Extrair componente, usar User/24px/2, 50px + inset e seleção #00A8E8; não importar avatar privado ou inventar círculo/pill |
| Header | Marca/ações em todo destino | HomeShell tem header Home; branches do editor isolam chrome | [remoção chevron](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6756546648), [Editar perfil #26](https://github.com/jukazilli/goudduo/issues/26), [Rotinas #28](https://github.com/jukazilli/goudduo/issues/28) | Home, contextual e editor separados; sem header em acesso/imersivo; sem ações artificiais nos placeholders |
| Home tabs | Três contextos; corpo rígido | Composições independentes de treino/feed/business | [#72](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6566854507), [#54 V5.3](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720), [#55](https://github.com/jukazilli/GODUOIT/issues/55) | Conteúdo de cada contexto é slot próprio; scroll por entrada e último scroll do contexto; Home ativa retorna ao topo |
| Pulse | Ausente | Main apenas Publicações, circular; visto azul no CSS não é decisão definitiva | [#54 squircle](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720), [#73 visto gelo](https://github.com/jukazilli/GODUOIT/issues/73#issuecomment-6717419889) | Slot opcional tipado por contexto, sem implementação e sem ativação padrão; C06 continua aberto |
| Tokens | Valores básicos com poucos papéis e CSS genérico | Tokens históricos; regras por referência | P0 C04; [#26](https://github.com/jukazilli/goudduo/issues/26), [#19](https://github.com/jukazilli/goudduo/issues/19) | Tokens de chrome em escopo data-foundation; primitives prefixadas; contextos não recebem automaticamente paletas candidatas |
| Rotas | Apenas abas/not-found + panels | App/ApprovedApp têm intents e returnTarget, não router comum final | [P0 arquitetura](../reconciliation/ARQUITETURA-E-PLANO-INTEGRACAO-P0.md), comando P1-R1 | Estender união tipada e parser; políticas por família; fallback honesto; sem convidado ou auth simulada |
| Overlays | Motor testado | Referências têm mecanismos próprios; não transportar por cópia | [#25](https://github.com/jukazilli/goudduo/issues/25#issuecomment-6785114875) | Preservar mecanismo; apenas aplicar escopo de tokens ao portal; testar também sem chrome global |
| Visual Lab | Separado | Catálogo + inspetor + navegação técnica separados da experiência | P0/P1 autorizadas | Preservar entradas/builds; acrescentar seleção das rotas preparatórias, sem controles no app |

Esta matriz foi apresentada ao proprietário em commentary antes de editar o código. O estado atual da main privada é evidência de implementação, não autoridade automática sobre decisões posteriores.

## 3. Fontes, branches e confronto de decisões

Consultados: README da main pública, os nove documentos P0 e documentação P1; diff integral da PR #31; fontes AppShell/navigation/providers/state/components/styles/Lab/Vite e testes. Na origem: AGENTS/GEMINI/README, App/ApprovedApp, HomeShell e CSS, catálogo, componentes de navegação/overlay e skill mobile-safe-area. Issues e comentários de #72/#54/#55/#73 na origem, #28/#20/#26/#25/#19/#29 no destino. Metadados REST capturados localmente fora do repo público.

PRs privadas reconsultadas (todas abertas, sem merge no snapshot):

| PR | Base SHA | Head SHA | Relevância |
|---|---|---|---|
| [#146](https://github.com/jukazilli/GODUOIT/pull/146) | c0936896240e525353b237d92dff31fe0211eb94 | 3456074fa34d2efc79662c9ddc0137f9feba5cbd | Reconciliação Home/Rotinas/Sessão, contratos de retorno e estado |
| [#153](https://github.com/jukazilli/GODUOIT/pull/153) | 2b8890929bb8c04c2539965af5379869b82dd13b | 0308e2c4f667e35497d254f24e78d18208272b96 | Header de editor; delta não integrado e não superior automaticamente à V7.4 |
| [#154](https://github.com/jukazilli/GODUOIT/pull/154) | 0308e2c4f667e35497d254f24e78d18208272b96 | 08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38 | Dependência zoom iOS; não remover mínimo de 16px ou permitir escala artificial |
| [#161](https://github.com/jukazilli/GODUOIT/pull/161) | c0936896240e525353b237d92dff31fe0211eb94 | abfd989fb1b3e87d617dfd93c0527554b2e283b2 | Documento V5.3; não código integrado |

#20/#26 ainda têm comentários históricos chamando R2 proposta, mas o registro expresso G4 de 11/11 no corpo/artefato posterior preserva a homologação visual; não converter isso em backend. #28 aprova V7.4 e mantém descoberta da troca de exercícios pendente. #19 aprova três cenas opcionais e mantém destino final/serviços/QA físico pendentes.

## 4. Contratos executáveis e pontos de composição

`src/app/surface-contracts.ts` centraliza `ShellPolicy`, `SurfaceIntegrations`, `SurfaceComposition` e `HomeCompositions`. AppShell continua responsável por histórico/foco/scroll/inert, sem conhecer implementação de Bento, Feed ou formulários. As superfícies poderão fornecer conteúdo, título, ação real e footer; nenhum desses slots implica autorização de port ou conclusão da feature.

### Headers

- **Home:** wordmark SVG já público, busca à esquerda, +/coração à direita, marca central e sem chevron/clique vazio. Ações conservam os estados neutros P1; menu Criar completo permanece integração futura [#72](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6747090000).
- **Contextual:** chevron Voltar, título central com colunas laterais iguais, ação somente se fornecida pelo consumidor real. Título longo trunca visualmente sem esconder seu texto acessível.
- **Editor:** mesma base contextual, chevron e check Lucide acessível como Salvar; check não aparece no placeholder. Handler e disabled vêm do consumidor; não salva/nomeia treino na R1.
- **Acesso/Onboarding:** sem header global; composição própria fica para integração homologada, sem exigir troca do Shell.
- **Imersivo:** sem header/TabBar globais; retorno acessível mínimo no placeholder dentro do viewport de conteúdo. Quando um consumidor imersivo é integrado, ele fornece seu próprio retorno homologado; o fallback não é duplicado. A superfície futura ocupa esse viewport sem precisar desmontar providers.

### TabBar e rodapé

Cinco destinos fixos Home/Rotinas/Match/Mensagens/Perfil; House/Dumbbell/Map/MessageCircle/**User**. Match no centro, ícones 24px/2, alvos >=48px de altura e >=44px de largura nos viewports. Sem sexto item, pílula, zoom/scale touch ou fundo ativo novo. #00A8E8 é token local da seleção da navegação conforme #72, não substituição global do foco #006DA9. Avatar privado/foto não foi copiado; o ícone User usa a variante verificada, sem alegar paridade do avatar final.

Editor **admite TabBar e footer acima dela**, conforme V7.4. Footer não adiciona inset inferior quando TabBar o consome. Sem TabBar, footer consome inset; sem ambos, main consome. Header consome top quando presente; caso contrário main o faz. Main é flex rolável, footer/nav ficam fora do scroll, sem spacer/altura de TabBar duplicada. Inputs continuam >=16px; viewport não desativa zoom acessível.

### Home e Pulse

`integrations.home.treinos/publicacoes/business` têm corpos independentes. Main não aplica padding/altura de cards/fundo Bento uniforme. Somente placeholder tem seu padding. Raiz identifica `data-home-context`, mas **nenhum seletor de cor/forma é aplicado automaticamente por esse atributo**. Cada superfície deve ter CSS namespace próprio e tokens `--surface-*` no subtree local; não mutar :root ao trocar contexto.

Treinos aceita slot de Pulse `shape: squircle`; Publicações aceita `shape: circle`; Business não recebe Pulse automaticamente. Shape é metadado para o consumidor, não um desenho implementado pelo Shell. Slots ausentes em todos os estados comuns e no Lab. Teste de composição usa somente textos técnicos sintéticos, sem imagens/avatares/carrossel/viewer.

**C06 — Problema → evidência → impacto → alternativas → recomendação:** main/README privada restringe presença a Publicações; homologação V5.3 descreve squircle em Treinos. Aplicar automaticamente alteraria placement e poderia contaminar Feed. Alternativas: confirmar placement local antes do port ou manter slot vazio. Recomendação executada nesta R1: slot vazio, registrar gate para P2; preservar circular de Publicações e não resolver presença por inferência.

### Rotas e políticas preparatórias

| Família / caminhos técnicos | Header | TabBar | Estado atual |
|---|---|---|---|
| /home/treinos, /home/publicacoes, /home/business | Home | Home ativa | Placeholder independente por contexto |
| /rotinas, /match, /mensagens, /perfil | Contextual | Destino ativo | Placeholder; políticas das telas finais serão reconciliadas com seus contratos |
| /acesso/splash, login, cadastro, otp, recuperacao, termos, privacidade; /onboarding | Ausente | Ausente | Somente estado indisponível; não cria conta, sessão ou jornada clicável fictícia |
| /treinos/:workoutId/editar | Editor | Rotinas ativa | Placeholder; sem salvar/Adicionar exercício falsos |
| /rotinas/:routineId, /historico, /perfil/:userId, /perfil/editar, /perfil/interesses, /configuracoes | Contextual | Ausente na preparação | Slots; chrome final de cada superfície depende de seu contrato |
| /sessao/:sessionId, /pulse/:pulseId | Ausente; retorno local | Ausente | Estado neutro imersivo, sem execução/viewer simulados |

São caminhos técnicos, não novos fluxos de produto. `/` continua Home neutra da P1 até o lote de Acesso autorizado; **o tipo já representa a Splash**, mas esta missão não implementa autoentrada/auth/redirect para simular uma jornada completa. O final deverá iniciar na Splash na integração de Acesso. Não há experiência de convidado.

Parser prioriza /perfil/editar e /perfil/interesses antes de IDs; identificadores opacos limitados a 80 caracteres seguros, sem e-mail/nome/saúde em URL. Rotas desconhecidas têm fallback honesto. Back com histórico recupera origem/contexto; acesso direto usa pai técnico da família (editor→Rotinas, interesses→Editar perfil, cadastro→Login), sem inventar autenticação. Fixtures permanecem em memória; reload restaura URL, não dados/scroll. Overlays permanecem em query/history; fechamento direto preserva página por replace.

Scroll guarda entradas para back/forward e último valor por contexto Home para troca de tabs; overlay do mesmo contexto herda scroll, mas saída de overlay para outra página não copia posição indevida. Tocar Home já ativa limpa posição do contexto e volta ao topo, respeitando movimento reduzido.

## 5. Tokens, motion e proteção do Feed

`src/styles/tokens.css`: valores institucionais herdados explicitamente identificados (#10202B, #FFF, #F1F8FB, #006DA9, #00A8E8), aliases `--shell-*`, motion 300/310 e curva, limitados a `[data-foundation]`. CSS de primitive prefixado `foundation-*`; removidos estilos genéricos de button/a/.button/.field/:focus-visible e reset universal que poderiam interferir no Feed. Permanecem somente resets de documento mínimos e tipografia obrigatória. Futuros estilos de superfície devem ser igualmente locais.

#0866E8 continua aprovação **contextual** em Acesso/Perfil; pastéis/charcoal são direção local de Treinos. Nenhum desses valores é instalado no :root ou em todas as Home tabs. Escalas/radii candidatos de DS não são homologados por esta R1. Contraste do azul energético para uso de ícone selecionado deve ser homologado no contexto real; não acrescentamos um estado visual não aprovado para compensar nem alegamos que axe valida todo contraste de SVG. Foco utiliza orientação mais escura, e aria-current mantém semântica.

Motor OverlayHost preservado: nenhuma biblioteca nova e nenhum rewrite de lifecycle. Apenas `data-foundation` no portal e aliases de tokens CSS, com os mesmos 300/310ms e fallback JS. Preservados Escape/back, inert, foco/trap/restauração, body scroll lock, gesto, saída antes de desmontar e reduce. Mudanças futuras de duração devem manter CSS/fallback sincronizados, por contrato #25.

Publicações não está implementada no destino: esta R1 **não modifica Feed, posts ou mídia privados**. Não é possível provar paridade do port antes de autorizar os arquivos. A baseline privada P1 é preservada; estes testes validam isolamento estrutural e ausência de propagação automática, não equivalência visual de um Feed ainda ausente.

## 6. Fronteira de divulgação

Todos os arquivos R1 são implementação independente na branch pública, sem dependências novas. A allowlist P1 continua valendo; acrescentados somente contratos/componentes originais, testes, tokens locais, documentação e capturas R1 próprias.

Arquivos privados relevantes continuam **bloqueados**, não transportados:

| Fonte | Commit / blob | Dependências e risco | Destino recomendado |
|---|---|---|---|
| src/surfaces/home/HomeShell.tsx | c0936896240e525353b237d92dff31fe0211eb94 / d857b5bdaca1bb5c32efa7c19f624924d03fc4a6 | BrandMark, fotos/fixtures, Feed/Pulse, domain, CSS; direitos de código/mídia não liberados | Port seletivo futuro autorizado com baseline |
| src/surfaces/home/home-shell.css | mesmo commit / 52f9a4d5f644a36f18cee295c08afc9d556ec14d | Tokens e superfícies acoplados; divulgação privada e regressão de Feed | Liberar recortes por superfície, sem copiar stylesheet inteiro |
| src/surfaces/routines/RoutinesSurface.tsx | 0308e2c4f667e35497d254f24e78d18208272b96 / e7a44c6de15875243a8ae7f86caa877c29a7e2e6 | Header/editor R5, domain/fixtures e CSS; branch não integrada; licença/redistribuição a autorizar | Comparar deltas úteis com #28; não importar por antiguidade |

Identificar caminhos/blobs não concede licença. Nenhuma credencial, identidade Cloudflare, captura privada, lock privado, logo reconstruído ou SVG alterado entra na entrega. Assets oficiais públicos têm bytes preservados. Projects #6 permanece não verificado; nenhum cartão/status foi alterado.

## 7. Testes, evidências e limites

Resultados da rodada final e capturas: ver [relatório](TEST-REPORT.md) e `evidence/p1-r1-*`. As capturas são evidências da fundação P1-R1, **não referências visuais homologadas**. Testes de integração incluem consumidor técnico de header/ação/footer e corpos/Pulse locais; não introduzem esses cenários no produto.

Cobertura acrescentada: round-trip das famílias preparatórias/IDs inválidos; ausência de chrome em acesso/imersivo; header contextual sem ações vazias; footer Editor acima da navegação; contexto/scroll/back/forward; ícones/ordem/centro/altura e escala do viewport; diretórios comuns sem Lab; foco/overlays e insets sem header; sentinela CSS externa sem mudanças ao trocar Home. Suites anteriores preservadas.

Safari/iPhone e Chrome/Android físicos não testados. Chromium touch/insets simulados não substituem teclado, notch, VoiceOver ou homologação visual real. Segurança do bundle e dry-run Cloudflare são preparação; nenhum recurso remoto foi criado/alterado e nenhuma URL pública existe nesta entrega.

## 8. Gates para P2

Preparados: Shell/headers reutilizáveis, composição independente de Home/Pulse, TabBar protegida, footer+TabBar do Editor, navegação para detalhes/editor e imersivo, IDs/estado compartilhados e Lab separado. Nenhuma alteração de biblioteca foi necessária.

Antes de P2: homologar P1-R1; autorizar allowlist específica de port; resolver C05 (referência/detalhes Home) e C06 (placement Pulse); preservar C04 localidade de tokens; aprovar direitos de mídia. Integrar somente Home Treinos V5.3 + Rotinas/Editor/Biblioteca V7.4 no recorte autorizado. Peso/Medidas/Consistência, descoberta da troca de exercícios, Feed/composer/viewer e serviços permanecem sob gates próprios. Não há início automático de P2, merge ou deploy.
