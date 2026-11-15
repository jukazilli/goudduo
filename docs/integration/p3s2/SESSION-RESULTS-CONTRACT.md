# Contrato de resultado readonly

`src/domain/session-result.ts` define SessionResult, ResultExercise e ResultSet. `src/state/session-results.ts` fornece selectSessionResult e selectSessionHistory. São projeções puras derivadas de TrainingSession, não entidades salvas em outro store.

O tipo de entrada do selector permite somente user e trainingSessions; ele não lê Workout, Editor, catálogo ou rotina atual para reconstruir execução passada. Antes de projetar, valida ID opaco/chave correspondente, userId do titular atual, status finished e endedAt utilizável. Ausente, inválida, alheia, ativa ou discarded retorna undefined; não há fallback para prescrição.

## Campos

| Grupo | Origem / significado |
| --- | --- |
| Identidade | sessionId, userId, workoutId, revision, routineId, day e workoutName capturados na Sessão |
| Tempo | startedAt/endedAt efetivos e activeMs congelado na finalização |
| Estado factual | complete, partial ou no-records; sem pontuação ou elegibilidade |
| Contagens | Séries registradas/não registradas; exercícios com séries realizadas e pulados |
| Exercício | ID da execução, prescriptionItemId, exerciseId, nome e prescribed do snapshot |
| Série | ID/índice, recordedAt e actual somente quando há registro confirmado |

Prescribed mantém os parâmetros do snapshot original. Actual é null se recordedAt estiver ausente, mesmo que o campo de execução tenha valor preenchido. NaN/valores intermediários de slots não confirmados não viram resultado. Para os confirmados, usa valores validados pelo reducer. Repetições, carga, segundos e metros não são convertidos entre si.

sessionSummary existente continua fonte da classificação/contagens; resumo pós-finalização e detalhe consomem a mesma projeção. O resumo de descarte permanece distinto, sem virar resultado finalizado. Arrays projetados são efêmeros e tipos readonly; referências aos dados autoritativos não são gravadas nem editadas pelas superfícies.

Histórico ordena endedAt decrescente e ID ASCII crescente em empate, sem depender da ordem das propriedades do objeto. Mesmo Workout pode ter várias execuções com sessionIds próprios; nenhuma duplicata é criada para o mesmo ID. Datas mostram horário local do navegador, com dateTime ISO no elemento time; não são inferidas do dia semanal do plano. Tempo ativo segue a política S1, sem cálculo de novas métricas.
