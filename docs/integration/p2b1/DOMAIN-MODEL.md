# Modelo de domínio implementado

Contratos independentes em `src/domain/training.ts`; coleções em `src/state/model.ts`. Fontes de comportamento: [Rotinas #28](https://github.com/jukazilli/goudduo/issues/28), [contrato V7.4](../p2a/ROTINAS-V74-FIDELIDADE.md), [plano aprovado documentalmente](../p2a/PLANO-P2B.md). HTML V7.4 `3f8b2c7c93a33a713c780305e672e1ec7998ceaf`; Home `073183253fce5fcd0b3474c725e84ff67d3dfec5`. Nenhum script HTML foi transportado.

| Entidade | Identidade e relações | Implementação e limite |
| --- | --- | --- |
| DemoUser | id, displayName, professional=not_requested | Sem autenticação, verificação ou capacidades profissionais |
| Exercise | id de catálogo, nome; medições/equipmentIds/muscleGroupIds/authorId opcionais | Definição reutilizável, não instância nem catálogo comercial completo |
| Equipment / MuscleGroup | id e nome, coleções próprias | Referências sintéticas; sem fotografias, catálogo real ou taxonomia privada |
| WorkoutExercise | id da instância + exerciseId do catálogo | Parâmetros por treino, ordem do array; substitutos são IDs de catálogo |
| Workout | id, nome final, revision, exercises, authorId opcional | Prescrição salva; uma coleção por ID |
| Routine | id, nome, days; modality/cover opcionais | Organização semanal; capa é somente asset-reference/assetId, sem URL, upload ou autorização implícita |
| TrainingDay | par estável (routineId, weekday), workoutId ou null | Projeção da associação em Routine.days; não existe segunda coleção divergente |
| WorkoutDraft | draftId, workoutId, rotina/dia, revisão base e vínculo original | Alterações isoladas, nunca entidade salva concorrente |
| SessionPrescription | workoutId/revision/rotina/dia e snapshot dos itens | Entrada futura, sem sessão iniciada nem execução salva |
| ExerciseExecution | prescriptionItemId e valores executados | Tipo mínimo separado; não há reducer, registro ou histórico operacional |

## Parâmetros e unidades

Base: séries inteiras positivas, descanso em segundos inteiros >=0, equipamento por ID ou null, carga opcional em kg finita >=0, alternativas por IDs distintos existentes. A medição é uma união discriminada:

- `repetitions` (ou ausência por compatibilidade P1): repsMin/repsMax inteiros, mínimo >=0, máximo >=mínimo.
- `time`: durationSeconds finito >0; não exige repetições.
- `distance`: distanceMeters finito >0; não exige repetições nem duração.

O modelo não calcula equivalências, velocidade ou cargas recomendadas. Combinações simultâneas de metas e regras avançadas de substitutos permanecem para contratos futuros; os tipos atuais preservam capacidades básicas de tempo/distância sem restaurar strings livres. Adapters futuros devem tratar unidades explicitamente e demonstrar round-trip antes de migrar qualquer dado legado.

A ausência de restrições opcionais no catálogo significa metadado não informado, não autorização profissional. Quando presentes, equipamentos, músculos e tipos de medição são validados. Autoria é referência descritiva, sem habilitação ou selo; não há importador público de catálogo ou mídia nesta fase.

## Identidade e ordem

IDs são fornecidos pelo chamador: o reducer não usa relógio ou números aleatórios. Prescrições mantêm IDs ao editar/reordenar; catálogo e instância não são intercambiáveis. O mesmo exercício pode existir em treinos diferentes, com parâmetros diferentes. No mesmo treino, repetir exerciseId é bloqueado independentemente de nome, acento ou ID da instância. Séries são volume da instância, não duplicatas de catálogo. Colisão de ID da instância é erro de prescrição distinto de exercício duplicado.

Ordem das instâncias é o array da prescrição. Reordenação aceita somente permutação exata dos IDs. Não foram implementados reflow de Bento, ordem visual de widgets ou arraste.

## Cópia e referência por dia — pendência preservada

`Routine.days` referencia Workout.id; dois dias podem representar a mesma entidade sem duplicá-la. Treinos com IDs diferentes são independentes. `DayAssignmentIntent` nomeia as alternativas reference/independent-copy, mas **nenhuma ação ativa essa escolha automaticamente**. Abrir um dia vazio exige um workoutId novo; não reutiliza um treino existente implicitamente.

Se há mais de uma associação ao mesmo workoutId, salvar/renomear é bloqueado. O proprietário precisa decidir quando compartilhar, criar cópia, preservar IDs internos e oferecer confirmação de propagação. A edição de um dia não pode afetar outro silenciosamente. O bloqueio também considera associações em rotinas diferentes.

Cancelar rascunho desfaz alterações não salvas. Desvincular dia remove somente a associação, com revisão esperada, sem apagar treino compartilhável. Não há exclusão em cascata/garbage collection. Não existe histórico de undo de versões salvas: eventual reversão será nova edição/revisão, sem diminuir revision; UX e retenção desse histórico exigem contrato próprio.
