# Interações, disponibilidade e scroll

## Aplicação comum

- A lista recebe foco de teclado com outline de orientação, sem título visual extra. Tab seguinte segue para o Bento; criação desabilitada e identidade institucional não inventam etapas de foco de ações inexistentes.
- Identidade própria é um botão nativo disabled58/54px, com nome Criar Pulse de <identidade> — indisponível. + visual não é outro botão pequeno. Não há onClick, upload/captura/publicação ou notificação de sucesso.
- Institucional é uma representação semântica role=img com nome acessível e indisponibilidade, não botão/link para tela falsa. Demais identidades técnicas também não oferecem viewer fictício.
- Toques não mudam URL, abrem diálogos, marcam visto ou alteram domínio. Não se reaproveita o toast experimental como serviço.

## Rolagem e foco

UL/list explícita (inclusive para leitores que removem semântica de listas com list-style:none) tem overflow-x:auto, gap10 e scroll horizontal nativo. Não há interceptação global de touch/pointer, arraste JS, carousel engine, paginação ou dots. Com apenas duas identidades, ambas cabem e scrollLeft=0 é correto; overflow é validado com o mesmo renderer em fixture técnica longa.

Setas do navegador com a lista focada movem o scroll quando existe overflow. Itens mantêm rótulos acessíveis completos mesmo se a legenda visual longa for truncada no cenário técnico. Lista vazia não recebe tabIndex nem botão vazio; estados desabilitados não são comunicados somente por cor.

Ref de scroll em PrototypeApp guarda somente posição horizontal de Treinos, não preferência/dados sociais ou outro store. Remontar a região restaura a posição até o máximo nativo disponível; scroll vertical por aba/Home ativa continua sob BrowserNavigation/AppShell. Nenhum dado é serializado em URL/history/localStorage.

Toque iniciado sobre a identidade própria desabilitada ainda permite scroll vertical nativo no Chromium testado. Movimento horizontal não interfere no swipe do Hero; a lista não possui handlers de troca de treino. Reduced-motion não recebe animação ou smooth scroll imposto. Foco visível é validado por Tab/Shift+Tab, não inferido de focus() após modalidade mouse.

## Preferência de ocultação

A necessidade histórica de Configurações/Atividade permanece no contrato. Busca na implementação pública atual não encontrou estado/action/preferência de Pulse nem consumidor funcional em Configurações/Atividade. Verificação pontual de existência no legado não forneceu mecanismo transportável/autorizado. O HTML contém handler sem controle associado, conforme X26.

Não se criou toggle na Home, tela de Configurações, preferência global ou localStorage. Integração legítima futura com Configurações e Atividade permanece PENDENTE e não bloqueia a composição. Não confundir social.hidden de posts com essa preferência.

## Limites

/pulse/:id continua placeholder preparatório da fundação, não destino habilitado por esta missão. Viewer, criação, upload, mídia e critérios de visto precisam de recortes próprios. Safari/iPhone/Android físicos, teclado virtual/VoiceOver e insets reais permanecem para QA manual; o teste Chromium não certifica gestos físicos iOS.
