# Contrato do Editor integrado

Fonte UX: [HTML V7.4](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html), commit **3f8b2c7c93a33a713c780305e672e1ec7998ceaf**, blob **122275b3cb03bd996b477375d1bbc73ae29c5c3e**, 81.601 bytes. Contratos anteriores: [P2-A](../p2a/ROTINAS-V74-FIDELIDADE.md), [domínio](../p2b1/DOMAIN-MODEL.md), [adapters](../p2b2/ADAPTER-CONTRACTS.md), [Home Rotinas](../p2b3/HOME-ROUTINES-CONTRACT.md).

## Auditoria antes de editar

| Contrato disponível | Limitação encontrada | Integração mínima |
| --- | --- | --- |
| ShellHeader variante editor | Placeholder não fornece ação válida | PrototypeApp fornece header do adapter somente com contexto e draft válidos |
| AppShell/SurfaceComposition.footer | Slot preparado e sem consumidor Editor | Rodapé próprio, uma única responsabilidade de inset no Shell/TabBar |
| RoutineEditorContext/openEditor | Home já abre rascunho inclusive em dia vazio | Reaproveitado sem alterar Home, IDs ou reducer |
| Prescrição e drafts | Nenhuma interface de campos | WorkoutEditor e campos locais tipados sobre draft/update/remove/reorder |
| prepare/confirm-single/naming/commit | Sem consumidores de produto | Dois consumidores reais de confirmação/nomeação via resolvedor existente |
| Biblioteca sheet | Sem lista/busca final | Aviso honesto e Fechar, sem catálogo alternativo |
| OverlayHost | Etapa encerrada antes da saída perdia o consumidor | Reter última configuração válida apenas na mesma chave do histórico; nova entrada sem contexto não herda conteúdo |
| Back/revisão/scroll | Contratos existentes suficientes | Preservados, com testes reais da jornada |

## Composição implementada

`WorkoutEditor.tsx` apresenta um exercício por vez, anterior/próximo/contador e gesto horizontal já descritos na V7.4. Não há carrossel de sequência, nova faixa de descoberta, busca permanente, tutorial ou header próprio. Navegação por botão tem alvos de 44 px; gesto não inicia sobre inputs/selects/botões/labels, preservando edição e scroll vertical.

Card de largura útil, raio 20 px, padding 16 px e grid de campos com duas colunas/gap 11 px. Séries, Carga (kg), Rep min e Rep max são campos separados. Tempo usa Duração (s); distância usa Distância (m). Descanso usa HH:MM:SS, convertido explicitamente em segundos. Equipamento é select das identidades existentes e permitidas pelo catálogo; ausência é null, não string de nome.

Opções do exercício oferecem mover para cima/baixo e excluir. São as operações existentes do contrato, reunidas num grupo contextual local acessível em vez do submenu de dois níveis do HTML. Limites desabilitam a movimentação. Ordem é a permutação de IDs no mesmo rascunho. O item selecionado mantém identidade após mover; remover seleciona o próximo/anterior, preserva demais parâmetros e transfere foco. Não há duplicação forçada, novo exercício automático ou alteração salva por remover.

## Header e rodapé

AppShell, ShellHeader, TabBar, políticas de superfície e dimensões globais não foram alterados. Header recebe somente a configuração existente do adapter. Título vem da prescrição salva ou sugestão contextual de dia; nome editável só aparece na etapa final. Check desabilitado deriva de validateDraft, incluindo vazio, parâmetros inválidos, revisão obsoleta, vínculo alterado e shared-workout-pending.

Adicionar exercício abre o painel routine-library pelo mesmo adapter/host. A Biblioteca definitiva é P2-B5. Nenhum menu de catálogo, pesquisa/lista substituta ou upload foi criado no produto comum.

## Limites e adaptações

Não há mídia de exercício autorizada nesta etapa. A reserva visual neutra de 125 px do HTML foi preservada em CSS, sem imagem/ilustração importada. A faixa de indicadores decorativos não foi reconstruída. Adicionar substituição permanece visível e desabilitado; substituições operacionais aguardam recorte próprio, conservando os IDs/contratos do domínio. Diferenças de densidade, controles e campos estão na [comparação visual](VISUAL-DELTAS.md), para refinamento posterior, sem alegação de paridade pixel a pixel.
