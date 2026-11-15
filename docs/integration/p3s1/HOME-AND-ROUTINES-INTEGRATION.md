# Integração Home, Rotinas e prescrição

Home V5.3 preserva Bento/widgets/Pulse e seletores compartilhados. Hero recebe Começar treino operacional quando selectHomeTraining estiver ready. O acesso existente Ver treino permanece separado para consultar/editar a prescrição em Rotinas; não é usado para registrar execução. Dia sem prescrição válida mantém Organizar treinos e não gera treino fictício.

Rotinas mantém sua Home V7.4 e edição existente, acrescentando Começar treino somente onde há prescrição válida. A ação inicia snapshot de routineId/day/workoutId/revision, sem draft/update, sem incrementar revisão ou trocar preferência de ordem. Nenhum CRUD novo de rotinas ou seleção de equipamento foi criado.

Retomar treino depende de identidade compatível; contexto diferente abre proteção de concorrência. A origem guarda destino Home/Rotinas e scroll; snapshot guarda rotina/dia. Sessão usa UUID próprio na rota, sem nomes, campos realizados ou payload de snapshot na URL/history.state.

## Prova de integridade

E2E D inicia segunda na revisão1, altera carga realizada, sai/pausa, abre Editor pelo fluxo homologado e salva prescrição com quatro séries na revisão2. Hero mostra revisão2; Retomar abre mesmo sessionId e snapshot revisão1, com uma série prescrita e carga realizada preservada. Back/Forward mantém sessão pausada. Unitário confirma também cópia da lista de substitutos e independência dos arrays/objetos salvos.

O treino original só muda pelo Editor/commit homologado, nunca por concluir série, descanso, skip, mapa ou resumo. Restrição shared-workout-pending da edição continua intacta; executar uma prescrição válida não decide como copiar/propagar edições entre dias.

AppShell, navegação e OverlayHost sofreram apenas extensões tipadas para consumir a Sessão. Nenhum segundo store/provider/router/Shell/TabBar/portal, dependência ou CSS reset foi adicionado. Publicações, Business, Perfil, Match, Mensagens e Pulse não receberam funcionalidade por arrasto.
