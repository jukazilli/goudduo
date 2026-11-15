# Deltas visuais regionais e backlog P2

Referências canônicas reais: Home0731832/blob8c698708dd79449472d6f5c7e536664939de4951; Rotinas3f8b2c7/blob122275b3cb03bd996b477375d1bbc73ae29c5c3e. Não reconstruídas; fontes carregadas explicitamente para o pareamento, capturas brutas preservadas. [Manifesto com medidas e SHA256](evidence/measurements.json).

Nesta rodada, cinco larguras, pares conteúdo Home, Rotinas recolhida, Editor vazio e Biblioteca; mais capturas brutas das duas referências. Total50 imagens. O Shell experimental nunca é comparado com o Shell oficial. Alturas/larguras úteis podem divergir porque o HTML tem moldura limitada e o app usa100dvh; não comprimir o app para falsificar o fold. Dados legítimos sintéticos diferem dos exemplos HTML; não são usados para alegar igualdade de textos ou imagem.

| ID / P2 | Delta conhecido | Tratamento posterior |
| --- | --- | --- |
| V01 | Fold/altura útil diferentes no HTML e app, fonte histórica fallback | Refinar densidade regional preservando Shell e fonte oficial |
| V02 | Hero com dados verdadeiros do protótipo pode superar mínimo236px | Rever espaçamento local sem cortar nome/metadados |
| V03 | Dias/CTAs44px e cinzas acessíveis diferem da referência | Preservar acesso; acabamento posterior não reduz alvo/contraste |
| V04 | Editor: reserva de mídia neutra, sem GIF/foto autorizada | Definir direitos e composição de mídia antes de integrar asset |
| V05 | Biblioteca: densidade/altura de linha e catálogos distintos | Refinar superfície com catálogo legítimo; não copiar dados privados |
| V06 | Pulse: apenas duas identidades neutras; wordmark oficial e legenda | Refinar aro/identidade local após decisões de dados/gradiente |

Estados neutros de Progresso, ausência de Sessão/Feed e equipamentos sem seletor são **limites funcionais**, não deltas P2 a ocultar em CSS. Gradiente não visto e copy/reference não resolvidos também são gates de produto.

Evidências anteriores de expansão, restaurado, estados de busca/check/nomeação permanecem aplicáveis porque nenhuma fonte de produção mudou nesta missão: [Home B6](../p2b6/V53-VISUAL-COMPARISON.md), [Pulse B7](../p2b7/V53-VISUAL-COMPARISON.md), [Rotinas B3](../p2b3/V74-VISUAL-COMPARISON.md), [Editor B4](../p2b4/VISUAL-COMPARISON.md), [Biblioteca B5](../p2b5/V74-VISUAL-COMPARISON.md). Novos testes exercitam a integração e as cinco larguras sem substituir essas fontes por uma referência inventada.

Não há declaração de pixel parity, percentual geral ou homologação estética final.

## Capturas desta rodada

| Largura | Home (ref / React) | Rotinas (ref / React) | Editor vazio (ref / React) | Biblioteca (ref / React) |
| --- | --- | --- | --- | --- |
| 320 | [ref](evidence/reference-home-320.png) / [React](evidence/react-home-320.png) | [ref](evidence/reference-routines-320.png) / [React](evidence/react-routines-320.png) | [ref](evidence/reference-editor-empty-320.png) / [React](evidence/react-editor-empty-320.png) | [ref](evidence/reference-library-320.png) / [React](evidence/react-library-320.png) |
| 375 | [ref](evidence/reference-home-375.png) / [React](evidence/react-home-375.png) | [ref](evidence/reference-routines-375.png) / [React](evidence/react-routines-375.png) | [ref](evidence/reference-editor-empty-375.png) / [React](evidence/react-editor-empty-375.png) | [ref](evidence/reference-library-375.png) / [React](evidence/react-library-375.png) |
| 390 | [ref](evidence/reference-home-390.png) / [React](evidence/react-home-390.png) | [ref](evidence/reference-routines-390.png) / [React](evidence/react-routines-390.png) | [ref](evidence/reference-editor-empty-390.png) / [React](evidence/react-editor-empty-390.png) | [ref](evidence/reference-library-390.png) / [React](evidence/react-library-390.png) |
| 414 | [ref](evidence/reference-home-414.png) / [React](evidence/react-home-414.png) | [ref](evidence/reference-routines-414.png) / [React](evidence/react-routines-414.png) | [ref](evidence/reference-editor-empty-414.png) / [React](evidence/react-editor-empty-414.png) | [ref](evidence/reference-library-414.png) / [React](evidence/react-library-414.png) |
| 430 | [ref](evidence/reference-home-430.png) / [React](evidence/react-home-430.png) | [ref](evidence/reference-routines-430.png) / [React](evidence/react-routines-430.png) | [ref](evidence/reference-editor-empty-430.png) / [React](evidence/react-editor-empty-430.png) | [ref](evidence/reference-library-430.png) / [React](evidence/react-library-430.png) |

Capturas brutas reference-raw-home-* e reference-raw-routines-* e todas as dimensões/hashes estão no manifesto. As imagens demonstram o estado integrado auditado, não novas referências homologadas.
