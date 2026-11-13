# OverlayHost contextual — lifecycle preservado

Um único portal/host continua atendendo Home e Rotinas. Busca/Criar/Atividade conservam conteúdo neutro, apresentação e comportamento existentes. O resolvedor opcional é consultado somente para painéis RoutinePanel; nenhum consumidor novo é ligado à aplicação comum.

## Ajustes mínimos no host

- Aceitar conteúdo/título/descrição/presentação via ContextualOverlay.
- Manter última configuração solicitada enquanto executa saída, inclusive quando consumidor já mudou rota ou concluiu o rascunho; conteúdo não desmonta antes do painel.
- Foco inicial opcional, aplicado apenas se elemento está dentro do diálogo; caso contrário, diálogo recebe foco como antes.
- Trap inclui textarea/select além dos elementos já suportados, para consumidores futuros.
- Troca entre etapas conserva opener original. Após fechamento na mesma página, restaurar foco nele; se a página mudou por salvamento/retorno, focar título acessível do destino ou main como fallback.
- Atributo opt-in data-overlay-size=library aplica somente altura75% da área dinâmica disponível acima do inset superior. CSS existente de sheet continua responsável pelos insets inferiores/laterais.

Não foi copiado CSS ou motor de overlays do HTML. Não há pacote novo. Tempos globais permanecem300ms entrada/310ms saída, backdrop sincronizado, saída antes de unmount, reduced-motion sem animação, inert no Shell/root e body overflow restaurado no cleanup.

## Responsabilidades

| Região | Responsabilidade |
| --- | --- |
| BrowserNavigation | Panel em History API, close idempotente, Back/Forward e opener; contexto por entrada em memória |
| OverlayHost | Portal, role dialog/aria-modal/labels, foco/trap, Escape, backdrop, swipe no handle, scroll lock e lifecycle |
| Renderer contextual | Conteúdo, labels/inputs e ações fornecidas pelo adapter; pode indicar foco inicial |
| Adapter | Gates de etapa/ID/revisão, dispatch e retorno somente após resultado real |
| Reducer P2-B1 | Validação e atomicidade; não conhece popup, DOM, foco ou ReactNode |

A Biblioteca técnica tem scroll independente; adicionar item sintético mantém o sheet aberto. Pesquisa/lista/check/feedback finais não foram implementados. Confirmar um exercício troca para nomeação; continuar retorna ao mesmo draft. Escape/Back/toque fora/gesto só fecham, sem cancelar treino. Teclado virtual e visualViewport em Safari físico continuam pendentes; teste Chromium de foco não comprova comportamento do teclado iOS.

## Safe areas e proteção de chrome

Header continua consumindo top e TabBar bottom; footer futuro permanece acima da TabBar. Nada mudou nas dimensões/tokens dessas regiões. Overlay tem viewport próprio e consome seus insets uma vez, sem somar altura fictícia da TabBar. O novo seletor CSS afeta somente panel explicitamente library, nunca Home ou Feed.

A divergência de duração local do HTML250/260ms versus DS300/310ms permanece registrada na P2-A: esta fase mantém motor homologado, sem promover exceção. Não foram implementadas interações de descoberta da navegação entre exercícios.
