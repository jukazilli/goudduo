# Contrato de domínio de sessão

Código autoral independente: `src/domain/session.ts`, `src/state/session.ts`. `DemoState` recebe trainingSessions e activeTrainingSessionId; demoReducer delega ações session/* ao mesmo estado. Não há provider/store paralelo. SessionPrescription e selectSessionPrescription existentes continuam sendo a fronteira de leitura do treino salvo; ExerciseExecution anterior era um contrato agregado preparatório, não um motor a duplicar.

## Identidades e snapshot

SessionId opaco próprio (UUID no consumidor, diferente de workoutId), userId demonstrativo, rotina/dia/workout/revision capturados; workoutName e nomes de catálogo congelados para apresentação. Snapshot clona as instâncias prescritas e listas de substitutos. SessionExercise tem ID próprio, prescriptionItemId e exerciseId; cada ExecutedSet tem ID estável e índice da série prescrita. Nome nunca é identificador.

A ordem inicial corresponde ao array prescrito; order da sessão pode mudar sem reescrever prescription.exercises, workout.exercises ou rotina. Cada instância conserva selectedSetId, valores não confirmados e recordedAt somente depois de Concluir série. SessionPrescription permanece isolado mesmo após commit do Editor para revisão nova.

## Estados/transições

| Estado | Transições válidas |
| --- | --- |
| prepared | start→running; encerramento/descarte confirmado sem execução |
| running | record→resting se restSeconds>0, senão running; pause; skip; finish/discard |
| resting | skip/expire→running; pause; finish/discard |
| paused | resume→resting com saldo ou running; finish/discard |
| finished/discarded | Terminais; nenhuma escrita, retomada ou finalização repetida |

Seleção de exercício/série e reordenação são locais à execução e podem ser consultadas em pausa; escrita de valores/registro exige running e identidade do exercício/série selecionados. Deadline expirado só termina o descanso; não conclui série/exercício/sessão.

Uma única sessão prepared/running/resting/paused por estado em memória. Criação concorrente/ID repetido é rejeitada; ACK do reducer precede navegação. Contexto compatível significa mesma rotina/dia/workoutId; revisão salva mais recente não substitui snapshot ativo. Contexto diferente oferece retomar a sessão existente, sem sobrescrever.

Tempos são timestamps inteiros seguros; eventos retroativos, NaN/Infinity e IDs incompatíveis com rota são rejeitados. Limite técnico de proteção do protótipo: máximo1000 séries alocadas por sessão e deadline representável com precisão inteira; isso não define limite profissional de produto. Falha de criação não apresenta sucesso nem navega para ID inexistente.

Dados somente em memória. Tabela de sessões terminais permite consultar o resumo durante a mesma execução do aplicativo; não constitui serviço de Histórico, classificação, sincronização ou recuperação persistente.

## Correção preventiva antes da homologação — P3-S2

Toda ação session/finish e session/discard exige **confirmed:true** no reducer, inclusive execução completa. A interface já exigia confirmação, mas o domínio ainda aceitava false quando complete=true; essa exceção foi removida. A negativa é um no-op atômico e mantém a sessão ativa. Confirmação positiva preserva registros e idempotência terminal. Sem mudança nas demais políticas ou UI.
