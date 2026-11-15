# Bento, expansão e restauração

Geometria exclusivamente local: gutter13/gap10 nas larguras375/390/414/430; gutter10/gap8 em320 (breakpoint355). Ranking218px, compactos Status/Peso104px (105 no estreito), secundários144px, Consistência99px; raio23/hero26. Hero mínimo236px, sem altura máxima ou truncamento do nome: conteúdo legítimo longo pode aumentar a altura. Não há frame/max-height820 ou compensação de chrome experimental.

Região reservada Pulse112,8px/108,8px inclui footprint vertical observado e espaçamento anterior ao Bento, não inset nativo ou conteúdo social. A dimensão futura das miniaturas continua58/54 e raio19/18 no contrato P2-A; nenhum avatar está implementado. Esse espaço vazio é uma limitação explícita enquanto P2-B7 não existir.

## Algoritmo próprio V5.3

`homeBentoLayout` recebe somente o ID expandido e retorna ordem visual, modo e órfão. Não importa routinesLayout V7.4.

- Estado normal: ranking/status/weight/workout/measures/library/photos/records/consistency.
- Expandir superior: selecionado primeiro, largura inteira; dois outros superiores em meia largura; Hero e inferiores mantêm grupo.
- Expandir inferior: superiores e Hero permanecem anteriores; selecionado vem após Hero em largura inteira; três secundários restantes mantêm ordem e o último ocupa largura inteira (órfão).
- Expandir Consistência: faixa permanece no fim; cluster superior intacto.
- Fechar/tocar novamente/Escape: ordem original, remoção do órfão e foco no próprio toggle, sem alteração no domínio.

O DOM é reconciliado por chaves React estáveis na ordem derivada; nenhum appendChild, reordenação imperativa ou preferência salva. Botões não são aninhados. aria-expanded/aria-controls ligam cada toggle ao painel; conteúdo recolhido é inert/aria-hidden e fica fora da navegação por teclado. X Lucide tem44px, ampliando o alvo29px experimental sem mudar o Shell.

## Movimento e scroll

Reflow usa leitura antes/depois e Web Animations somente para interpolar posição (400ms, cubic-bezier(.22,1,.36,1)); não é outra engine de layout. Reveal usa grid0fr→1fr360ms/opacidade280ms. Animações anteriores são canceladas em nova expansão/desmontagem. prefers-reduced-motion desliga FLIP/transições; não modifica duração global dos overlays.

Alinhamento após mudança de expansão ocorre só se o card não couber na região rolável, com timer cancelável. Remontar ao retornar de uma rota não realinha sobre o scroll restaurado pela fundação. Fechar restaura foco preventScroll; não redefine o mapa global de posições. Somente main rola; header/TabBar ficam fora do scroll. Insets continuam consumidos uma vez pelo Shell; conteúdo tem respiro24px, sem somar altura fictícia de TabBar.

Indicadores do Hero têm aparência7/19px com áreas44px não sobrepostas. A linha pode quebrar quando existirem mais prescrições; não são reduzidos alvos para forçar três dots. Gesto horizontal exige deslocamento>=45px e predominância sobre o eixo vertical; não começa em controles e pointercancel limpa intenção. Não há autoavanço.
