# Home Treinos V5.3 — contrato de fidelidade revisado

**P2-A-R1: HTML recuperado e auditado. G01 resolvido.** Referência obrigatória [073183253fce5fcd0b3474c725e84ff67d3dfec5](https://github.com/jukazilli/goudduo/blob/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html), blob **8c698708dd79449472d6f5c7e536664939de4951**. [Matriz A–E, medições, capturas e confronto com P1-R1](HOME-V53-HTML-RECUPERADO.md). A indisponibilidade registrada na P2-A original foi superada; não usar V5.1/Home GODUOIT antiga como substituta.

A direção Home é HOMOLOGADA; React V5.3 continua não implementado. O HTML contém partes experimentais e funções pendentes. Fonte visual da superfície **não é fonte do Shell**.

## Composição canônica e medida interna

Ranking dominante à esquerda, com duas linhas; Status e Peso compactos à direita. Hero full-width abaixo; pares Medidas/Biblioteca e Fotos/Recordes; Consistência full-width inferior. Nos cinco testes: Ranking218px, hero236px, secundários144px; Status/Peso crescem com conteúdo/linhas. Grade de colunas iguais, gap8 em320 e10 nas demais; raio compacto23, hero26. Esses são resultados locais do HTML, não alturas/raios globais ou exigência de congelar layout responsivo.

Gutter de conteúdo10 em320 e13 em375–430; padding vertical14/24. A bancada limita app a820px, com screen622px em viewport844 por causa do chrome experimental. **Não portar frame/altura/statusline/header/nav**, nem comparar fold da bancada como se fosse o AppShell real. Manter Jakarta, SVG e Lucide aprovados; o HTML usa fonte de sistema e ícones inline, deltas intencionais que precisam constar da comparação regional.

A V5.3 substitui as escolhas conflitantes V3.5/V5.1: cards antigos iguais, No ritmo como entrada visual, Pulse circular em Treinos, hero azul/arte fixa e controles do laboratório. Custom properties25/11 herdadas de V4/V5.1 são sobrepostas no mobile; não usar primeiras declarações CSS em vez da cascata final.

## Ranking, Status e Peso

Ranking azul-pastel #E3F0FF, Status #EFF8E0, Peso #F3F3F3: valores observados locais, sem mudar paleta de Publicações/Business. Ranking mantém label/troféu/ênfase. “8º”, amigos e pontos são demonstrativos, sem algoritmo real aprovado por esta auditoria.

Status substitui **somente a entrada visual No ritmo**, preservando histórico/streak em seu domínio. “Ravi enviou um feedback” é fixture. Sem evento legítimo, usar vazio aprovado, sem reproduzir nome/evento como fato. Tocar abre Em construção e referência #160, sem check-in, localização ou cálculo de lotação. O HTML confirma esse destino; o formulário de outras métricas não o amplia.

**Peso permanece estrutural**, no slot inferior direito do cluster. Valor78,4, gráfico, histórico e formulário são experimentais/PENDENTES #159. Recomendação para decisão G03: preservar footprint e identificação do card com estado neutro sem número/coleta, ou liberar a função somente em lote refinado; não eliminar Peso/reordenar o Bento por causa da pendência. Nenhum “Registrar peso” será portado como serviço real por existir no HTML.

## Treino do Dia — somente charcoal e CTA branco

Composição final: radial discreto rgba(94,109,119,.22) + linear132deg #20262D → #30363C56% → #1C2228. before/after calculados como content none, **sem foto/ilustração fixa**. Texto claro e CTA branco/texto #1B2228, raio999, min43px, width mínima145/135 conforme breakpoint; título23px (21 estreito). São valores da referência local; manter alvos/fontes acessíveis e dados legítimos no React.

Datas/títulos/contagens hardcoded não são estado operacional. Dots do hero selecionam os três exemplos e swipe touch troca treino. Esses dots **não são indicadores de Pulse**. A futura seleção usa IDs/rotina/ocorrência compartilhados; não instalar um array de treinos independente da store.

No HTML, Começar treino abre uma rota Rotinas ilustrativa, não sessão. Preservar intenção de iniciar/abrir o treino selecionado e origem de retorno, nunca esse destino mock como prova de sessão funcional. Capa de usuário continua contrato distinto: não apagar escolha nem introduzir imagem padrão obrigatória.

## Pulse — posição e dimensões resolvidas

Primeira região do #homeView, depois das tabs do Shell e antes do Bento. Avatar local y=2; row gap10, padding2/0/4, espaço inferior17. 58×58/raio19 nas larguras375–430;54×54/raio18 em320 (regra <=355). Nomes10px/gap7; label próprio visualmente oculto sem retirar identificação acessível do produto. Nome/controles redundantes Pulses/Seu pulse/Reiniciar não entram no app.

Exemplo: J+, institucional goduoit com badge1, Lia/Ravi/Bia. Adaptar o item institucional para **goudduo com SVG oficial**, sem desenhar marca em texto ou copiar raster legado; usuários/contadores por IDs/dados do cenário. O arquivo usa iniciais, não comprova direitos/seleção de fotos reais.

A row tem overflow horizontal intencional de10px em320; nas demais cinco itens cabem. Não há dots específicos de Pulse. Toque só gera toast demonstrativo. Nenhum viewer/upload/publicação real existe. O handler que menciona ocultação em Configurações tem zero controles associados; **ocultação não foi resolvida como funcionalidade**.

Forma/presença/posição não ficam mais pendentes de busca. Restam semântica/cores dos anéis (HTML azul/lime/cinza versus contratos canônicos visto gelo/não visto), identidade/dados/mídia, destino funcional de toque e ocultação. Não globalizar o squircle: `HomeCompositions.treinos` e `.publicacoes` continuam consumidores distintos; circular de Publicações preservado.

## Expansão e estado

HTML possui reflow próprio por grupos: Peso/Status selecionados vão à frente do grupo superior; Fotos/Medidas abrem depois do hero e o último órfão alarga. Fechar restaura ordem. Não impor à Home o algoritmo de troca local de Rotinas V7.4; são superfícies diferentes. Ordem visual temporária não regrava preferência do usuário.

Cinco larguras passaram nos cenários normais/reduce, com retorno de foco/ordem e scroll preservado nas sequências observadas. React deverá manter retorno/contexto pela fundação e validar outros pontos de scroll; não copiar mutate/order/DOM da IIFE nem reset global de motion. Reflow400 e expansão360/280 são observações da superfície, não novos tempos de modal global.

Não há fixtures vazias configuráveis para ausência de treino/evento/Pulse. Esses vazios precisam de recorte legítimo de integração e revisão, sem inventar uma referência visual inexistente para eles.

## Shell protegido e aceite

Usar exclusivamente AppShell/ShellHeader/TabBar/navigation/tokens da P1-R1 homologada. Cinco destinos, Match central, três contextos, safe areas, fontes e ícones reais preservados. Componente Home fornece corpo e Pulse, sem header/TabBar próprios. Gutters locais entre esses dois slots devem ser coerentes, sem copiar padding/top de chrome ou reaplicar inset.

Aplicar `.home-training-v53`/regiões locais equivalentes, nunca :root/reset/button/header/CSS do Feed. Business não recebe cards de treino; ações sociais/estado de usuário não são resetados. [Matriz](MATRIZ-COMPONENTES.md), [QA](QA-VISUAL-P2.md) e [plano](PLANO-P2B.md) agora exigem comparação contra o HTML recuperado por região de conteúdo, com Shell avaliado por contrato P1-R1. Nenhuma fidelidade do futuro React é declarada nesta missão.
