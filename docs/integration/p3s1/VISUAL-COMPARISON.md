# Evidências da Sessão e limites de comparação

HTML histórico v0.3 é **candidato não homologado**, privado, consultado como estudo de composição; não é master a reproduzir nem material autorizado para publicação. As capturas anexadas são exclusivamente da implementação React autoral pública, não da referência privada. Sem alegação de pixel parity ou aprovação estética definitiva.

Aplicadas decisões expressas: exercício em foco, nome destacado, mídia neutra/descanso na mesma área228px, campos gelo, ações curtas no footer, ajuda sob demanda, sem contador textual redundante ou segunda faixa de exercícios. Fonte/ícones/identidade são os existentes no goudduo, não STARKAH.

[Medidas e hashes das capturas](evidence/measurements.json). Coletor reproduzível `tests/qa/capture-session.mjs`, com app build servido localmente em4191. Estados: execução, descanso, pausa, mapa, confirmação parcial, resumo transitório e reload seguro; cinco larguras×844. Cada coleta faz axe, geometria e ausência de overflow/pageerrors. Nenhuma captura privada foi copiada para esta pasta.

## Deltas/gates de refinamento

- Inputs em dois campos e relógio em faixa gelo para legibilidade em320; distribuição final de densidade é passível de refinamento, sem perder alvos44px/fonte16px.
- Sem GIF autorizado: slot neutro, não imagem genérica nem mídia fingida. Integração de mídia depende de direitos e contrato.
- Navegação compacta por chevrons/swipe e Mapa sob demanda; não reproduz o trilho experimental permanente.
- Mapa usa botões de reordenação por toque/teclado. Arrasto avançado não implementado; gate próprio, não promessa de equivalência.
- Finalização sempre confirmada e pausa congela descanso: políticas conservadoras documentadas, não promoção automática de propostas históricas.
- Home/Rotinas ganham ação de início real; acessos de edição continuam. Densidade/fold dessas entradas pode mudar pela nova ação autorizada, sem alterar Bento/tokens/globais.

Corrigir falhas de interação/acesso imediatamente. Ajustes cosméticos restantes pertencem ao refinamento posterior definido pelo proprietário, sem homologação implícita do candidato.

## Capturas React por largura

| Largura | Execução | Descanso | Pausa | Mapa | Confirmação | Resumo | Reload seguro |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 320 | [Abrir](evidence/running-320.png) | [Abrir](evidence/rest-320.png) | [Abrir](evidence/paused-320.png) | [Abrir](evidence/map-320.png) | [Abrir](evidence/finish-confirmation-320.png) | [Abrir](evidence/summary-320.png) | [Abrir](evidence/reload-unavailable-320.png) |
| 375 | [Abrir](evidence/running-375.png) | [Abrir](evidence/rest-375.png) | [Abrir](evidence/paused-375.png) | [Abrir](evidence/map-375.png) | [Abrir](evidence/finish-confirmation-375.png) | [Abrir](evidence/summary-375.png) | [Abrir](evidence/reload-unavailable-375.png) |
| 390 | [Abrir](evidence/running-390.png) | [Abrir](evidence/rest-390.png) | [Abrir](evidence/paused-390.png) | [Abrir](evidence/map-390.png) | [Abrir](evidence/finish-confirmation-390.png) | [Abrir](evidence/summary-390.png) | [Abrir](evidence/reload-unavailable-390.png) |
| 414 | [Abrir](evidence/running-414.png) | [Abrir](evidence/rest-414.png) | [Abrir](evidence/paused-414.png) | [Abrir](evidence/map-414.png) | [Abrir](evidence/finish-confirmation-414.png) | [Abrir](evidence/summary-414.png) | [Abrir](evidence/reload-unavailable-414.png) |
| 430 | [Abrir](evidence/running-430.png) | [Abrir](evidence/rest-430.png) | [Abrir](evidence/paused-430.png) | [Abrir](evidence/map-430.png) | [Abrir](evidence/finish-confirmation-430.png) | [Abrir](evidence/summary-430.png) | [Abrir](evidence/reload-unavailable-430.png) |

O candidato privado foi executado para estudo em390×844, com requisições externas bloqueadas. A transição de mídia para descanso preservou o mesmo retângulo e não produziu pageerror; fontes/ícones/mídias remotas não foram avaliados. Essas capturas privadas permanecem fora do repositório público e não comprovam homologação do candidato.
