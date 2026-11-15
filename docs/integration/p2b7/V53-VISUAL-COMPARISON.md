# Comparação visual — Pulse V5.3

Referência pública fixa073183253fce5fcd0b3474c725e84ff67d3dfec5, blob8c698708dd79449472d6f5c7e536664939de4951, SHA2567cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f. Bytes conferidos, executados localmente sem reconstruir HTML. Disponibilidade externa RawGitHack não presumida.

## Método

Chromium141.0.7390.37 do Playwright, touch/DPR1, larguras320/375/390/414/430×844. Somente região Home/Pulse, sem comparação ao Shell experimental. Cinco capturas reference-raw preservam fonte original; pares normalizam somente FontFaces/font-family públicos de Plus Jakarta Sans no conteúdo Home. Layout/scripts/bytes da referência permanecem intactos. Lab técnico normaliza somente largura/padding do frame para igualar viewport, sem mudar CSS do componente comum.

Quatro estados pareados (Home, linha, próprio e institucional), sete só React (múltiplas identidades sintéticas, visto, não visto neutro pendente, rolado, vazio, um item e retorno de contexto), mais cinco brutas: **80 imagens**, zero pageerrors. Estados técnicos adicionais não têm referência canônica equivalente; não se fabricam screenshots de referência ou dados privados para preencher lacunas. Os anéis experimentais azul/lime/cinza visíveis no HTML não são aprovação de cor.

[Medidas, caixas, origem e hashes](evidence/measurements.json) identificam fontes e SVG da versão capturada. Imagens são evidências P2-B7 para revisão, não homologação visual final ou declaração de pixel parity.

## Geometria observada

| Viewport | Avatar ref/React | Raio ref/React | Gap | Topo do Bento / altura Pulse React | Scroll técnico |
| --- | --- | --- | --- | --- | --- |
| 320 | 54/54px | 18px/18px | 10px | 108.80/108.80px | 202px |
| 375 | 58/58px | 19px/19px | 10px | 112.80/112.80px | 185px |
| 390 | 58/58px | 19px/19px | 10px | 112.80/112.80px | 170px |
| 414 | 58/58px | 19px/19px | 10px | 112.80/112.80px | 146px |
| 430 | 58/58px | 19px/19px | 10px | 112.80/112.80px | 130px |

Bento mantém gutter10/13 e Ranking218px; Pulse substitui a reserva108,8/112,8 sem deslocar o corpo. Aplicação comum tem dois itens que cabem: ausência de deslocamento horizontal nesse caso é correta. Overflow e rolagem são exercitados com o mesmo renderer em cenário técnico longo.

## Deltas explícitos

- Referência tem J/goduoit/Lia/Ravi/Bia e badge1. React deriva inicial P da identidade demonstrativa atual e SVG oficial goudduo, sem pessoas/posts/contador inventados. Restam apenas duas identidades legítimas no app.
- Background/aro dos estados desconhecidos são neutros. Não copiar azul/lime de não visto nem cinza de visto do laboratório. Seen técnico usa gelo#F1F8FB canônico; nonseen técnico conserva identificação semântica e acabamento neutro até homologar stops. Não é afirmada fidelidade cromática de gradiente não implementado.
- SVG oficial cabe no mesmo quadrado, sem palavra reconstruída em fonte nem raster. Legenda institucional atualizada e próprio sem título visível redundante. Legendas técnicas longas usam ellipsis, com nome acessível completo.
- A legenda usa#526B77 existente em vez do#708390 experimental para reforçar contraste, sem alterar tamanho/altura.
- O + é Lucide e o alvo é o botão inteiro54/58px desabilitado; não se cria outro alvo19px ativo. Institucional não vira botão para destino falso. Grupo recebe foco de teclado e outline acessível, sem título visual extra.
- Nenhuma visualização real, upload, viewer ou preferência de ocultação foi implementada. Quantidades/estados técnicos não são publicações.
- Aro gelo de baixo contraste sobre branco continua pendência canônica: screenshots e cor computada registradas sem inventar novo separador/paleta. Não se certifica esse acabamento para produção nem QA físico.

São deltas e limites para revisão do proprietário, sem adiar bugs de scroll, foco, estado ou navegação como cosméticos.

## Capturas

### 320px

[Referência bruta](evidence/reference-raw-320.png)

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Home com Pulse | [Abrir](evidence/reference-home-320.png) | [Abrir](evidence/react-home-320.png) |
| Linha Pulse | [Abrir](evidence/reference-strip-320.png) | [Abrir](evidence/react-strip-320.png) |
| Identidade própria | [Abrir](evidence/reference-own-320.png) | [Abrir](evidence/react-own-320.png) |
| Institucional | [Abrir](evidence/reference-institutional-320.png) | [Abrir](evidence/react-institutional-320.png) |
| Múltiplos — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-multiple-320.png) |
| Visto gelo — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-seen-320.png) |
| Não visto/gradiente pendente — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-unseen-neutral-320.png) |
| Linha rolada — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-scrolled-320.png) |
| Zero identidades — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-empty-320.png) |
| Uma identidade — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-one-320.png) |
| Retorno ao contexto Treinos | Sem equivalente; não reconstruído | [Abrir](evidence/react-context-return-320.png) |

### 375px

[Referência bruta](evidence/reference-raw-375.png)

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Home com Pulse | [Abrir](evidence/reference-home-375.png) | [Abrir](evidence/react-home-375.png) |
| Linha Pulse | [Abrir](evidence/reference-strip-375.png) | [Abrir](evidence/react-strip-375.png) |
| Identidade própria | [Abrir](evidence/reference-own-375.png) | [Abrir](evidence/react-own-375.png) |
| Institucional | [Abrir](evidence/reference-institutional-375.png) | [Abrir](evidence/react-institutional-375.png) |
| Múltiplos — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-multiple-375.png) |
| Visto gelo — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-seen-375.png) |
| Não visto/gradiente pendente — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-unseen-neutral-375.png) |
| Linha rolada — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-scrolled-375.png) |
| Zero identidades — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-empty-375.png) |
| Uma identidade — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-one-375.png) |
| Retorno ao contexto Treinos | Sem equivalente; não reconstruído | [Abrir](evidence/react-context-return-375.png) |

### 390px

[Referência bruta](evidence/reference-raw-390.png)

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Home com Pulse | [Abrir](evidence/reference-home-390.png) | [Abrir](evidence/react-home-390.png) |
| Linha Pulse | [Abrir](evidence/reference-strip-390.png) | [Abrir](evidence/react-strip-390.png) |
| Identidade própria | [Abrir](evidence/reference-own-390.png) | [Abrir](evidence/react-own-390.png) |
| Institucional | [Abrir](evidence/reference-institutional-390.png) | [Abrir](evidence/react-institutional-390.png) |
| Múltiplos — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-multiple-390.png) |
| Visto gelo — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-seen-390.png) |
| Não visto/gradiente pendente — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-unseen-neutral-390.png) |
| Linha rolada — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-scrolled-390.png) |
| Zero identidades — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-empty-390.png) |
| Uma identidade — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-one-390.png) |
| Retorno ao contexto Treinos | Sem equivalente; não reconstruído | [Abrir](evidence/react-context-return-390.png) |

### 414px

[Referência bruta](evidence/reference-raw-414.png)

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Home com Pulse | [Abrir](evidence/reference-home-414.png) | [Abrir](evidence/react-home-414.png) |
| Linha Pulse | [Abrir](evidence/reference-strip-414.png) | [Abrir](evidence/react-strip-414.png) |
| Identidade própria | [Abrir](evidence/reference-own-414.png) | [Abrir](evidence/react-own-414.png) |
| Institucional | [Abrir](evidence/reference-institutional-414.png) | [Abrir](evidence/react-institutional-414.png) |
| Múltiplos — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-multiple-414.png) |
| Visto gelo — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-seen-414.png) |
| Não visto/gradiente pendente — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-unseen-neutral-414.png) |
| Linha rolada — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-scrolled-414.png) |
| Zero identidades — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-empty-414.png) |
| Uma identidade — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-one-414.png) |
| Retorno ao contexto Treinos | Sem equivalente; não reconstruído | [Abrir](evidence/react-context-return-414.png) |

### 430px

[Referência bruta](evidence/reference-raw-430.png)

| Estado | Referência normalizada | React |
| --- | --- | --- |
| Home com Pulse | [Abrir](evidence/reference-home-430.png) | [Abrir](evidence/react-home-430.png) |
| Linha Pulse | [Abrir](evidence/reference-strip-430.png) | [Abrir](evidence/react-strip-430.png) |
| Identidade própria | [Abrir](evidence/reference-own-430.png) | [Abrir](evidence/react-own-430.png) |
| Institucional | [Abrir](evidence/reference-institutional-430.png) | [Abrir](evidence/react-institutional-430.png) |
| Múltiplos — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-multiple-430.png) |
| Visto gelo — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-seen-430.png) |
| Não visto/gradiente pendente — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-unseen-neutral-430.png) |
| Linha rolada — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-scrolled-430.png) |
| Zero identidades — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-empty-430.png) |
| Uma identidade — Lab | Sem equivalente; não reconstruído | [Abrir](evidence/react-one-430.png) |
| Retorno ao contexto Treinos | Sem equivalente; não reconstruído | [Abrir](evidence/react-context-return-430.png) |
