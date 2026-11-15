# QA visual regional — Histórico e resultados

Não existe master visual homologado específico para estas superfícies. A implementação usa a linguagem atual do goudduo e componentes do Shell, com cartões simples/raios locais, campos readonly e hierarquia legível. HTML privado histórico S1 continua candidato, não referência a copiar. Nenhum CSS, script ou captura privada foi transportado.

Comparação funcional regional: resumo e detalhe do mesmo sessionId usam a mesma projeção, preservando nome/revisão/contagens/valores. O detalhe acrescenta Prescrito/Realizado, slots não realizados e status Pulado; a lista mostra estado factual e finalização local. Não se declara pixel parity nem aprovação estética final.

Coletor `tests/qa/capture-history.mjs`: aplicativo comum servido localmente em4193; cria/finaliza sessões reais do catálogo demo via UI, sem injeção de registros. Estados empty, summary-complete, list-one, detail-complete, summary-partial, list-two, detail-partial e reload-unavailable. Cinco viewports×844, com geometria/overflow/pageerrors/axe em cada captura. [Manifesto de medidas e hashes](evidence/measurements.json).

## Refinamentos posteriores

Densidade/espaçamentos, tipografia local e apresentação de datas/valores podem ser refinados após homologação funcional. Manter alvos44px, contraste, leitura de nomes longos, safe areas e navegação por teclado. Labels factuais completos/parciais não determinam desempenho ou Progresso.

Footer do resumo ganhou links Histórico/Ver resultado em duas colunas e retorno em largura total, sem sobreposição em320. Descarte oferece só Histórico e retorno, sem fingir resultado. A lista descreve data/estado via aria-describedby para distinguir sessões do mesmo nome. Seleção possui aria-current, foco e borda; estado de conclusão é textual, não só cor.

Sem imagens de pessoas, GIFs, ilustrações, logotipos reconstruídos ou novo design system. Não foi alterada a composição de Home/Rotinas/Perfil para acomodar o Histórico. QA físico e acabamento final permanecem pendentes.

## Índice de capturas regionais

| Largura × 844 | Vazio | Resumo completo | Lista / uma sessão | Detalhe completo | Resumo parcial | Lista / duas sessões | Detalhe parcial | Reload sem memória |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 320 | [empty](evidence/empty-320.png) | [summary-complete](evidence/summary-complete-320.png) | [list-one](evidence/list-one-320.png) | [detail-complete](evidence/detail-complete-320.png) | [summary-partial](evidence/summary-partial-320.png) | [list-two](evidence/list-two-320.png) | [detail-partial](evidence/detail-partial-320.png) | [reload-unavailable](evidence/reload-unavailable-320.png) |
| 375 | [empty](evidence/empty-375.png) | [summary-complete](evidence/summary-complete-375.png) | [list-one](evidence/list-one-375.png) | [detail-complete](evidence/detail-complete-375.png) | [summary-partial](evidence/summary-partial-375.png) | [list-two](evidence/list-two-375.png) | [detail-partial](evidence/detail-partial-375.png) | [reload-unavailable](evidence/reload-unavailable-375.png) |
| 390 | [empty](evidence/empty-390.png) | [summary-complete](evidence/summary-complete-390.png) | [list-one](evidence/list-one-390.png) | [detail-complete](evidence/detail-complete-390.png) | [summary-partial](evidence/summary-partial-390.png) | [list-two](evidence/list-two-390.png) | [detail-partial](evidence/detail-partial-390.png) | [reload-unavailable](evidence/reload-unavailable-390.png) |
| 414 | [empty](evidence/empty-414.png) | [summary-complete](evidence/summary-complete-414.png) | [list-one](evidence/list-one-414.png) | [detail-complete](evidence/detail-complete-414.png) | [summary-partial](evidence/summary-partial-414.png) | [list-two](evidence/list-two-414.png) | [detail-partial](evidence/detail-partial-414.png) | [reload-unavailable](evidence/reload-unavailable-414.png) |
| 430 | [empty](evidence/empty-430.png) | [summary-complete](evidence/summary-complete-430.png) | [list-one](evidence/list-one-430.png) | [detail-complete](evidence/detail-complete-430.png) | [summary-partial](evidence/summary-partial-430.png) | [list-two](evidence/list-two-430.png) | [detail-partial](evidence/detail-partial-430.png) | [reload-unavailable](evidence/reload-unavailable-430.png) |

As capturas representam o estado e o relógio locais da execução, não dados de saúde reais. Medidas, versão do navegador, SHA256 de cada PNG e hashes das fontes estão em measurements.json. O [relatório de escopo](evidence/scope-and-test-audit.json) registra os arquivos protegidos e as validações locais.
