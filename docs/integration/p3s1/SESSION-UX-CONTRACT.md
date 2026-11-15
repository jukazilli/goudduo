# UX e precedência das fontes

Direção expressa: [Issue histórica #75, comentário6715855532](https://github.com/jukazilli/GODUOIT/issues/75#issuecomment-6715855532). Simplificação posterior expressa: [6726891810](https://github.com/jukazilli/GODUOIT/issues/75#issuecomment-6726891810). Relatos6717434378/6724633912/6727371044 descrevem implementação privada candidata e não homologam por si só seu HTML, serviços ou master. A missão P3-S1 atual autoriza a implementação limitada e governa os conflitos.

HTML **candidato/proposta**, não master: commit846338eab5278a636f222d1bb09f512c0e4bd5c3, `lab/references/session/goduoit-sessao-starkah-visual-v03.html`, blob82d81755e05f856fba669e60c347277fa1fff0b0, SHA2568651c5b889bbf75fb7b23863bd6780530176fa25f9d1f910588d46e797d0d19a. Estudado somente em investigação privada; nenhum HTML/CSS/JS/asset ou captura privada foi transportado. Não é referência pixel a pixel para esta entrega.

## Aplicado

Um exercício em foco, nome destacado, navegação compacta por anterior/próximo/swipe predominante horizontal, pontos de séries acessíveis sem textos redundantes de progresso. Mapa sob demanda, sem segunda faixa permanente. Header contextual do Shell, chevron e ajuda `?`; nenhuma topbar privada ou botão+ copiado. Campos gelo#F1F8FB, Plus Jakarta Sans e Lucide existentes. A região central neutra alterna mídia/descanso com altura estável. Footer tem ação principal curta e menu de três pontos; ajuda detalhada só sob demanda.

Ações: Pausar/Retomar, Pular, Substituir disabled honestamente, Finalizar, Sair e descarte explícito. Sair apenas pausa e retorna, sem modal bloqueando navegação. Descarte é outra intenção e exige confirmação. Finalização também exige confirmação mesmo quando completa, política conservadora para evitar segundo clique encerrando a sessão. Não implementar auto-finish, undo com promessa de recuperação, offline/serviço social ou dados demonstrativos do candidato como produção.

## Adaptações técnicas mínimas

AppShell usa o ShellHeader contextual existente **apenas quando a integração imersiva fornece header real**; fallback /sessao/:id sem entidade continua sem header global, com retorno seguro. Header e footer consomem cada inset uma vez. TabBar permanece com seus cinco destinos e não é exibida no modo imersivo da Sessão.

OverlayResolver aceita panels de Sessão além dos de Rotinas; mesmo OverlayHost/portal, lifecycle, foco, inert, lock, backdrop, gestos e motion. Adapter de Rotinas ignora os novos panels e preserva suas ações. Ajuda contextual usa ariaLabel no HeaderAction existente; não há segundo header ou mecanismo de modal.

Reordenação no Mapa: três pontos→Reordenar, botões Subir/Descer operáveis por toque/teclado. Não foi introduzido drag-and-drop customizado: arrasto avançado e seu acabamento permanecem gate de UX/QA físico, sem bloquear a alternativa acessível funcional. Não se copia trilho/menu/identidade STARKAH ou navegação experimental.

Correção comprovada no OverlayHost: quando a finalização remove o botão que abriu o painel na mesma rota, restaura foco para h1/main existente. Opener conectado continua prioritário; outra janela de diálogo impede restauração prematura. Sem novo lifecycle, portal ou timer de foco.
