# Fluxo de salvamento e cancelamento V7.4

O Editor consome as ações existentes do reducer através de useRoutineEditorAdapter. Não há segundo estado salvo, validação concorrente ou sucesso antecipado.

| Situação/ação | Transição real | Estado salvo |
| --- | --- | --- |
| Campo editado | draft/update | Intacto |
| Remover/reordenar | draft/remove / draft/reorder | Intacto |
| Zero exercícios | Check desabilitado; estado vazio claro | Sem criação fictícia |
| Parâmetro inválido | validateDraft bloqueia; erro tipado apresentado | Intacto |
| Um exercício válido | draft/prepare → confirm-single | Intacto |
| Continuar editando | draft/resume e fechamento | Intacto; draft preservado |
| Salvar assim mesmo | draft/confirm-single → naming | Intacto |
| Dois ou mais válidos | draft/prepare → naming | Intacto |
| Nomeação | Nome salvo ou sugestão pelo dia; texto editável | Nada gravado ainda |
| Nome inválido | validateWorkoutName compartilhada bloqueia; reducer revalida no commit | Intacto |
| Salvar treino | draft/commit revalida relações, revisão, prescrição e nome | Commit atômico; revisão base+1 |
| Sucesso real | Draft removido pelo reducer e entidade/revisão confirmadas pelo adapter | Retorno à origem e Home Rotinas atualizada |
| Cancelar nomeação | Retoma edição | Nenhum commit parcial |
| Voltar do Editor | Navegação existente | Draft permanece em memória |
| Solicitar descarte | Abre routine-discard no host existente | Nenhuma mudança |
| Continuar na confirmação | Retoma edição/fecha painel | Draft e salvos intactos |
| Confirmar descarte | cancelEditing(true) → draft/cancel do próprio ID | Salvos e outros drafts preservados |

A política de nome foi extraída da condição existente do reducer para validateWorkoutName/WORKOUT_NAME_MAX_LENGTH. A UI usa a mesma função/limite; 100 versus 60 do HTML continua gate de produto, sem alteração de regra nesta missão.

Revisão obsoleta, mudança de vínculo e shared-workout-pending não são contornados. O rascunho inválido continua disponível para inspeção, sem substituir o salvo. Nenhuma notificação de sucesso é exibida antes do resultado do reducer.

Dia sem treino usa workoutId novo e draft vazio, sem vínculo salvo. Enquanto Biblioteca P2-B5 não existe, Adicionar exercício informa indisponibilidade no produto. A criação completa de treino novo só é exercitada com consumidor técnico isolado no Lab/testes; não é declarada concluída na experiência comum.

Após reload, o contexto efêmero desaparece conforme P1/P2-B2: fallback sem Salvar, sem reconstruir draft ou escolher rotina/dia por adivinhação. Não foi adicionada persistência.
