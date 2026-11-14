# Overlay, foco e estado

Um único OverlayHost/portal e os mesmos NavigationProvider, BrowserNavigation, DemoProvider e reducer. `WorkoutSaveOverlays` troca somente o consumidor temporário de routine-library pelo ContextualExerciseLibrary. Um título opcional no contrato de renderers permite Adicionar exercício, como a referência; o default Biblioteca dos consumidores técnicos P2-B2 continua compatível. Header/TabBar globais não mudam.

## Composição local

Apresentação sheet e size=library existentes: ~75% da área dinâmica acima do inset superior. CSS opt-in por `.overlay-panel[data-overlay-size=library]:has(> .contextual-library)` afeta somente esse consumidor; Busca/Criar/Atividade e sheet técnico do Lab não recebem o layout novo. Não houve alteração em OverlayHost, AppShell, tokens ou CSS globais.

O painel real torna-se flex: handle/título/pesquisa/meta/feedback ficam estáveis e a lista rola independentemente. Descrição acessível preexistente permanece no DOM, visualmente oculta só nesse consumidor para evitar copy técnica extra. Pesquisa 48 px/fonte 16 px; linhas e controles têm alvos de toque >=44 px. Safe areas do host permanecem com responsabilidade única. `:has` requer navegador moderno; Safari/iPhone físico segue gate de QA.

## Ciclo

- Botão Adicionar exercício abre o painel pelo adapter existente e preserva routineId/day/workoutId/draftId/baseRevision/origem.
- Foco inicial no campo de pesquisa. Digitar altera query local e reinicia somente o scroll de resultados para a nova busca.
- Atualizações do reducer não alteram a query nem zeram a posição de lista; linhas usam chaves estáveis por catálogo. O foco fica na linha acionada ao adicionar, em vez de ser perdido ao desabilitar nativamente o botão.
- Escape, Back, backdrop e gesto no handle usam o host homologado. Fechar não cancela, não salva e não elimina o draft.
- Durante a saída, conteúdo permanece até o unmount do host; não há nova animação/timer de fechamento no consumidor.
- Após fechamento completo e reabertura, query volta vazia. Isso reproduz `s.search=''` do handler open-exercise-library no HTML fixo. Reabertura que interrompe uma saída ainda em curso conserva a instância transitória do host, sem persistência.
- Foco volta ao opener, root/body liberam inert/scroll lock após a saída. Reduced-motion e tempos globais continuam iguais.

A única persistência é a memória demonstrativa já existente. Query, feedback e refs de intenções são estado de apresentação, não outra store de entidades. URL/history.state não recebem conteúdo React, nome, parâmetros ou rascunho completo.

## Editor e isolamento

Quando o draft vazio recebe seu primeiro item, o Editor existente seleciona o primeiro por sua lógica derivada. Adicionar outros não reinicia o exercício ativo nem os parâmetros já editados. Não foi reaberta a descoberta da navegação entre exercícios.

Cada consumidor tem key=draftId e confirma os IDs com o contexto de navegação. Trocar de Editor/dia não reaproveita outra lista de adições. Revisão/vínculo/shared-workout-pending são verificados novamente no reducer. Cancelar/descarte usa o fluxo P2-B4 e remove só aquele draft, sem alterar salvo ou outros drafts.

Rota direta/reload sem contexto mantém o fallback seguro da fundação, sem Salvar ou consumidor funcional no treino errado. Não se adicionou persistência para contornar isso.
