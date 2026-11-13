# Contrato implementado — corpo Home Rotinas

Referência [Motion V7.4/#28](https://github.com/jukazilli/goudduo/issues/28), commit `3f8b2c7c93a33a713c780305e672e1ec7998ceaf`, blob `122275b3cb03bd996b477375d1bbc73ae29c5c3e`. [Fidelidade P2-A](../p2a/ROTINAS-V74-FIDELIDADE.md). O HTML foi lido e executado, não convertido em componente nem copiado para a main. Shell/header/TabBar/frame/statusbar/rotas/CSS global experimentais foram excluídos da integração.

## Composição

- Principal obtida de primaryRoutineId; primeiro lugar e largura inteira. Defensivamente, sem ID principal válido, a primeira entidade organiza o layout como no HTML; isso não escreve um novo principal no domínio.
- Secundárias vêm de DemoState.routines em sua ordem atual de inserção, sem lista concorrente ou preferência persistida.
- Gradientes azul/mint/peach/lavender/gray e contorno abstrato CSS da V7.4, sem imagens/ilustrações; tom é apresentação derivada da modalidade demonstrativa, com fallback azul. Capas/assetId permanecem no domínio, sem carregar mídia ainda não autorizada.
- Namespace `.routines-v74`, nenhum reset/token no :root. Tipografia real Plus Jakarta Sans; peso 800 público adicional permite pesos contextuais altos. Header e TabBar continuam com os mesmos estilos e pesos homologados; o novo arquivo de fonte é consumido pelos pesos locais altos da superfície.
- Espaçamento externo 14/18px; gap 11px ou 8 px em <=350px. Principal 192px, secundárias 171/147px conforme cascata real, órfão 145px, card expandido 124px. Detalhes/medidas na comparação.

## Expansão e recolhimento

Uma rotina expandida por vez. Button nativo controla aria-expanded/aria-controls; menu de opções é irmão, sem botão aninhado. Painel recolhido é inert/aria-hidden. Estado React define ordem/classes; não existe appendChild, alteração imperativa de ordem ou mutação da lista salva.

Se uma secundária da direita abre, troca somente com a vizinha à esquerda; principal permanece primeira. Demais secundárias mantêm ordem. A última peça compacta vira full-width quando há quantidade ímpar de peças compactas reais. Recolher elimina a permutação temporária e restaura a ordem original. Expandir nunca dispara ação de reordenação no reducer.

CSS local anima largura/altura/reveal em 340 ms. Leitura de retângulos e Web Animations fazem somente a interpolação FLIP de posição observada na referência, sem mover nós manualmente. Animações anteriores são canceladas em interação nova/desmontagem; reduced-motion desliga CSS e FLIP. Scroll é alinhado após layout e após 380 ms, com cleanup; retorno de outra rota não força novo alinhamento sobre a posição restaurada.

A reserva de 27 px do painel recolhido é resultado renderizado do CSS canônico e foi mantida para preservar sua densidade. “Sem lacunas” refere-se ao preenchimento dos slots de meia largura/órfão; não retiramos espaçamentos existentes por preferência estética.

## Semana e prévia

Seleção usa training/select e selectedDayByRoutine; sem seleção anterior, segunda-feira. Cada dia consulta selectWorkoutForDay e validação vigente. Dias sem prescrição válida são livres, sem exercício ou treino gerado. Quantidade de treinos vem dos dias com prescrição válida, não de número hardcoded.

Prévia: nome salvo, contagem real de instâncias, grupos disponíveis via catálogo/taxonomia, primeiros dois nomes e contador do restante. WorkoutExercise e Exercise são separados, sem cópia de catálogo ou prescrição no componente. Equipamento/tempo/distância/volume não são inventados ou expostos como novas métricas. A forma singular “1 EXERCÍCIO” corrige somente concordância da legenda do HTML.

Tabs têm seleção, roving tabIndex, setas/Home/End e foco preservado. Para garantir alvos 44×44 sem sobreposição, a faixa é rolável quando sete alvos não cabem. Cores de texto de menor contraste foram reforçadas localmente. Essas são adaptações técnicas explícitas, pendentes de revisão visual, não redesign homologado.

## Estados e operações

Rotina vazia e dia livre usam Sem treino, texto e Adicionar treino da referência. Ausência total de rotinas usa a composição Suas rotinas começam aqui, ícone Lucide real e CTA Criar rotina desabilitado. Menus principal/expandido permanecem visíveis e desabilitados, sem funcionalidade simulada. O header oficial não ganha um + sem ação válida.

Reordenação intencional, criar/editar/excluir/duplicar rotina, principal, compartilhar, ajustes automáticos e capas não foram implementados. O HTML tem estudos/código dessas operações, mas o domínio/escopo não fornecem todos os contratos; não ampliamos a missão para CRUD nem escolhemos cópia/referência por dia. shared-workout-pending continua intacto.
