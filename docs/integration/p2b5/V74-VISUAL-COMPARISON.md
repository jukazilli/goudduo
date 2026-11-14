# Comparação visual — Biblioteca V7.4

Fonte pública imutável: [HTML V7.4](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html), commit 3f8b2c7c93a33a713c780305e672e1ec7998ceaf, blob 122275b3cb03bd996b477375d1bbc73ae29c5c3e. Arquivo local conferido por hash Git; não foi copiado para a aplicação nem editado. Não se presumiu disponibilidade do RawGitHack: a execução desta QA usa os bytes fixos em servidor local.

## Método

Chromium 141.0.7390.37 do Playwright, touch, DPR 1, 320/375/390/414/430 ×844. Referência e React percorrem o mesmo estado semântico, com dados próprios: domingo vazio, sheet, busca, adição, múltiplos, sem resultado, fechamento e reabertura. A referência possui outro catálogo; nomes/metadados/query literal não são forçados a coincidir com fixtures React.

Capturas só do painel contextual; para Editor atualizado, somente .gd-content/#main-content. Não se compara Shell/status/frame experimental com a fundação React. A referência declara Plus Jakarta Sans sem carregar a fonte; para comparação, o harness carrega somente FontFaces públicos 400/500/600/700/800 do mesmo pacote do app. Bytes/layout/scripts do HTML permanecem intactos. As imagens reference-* são normalizadas por fonte, não uma alegação sobre o fallback original.

[Medidas, boxes e hashes](evidence/measurements.json): cinco larguras, oito estados pareados, **80 imagens**, zero pageerrors na coleta. Hashes dos fontes identificam exatamente o conteúdo implementado. Testes de comportamento são evidência complementar, não inferidos de screenshots.

## Deltas observados

| Região | Referência | React / interpretação |
| --- | --- | --- |
| Altura | 596,25 px, 75% do frame útil de 795 px | 633 px, 75% do viewport dinâmico 844 px sem inset simulado; não transportar moldura/altura de laboratório |
| Largura | Igual ao viewport nas cinco larguras | Igual, sem overflow |
| Padding | 12 /18 /16 px | Mesmo, com insets locais herdados do host |
| Raio superior | 23 px | 24 px do host homologado preservado |
| Pesquisa | 48 px / fonte16 | Mesmo; foco visível reforçado |
| Título | Adicionar exercício,20 px | Mesmo título/tamanho; peso real800 disponível |
| Linhas | 60 px no par medido | 69 px, ícone visual44 px; maior alvo/densidade documentada |
| Fonte e contraste | Valores laboratoriais e fallback | Fonte oficial carregada e cinzas de contraste reforçado |
| Handle | Forma laboratorial | Handle e gesto existentes da fundação preservados |
| Check | Botão nativamente disabled | aria-disabled+guard/reducer, mantém foco para leitura e Escape |
| Feedback | Adicionado transitório | Mesmo texto/1.350 ms, status live com chave por inclusão efetiva; área reservada evita saltos |
| Campos ao fechar | Exemplos HTML predefinidos | Campos obrigatórios em branco por segurança, sem prescrição profissional inventada; requer configuração antes de salvar |
| Dados | Catálogo do protótipo | 12 definições explicitamente demonstrativas na fonte compartilhada |
| Estabilidade | Ancoragem automática padrão do navegador | overflow-anchor:none local; preservação medida com ponteiro real sobre linha inteiramente visível, sem scrollIntoView da automação |
| Motion | 250/260 ms local | Motor homologado 300/310 ms, reduced-motion preservado |

São diferenças documentadas para o refinamento posterior. Não se declara pixel parity. Nenhuma falha funcional, corte ou sobreposição é classificada como cosmética.

## Estados e capturas

Cada par exclui componentes globais. As imagens são evidências da P2-B5 para revisão do proprietário, não novas referências homologadas.

### 320 px

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Aberta / não incluído | [Abrir](evidence/reference-open-320.png) | [Abrir](evidence/react-open-320.png) |
| Pesquisa preenchida | [Abrir](evidence/reference-search-320.png) | [Abrir](evidence/react-search-320.png) |
| Resultado filtrado | [Abrir](evidence/reference-filtered-320.png) | [Abrir](evidence/react-filtered-320.png) |
| Um adicionado / check | [Abrir](evidence/reference-added-320.png) | [Abrir](evidence/react-added-320.png) |
| Múltiplos adicionados | [Abrir](evidence/reference-multiple-320.png) | [Abrir](evidence/react-multiple-320.png) |
| Sem resultados | [Abrir](evidence/reference-no-results-320.png) | [Abrir](evidence/react-no-results-320.png) |
| Fechada / Editor atualizado | [Abrir](evidence/reference-editor-updated-320.png) | [Abrir](evidence/react-editor-updated-320.png) |
| Reaberta / query limpa | [Abrir](evidence/reference-reopened-320.png) | [Abrir](evidence/react-reopened-320.png) |

### 375 px

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Aberta / não incluído | [Abrir](evidence/reference-open-375.png) | [Abrir](evidence/react-open-375.png) |
| Pesquisa preenchida | [Abrir](evidence/reference-search-375.png) | [Abrir](evidence/react-search-375.png) |
| Resultado filtrado | [Abrir](evidence/reference-filtered-375.png) | [Abrir](evidence/react-filtered-375.png) |
| Um adicionado / check | [Abrir](evidence/reference-added-375.png) | [Abrir](evidence/react-added-375.png) |
| Múltiplos adicionados | [Abrir](evidence/reference-multiple-375.png) | [Abrir](evidence/react-multiple-375.png) |
| Sem resultados | [Abrir](evidence/reference-no-results-375.png) | [Abrir](evidence/react-no-results-375.png) |
| Fechada / Editor atualizado | [Abrir](evidence/reference-editor-updated-375.png) | [Abrir](evidence/react-editor-updated-375.png) |
| Reaberta / query limpa | [Abrir](evidence/reference-reopened-375.png) | [Abrir](evidence/react-reopened-375.png) |

### 390 px

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Aberta / não incluído | [Abrir](evidence/reference-open-390.png) | [Abrir](evidence/react-open-390.png) |
| Pesquisa preenchida | [Abrir](evidence/reference-search-390.png) | [Abrir](evidence/react-search-390.png) |
| Resultado filtrado | [Abrir](evidence/reference-filtered-390.png) | [Abrir](evidence/react-filtered-390.png) |
| Um adicionado / check | [Abrir](evidence/reference-added-390.png) | [Abrir](evidence/react-added-390.png) |
| Múltiplos adicionados | [Abrir](evidence/reference-multiple-390.png) | [Abrir](evidence/react-multiple-390.png) |
| Sem resultados | [Abrir](evidence/reference-no-results-390.png) | [Abrir](evidence/react-no-results-390.png) |
| Fechada / Editor atualizado | [Abrir](evidence/reference-editor-updated-390.png) | [Abrir](evidence/react-editor-updated-390.png) |
| Reaberta / query limpa | [Abrir](evidence/reference-reopened-390.png) | [Abrir](evidence/react-reopened-390.png) |

### 414 px

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Aberta / não incluído | [Abrir](evidence/reference-open-414.png) | [Abrir](evidence/react-open-414.png) |
| Pesquisa preenchida | [Abrir](evidence/reference-search-414.png) | [Abrir](evidence/react-search-414.png) |
| Resultado filtrado | [Abrir](evidence/reference-filtered-414.png) | [Abrir](evidence/react-filtered-414.png) |
| Um adicionado / check | [Abrir](evidence/reference-added-414.png) | [Abrir](evidence/react-added-414.png) |
| Múltiplos adicionados | [Abrir](evidence/reference-multiple-414.png) | [Abrir](evidence/react-multiple-414.png) |
| Sem resultados | [Abrir](evidence/reference-no-results-414.png) | [Abrir](evidence/react-no-results-414.png) |
| Fechada / Editor atualizado | [Abrir](evidence/reference-editor-updated-414.png) | [Abrir](evidence/react-editor-updated-414.png) |
| Reaberta / query limpa | [Abrir](evidence/reference-reopened-414.png) | [Abrir](evidence/react-reopened-414.png) |

### 430 px

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Aberta / não incluído | [Abrir](evidence/reference-open-430.png) | [Abrir](evidence/react-open-430.png) |
| Pesquisa preenchida | [Abrir](evidence/reference-search-430.png) | [Abrir](evidence/react-search-430.png) |
| Resultado filtrado | [Abrir](evidence/reference-filtered-430.png) | [Abrir](evidence/react-filtered-430.png) |
| Um adicionado / check | [Abrir](evidence/reference-added-430.png) | [Abrir](evidence/react-added-430.png) |
| Múltiplos adicionados | [Abrir](evidence/reference-multiple-430.png) | [Abrir](evidence/react-multiple-430.png) |
| Sem resultados | [Abrir](evidence/reference-no-results-430.png) | [Abrir](evidence/react-no-results-430.png) |
| Fechada / Editor atualizado | [Abrir](evidence/reference-editor-updated-430.png) | [Abrir](evidence/react-editor-updated-430.png) |
| Reaberta / query limpa | [Abrir](evidence/reference-reopened-430.png) | [Abrir](evidence/react-reopened-430.png) |

## Limites

Sem Safari/iPhone ou Android físicos, teclado virtual/VoiceOver/insets reais. Sem captura de mídia privada, serviços remotos ou catálogo definitivo. A fonte e os dados diferem explicitamente; homologação visual final pertence ao proprietário.
