# Finalizada, parcial e descartada

Estado terminal finished significa que a pessoa confirmou o encerramento. Não significa automaticamente que todos os exercícios/séries foram realizados.

| Condição | Descrição factual na UI |
| --- | --- |
| Todas as séries registradas e nenhum exercício pulado | Finalizada · Todas as séries registradas |
| Há registros, mas existe série pendente ou exercício pulado | Finalizada · Com séries não realizadas |
| Encerrada confirmadamente sem registro de série | Finalizada · Sem séries registradas |
| discarded | Não elegível para lista/detalhe de resultados finalizados |
| prepared/running/resting/paused | Não elegível enquanto não finalizada |

Contagens usam exclusivamente recordedAt de cada ExecutedSet. Dados digitados e valores iniciais prescritos não confirmam nada. O detalhe mostra cada slot como realizado com seus valores ou Não realizada. Exercício skipped mostra Pulado, conservando registros parciais anteriores; não conclui as séries restantes.

“Exercícios com séries realizadas” inclui quem tem ao menos uma série registrada, inclusive um exercício depois pulado parcialmente. Essa contagem pode se sobrepor à de pulados; não representa quantidade de exercícios integralmente concluídos nem elegibilidade para métricas. Não inferir desempenho, percentual, pontos, streak ou Ranking.

O domínio corrigido na PR #42 exige confirmed:true para finish/discard sempre, inclusive execução completa. Finalizar repetidamente é idempotente, não duplica sessão/resultado. Sessão finished não recebe novas séries ou volta a executar. A listagem é uma leitura desse estado, sem evento adicional de “registrar resultado”.

Descartada pode manter registro técnico em memória até reset/reload, mas nunca aparece como realização no Histórico. O link genérico Histórico após descarte não muda essa distinção. Não se implementou exclusão permanente ou retenção de produção.
