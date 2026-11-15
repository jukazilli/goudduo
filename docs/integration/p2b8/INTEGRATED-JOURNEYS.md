# Jornadas integradas e resultados

Novo `tests/e2e/integrated-prototype.spec.ts`: dois cenários × cinco viewports de 844px de altura, no aplicativo comum, sem consumidores técnicos ou injeção de entidades.

## Jornada principal

Home → Rotinas principal → terça livre → Editor → Biblioteca. Busca AGACHAMENTO e prancha; duas inclusões sem fechar sheet; check e quantidade confirmados pelo rascunho. Fecha com Escape. Define séries3, reps8/12, carga7,5kg, descanso75s; prancha séries2/duração45s/descanso30s. Reordena por opção de menu via teclado. Nomeia e confirma. Retorno mantém terça e preview. Home apresenta nome, dois exercícios, revisão1 e ID legítimo. Reabre o mesmo caminho/ID, confirma ordem e valores, altera duração60s/séries4 e salva revisão2. Home apresenta mesmo ID e nome atualizado. Quantidade de escolhas do Hero continua3 (duas iniciais + uma criada), não4. Segunda original permanece séries1.

Capturas de revisão1/2 são produzidas em `test-results/` pelo teste e anexadas ao artifact da CI. Não são snapshots de referência nem telas homologadas novas.

## Nomeação cancelada e retorno

Altera séries para6, confirma etapa de um exercício, preenche nome e fecha sem commit. Home mantém nome/revisão1 salvos. Troca Publicações/Treinos, reabre contexto e recupera séries6 no draft. URL contém apenas ID opaco. Reload não reconstrói contexto nem disponibiliza Salvar no treino errado; dados demonstrativos são de memória, sem persistência.

## Concorrência e atomicidade

Novo `src/state/integrated-training.test.ts`, dois cenários sobre o reducer real e o factory da Biblioteca: duas criações no mesmo dia livre permitem somente o primeiro vínculo salvo; segundo commit resulta binding-changed, sem workout órfão, mudança de tabela salva ou descarte de outro draft. Adição incompleta bloqueia prepare; depois de configurar, uma revisão concorrente entre naming e commit resulta stale-revision, preservando prescrição salva e draft.

## Cobertura anterior integralmente mantida

| Caso | Evidência automatizada |
| --- | --- |
| Um exercício → confirmação → nome → retorno | contextual-library.spec.ts B5 A, workout-editor.spec.ts B4, routine-adapters.spec.ts B2 |
| Zero, nome inválido, parâmetros, duplicatas | training.test.ts, ContextualExerciseLibrary.test.tsx, WorkoutEditor.test.tsx, ContextualExerciseLibrary.test.tsx |
| Descarte confirmado/cancelado, Back preserva | contextual-library.spec.ts B5 D, workout-editor.spec.ts B4, novo B8 |
| Shared-workout-pending, revisão/vínculo alterados | training.test.ts, routine-adapters.test.tsx, consumidores Lab nos testes B2/B4 |
| Busca normalizada, sem resultados, reinclusão | contextual-library.spec.ts, ContextualExerciseLibrary.test.tsx (inclui modelo de busca/factory) |
| Home/Bento/Hero/órfão/scroll/contextos | home-training.spec.ts B6, training-pulse.spec.ts B7 |
| Cinco destinos, direto/reload/history/sem Shell | foundation.spec.ts e navigation.test.ts |
| Gestos, foco, saída, backdrop, inert/reduce | routine-adapters.spec.ts, workout-editor.spec.ts, contextual-library.spec.ts |

Casos concorrentes/shared não recebem controles de debug no app comum: são testados no reducer/consumidores isolados existentes. Isso não deve ser apresentado como UI profissional operacional. Nenhuma sessão de execução foi iniciada.
