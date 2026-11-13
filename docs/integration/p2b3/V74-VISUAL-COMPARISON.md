# Comparação visual — Home Rotinas V7.4

Referência pública imutável: [HTML canônico](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html), commit **3f8b2c7c93a33a713c780305e672e1ec7998ceaf**, blob **122275b3cb03bd996b477375d1bbc73ae29c5c3e**, 81.601 bytes. A referência foi conferida byte a byte com o objeto Git e executada em servidor local; não foi substituída por versão anterior ou código privado.

## Método e proveniência

Chromium, touch, DPR 1, larguras 320/375/390/414/430×844. Capturas só do viewport de conteúdo de Rotinas, excluindo header/tabbar/status/frame/controles técnicos. Referência tem 675 px úteis e app 733 px no cenário sem inset; o recorte pareado usa a menor altura. Na ausência total, o mesmo componente React é exercitado no Lab, com frame externo normalizado (viewport+24px, borda exclusiva do Lab removida) para manter a largura de conteúdo exata; crop 629 px. Nenhuma regra do Bento foi alterada pelo harness.

O HTML declara Plus Jakarta Sans, mas não carrega arquivos de fonte. Foram guardadas cinco capturas brutas antes de qualquer normalização. Para comparação tipográfica, o harness carrega somente FontFaces públicos 400/500/600/700/800 do pacote já usado pelo app, sem modificar bytes/CSS/layout/scripts da referência. Capturas reference-* pareadas são **normalizadas por fonte**, não uma alegação de identidade com a renderização bruta. O registro inclui famílias efetivamente utilizadas via CDP, antes/depois e no React, além dos FontFaces carregados: Noto Sans Bold na referência bruta e Plus Jakarta Sans ExtraBold na referência normalizada e no React.

Estados equivalentes: principal expandida com quinta-feira e dois exercícios; domingo vazio; recolhimento; secundária direita sem treino na segunda; cenário sem rotinas. Dados/nomes/grupos e quantidade de dias planejados da aplicação são sintéticos e diferem dos exemplos HTML. Não se fabricaram prescrições para imitar dados inválidos de zero exercícios da referência. Diferenças de texto/números são explicitadas, não disfarçadas como diferenças geométricas.

[Medidas, fontes reais, dimensões e SHA-256 de capturas/fontes de implementação](evidence/measurements.json). Sessenta capturas pareadas e cinco brutas. Asserções de geometria com tolerância inferior a 1 CSS px apenas para arredondamento de retângulos; igualdade de valores CSS para raio/gradiente/tamanho de título e cor de estado de dia. Isso **não é tolerância universal de imagem**, score de similaridade ou prova pixel a pixel.

## Resultado por região

| Região | Referência renderizada | React | Avaliação |
| --- | --- | --- | --- |
| Gutter/top/gap |18/14px; gap 11, estreito8 |Mesmos valores |Geometria preservada nas cinco larguras |
| Principal recolhida |192px, raio18 |Mesmo |Título/contagem são dados demonstrativos diferentes |
| Secundárias |171/147/147/171px na ordem inicial |Mesma cascata observada |Corrige limitação da síntese anterior P2-A, não muda o HTML |
| Painel recolhido |27px de reserva efetiva |27px |Densidade preservada, sem retirar espaçamento arbitrariamente |
| Card expandido |124px e raio17/17/0/0 |Mesmo |Estado e ordem via React |
| Órfão compacto |145px/full-width |Mesmo |Contagem de meias peças, não simples nth-child para órfão |
| Gradientes |Cinco tons locais da referência |Valores CSS idênticos |Nenhum token global alterado |
| Títulos |25 principal,16 secundário,19 expandido; peso pedido 850 |Mesmos tamanhos/pesos pedidos |Fonte real carregada; 850 resolve ao peso disponível 800 |
| Dias |40px de altura, largura variável |44×44 mínimo, faixa rolável quando necessário |Adaptação de acesso registrada; seta/controle novo não adicionado |
| Preview expandido |Altura conforme conteúdo |+23px no par de conteúdo equivalente |+4px da semana e +19 px do CTA para alvo 44 px |
| Texto de apoio |Cinzas de menor contraste |Cinzas locais reforçados |Axe passa nos cenários testados; revisão visual necessária |
| Menus/Criação |Ações laboratoriais existentes |Controles desabilitados; header oficial sem ação falsa |CRUD fora do lote; nenhum formulário alternativo |
| Motion |340ms, reflow local/FLIP |CSS e interpolação nativa 340 ms, cleanup/reduce |Sem DOM appendChild ou ordem persistida |

Não houve importação de header/TabBar/ícones globais/moldura/fonte fallback/navegação do laboratório. O Shell só é comparado aos contratos P1-R1 pelos testes de regressão, não ao HTML experimental.

## Capturas por largura

Cada par abre arquivos completos. Cabeçalho e navegação não fazem parte do recorte. As imagens são evidências desta implementação, **não novas referências homologadas**.

### 320 px

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Recolhida | [Abrir](evidence/reference-collapsed-320.png) | [Abrir](evidence/react-collapsed-320.png) |
| Principal expandida / quinta | [Abrir](evidence/reference-expanded-320.png) | [Abrir](evidence/react-expanded-320.png) |
| Domingo sem treino | [Abrir](evidence/reference-day-empty-320.png) | [Abrir](evidence/react-day-empty-320.png) |
| Após recolher | [Abrir](evidence/reference-restored-320.png) | [Abrir](evidence/react-restored-320.png) |
| Secundária direita / órfão | [Abrir](evidence/reference-right-expanded-320.png) | [Abrir](evidence/react-right-expanded-320.png) |
| Sem rotinas | [Abrir](evidence/reference-no-routines-320.png) | [Abrir](evidence/react-no-routines-320.png) |

[Referência bruta recolhida, sem fonte injetada](evidence/reference-raw-collapsed-320.png).

### 375 px

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Recolhida | [Abrir](evidence/reference-collapsed-375.png) | [Abrir](evidence/react-collapsed-375.png) |
| Principal expandida / quinta | [Abrir](evidence/reference-expanded-375.png) | [Abrir](evidence/react-expanded-375.png) |
| Domingo sem treino | [Abrir](evidence/reference-day-empty-375.png) | [Abrir](evidence/react-day-empty-375.png) |
| Após recolher | [Abrir](evidence/reference-restored-375.png) | [Abrir](evidence/react-restored-375.png) |
| Secundária direita / órfão | [Abrir](evidence/reference-right-expanded-375.png) | [Abrir](evidence/react-right-expanded-375.png) |
| Sem rotinas | [Abrir](evidence/reference-no-routines-375.png) | [Abrir](evidence/react-no-routines-375.png) |

[Referência bruta recolhida, sem fonte injetada](evidence/reference-raw-collapsed-375.png).

### 390 px

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Recolhida | [Abrir](evidence/reference-collapsed-390.png) | [Abrir](evidence/react-collapsed-390.png) |
| Principal expandida / quinta | [Abrir](evidence/reference-expanded-390.png) | [Abrir](evidence/react-expanded-390.png) |
| Domingo sem treino | [Abrir](evidence/reference-day-empty-390.png) | [Abrir](evidence/react-day-empty-390.png) |
| Após recolher | [Abrir](evidence/reference-restored-390.png) | [Abrir](evidence/react-restored-390.png) |
| Secundária direita / órfão | [Abrir](evidence/reference-right-expanded-390.png) | [Abrir](evidence/react-right-expanded-390.png) |
| Sem rotinas | [Abrir](evidence/reference-no-routines-390.png) | [Abrir](evidence/react-no-routines-390.png) |

[Referência bruta recolhida, sem fonte injetada](evidence/reference-raw-collapsed-390.png).

### 414 px

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Recolhida | [Abrir](evidence/reference-collapsed-414.png) | [Abrir](evidence/react-collapsed-414.png) |
| Principal expandida / quinta | [Abrir](evidence/reference-expanded-414.png) | [Abrir](evidence/react-expanded-414.png) |
| Domingo sem treino | [Abrir](evidence/reference-day-empty-414.png) | [Abrir](evidence/react-day-empty-414.png) |
| Após recolher | [Abrir](evidence/reference-restored-414.png) | [Abrir](evidence/react-restored-414.png) |
| Secundária direita / órfão | [Abrir](evidence/reference-right-expanded-414.png) | [Abrir](evidence/react-right-expanded-414.png) |
| Sem rotinas | [Abrir](evidence/reference-no-routines-414.png) | [Abrir](evidence/react-no-routines-414.png) |

[Referência bruta recolhida, sem fonte injetada](evidence/reference-raw-collapsed-414.png).

### 430 px

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Recolhida | [Abrir](evidence/reference-collapsed-430.png) | [Abrir](evidence/react-collapsed-430.png) |
| Principal expandida / quinta | [Abrir](evidence/reference-expanded-430.png) | [Abrir](evidence/react-expanded-430.png) |
| Domingo sem treino | [Abrir](evidence/reference-day-empty-430.png) | [Abrir](evidence/react-day-empty-430.png) |
| Após recolher | [Abrir](evidence/reference-restored-430.png) | [Abrir](evidence/react-restored-430.png) |
| Secundária direita / órfão | [Abrir](evidence/reference-right-expanded-430.png) | [Abrir](evidence/react-right-expanded-430.png) |
| Sem rotinas | [Abrir](evidence/reference-no-routines-430.png) | [Abrir](evidence/react-no-routines-430.png) |

[Referência bruta recolhida, sem fonte injetada](evidence/reference-raw-collapsed-430.png).

## Deltas que exigem revisão do proprietário

Fonte realmente carregada versus fallback do HTML; nomes/contagens/grupos sintéticos; contraste de textos; alvo/scroll da faixa de dias; CTA 44px e aumento resultante do preview; concordância singular 1 exercício; controles de operações desabilitados; ícone Unicode do estado vazio substituído pelo Lucide Dumbbell exigido; menu expandido coerente com estado React (o HTML insere esse menu somente em alguns caminhos de rerender).

A inspeção humana das capturas verifica composição e densidade; métricas não substituem a homologação visual. Sem QA físico Safari/iPhone, sem comparação de serviços reais ou promessa pixel a pixel. A P2-B4 e operações de rotina continuam pendentes.
