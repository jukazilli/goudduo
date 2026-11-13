# Navegação, origem e rascunhos

BrowserNavigation e NavigationProvider permanecem únicos. Não há router, store ou persistência novos. O único dado de domínio em URL de Editor é workoutId opaco já previsto na P1-R1; query panel contém somente o tipo de painel. Nome, prescrição, dados pessoais, draftId, rotina/dia/revisão não são serializados em URL ou history.state.

history.state continua limitado a goudduoP1/key/depth. Contextos ficam num mapa privado por chave de entrada; só contêm referências e origem/posição, nunca o rascunho completo ou componentes React. dispose limpa o mapa. Ao navegar na mesma página para painel, contexto/scroll são preservados. Back/forward recuperam contexto da entrada na mesma instância.

## Jornada preparada

1. Futuro consumidor em Rotinas/detalhe/Home solicita openEditor com IDs estáveis e draftId novo.
2. Mesmo reducer abre rascunho, seleciona dia; navegação captura origem e scroll.
3. Abrir Biblioteca cria entrada de painel sem redefinir rotina/dia/revisão/draftId.
4. Fechar por Escape/backdrop/gesto/Back restaura Editor, preservando parâmetros e scroll.
5. Salvar prepara domínio; um exercício solicita confirmação, múltiplos vão à nomeação. Troca confirmação→nomeação usa replace do painel atual, sem empilhar outro host ou confirmar duas vezes por Back.
6. Nome inválido ou revisão obsoleta mantém dados/erro; nenhum commit parcial.
7. Sucesso validado retorna à origem usando replace da entrada atual e scroll capturado. O reducer já atualizou a mesma entidade consultada por Home/Rotinas.

O histórico nativo não é apagado/reconstruído. Entradas anteriores de Editor podem continuar acessíveis após salvar/cancelar; como o draft terminou, recebem context-unavailable e placeholder sem ação de salvar. Não se recria rascunho silenciosamente nem se reaproveita um rascunho novo por ID de treino. Uma UX futura de limpeza/retorno por múltiplas entradas precisa de contrato próprio.

## Voltar e descarte

Back/chevron e troca de aba **não chamam draft/cancel**. Alterações em memória permanecem. Cancelamento explícito retorna confirmation-required até confirmação; somente cancelEditing(true) descarta aquele draftId e retorna. Os demais rascunhos continuam intactos. A UI de confirmação de descarte ainda não existe; não se declarou essa decisão homologada como UX final.

Continuar editando em confirmação/nomeação usa draft/resume e mantém conteúdo. Fechar painel por mecanismos genéricos não grava, não descarta e não força reabertura automática. Próxima solicitação de salvar repassa os gates do domínio. O adapter não cria uma cópia salva de prescrição para apresentação.

Dois Editors do mesmo workout podem ter draftIds diferentes e entradas distintas mesmo com URL igual; colisão de draftId existente é rejeitada ao abrir. Cada contexto deve corresponder a rotina/dia/treino/revisão do próprio rascunho. Edição obsoleta permanece bloqueada pelo reducer; compartilhamento entre dias continua shared-workout-pending.

## Rota direta e reload

URL direta conserva o destino, mas não fornece contexto de edição completo: estado neutro, sem Salvar ou autenticação simulada. Reload recria fixtures e perde rascunhos/contextos/scroll em memória, conforme contrato P1; não há recuperação persistente. A rota pode continuar incluindo panel, mas sem renderer/contexto válido só existe fallback neutro. Qualquer recuperação futura deverá ser autorizada, com política de privacidade específica.

A seleção de dia no estado pertence ao domínio e não muda ao fechar popup. O retorno transporta origem e posição; a futura Home Rotinas continua responsável por expansão/seleção visual própria. A P2-B2 não implementou widgets, reflow, drag ou edição de rotina.
