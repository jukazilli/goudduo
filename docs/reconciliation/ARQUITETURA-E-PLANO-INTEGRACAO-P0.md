# Arquitetura e plano de integração — P0

**PROPOSTA para Gate 1 do proprietário.** Preserva React + TypeScript + Vite e a arquitetura aproveitável da origem. Não cria aplicativo, runtime, banco ou dependência nesta missão. Fontes e decisões: [registro](FONTES-E-DECISOES-P0.md); superfície a superfície: [matriz](MATRIZ-RECONCILIACAO-P0.md).

## 1. Diagnóstico técnico com evidência

| Área | Constatação no snapshot | Implicação |
|---|---|---|
| Fundação | package.json: React/DOM ^19.1, TS ^5.8.2, Vite ^6.2.2, Lucide ^1.16.0, Fontsource Jakarta ^5.1; pnpm-lock.yaml presente | Reutilizar lock/scripts; não scaffolding novo. Validar engines do lock e fixar Node/pnpm em lote futuro |
| Scripts | dev=vite; build=tsc --noEmit + vite build; typecheck; test=vitest run | Build reproduzível parte dos scripts existentes; não foi executado nesta P0 |
| TypeScript | strict, noUncheckedIndexedAccess, ES2022, moduleResolution Bundler; include src | Preservar verificação estrita; evitar any para integração e usar IDs tipados |
| Build atual | vite.config.ts tem entradas index.html (Lab) e approved/index.html; sourcemap=true; plugins React + basicSsl | Não publicar dist atual indiscriminadamente; separar entrada comum de Lab e remover mapas públicos por gate de distribuição |
| Lab | App.tsx tem inspetor, viewport, histórico próprio e replaceState de query; ApprovedApp usa seletor de superfície/estado | São ferramentas de QA, não app final. Reutilizar catálogo para cenários, separar das rotas comuns |
| Shell | HomeShell reúne tabs, cards, Feed, menus, estados locais e placeholders | Refatorar progressivamente, com baseline Publicações antes de alterações |
| Domínio | exercise/equipment/muscle-taxonomy na main; RoutineDemoItem/RoutineDayWorkout/RoutineExercisePlan nas branches | Aproveitar modelos e catálogos válidos; nomes demo não tornam dados reais |
| Dados duplicados | G#146 HomeShell cria demoRoutines e RoutinesSurface cria outro estado próprio | Salvar Editor não garante Home atualizada: store comum é necessária |
| Perfil | G#152 contém ProfileSurface, fixtures, callbacks e navegação, além de alterações no Feed | Aproveitar componente sem importar fixtures extras/alterações não autorizadas do Feed |
| Distribuição | public contém gooduu.html, sw.js, manifests, ícones antigos; Vite copia public para dist | Publicação exige allowlist explícita; referências privadas e laboratório não devem vazar por cópia automática |

Inspeção de imports do `onboarding-assets.ts` encontrou **zero arquivos ausentes** na cópia congelada. Isso só comprova existência, não qualidade/licença/paridade ou build saudável. Não reutilizar antigos PNGs como onboarding obrigatório.

## 2. Reutilização e organização proposta

Manter pipeline Vite, dependências/fontes/ícones e componentes/contratos de domínio da origem. Extrair funcionalidades de HomeShell por recortes verificáveis; evitar reescrita simultânea de todo o shell e Feed. Estrutura abaixo é **alvo proposto**, não diretórios já existentes:

```text
src/
  app/         shell, destinos globais, histórico, return context
  state/       DemoProvider + reducer, ações, seletores e fixtures iniciais
  domain/      exercícios, equipamentos, rotinas, prescrição e execução
  components/  campos, botões, cards, overlays e primitives de motion
  features/    access, onboarding, home, routines, session, social, profile, settings
  theme/       tokens por papel e contexto, tipografia, safe areas
  brand/       adaptador de SVGs oficiais
  lab/         catálogo/cenários/inspetor (entrada e build independentes)
```

Os caminhos atuais podem ser mantidos durante extração (`surfaces/*`) para reduzir diff; renomear tudo não é objetivo. Nenhuma biblioteca de UI/estado/motion é necessária por padrão. **Context + useReducer + seletores tipados** bastam inicialmente. Reavaliar divisão de providers se updates sociais causarem renderização excessiva; não adicionar Redux/Zustand/Framer por conveniência.

## 3. App Shell e navegação

- Um shell comum com Header, TabBar de **cinco destinos Home/Rotinas/Match/Mensagens/Perfil**, safe areas e conteúdo rolável. Abas Treinos/Publicações/Business são contexto de Home, não destinos globais adicionais.
- Navegação tipada centralizada, evoluindo LabVariantNavigationIntent/returnTarget; estado discriminado em vez de booleans incompatíveis (isLibraryActive/isSessionActive/activePlaceholder etc.).
- Recomendação inicial: adaptador pequeno da History API com push/replace/popstate e rotas testadas; aproveitar intents existentes. Não exige router novo. Se o lote demonstrar complexidade de nested routes/loaders, propor React Router como dependência específica para aprovação, mantendo Vite/React/TS.
- Recomendação de caminhos: `/home/treinos`, `/home/publicacoes`, `/rotinas/:routineId`, `/rotinas/:routineId/dias/:day`, `/treinos/:workoutId/editar`, `/sessao/:sessionId`, `/perfil/:userId`, `/configuracoes`, `/acesso/*`. São proposta técnica, não nomes de telas aprovados. Match/Mensagens mantêm destinos honestos enquanto bloqueados.
- ID de origem + scroll/foco por localização; voltar restaura a tela correta. Rota direta inválida tem fallback claro. Segredos/dados pessoais não vão para URLs. Mudança de tab não descarta rascunho nem duplica shell.
- Único consumidor do inset por eixo: header top e rodapé bottom, sem offsets para notch hardcoded. `viewport-fit=cover`, dvh/visualViewport conforme teste; nenhuma desativação de pinça ou zoom de acessibilidade.
- Header contextual do Editor governa ocultação do header comum; G#153 fornece ideia de isolamento, mas check/rodapé finais são de V7.4. Remoção de chevron junto à wordmark é delta compartilhado aprovado; Feed não sofre redesign.

## 4. Estado demonstrativo único e limites

Proposta de domínios em memória (não schema de backend):

| Domínio | Entidades / chaves | Consumidores | Invariante |
|---|---|---|---|
| Identidade | demoUserId, perfis por ID, capabilities de cenário restritas ao Lab | Header/Feed/Perfil | Próprio/visitado não dependem de texto de nome; UI nunca verifica profissional real |
| Catálogo | exerciseId/equipmentId e defaults versionados | Biblioteca/Editor | Catálogo não guarda carga pessoal; alteração não reescreve sessão antiga |
| Rotinas | routineId, principal, dias/treinos por ID, capa | Home/Rotinas/Perfil | Uma fonte de rotina principal e programação; dias não contam conclusão |
| Treinos | workoutId, revision, workoutExerciseId e parâmetros | Editor/Home/Sessão | Mesmo exercício de catálogo pode ter instância própria; bloqueio duplicado conforme V7.4 no treino |
| Rascunhos | draftId, origin, sourceRevision, items e nome final | Editor/sheets | Adicionar altera rascunho; confirmar nome comita atomicamente; cancelar não salva |
| Execução | sessionId, snapshot de prescrição, sets, currentItemId, pausa/deadlines | Sessão/Home/Histórico futuro | Executar não muta prescrição; editar plano não troca snapshot de sessão aberta |
| Social | likes/saved/hidden/following por IDs baseline; vistos Pulse quando contratados | Feed/Perfil | Abrir/voltar não perde interações; não adicionar posts de QA ao feed comum |
| Preferências | interesses, tarefas dispensadas, introdução opcional | Perfil/Editor/Configurações | Sem obrigação de participação social ou dado corporal |
| Navegação | localização, origem, scroll, foco, overlay stack | Shell | Retorno usa identidade estável, não índice visual |

Ações tipadas propostas: abrir/editar rascunho, adicionar/remover item idempotente, atualizar parâmetros, confirmar salvamento, selecionar rotina/dia, iniciar/pausar/retomar/concluir sessão, atualizar perfil e dispensar/reabrir tarefa. Seletores de Home derivam da mesma coleção usada em Rotinas. Definir referência de data e timezone do cenário para testes, sem inventar motor de reajuste.

**Persistência inicial em memória**, com fixtures sintéticas determinísticas e reset somente no Lab. Não persistir senha/DOB/e-mail real ou fotos corporais em localStorage. Se for necessário sobreviver a reload, discutir persistência versionada e lista explícita de campos sintéticos; storage indisponível/versionamento/reset terão testes. Essa extensão não é pré-requisito assumido nesta P0.

Auth/OTP, pagamentos, Match confirmado, permissões e verificação profissional continuam indisponíveis como serviços reais. Adaptadores de demo retornam cenários explícitos; não chamam provedores nem exibem sucesso operacional inexistente. Não incluir Supabase ou backend somente porque uma minuta o menciona.

## 5. Design System, assets e motion

- Reusar Plus Jakarta Sans via Fontsource e Lucide React; SVGs oficiais black/white goudduo localizados por blob. Não gerar símbolo isolado, usar raster como logo final ou escrever wordmark com fonte.
- Tokens semânticos por contexto e ponte para classes existentes; preservar namespace/valores da baseline Publicações durante a transição. DS global v0.1/v0.3 da PR N#2 permanece proposta; #0866E8/branco tem aprovação local em Cadastro/OTP/Perfil, não substitui todo azul institucional.
- Login energético; internas claras; Home V5.3 com exceções locais Bento/charcoal. Não globalizar cores pastéis, squircle ou gradiente para Publicações/Business.
- Campos com fonte mínima de 16 CSS px em touch sem reduzir escalas maiores; labels e ARIA, foco, erro/vazio/disabled/loading. Botões texto OU ícone; icon-only com nome acessível e alvo mínimo coerente com skill mobile.
- Primitiva de overlay com lifecycle entering/open/exiting/closed, retorno de foco, gestão de scroll, Escape/back e saída antes de unmount. N#25 orienta ~300ms entrada/~310ms saída com easing, transform/opacidade e fallback de conclusão; `prefers-reduced-motion` não espera transitionend inexistente.
- Biblioteca contextual ~75% útil; toque fora/swipe conforme N#28, sem X. Sheet independente de seleção não recebe automaticamente a mesma regra sem contrato. Gestos horizontais de exercício não competem com scroll vertical/teclado/reordenação.
- Onboarding/Perfil exigem WebP reais adequados, direitos, alt e variantes responsivas aprovadas em etapa própria. Esta P0 não gera nem substitui mídia.

### Mapa de tokens para homologação da fundação

Nomes semânticos abaixo são **propostos**; valores/status têm origem explícita. Não são implementação ou promoção de um design system inteiro.

| Papel proposto | Valor / fonte | Status e contexto | Consumidores / cuidado |
|---|---|---|---|
| font.family | Plus Jakarta Sans / pacote Fontsource existente | APROVADO | Interface inteira; garantir fonte real e fallback honesto |
| color.text.primary | #10202B / origem e N#7 | Referência aprovada / contexto atual | Texto e ícones; não alterar Feed sem comparação |
| color.surface.base / soft | #FFFFFF / #F1F8FB | APROVADO em referências de acesso/internas | Formulários e sheets; não importar gradiente Login |
| color.action.local | #0866E8 com #FFFFFF / N#9/#13/#26 | APROVADO localmente nessas telas; global ainda PROPOSTA | Cadastro/OTP/Perfil; não trocar todo #00A8E8 |
| color.brand.energetic | #00A8E8 / tokens origem | Referência institucional herdada; papel atual a reconciliar | Branco sobre esse azul não deve virar CTA AA por inferência |
| color.home.charcoal | Exemplo #20262D→#30363C→#1C2228 / G#54 | DIREÇÃO local aprovada, valores de mock aproximados | Card Treino do Dia; sem imagem fixa obrigatória |
| color.home.pastels | Exemplos #E3F0FF/#EFF8E0/#F3F3F3 / G#54 | DIREÇÃO local, não global | Ranking/Status/Peso; widgets ainda pendentes |
| motion.overlay | ~300ms entrada / ~310ms saída / N#25 | DIREÇÃO APROVADA | Lifecycle/cleanup/reduce, sem exigir espera artificial |
| input.touch.font | Mínimo 16 CSS px / G#154 e safe-area skill | Requisito técnico de QA | Não reduzir campos existentes maiores; pinça acessível |
| control.height / radius | 56px/28px e demais escalas N#2 v0.3 | PROPOSTA global; conferir exceção por tela aprovada | Não copiar espécime Figma encolhido nem fixar larguras 307px |
| safe-area.insets | env(safe-area-inset-*) / skill local | Regra técnica aplicável | Um consumidor por eixo; sem número de notch hardcoded |

Conformidade Do/Don't nesta P0: nenhuma tela, token, logo ou UI foi criada/alterada; políticas foram rastreadas na matriz. Para cada lote de UI, a PR deverá indicar contexto, tokens locais, estados e evidências reais; esta tabela não substitui o gate visual.

## 6. Repositório de destino e fronteira privado/público

**Recomendação condicionada:** usar goudduo como destino da aplicação consolidada **somente depois de autorização de quais arquivos do GODUOIT privado podem se tornar públicos**. Preservar GODUOIT intacto como origem histórica. Esta P0 publica apenas documentação solicitada; não transporta código, fixtures, assets ou histórico privado.

| Alternativa | Benefício | Risco | Parecer |
|---|---|---|---|
| Port seletivo autorizado para goudduo, por pequenos commits com proveniência | Alinha produto/marca, histórico público controlado | Seleção de código/assets/licenças precisa aprovação; commits novos não carregam histórico original | Preferida após gate de divulgação |
| Integração temporária em branch privada GODUOIT e build restrito | Protege código e permite ensaio antes de port público | Duas fontes temporárias e reconciliação posterior | Alternativa se divulgação não autorizada |
| Importar histórico inteiro, mirror/subtree/submódulo público automático | Preserva histórico mecânico | Pode expor passado, segredos, dados/estudos não autorizados e assets sem licença | Não recomendado |

Preservar proveniência em cada recorte: repo/commit/caminho/blob de origem, delta aplicado, contrato autorizador e testes. Não basta licença do framework: auditar direitos dos assets e autorização do proprietário sobre código privado. Bundle JS público também revela lógica enviada ao navegador mesmo sem sourcemap; a autorização precisa abranger essa divulgação. Lab deve ter build/proteção própria e não ser importado pela entrada comum.

## 7. Lotes futuros e dependências (todos dependem do Gate 1)

### Lote 1 — Fundação, shell, baseline e estado

- **Escopo:** reaproveitar pipeline e shell; isolar Lab/build; navegação tipada/History, store demo e ponte de tokens/motion. Capturar baseline de Publicações antes da refatoração. Sem redesenho nem funcionalidades pendentes.
- **Fontes/componentes:** H01/H03/S01/S02/F01–F04; App, ApprovedApp, registry/types, HomeShell, domínio existente; G#72 e N#7/#25/#29.
- **Dependências:** aprovação do destino/divulgação e tokens por contexto; versões Node/pnpm fixadas a partir do lock. Nada de criar cloud recurso antes do gate de publicação.
- **Riscos:** reset de estado, histórico, CSS global, fontes/ícones antigos e inclusão indevida de public/.
- **Testes:** tipos/build existentes após instalar lock; contrato de navegação/store; baseline Feed/overlays em 320/375/390/414/430 e keyboard/reduce.
- **Aceite:** cinco destinos; mesma entidade preservada ao voltar; UI sem inspetor; baseline de Publicações sem regressão; artifacts allowlist demonstrada.
- **Entregáveis/gate:** PR de código pequena(s), relatório de proveniência, testes/capturas e preview apenas se autorizado. Proprietário valida fundação antes do lote 2.

### Lote 2 — Home Treinos + Rotinas/Editor V7.4

- **Escopo:** T01–T03 e partes H02 homologadas; adaptar componentes G#151 e tipos, sem copiar HTML/CSS monolítico. Home e Editor usam o mesmo estado.
- **Fontes:** N#28 HTML 3f8b2c7; G#54/#159/#120/#121/#127, PRs #146/#151/#153/#154. H02 não permite concluir widgets pendentes por inferência.
- **Dependências:** lote 1; reconciliação visual Home sem HTML V5.3 exato e decisão de placement Pulse; validar recorte de widgets. Não bloquear Rotinas independente por investigação de Peso.
- **Riscos:** busca superior V4, nomeação antecipada, duplicação, scroll/reflow, gestos e armazenamento em cópias locais.
- **Testes:** B-01…B-14; salvar com 0/1/2+, duplo toque, excluir/reabrir, query/scroll, retornar Home e reabrir mesmo treino, campos/teclado e regressão Feed.
- **Aceite:** V7.4 fiel; Home lê treino salvo; só widgets contratados disponíveis; descoberta de navegação permanece estudo.
- **Entregáveis/gate:** TS versionado, PRs por recorte, evidências de interação/comparação, pendências declaradas; aprovação do proprietário para liberar próximo lote.

### Lote 3 — Acesso e Onboarding

- **Escopo:** A01–A07/I01 somente no recorte autorizado; quatro campos sem provedores, OTP interativo demo, leitor e três cenas opcionais.
- **Fontes:** N#1/#6/#9/#12/#13/#16/#19 e PRs #5/#8/#11/#14/#15/#18/#21; contratos antigos preservados quando não substituídos.
- **Dependências:** lote 1; homologar Splash V4, destino final introdução e assets reais; gate legal para uso real é separado e continua bloqueante.
- **Riscos:** sucesso incondicional antigo, dados pessoais em URL/storage, reintroduzir Google/Nome/29 etapas, fallback raster como logo final.
- **Testes:** A-01…A-15, DOB limite/aniversário/calendário, handle/campos, OTP colar/voltar/90s e leitor preservando formulário; iPhone teclado/zoom.
- **Aceite:** transições coerentes de demonstração, sem conta/e-mail verdadeiros, sem consentimento fictício; referências preservadas e exceções homologadas.
- **Entregáveis/gate:** PRs, roteiros/capturas e preview autorizado com cenários identificados; proprietário homologa interface, sem declarar serviço real.

### Lote 4 — Publicações, Pulse e Perfil

- **Escopo:** preservar H03/S01/S02 e integrar P01–P06/Q01/Q02 aprovados. Extrair adaptação de G#152 sem novos posts de QA. Viewer/composer/duplas funcionais só com contrato próprio.
- **Fontes:** G#55/#73/#77/#84 e N#20/#26/#27/#23/#25, PR N#22; legal N#18.
- **Dependências:** lote 1 (estado/retorno) e contratos Perfil/R2; assets reais; fixtures alinhadas por IDs com Feed (incluindo Lia, ausente do lookup G#152, que hoje cai silenciosamente no próprio perfil); destino Rotinas do lote 2 quando presente.
- **Riscos:** mais posts alterando Feed, CSS Pulse global, boolean profissional como permissão, contador de treino inventado, IBGE livre/inválido.
- **Testes:** D/E completos; likes/salvos e scroll antes/depois de visitar Perfil; múltipla seleção; UF muda/invalida município; salvar/ocultar/reabrir; zero capability ativada.
- **Aceite:** Perfil atual sem regressão de Publicações; dados editados coerentes entre header/perfil; sem verificação simulada como real.
- **Entregáveis/gate:** PRs focadas, baseline comparada e relatório de regressões; homologação do proprietário.

### Lote 5 — Sessão e demais destinos

- **Escopo:** reconciliar T07 e inventariar/validar T08/C01–C05/H04/E01–E05 antes de cada implementação; configurações aprovadas podem ser integradas independentemente. Não transformar todos os pendentes em um lote autorizado.
- **Fontes:** G#75/#146/#148/#159/#81/#79/#83/#84; N#23/#24/#27; matriz P0.
- **Dependências:** lotes 1/2 e identidade do lote 4 onde houver retorno; sessão pode ser extraída em sublote após 2 se o proprietário priorizar testar execução, sem acelerar progresso/Match.
- **Riscos:** branches divergentes, timers e snapshots, resultados duplicados, métricas/serviços não aprovados e exposição corporal.
- **Testes:** C-01…C-08; pause/resume/reorder/set IDs; integração resultado/idempotência quando contratada; regressões B/D/E.
- **Aceite:** prescrição intocada; sessão retoma valores; cada pendência implementada exige novo contrato aprovado e QA; nenhum falso Match/pagamento/profissional.
- **Entregáveis/gate:** PR por superfície autorizada, testes/evidências e preview quando permitido; homologação individual, sem merge automático.

A ordem sugerida pelo proprietário é mantida. Dependência de Sessão para calcular recordes/consistência é técnica, não autorização para antecipar UI Progresso ou mudar a ordem silenciosamente.

## 8. Decisões requeridas para começar

Ver [README executivo](README.md) para decisões D01–D09. Primeiro gate aprova arquitetura/recorte, destino e fronteira de divulgação; gates visuais/funcionais continuam por superfície. Um aceite da P0 não aprova automaticamente os cinco lotes nem libera merge/deploy.
