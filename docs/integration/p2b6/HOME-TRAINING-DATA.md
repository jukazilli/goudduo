# Prescrição única, seleção e navegação

Home usa **selectHomeTraining**, que já combina selectPrimaryRoutine, selectTrainingDay e selectWorkoutForDay/validatePrescription. Não houve alteração desses seletores, entidades, reducer ou fixtures. Hero lê o mesmo Workout salvo por ID/revisão, nome e contagem de instâncias; não copia prescrição para state/effect/localStorage.

Quando a rotina principal ou associação/prescrição não é válida, o Hero mostra Sem treino e Organizar treinos. Um dia livre continua livre mesmo se outros dias tiverem treino. Não há fallback silencioso para esconder vínculo inválido. Sem rotina não se cria uma automaticamente.

## Indicadores legítimos

A IIFE pública selecionava três strings hardcoded. `selectHeroChoices` deriva dias válidos da rotina principal em ordem semanal, uma entrada por Workout.id, conservando a entidade por referência. Não há três exemplos independentes. A fixture atual tem dois itens legítimos; novos salvos podem ampliar a lista. Lista de tamanho0/1 não precisa de seletores. Um dia vazio pode ter nenhuma opção pressionada; não muda a seleção só para preencher o card.

Se dois dias compartilham a mesma entidade, o seletor não a duplica e prioriza o dia explicitamente selecionado para sua representação. Isso não ativa política de cópia/propagação. shared-workout-pending continua bloqueando gravações ambíguas no reducer.

Clique/swipe despacha somente training/select no mesmo provider. Revisão e título são sempre os atuais. selectSessionPrescription permanece contrato futuro separado; não há motor de Sessão ou registro de execução nesta fase.

## Jornada real

1. Hero Ver treino/Organizar treinos chama a navegação existente para Rotinas e expande a rotina principal, mantendo selectedDayByRoutine.
2. Rotinas resolve a mesma associação; Ver treino/Adicionar treino usa openEditor/contexto/draft homologados, sem URL de saúde ou treino serializado.
3. Editor/Biblioteca P2-B5 trabalham no rascunho; Home continua representando o salvo até commit válido.
4. Confirmação de um/nomeação final/commit/retorno existentes atualizam a entidade e revisão.
5. Ao voltar pela TabBar, o Hero reconhece a mesma identidade e o novo conteúdo. Não há assinatura, polling ou cache extra.

O CTA foi rotulado **Ver treino** porque a Sessão não existe; não informa Começar/Iniciado falsamente. O destino real é Rotinas, não uma cópia da rota mock. Nenhum novo payload precisa duplicar workoutId/revisão: associação e seleção estão no domínio único, e o Editor captura o contexto/revisão ao abrir. Back e contexto/scroll permanecem no BrowserNavigation; Home ativa mantém retorno ao topo da TabBar.

PrototypeApp guarda somente homeExpanded e o expandedId de Rotinas já existente. Trocar Treinos/Publicações/Business não gera outra store nem limpa social/user/drafts. Publicações/Business continuam seus consumidores anteriores. Estado em memória é perdido após reload conforme fundação; não foi acrescentada persistência para disfarçar esse limite.
