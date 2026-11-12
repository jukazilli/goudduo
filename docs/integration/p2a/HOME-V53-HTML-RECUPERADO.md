# Home V5.3 recuperada — extração da superfície, não do Shell

**P2-A-R1, investigação/documentação para homologação.** Substitui a conclusão de indisponibilidade da P2-A original. Nenhuma superfície React, código privado, Shell ou HTML foi transportado nesta revisão. Capturas anexadas são evidência documental da referência pública, não assets do aplicativo nem funcionalidades novas homologadas.

## 1. Identidade, proveniência e execução externa

| Campo | Verificação |
|---|---|
| Branch de origem | preview/home-treinos-v53-rawgithack |
| Commit obrigatório | **073183253fce5fcd0b3474c725e84ff67d3dfec5** |
| Caminho | lab/previews/home-treinos-v5.3-charcoal.html |
| Blob Git | **8c698708dd79449472d6f5c7e536664939de4951** |
| Tamanho | 74.195 bytes; 568 quebras LF pelo wc local, sem alterar bytes |
| SHA256 | **7cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f** |
| Versão declarada | title `GODUOIT · Home Treinos V5.3 · Preview`; camada CSS final `V5.3 TEST`, após V2/V4/V5/V5.1 |
| Histórico | Commit adiciona somente o HTML à branch isolada; autor identifica V5.3 squircle/charcoal sem arte fixa. Não há merge desse HTML na main |
| Fonte Git | [HTML imutável](https://github.com/jukazilli/goudduo/blob/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html) |
| RawGitHack | [URL testada](https://rawcdn.githack.com/jukazilli/goudduo/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html): HTTP200 por curl, SHA256 idêntico ao Git |
| Navegador externo | Primeiro mostrou `External Content Notice / Open the page`; após clicar, abriu a mesma URL com title V5.3, cinco Pulses e zero pageerrors. HTTP200 sozinho não comprovava renderização |

Conteúdo integral HTML/CSS/JS inspecionado. Original intacto extraído para scratch e executado em loopback para medições determinísticas; URL externa testada separadamente. Um WebP embutido é raster da marca legada no header experimental; não há imagem fixa no hero renderizado. A presença pública do arquivo não licencia outras mídias/código privado.

## 2. Status e precedência

Fonte visual recuperada indicada expressamente pelo proprietário no comando P2-A-R1 e compatível com [#54 V5.3](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720) e [handoff abfd989](https://github.com/jukazilli/GODUOIT/blob/abfd989fb1b3e87d617dfd93c0527554b2e283b2/docs/handoffs/home-treinos-v5.3-direcao-ui-ux-homologada.md). **G01 resolvido: HTML recuperado e auditado.** Não se presume identidade binária com uploads antigos inacessíveis nem aprovação de tudo que o script demonstra.

Precedência: composição Home homologada + decisões canônicas; **Shell P1-R1 em 0fbc3ed8b3e1c59245d2349ae14160a2a9c43086**; marca goudduo/Plus Jakarta Sans/Lucide reais; refinamentos funcionais #159 ainda pendentes. A palavra TEST no comentário CSS não revoga a direção aprovada, nem converte formulários/algoritmos demonstrativos em produto homologado.

## 3. Matriz de extração A–E

A = referência Home homologada; B = adaptar identidade atual; C = ignorar Shell/bancada experimental; D = preservar comportamento/intenção com arquitetura React; E = funcionalidade/dado/delta pendente, sem aprovação automática.

Fontes: H = HTML fixo acima, C54 = decisão/handoff V5.3, S = P1-R1 homologada, P159 = refinamento de Progresso. Cada linha tem uma classificação principal; aparência e lógica de um mesmo widget aparecem separadas para impedir aprovação por arrasto.

| ID | Região / estado no HTML | Classe | Fonte | Estilo/comportamento e contrato | Adaptação necessária | Risco | Aceite futuro |
|---|---|---|---|---|---|---|---|
| X01 | Stage/app, frame e max-height | C | H/S | App experimental com altura limitada e fundo externo | Usar viewport real do AppShell; não copiar frame | Distorcer fold ou cortar conteúdo | Nenhum max820/frame importado |
| X02 | Reset global/fonte/viewport | C | H/C54/S | Fonte sistema, reset `*`, máximo de zoom1 | Jakarta e CSS local; manter zoom acessível | Contaminar Feed/fontes/zoom | Fonte aprovada e nenhum reset experimental |
| X03 | Header/raster goduoit/statusline | C | H/S | Hora/bateria simuladas, busca/+ /coração SVG inline | Preservar ShellHeader/SVG oficial P1 | Header duplicado/identidade antiga | Uma instância de header P1 |
| X04 | TabBar experimental | C | H/S | Altura61, SVGs aproximados/avatarJ e roteamento local | TabBar P1, cinco Lucide, Match central | Regressão global | Ordem/ícones/50+inset P1 intactos |
| X05 | Treinos/Publicações/Business tabs | C | H/S | Tabs e troca de view no HTML | Preservar tabs AppShell e contexto/scroll P1 | Duplicar navegação ou zerar contexto | Uma navegação superior |
| X06 | Gutter e Bento colapsado | A | H/C54 | Duas colunas, Ranking span2rows, Status/Peso à direita | Geometria interna responsiva em CSS local | Fixar largura do frame | Medidas internas e proporção equivalentes |
| X07 | Ranking compacto | A | H/C54 | Azul pastel dominante, label/troféu/valor | Lucide e fonte aprovados; métrica por fonte | Voltar ao layout antigo | Posição/ênfase preservadas |
| X08 | Ranking expandido/pontuação | E | H/#9 | 8º, amigos/480pts etc são fixtures | Sem algoritmo ou placar real inventado | Falsa classificação | Demonstração identificada ou vazio aprovado |
| X09 | Status compacto | A | H/C54 | Verde pastel, resumo social; substitui No ritmo | Preservar geometria/copy legítima | Reviver engajamento/lotação | Sem dados legados revogados |
| X10 | Ravi/evento | E | H/C54 | Evento fictício no card | Dado real verificável ou vazio; fixture só Lab | Falso feedback | Nenhum evento atribuído a pessoa real |
| X11 | Status aberto | D | H/C54 | Em construção + link #160 | Componente de estado honesto; sem backend | Implementar check-in sem contrato | Toque/retorno e link corretos |
| X12 | Peso compacto estrutural | A | H/C54/P159 | Neutro, segunda célula à direita | Manter slot/posição, não eliminar | Quebrar composição aprovada | Mesmo footprint sem métrica falsa |
| X13 | Peso valor/chart/form/history | E | H/P159 | 78,4kg e registros locais mutáveis | Não portar coleta/gráfico como homologados | Saúde/persistência fictícia | G03 aprova neutralização funcional |
| X14 | Treino do Dia/CTA | A | H/C54 | Charcoal em duas camadas, texto claro, CTA branco | CSS local; nenhum asset fixo | Copiar fundo azul/arte antiga | Gradiente/raio/CTA equivalentes |
| X15 | Ausência de imagem hero | A | H/C54 | before/after content none | Sem importar WebP experimental ou raster | Ilustração obrigatória indevida | Zero camada de foto fixa |
| X16 | Datas/títulos/contagens | E | H/C54 | Segunda9nov e três treinos hardcoded | Derivar de rotina/ocorrência/seleção única | Dados/desempenho inventados | Home reflete treino efetivamente salvo |
| X17 | Dots e swipe do hero | D | H/C54 | Três seletores alteram título/metadados | IDs/seleção compartilhada e gesto horizontal seguro | Confundir dots com Pulse | Seleção coerente sem duplicar store |
| X18 | Começar treino — intenção | D | H/C54 | Ação sobre treino selecionado | Resolver ID/origem e destino autorizado | Perder seleção ao navegar | Passar workoutId/revision/contexto |
| X19 | Destino real do CTA no HTML | E | H | Abre Rotinas ilustrativa, não sessão | Não copiar rota literal como sessão funcional | Declarar treino iniciado falsamente | Sessão autorizada ou estado indisponível honesto |
| X20 | Pulse top/shape/spacing | A | H/C54 | Primeira região do conteúdo; squircle54/58 | Slot Treinos local; circular Publicações preservado | Shape global/cópia de frame | Métricas/Pulse antes do Bento |
| X21 | Próprio J e + | B | H/C54 | Inicial e indicador de criação, nome visual oculto | Usuário sintético/real legítimo e nome acessível | Hardcode/J ou botão sem nome | Identidade/ação acessíveis sem copy redundante |
| X22 | Institucional goduoit/badge1 | B | H/C54 | Palavra antiga em span, fundo charcoal/badge mock | SVG oficial goudduo, sem reconstrução; badge por dados | Logo textual improvisado | Asset aprovado e contador legítimo |
| X23 | Lista Lia/Ravi/Bia | E | H/C54 | Ordem da demonstração e iniciais | IDs/ordem dos dados do cenário | Identidades fictícias virarem fatos | Sem hardcode de pessoas como reais |
| X24 | Seen/unseen/ring | E | H/#73 | HTML usa azul/lime e borda cinza para visto | Reconciliar semântica canônica (visto gelo/gradiente não visto) | Promover paleta experimental global | Delta aprovado por estado; shape local mantido |
| X25 | Toque e scroll Pulse | D | H/C54 | Scroll nativo; toque apenas toast | Preservar interação/retorno; viewer só se autorizado | Inventar viewer/upload | Destino honesto, foco e swipe sem regressão |
| X26 | Ocultação de Pulse | E | H | Handler data-pulse-info sem nenhum controle no DOM | Não criar toggle por código morto | Persistência não contratada | Definição de opção/escopo/estado antes de implementar |
| X27 | Pulse head/intro/reset | C | H/C54 | Pulses/Reiniciar ocultos; label próprio invisível | Não importar controles/labels Lab; manter a11y | Ruído e debug no produto | App sem bancada |
| X28 | Medidas/Biblioteca/Fotos/Recordes compactos | A | H/C54 | Pares suaves abaixo do hero; geometria documentada | Corpos/tokens locais, conteúdo conforme contrato | Remover acessos válidos ou globalizar paleta | Ordem e footprint; funcionalidade separada |
| X29 | Formulários/foto/recordes | E | H/P159 | Medidas, URL.createObjectURL, PRs e registros mock | Não ativar upload/saúde/algoritmo | Exposição/serviço inexistente | Revisão #159 por widget |
| X30 | Biblioteca — intenção | D | H/legado | Link para rota ilustrativa | Biblioteca independente preservada, não sheet V7.4 substituta | Perda do catálogo completo | Destinos/consumidores distintos |
| X31 | Consistência band | A | H/C54 | Faixa full-width inferior | Preservar composição local | Converter em novo destino global | Sem sexta aba ou deslocar hero |
| X32 | Streak/semana/PRs | E | H/P159/#9 | 2semanas,3/4treinos e gráfico ilustrativos | Não calcular ou certificar progresso | Metricas falsas | Fonte/regra aprovada antes da função |
| X33 | Reflow/fechamento | D | H/C54 | Grupo superior: selecionado primeiro; inferior após hero; órfão wide; fechar restaura ordem | Estado React/reflow por grupos, sem DOM imperativo copiado | Aplicar algoritmo Rotinas à Home | Reordenação visual reversível, sem gravar preferência |
| X34 | Motion/reduce | D | H/#25/S | Reflow400ms; expansão360/280; reduce sem WAAPI | Infra P1 e motion local por tipo | Animação global ou corte/foco errado | Teste normal/reduce e retorno |
| X35 | Feed/Business/rotas/sheets experimentais | C | H/S | Demos dentro do mesmo HTML, não fontes dessas telas | Ignorar; preservar contratos próprios | Redesign social por contaminação | Nenhum bloco experimental integrado |
| X36 | Estado closure e persistência | D | H/S | Variáveis locais/dados resetados por reload | Um Context/reducer; drafts/seletores/IDs | Segundo store ou falso backend | Salvar Rotinas atualiza Home da mesma fonte |

## 4. Cascata e diferenças verificáveis entre camadas

| Camada interna | Conteúdo visível no código | Resultado final / precedência |
|---|---|---|
| Base/V2 | Flex de cards, fundos azul/foto e chrome demo | Não extrair primeiras declarações sem verificar overrides |
| V4 | Grid assimétrico, raio25/gap11 como custom properties; hero pastel/arte via pseudo-elemento | Mobile posterior usa gap10 ou8 e raio23; V5 sobrescreve hero |
| Expansão pós-V4 | focus-top/focus-lower, flow-wide para órfão | Mantida no JS final; ordem temporária por grupos |
| V5 | Charcoal, CTA branco; pseudo-elementos desativados; intro/Pulse head ocultos | Efetivo no #homeView; comentário antigo de WebP não implica imagem renderizada |
| V5.1 | Status e remoção do chevron da marca | Status continua Em construção; não transforma métrica em algoritmo |
| V5.3 | Pulse squircle, institutional charcoal, Status22px; breakpoint355 | Camada final local; não aplica squircle à Publicações |

Não existe comparação binária com um arquivo V5.1 original indisponível: o diferencial acima usa as camadas do próprio HTML e o handoff. Medidas finais agora são **observadas no artefato recuperado**, não retroativamente “extraídas” da auditoria antiga.

## 5. Geometria mensurada e viewport de demonstração

Medições Chromium156.0.8078.79 (Debian13), viewport altura844, zoom1, sem insets simulados. Fonte efetiva declarada/observada: stack de sistema, não Jakarta; a integração deve manter Jakarta aprovada e registrar o delta tipográfico. Números são baseline do conteúdo, não tokens globais homologados.

O frame móvel limita `.app` a **min(820px,100dvh)** e acrescenta chrome experimental: status26 + header63 + tabs48 e footer61. Em todos os cinco testes a região #screen tinha **622px** de altura. Nenhum desses limites deve ser transferido ao AppShell real.

| Viewport | Largura interna | Gutter lateral | Gap Bento efetivo | Coluna | Ranking alto | Status/Peso renderizados | Hero | Pulse / raio |
|---|---|---|---|---|---|---|---|---|
| 320×844 | 300 | 10px | 8px | 146px | 218px | 105/105px | 300×236px | 54px / 18px |
| 375×844 | 349 | 13px | 10px | 169.5px | 218px | 103.75/104.25px | 349×236px | 58px / 19px |
| 390×844 | 364 | 13px | 10px | 177px | 218px | 103.75/104.25px | 364×236px | 58px / 19px |
| 414×844 | 388 | 13px | 10px | 189px | 218px | 103.75/104.25px | 388×236px | 58px / 19px |
| 430×844 | 404 | 13px | 10px | 197px | 218px | 103.75/104.25px | 404×236px | 58px / 19px |

Coordenadas relativas ao topo de #homeView, independentes do chrome: Pulse avatar y=2; Bento começa y=94,80 em320 e98,80 nas demais; hero começa y=320,80 em320 e326,80 nas demais. Pulse row tem gap10, padding2/0/4 e margin-bottom17 no shell local; não há dots de Pulse. Os três dots pertencem **ao hero**. Em320 a row mede300 de clientWidth e310 de scrollWidth; swipe nativo deslocou10px. Nas demais, a lista cabe e scrollLeft permaneceu0, como esperado.

Raio compacto efetivo23px, hero26px e expanded23px herdado da classe móvel; padding expandido18px não é seu raio. Padding expandido18; demais secundários min-height144. Ranking ocupa duas linhas; colunas de mesma largura, assimetria por altura/span, não porcentagens inventadas. Custom properties raio25/gap11 persistem no CSS, mas são sobrepostas no mobile por valores acima.

| Papel local | Valor efetivo/observado | Limite de adoção |
|---|---|---|
| Ranking/Status/Peso | #E3F0FF / #EFF8E0 / #F3F3F3 | Somente superfície Treinos |
| Secundários | Medidas #F2F4FF; Biblioteca #F1F6F9; Fotos #F6F0FB; Recordes #FFF7EA; faixa Consistência #F4F7F8 | Aparência compacta observada; função ainda separada |
| Hero | radial rgba(94,109,119,.22) at84%43% + linear132deg #20262D→#30363C56%→#1C2228 | Sem before/after ou imagem fixa; capa de usuário é contrato distinto |
| CTA | Branco/texto #1B2228; raio999; min-height43; min-width145 (135 em<=355); padding10/17 | Não novo primário global; alvos e Jakarta aprovados devem ser verificados |
| Texto hero | título23px/775 (21 em<=355), line-height1.12, max-width60% (61% estreito); metadata12.5/560 | Medição com fonte de sistema; produto mantém Jakarta, registra delta |
| Texto compacto | Ranking valor39px; Status22px; notas10–11px conforme elemento/breakpoint | Não instalar escala global ou reduzir inputs abaixo16 |
| Reflow/expand | WAAPI400ms cubic-bezier(.22,1,.36,1); expansão grid360ms/opacidade280ms | Interação da Home, não tempos globais de modal; reduce preservado |

O valor 23px do raio expandido foi conferido na cascata/classe mobile; conteúdos/altura de expansão variam com formulário/fontes. Não impor altura experimental do Peso aberto à versão funcional futura.

## 6. Comportamentos observados

Cinco cenários normais e cinco de reduced-motion executados: zero pageerrors; houve um404 de favicon.ico no primeiro cenário320, confirmado pelo log HTTP local, sem falha de JS. Os demais cenários não registraram erro de console. O HTML recuperado não foi alterado para incluir favicon; a aplicação mantém o da P1-R1. Documento e #screen sem overflow horizontal; **overflow da row Pulse em320 é intencional**. Capturas após650ms para estabilizar expansão/scroll; sem comparar React inexistente.

- Peso/Status selecionados tornam-se primeiro card do grupo superior, full-width; Ranking/companheiro ficam compactos depois. Isso é reordenação **visual temporária**, não nova ordem salva de widgets. A regra V7.4 de Rotinas que não leva secundária ao início não deve ser imposta à Home.
- Fotos/Medidas expandidos ficam após hero; os demais secundários refluem e o último órfão recebe flow-wide (Recordes no caso Fotos). Ranking/Status/Peso mantêm o cluster superior em focus-lower. Fechar/X/Escape restaura ordem original.
- Retorno de foco foi observado. Em testes adicionais de Fotos, scroll antes/expandido/fechado foi484px em320,450 em375/390 e435 em414/430, sem deslocamento nessa sequência. O JS não mantém um mapa universal de scroll; o retorno/contexto do React deve continuar pela fundação.
- Status abre Em construção e link para #160. O subtítulo “Lotação colaborativa” é descrição do futuro dentro do estado, não medição real ou aprovação de check-in. Ravi/feedback é fixture.
- Dots do hero e swipe touch selecionaram outro treino; voltar da rota demonstrativa conservou o título selecionado. **Começar treino abre Rotinas mock**, não uma sessão operacional. Não importar esse destino literal como contrato de iniciar sessão.
- Toque no Pulse mostrou somente “Pulse de Lia · demonstração visual.” Não existe viewer/upload/publicação. O handler de informação sobre ocultação existe, mas **zero controles data-pulse-info** foram encontrados; não há toggle/ocultação real.
- Form Peso atualizou79,1kg de teste sintético apenas na closure e voltou78,4 após reload; storage local/session permaneceu vazio no cenário inicial. Não é persistência, saúde real ou aprovação do formulário. Nenhum dado pessoal foi usado.
- Reduced-motion observado: expansão/fechamento funcionaram, transitionDuration1e-05s e zero animações ativas na medição; script pula reflow WAAPI. O reset global usado para isso não será copiado para o app.
- **Alvos/gestos:** no CSS os dots visuais têm7/19×7px e fechar29×29, CTA mínimo43; isso não é contrato de alvo acessível44. A integração deve preservar a aparência com alvos não sobrepostos e ajustar reserva de espaço/gesto. Em320 não presumir que três alvos44 caibam ao lado do CTA sem delta visual; proposta de acomodação exige revisão, sem redesenhar o Shell. O swipe do hero usa dx sem testar predominância horizontal: não copiar interferência potencial com scroll vertical.
- **Estados vazios:** não há cenário canônico configurável de Home sem treinos/eventos/métricas ou Pulse vazio no arquivo. Não foram fabricados por editar DOM/closure. Permanecem responsabilidade da integração por contratos legítimos, com revisão dos estados faltantes.

## 7. Comparação obrigatória com o Shell P1-R1

| Elemento | HTML V5.3 | P1-R1 homologada | Decisão futura |
|---|---|---|---|
| Wordmark | Raster/legado goduoit no header | SVG oficial goudduo | Preservar P1-R1; nenhum raster/wordmark CSS importado |
| Header | Statusline/ícones/SVGs/altura experimentais | ShellHeader | Preservar P1-R1 |
| TabBar | SVGs inline/altura61/avatarJ/handlers locais | TabBar cinco Lucide/50+inset | Preservar P1-R1, Match central |
| Ícones globais | Mistos/experimentais | Lucide React | Preservar P1-R1 |
| Home tabs | `.seg` e selectTab zerando scroll | AppShell/contextos tipados | Preservar P1-R1; não duplicar tabs |
| Bento | Geometria V5.3 recuperada | Corpo ainda não implementado | Reproduzir composição no conteúdo, CSS namespace local |
| Pulse Treinos | Squircle54/58 | HomeCompositions.treinos com slot preparado | Consumidor local na P2-B; preservar posição anterior ao Bento |
| Pulse Publicações | Não usar esta referência | Slot circular e contrato preservado | Não alterar por Treinos |
| Motion | Reflow/expansão locais e resets globais | Infraestrutura P1-R1 | Adaptar intenção por superfície, sem importar reset/lifecycle experimental |
| Estado | Closure/strings/fixtures/scripts | Context/useReducer e seletores | Uma fonte, IDs/rascunhos/contexto; sem novo store |

Não há justificativa nova para substituir AppShell/surface-contracts/ShellHeader/TabBar/navigation/tokens/app.css com partes do HTML. Eventual ajuste mínimo genuíno será separado e submetido à aprovação, conforme propostas anteriores de Rotinas; nenhum foi feito aqui.

## 8. Contrato de integração Home ↔ Rotinas

Corpo e Pulse são nós próprios de `HomeCompositions.treinos`, com gutters locais equivalentes e espaçamento compartilhado, sem novo header/TabBar nem safe area duplicada. Evitar recortar todo #screen com rotas sociais dentro dele; extrair apenas a especificação visual do #homeView, não copiar DOM/CSS/scripts como implementação.

Seletores únicos devem relacionar rotina ativa → dia/ocorrência → workoutId/revision → título/contagem e seleção do hero. Exercício salvo no fluxo V7.4 atualiza o mesmo treino reconhecido pela Home. Dots representam seleção legítima, não os três textos hardcoded. Copiar treino para outro dia versus compartilhar entidade continua G06.

Intent Começar treino leva o treino selecionado e origem de retorno; não significa que a Sessão já esteja implementada. Destino operacional exige seu contrato/recorte autorizado, ou estado indisponível honesto até lá. A rota mock Rotinas no HTML não autoriza descartar intenção de início nem simular conclusão.

V7.4 continua sua referência própria: Biblioteca75%, inclusão persistente sem duplicação,0/1/>=2, nome somente ao final e retorno ao dia. Não reabrir seu redesign ou descoberta de navegação por causa desta recuperação.

## 9. Pendências realmente restantes

- **G01 resolvido.** Não pedir novamente o HTML nem propor reconstrução sem fonte; ele está fixado e auditado.
- **G02 parcialmente resolvido:** posição antes do Bento, dimensões/breakpoint, ordem demonstrativa, gap/raio e ausência de dots de Pulse verificados. Adaptação ao SVG goudduo já está determinada; restam IDs/contadores/conteúdo/mídia legítimos, semântica dos anéis (HTML azul/lime/cinza versus contratos vistos/não vistos) e destino real de toque/ocultação. Não transformar handler morto em configuração aprovada.
- **G03:** preservar Peso no cluster e secundários estruturais, mas não aprovar valores/chart/form/histórico. Recomendação: slot compacto neutro sem coleta/número verdadeiro, aprovado pelo proprietário antes de P2-B; não eliminar Peso ou rearranjar Bento por pendência funcional. Definir vazios legítimos para Ranking/Status/treino e recorte dos demais widgets.
- **G04:** allowlist privada inalterada; referência pública não libera arquivos privados ou direitos de outras mídias.
- **G05:** Shell preservado é decisão expressa, não escolha em aberto. Permanecem deltas próprios V7.4 (CTA/motion etc.) e deltas da Home a registrar (Jakarta/SVG já determinados, semântica Pulse e alvos de toque dos seletores/fechar), sem novo Shell.
- **G06:** cópia/identidade/rascunho e unidades/domínio continuam como registrados.
- **G07:** plano tecnicamente pronto para revisão com fonte recuperada obrigatória; autorização de implementar e QA físico continuam gates.

## 10. QA e evidências para P2-B

Comparar somente o conteúdo Home por região: Pulse, cluster, hero e secundários/expansões. O Shell React é comparado à P1-R1, **nunca** ao chrome experimental. Igualar largura interna/gutter e altura útil do harness para diffs regionais; em testes reais manter viewport844 e AppShell dinâmico, sem fixar frame820 ou viewport de conteúdo622. Registrar deltas de fonte/marca/estados e não ocultar diferença de composição por crop arbitrário.

Cenários normal/reduce, abrir superior/inferior/fechar, scroll/contexto, dots/swipe, Status, CTA e vazios aprovados. Mesmo treino/fixture sintética entre referência e futuro React; saúde/nomes reais não são cenário de teste. Nenhuma fidelidade React é declarada agora.

## 11. Capturas documentais anexadas

Recortes #screen, portanto sem header/TabBar/statusline do HTML. “Peso expandido” contém formulário **experimental categoria E**, não aprovação funcional. Valores/iniciais são as fixtures públicas da referência. Esses PNGs ficam só em docs/evidence, não em src/assets/public e não são importados pela aplicação.

| Largura | Home inicial (conteúdo) | Peso expandido (experimental) | SHA256 inicial / expandido |
|---|---|---|---|
| 320 | [captura](evidence/home-v53/home-content-320.png) | [captura](evidence/home-v53/weight-expanded-320.png) | e9c28cae98b55048caf6dcab391ce71ec013e228758837b7c9b28691468462fc / cfb6237494823aaeb9f9036515aa55be605ba5cf7692a6858cf270848b2388fe |
| 375 | [captura](evidence/home-v53/home-content-375.png) | [captura](evidence/home-v53/weight-expanded-375.png) | 086ce023d62a513512402e0b7bf21fb36b97a3238fddaf552fbe708a0f5d92c7 / 6e50da79593109fe2f64c107a8cf7e84f677920474e1eff243d8b5c5dd8b8a2a |
| 390 | [captura](evidence/home-v53/home-content-390.png) | [captura](evidence/home-v53/weight-expanded-390.png) | b863cf164490090651c4401ce2dc62d8cc03deeaeea68cc81c083191c0fabceb / e6cba26eaaa0662c851ae959f5e9ad609821773029f03889dcff7b55b5f3bd7a |
| 414 | [captura](evidence/home-v53/home-content-414.png) | [captura](evidence/home-v53/weight-expanded-414.png) | 454006254b7647d5c47d7892ebbeca84365af05a2831b234045917f2d8098fb0 / 8e1d087e20fe8c70801d5c149dd1d16539cf81ab6acdc42c38ac2ee987081b20 |
| 430 | [captura](evidence/home-v53/home-content-430.png) | [captura](evidence/home-v53/weight-expanded-430.png) | 450362cb48844e6f9bf488ce450d35949473520187f0440a013c388c7fa59eba / 09464906275098991affbb0abea507482df6fe4e323969328a25ef76bb98c433 |
