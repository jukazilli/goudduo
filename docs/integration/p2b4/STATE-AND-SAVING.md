# Estado, campos e salvamento

DemoProvider, training reducer, seletores e modelo de domínio permanecem os homologados. O Editor consulta `adapter.draft`; cada edição dispara `draft/update`, remoção `draft/remove` e ordem `draft/reorder`. Nunca escreve diretamente em workouts/routines. Arrays/IDs são preservados pelo reducer existente. Catálogo e exercício prescrito continuam distintos.

## Campos e unidades

`editor-fields.ts` fornece parseNumeric, parseRest e formatRest. Aceita decimal com ponto ou vírgula, sem interpretação de unidades, notação científica ou sufixos. Séries e repetições usam validação inteira do domínio. Carga vazia remove a propriedade opcional; não vira carga zero implícita. Tempo continua em segundos e distância em metros, conforme os labels.

Descanso aceita HH:MM:SS com minutos/segundos 00–59 e horas com pelo menos dois dígitos; exige resultado inteiro seguro. `00:01:30` corresponde a 90 segundos; `01:30` ou `00:99:00` são inválidos, sem conversão por adivinhação. Round-trip testado incluindo mais de 24 horas. Não há limite novo de duração de produto.

Cada campo mantém apenas texto transitório para digitação (ex.: vírgula). O número interpretado pertence ao draft único. Campo obrigatório incompleto/inválido é representado por NaN no rascunho em memória, já rejeitado por validatePrescription/validateDraft; isso impede salvar silenciosamente o valor anterior. Não é dado salvo, persistido ou transportado em URL/history.state. Ao trocar de exercício, um valor inválido volta como campo vazio e continua bloqueando o commit até correção. Não foi criado store paralelo de valores válidos.

Equipamento referencia Equipment.id ou null. O select deriva das entidades existentes e de Exercise.equipmentIds quando informado; não importa fotografia nem catálogo real. Identidade desconhecida/ilegítima mantém bloqueio de validação, sem substituição silenciosa.

## Fluxo real

1. Home Rotinas chama o adapter existente; dia com treino clona a prescrição para draftId e baseRevision. Dia vazio recebe workoutId novo e draft vazio, sem vínculo salvo.
2. Editar altera apenas o rascunho; Back/troca de aba não gravam ou descartam. Reentrar reutiliza o draft compatível conforme a Home integrada.
3. Check chama requestSave → draft/prepare. Zero/invalidade bloqueados; um exercício abre confirmação; dois ou mais abrem nomeação.
4. Continuar editando chama draft/resume e fecha o painel, sem perder conteúdo. Salvar assim mesmo avança à nomeação, sem commit intermediário.
5. Nomeação inicia com nome salvo ou sugestão pelo dia. Nome vazio bloqueia; Cancelar retorna à edição sem gravação parcial. Limite de 100 caracteres mantém o domínio existente; diferença com 60 do HTML fica documentada como gate, não nova homologação.
6. Salvar treino chama submitName → draft/commit; o reducer revalida revisão/vínculo/compartilhamento e confirma atomicamente. Somente remoção do draft e revisão base+1 fazem o adapter retornar à origem capturada.
7. Home Rotinas e selectHomeTraining observam imediatamente a mesma entidade/revisão. Nenhum card Home Treinos foi implementado.

Rascunho obsoleto ou treino multiassociado não pode sobrescrever outra edição/dia. Não foi definida semântica de cópia/referência. Cancelamento explícito de todo o Editor continua sem nova UX de descarte; Back preserva o draft. O índice de apresentação do exercício volta ao primeiro ao remontar o Editor, sem perder parâmetros ou ordem do rascunho.

## Navegação e lifecycle

Mesmo BrowserNavigation e mapa de contexto efêmero. URLs contêm somente workoutId opaco e tipo de painel; não serializam rascunhos, rotina/dia/revisão ou nome. Reload perde o contexto em memória e recebe o fallback neutro sem Salvar/rodapé; não recria edição automaticamente.

OverlayHost mantém motor/foco/trap/inert/scroll lock/gesto/Escape/back/reduced-motion. Uma correção mínima retém o conteúdo do painel enquanto sua mesma entrada encerra/resume o draft antes de History API fechar. A retenção é por chave; outra entrada sem contexto não recebe o formulário anterior. Busca/Criar/Atividade mantêm seus conteúdos e testes.

Retorno utiliza origem/dia/scroll P2-B2 e expansão da Home P2-B3. Entradas antigas do Editor podem continuar no histórico após salvar, mas sem draft recebem estado neutro. Nenhuma reconstrução de histórico, persistência ou segundo router foi adicionada.
