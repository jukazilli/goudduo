# Auditoria de arquitetura

Inspeção do estado integrado, não somente de documentação anterior. Nenhuma alteração em src de produção nesta missão.

| Responsabilidade | Implementação verificada | Limite |
| --- | --- | --- |
| Bootstrap | src/main.tsx: um DemoProvider e um NavigationProvider em StrictMode | StrictMode não é um segundo store |
| Estado | DemoProvider usa um useReducer/demoReducer; reduceTraining delega ao mesmo estado | Fixtures sintéticas, volátil |
| Entidades | domain/training.ts, state/model.ts e tabelas normalizadas | Catálogo ≠ instância prescrita |
| Rascunhos | state/training.ts, clone/validate/commit atômico | NaN é intermediário em memória, nunca dado salvo válido |
| Consumo Home/Rotinas | state/selectors.ts; selectHomeTraining devolve mesma entidade salva | Home mostra rotina principal, não promove secundária silenciosamente |
| Shell/Header/TabBar | AppShell, ShellHeader, TabBar, surface-contracts | Cinco destinos, Match central; três contextos Home |
| Navegação | BrowserNavigation + NavigationProvider, History API | Contexto de Editor efêmero, URL só IDs; reload é seguro, não persistência |
| Editor | useRoutineEditorAdapter + RoutineEditorContext | Header real, prepare/confirm/name antes do commit |
| Overlays | Um OverlayHost/portal no AppShell | Conteúdo retido na saída; sem React em history.state |
| Biblioteca | ContextualExerciseLibrary, factory/libraryMatches | Só draft/add; added deriva do draft, sem catálogo concorrente |
| Home/Pulse | HomeTraining + TrainingPulseRegion via HomeCompositions | Treinos squircle; Publicações circle em contrato, sem Feed portado |
| Apresentação | Expansões React e refs de scroll | Não duplicam prescrição/revisão/ordem salva |
| Lab | Entrada/build independente | Fixtures técnicas não entram no bundle comum |

`selectSessionPrescription` cria snapshot para compatibilidade futura: é fronteira explícita para execução, não outro cache salvo ou Sessão operacional. Estado local de texto de input/query/índice ativo e intenções pendentes de acknowledgement não é fonte concorrente de entidades.

Rotas diretas para superfícies futuras retornam placeholders honestos; não configuram uma jornada Auth implementada. Sem router adicional, backend ou persistência. Voltar conserva draft; somente descarte confirmado o remove. Erros stale-revision, binding-changed e shared-workout-pending continuam bloqueando gravação.

CSS de superfície possui namespace, sem transporte de reset/raiz global dos HTMLs. Algoritmos de reflow de Home V5.3 e Rotinas V7.4 continuam separados. Não se encontrou duplicação acidental que exigisse reescrita.
