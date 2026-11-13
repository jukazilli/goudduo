# Contratos executáveis de adapters

Fontes: [P1-R1](../../foundation/P1-R1-RECONCILIACAO-SHELL.md), [estado P2-B1](../p2b1/STATE-AND-DRAFTS.md), [V7.4/#28](https://github.com/jukazilli/goudduo/issues/28), [riscos R07–R10](../p2a/RISCOS-E-REGRESSOES.md). HTML V7.4 `3f8b2c7c93a33a713c780305e672e1ec7998ceaf` é referência, não fonte de chrome. Home `073183253fce5fcd0b3474c725e84ff67d3dfec5` não foi modificada ou integrada.

## Tipos

`src/app/routine-context.ts` define RoutineEditorContext: routineId/day/workoutId/draftId/baseRevision e origin(page,scroll). Origem permitida: lista Rotinas, detalhe de rotina ou Home Treinos. RoutinePanel distingue routine-library, routine-confirm-single e routine-naming. NavigationEntry admite contexto opcional, mantido em mapa privado em memória.

`SurfaceComposition.header` recebe somente um novo callback opcional onBack. ShellHeader usa esse callback ou navigation.back, sem alteração de markup/ícones/dimensões. A configuração do adapter conserva check Lucide de salvar, título central com ellipsis existente e chevron sem pill novo. Nenhum botão + é introduzido no Editor.

`ContextualOverlay` fornece título, descrição acessível, conteúdo React, apresentação sheet/modal, tamanho opcional library e função opcional de foco inicial. `SurfaceIntegrations.resolveOverlay` recebe apenas os três tipos de painel de Rotinas. ReactNode e callbacks passam por props; nunca por URL ou history.state. Conteúdo mantém responsabilidade pelas ações reais e labels; não há formulário definitivo no host.

## useRoutineEditorAdapter

Hook usa useDemoState/useDemoDispatch e useNavigation existentes. Retorna status ready/context-unavailable, contexto, draft, issue, header, resolveOverlay e intents:

| Intent | Efeito real |
| --- | --- |
| openEditor(input) | Verifica origem/vínculo/ID novo de draft; dispatch draft/open + training/select; navega com contexto e revisão base |
| openLibrary(trigger) | Abre painel no mesmo Editor e contexto; não grava nem limpa rascunho |
| requestSave | Dispatch draft/prepare; nenhuma gravação direta |
| confirmSingle | Dispatch draft/confirm-single, somente nessa etapa |
| submitName(name) | Dispatch draft/commit, somente em naming; observa erro/sucesso reais |
| continueEditing | Dispatch draft/resume e fechamento; mantém IDs/parâmetros |
| cancelEditing(false) | Retorna confirmation-required, sem descartar |
| cancelEditing(true) | Dispatch draft/cancel do próprio ID e retorno à origem |

A configuração de header só existe com contexto/draft compatíveis em todos os IDs e revisão base. O título usa o nome salvo; para treino novo, sugestão contextual por dia. Ação disabled deriva do mesmo validateDraft usado pelo reducer: vazio, prescrição inválida, revisão obsoleta, vínculo alterado ou compartilhamento ambíguo bloqueiam. Erros continuam tipados para a UI futura.

`validateDraft` foi extraída como função pública em src/state/training.ts; o reducer chama exatamente a mesma composição anterior de bindingIssue e validatePrescription. Não há regra nova ou segundo reducer. Não se alteraram ações, entidades ou política shared-workout-pending da P2-B1.

Intenção transitória em ref correlaciona a ação com o próximo resultado do reducer. Etapa confirm-single solicita confirmação; naming solicita nomeação; erro mantém Editor/painel e dados. Somente remoção do rascunho após commit e revisão salva base+1 permitem retorno de sucesso. Troca de destino/Editor invalida essa intenção; não redireciona outra jornada.

## Consumidores

Renderers contextuais recebem RoutineOverlayContract: contexto, rascunho, issue, suggestedName e ações close/continueEditing/confirmSingle/submitName. Retornam content e initialFocus opcional. Sem renderer ou etapa compatível, resolver retorna undefined: host exibe estado neutro, sem simular uma interface concluída.

Sugestão de nome: Treino de segunda-feira etc.; somente sugestão na etapa final, não commit antecipado. Limite 100 e validação da P2-B1 foram preservados; diferença com maxlength 60 do HTML continua gate de produto, não foi resolvida por mudança silenciosa.

O consumidor técnico em src/lab/RoutineAdapterScenario.tsx não contém catálogo real/busca funcional. Ele usa campo de foco, item sintético temporal, texto longo para scroll e controles explicitamente técnicos de confirmação/nomeação. Não é implementação antecipada de Editor/Biblioteca V7.4.
