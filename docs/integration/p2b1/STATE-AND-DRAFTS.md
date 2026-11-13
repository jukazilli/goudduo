# Estado, rascunhos e validação

`DemoProvider` continua com um único useReducer e os mesmos contextos de estado/dispatch. `demoReducer` delega ações de treinamento a `reduceTraining`; essa função é parte do mesmo reducer, não store independente. Não foram alterados provider, Shell, rotas ou consumidores visuais.

Coleções salvas: exercises/equipment/muscleGroups/workouts/routines. primaryRoutineId identifica a principal; selectedDayByRoutine mantém contexto demonstrativo de dia. drafts contém somente alterações em elaboração. social/user continuam preservados em cada transição de treinamento. scenario/reset cria fixtures novas e determinísticas.

## Ciclo implementado

| Ação | Efeito |
| --- | --- |
| routine/create | Rotina vazia por ID novo, metadados clonados; primeira vira principal se não existe principal |
| training/select | Seleciona dia de rotina existente; não altera navegação/browser history |
| training/unlink | Remove vínculo dia/treino somente se ID e revisão correspondem; não exclui prescrição |
| draft/open | Copia parâmetros para draftId novo; captura revisão base e vínculo original; rascunhos paralelos têm IDs distintos |
| draft/add/update/remove/replace-exercises | Modifica somente rascunho; clona arrays/alternativas do chamador; retorna à etapa editing |
| draft/reorder | Permutação exata de IDs; mantém parâmetros e identidades |
| draft/prepare | Valida relações/revisão/prescrição; vazio bloqueado, um → confirm-single, >=2 → naming |
| draft/confirm-single | Confirma explicitamente um exercício, habilitando naming; nenhum popup é criado |
| draft/resume | Continuar editando sem perder parâmetros/IDs; descarta gate de confirmação/nomeação |
| draft/commit | Recebe nome final, revalida tudo, salva revisão +1 e vínculo atomicamente; remove rascunho |
| draft/cancel | Descarta somente o rascunho, incluindo cancelamento na etapa final |

Edição posterior à confirmação invalida o gate, exigindo prepare/confirm novamente. Nome não faz parte do rascunho nem é solicitado ao abrir; entra apenas no commit da etapa final. Sugestão de nome por dia pertence ao futuro adapter, não é criada pelo domínio. Nenhum fallback de exercício ou nome é inventado.

## Atomicidade e concorrência

Rejeições não alteram referências das coleções salvas. Podem apenas registrar `draft.issue`, para a futura UI explicar a falha. Commit válido clona instâncias/alternativas e atualiza workouts + associação em uma transição. Nenhuma tela mantém outra cópia salva. Duas edições da mesma revisão podem coexistir; após a primeira salvar, a segunda recebe stale-revision e mantém seus dados não salvos. Mudança do vínculo desde a abertura recebe binding-changed.

Erros tipados: empty, invalid-prescription, duplicate-exercise, name-required, stale-revision, binding-changed, shared-workout-pending, confirmation-required e prepare-required. Zero nunca grava. Um requer confirmação. Múltiplos requerem prepare. Nome vazio/apenas espaços ou >100 caracteres é inválido. Revisão não é fornecida arbitrariamente no commit de rascunho: é baseRevision+1 após comparar com a versão salva.

Mapas verificam propriedades próprias; nomes herdados como constructor/toString não se tornam entidades de catálogo/rotina. Relações de equipamento/músculo/substitutos e limites numéricos são validados. Não é uma API de ingestão de JSON não confiável: ações são contratos TypeScript internos; um futuro backend/importador precisará de schema de entrada próprio.

## Compatibilidade da P1

A ação antiga workout/commit continua atendendo ao botão já existente do Lab, **somente para renomear o mesmo treino no mesmo dia, mantendo a prescrição e incrementando revisão**. Não cria treino, não edita exercícios, não cria associação em outro dia e não propaga por vínculos compartilhados. O antigo teste que atualizava implicitamente dois dias foi substituído por verificações explícitas de bloqueio e independência. Demais testes e Lab permanecem preservados. Novas superfícies devem usar o ciclo de rascunho; esse adapter não é uma segunda API de salvamento de prescrição.

## Seletores

selectPrimaryRoutine e selectWorkoutForDay retornam as entidades salvas por referência. selectTrainingDay deriva o vínculo. selectHomeTraining deriva status ready/no-valid-workout, rotina/dia, treino, nome, contagem, revisão e prescriptionId; não guarda cache nem clone do treino. Dia sem prescrição válida tem estado vazio explícito. Desvinculação/salvamento aparecem imediatamente aos consumidores do mesmo estado.

selectSessionPrescription é a exceção deliberada de snapshot: clona os parâmetros e fixa workoutId/revision para futura sessão não mudar durante execução. Não cria sessão, inicia treino, registra execução nem autoriza persistência. Nenhuma senha, foto corporal ou dado de saúde é salvo em localStorage; não há persistência de qualquer entidade nesta fase.
