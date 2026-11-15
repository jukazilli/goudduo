# Comparação visual — Home V5.3

Referência pública fixa073183253fce5fcd0b3474c725e84ff67d3dfec5, blob8c698708dd79449472d6f5c7e536664939de4951, SHA2567cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f. Bytes conferidos e executados por servidor local; não se presumiu disponibilidade externa do RawGitHack nem se reconstruiu o HTML. A referência continua fora de src/main.

## Método

Chromium141.0.7390.37 do pacote Playwright, touch/DPR1, larguras320/375/390/414/430×844. Capturas de viewport apenas #screen/#main-content, excluindo chrome experimental; Hero isolado em seu estado válido/vazio. O Shell React é avaliado por contratos P1-R1, não por comparação ao chrome HTML. Alturas úteis diferem legitimamente; não se impôs screen622/frame820 ao app.

Cinco imagens reference-raw preservam renderização original. Para pares, o harness carrega os mesmos FontFaces públicos Plus Jakarta Sans400/500/600/700/800 e aplica somente font-family no conteúdo Home da referência. Bytes/layout/scripts originais não são modificados; não é uma alegação sobre a fonte de sistema original. A fonte pode mudar a altura de texto e é explicitamente normalizada, não ocultada.

São seis estados pareados por largura e dois só React, mais cinco brutas: **75 capturas**, zero pageerrors na coleta. Não existe equivalente canônico de Hero vazio/Progresso neutro; não se fabricou referência para esses estados. Dataset de exemplos HTML difere de entidades demonstrativas atuais e de métricas intencionalmente ausentes. Capturas são evidências P2-B6, não nova homologação visual ou paridade pixel a pixel.

[Medidas, origem e hashes das fontes/capturas](evidence/measurements.json).

## Geometria observada

| Largura | Ranking ref/React | Status ref/React | Peso ref/React | Hero ref/React | Órfão ref/React |
| --- | --- | --- | --- | --- | --- |
| 320 | 218.00/218.00px | 105.00/105.00px | 105.00/105.00px | 236.00/240.03px | 300/300px |
| 375 | 218.00/218.00px | 103.75/104.00px | 104.25/104.00px | 236.00/247.50px | 349/349px |
| 390 | 218.00/218.00px | 103.75/104.00px | 104.25/104.00px | 236.00/247.50px | 364/364px |
| 414 | 218.00/218.00px | 103.75/104.00px | 104.25/104.00px | 236.00/247.50px | 388/388px |
| 430 | 218.00/218.00px | 103.75/104.00px | 104.25/104.00px | 236.00/247.50px | 404/404px |

Gutter10/gap8 em320 e13/10 nas demais; Ranking218; raios23/hero26; cores locais e distribuição assimétrica preservados. Secundários144 e faixa99px. Ranking/Status/Peso neutralizados mantêm footprint; não há números para fingir métricas disponíveis.

## Deltas para revisão e refinamento

- Pulse funcional ausente por escopo: apenas espaço vazio equivalente ao posicionamento, sem falsos avatares/pessoas. Não é defeito escondido por recorte: aparece nas capturas iniciais.
- Títulos/valores neutros substituem pontuação, feedback de Ravi, peso, fotos/PRs/streak fictícios. Não se reproduzem formulários/charts experimentais; painéis abertos são menores porque mostram somente indisponibilidade.
- Hero cresce4–11,5px nesta fixture para acomodar metadados legítimos da rotina/dia e contagem com Jakarta. Mínimo236, sem recortar nomes longos ou fixar altura máxima. CTA Ver treino corresponde a Rotinas real, enquanto Começar treino no HTML era mock.
- Dois indicadores atuais correspondem a dois IDs válidos da rotina principal; não se fabricou terceiro treino. Hit areas44px versus dots7/19px visuais; podem quebrar de linha com mais itens legítimos.
- Fechar44px/Lucide versus X29px do HTML; controles/contraste/foco acessíveis. Ícones de widgets são Lucide existentes, sem SVGs manuais do laboratório; Peso usa Weight e Recordes Medal. Nenhum ícone global foi alterado.
- Status Em construção preservado; link da Issue privada permanece só documental por guard de bundle, conforme [contrato](HOME-V53-CONTRACT.md).
- Biblioteca independente permanece indisponível em expansão neutra, não redirecionada ao sheet do Editor. Sem rota alternativa fictícia.
- Reflow400/reveal360/280 locais, preferência reduzida e ciclo global de overlays intactos. Capturas não comprovam performance física/gestos de iPhone.

Nenhum corte, sobreposição, falha de navegação ou erro de estado é classificado como diferença cosmética. QA físico e homologação de acabamento pertencem à etapa posterior.

## Capturas por largura

### 320px

[Referência bruta](evidence/reference-raw-320.png)

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Home inicial | [Abrir](evidence/reference-initial-320.png) | [Abrir](evidence/react-initial-320.png) |
| Ranking expandido | [Abrir](evidence/reference-ranking-expanded-320.png) | [Abrir](evidence/react-ranking-expanded-320.png) |
| Status expandido | [Abrir](evidence/reference-status-expanded-320.png) | [Abrir](evidence/react-status-expanded-320.png) |
| Hero válido | [Abrir](evidence/reference-hero-valid-320.png) | [Abrir](evidence/react-hero-valid-320.png) |
| Inferior expandido/reflow | [Abrir](evidence/reference-lower-expanded-320.png) | [Abrir](evidence/react-lower-expanded-320.png) |
| Ordem restaurada | [Abrir](evidence/reference-restored-320.png) | [Abrir](evidence/react-restored-320.png) |
| Hero sem treino | Sem equivalente; não reconstruído | [Abrir](evidence/react-hero-empty-320.png) |
| Progresso neutro | Sem equivalente; não reconstruído | [Abrir](evidence/react-progress-neutral-320.png) |

### 375px

[Referência bruta](evidence/reference-raw-375.png)

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Home inicial | [Abrir](evidence/reference-initial-375.png) | [Abrir](evidence/react-initial-375.png) |
| Ranking expandido | [Abrir](evidence/reference-ranking-expanded-375.png) | [Abrir](evidence/react-ranking-expanded-375.png) |
| Status expandido | [Abrir](evidence/reference-status-expanded-375.png) | [Abrir](evidence/react-status-expanded-375.png) |
| Hero válido | [Abrir](evidence/reference-hero-valid-375.png) | [Abrir](evidence/react-hero-valid-375.png) |
| Inferior expandido/reflow | [Abrir](evidence/reference-lower-expanded-375.png) | [Abrir](evidence/react-lower-expanded-375.png) |
| Ordem restaurada | [Abrir](evidence/reference-restored-375.png) | [Abrir](evidence/react-restored-375.png) |
| Hero sem treino | Sem equivalente; não reconstruído | [Abrir](evidence/react-hero-empty-375.png) |
| Progresso neutro | Sem equivalente; não reconstruído | [Abrir](evidence/react-progress-neutral-375.png) |

### 390px

[Referência bruta](evidence/reference-raw-390.png)

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Home inicial | [Abrir](evidence/reference-initial-390.png) | [Abrir](evidence/react-initial-390.png) |
| Ranking expandido | [Abrir](evidence/reference-ranking-expanded-390.png) | [Abrir](evidence/react-ranking-expanded-390.png) |
| Status expandido | [Abrir](evidence/reference-status-expanded-390.png) | [Abrir](evidence/react-status-expanded-390.png) |
| Hero válido | [Abrir](evidence/reference-hero-valid-390.png) | [Abrir](evidence/react-hero-valid-390.png) |
| Inferior expandido/reflow | [Abrir](evidence/reference-lower-expanded-390.png) | [Abrir](evidence/react-lower-expanded-390.png) |
| Ordem restaurada | [Abrir](evidence/reference-restored-390.png) | [Abrir](evidence/react-restored-390.png) |
| Hero sem treino | Sem equivalente; não reconstruído | [Abrir](evidence/react-hero-empty-390.png) |
| Progresso neutro | Sem equivalente; não reconstruído | [Abrir](evidence/react-progress-neutral-390.png) |

### 414px

[Referência bruta](evidence/reference-raw-414.png)

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Home inicial | [Abrir](evidence/reference-initial-414.png) | [Abrir](evidence/react-initial-414.png) |
| Ranking expandido | [Abrir](evidence/reference-ranking-expanded-414.png) | [Abrir](evidence/react-ranking-expanded-414.png) |
| Status expandido | [Abrir](evidence/reference-status-expanded-414.png) | [Abrir](evidence/react-status-expanded-414.png) |
| Hero válido | [Abrir](evidence/reference-hero-valid-414.png) | [Abrir](evidence/react-hero-valid-414.png) |
| Inferior expandido/reflow | [Abrir](evidence/reference-lower-expanded-414.png) | [Abrir](evidence/react-lower-expanded-414.png) |
| Ordem restaurada | [Abrir](evidence/reference-restored-414.png) | [Abrir](evidence/react-restored-414.png) |
| Hero sem treino | Sem equivalente; não reconstruído | [Abrir](evidence/react-hero-empty-414.png) |
| Progresso neutro | Sem equivalente; não reconstruído | [Abrir](evidence/react-progress-neutral-414.png) |

### 430px

[Referência bruta](evidence/reference-raw-430.png)

| Estado | Referência com fonte normalizada | React |
| --- | --- | --- |
| Home inicial | [Abrir](evidence/reference-initial-430.png) | [Abrir](evidence/react-initial-430.png) |
| Ranking expandido | [Abrir](evidence/reference-ranking-expanded-430.png) | [Abrir](evidence/react-ranking-expanded-430.png) |
| Status expandido | [Abrir](evidence/reference-status-expanded-430.png) | [Abrir](evidence/react-status-expanded-430.png) |
| Hero válido | [Abrir](evidence/reference-hero-valid-430.png) | [Abrir](evidence/react-hero-valid-430.png) |
| Inferior expandido/reflow | [Abrir](evidence/reference-lower-expanded-430.png) | [Abrir](evidence/react-lower-expanded-430.png) |
| Ordem restaurada | [Abrir](evidence/reference-restored-430.png) | [Abrir](evidence/react-restored-430.png) |
| Hero sem treino | Sem equivalente; não reconstruído | [Abrir](evidence/react-hero-empty-430.png) |
| Progresso neutro | Sem equivalente; não reconstruído | [Abrir](evidence/react-progress-neutral-430.png) |
