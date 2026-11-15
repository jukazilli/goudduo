# Contrato de apresentação Pulse Treinos

Fonte de geometria: [HTML V5.3](https://github.com/jukazilli/goudduo/blob/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html), commit073183253fce5fcd0b3474c725e84ff67d3dfec5, blob8c698708dd79449472d6f5c7e536664939de4951, SHA2567cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f. Conferidos os bytes e a [matriz X20–X27](../p2a/HOME-V53-HTML-RECUPERADO.md). Não se copia Shell, SVG inline, IIFE ou reset da referência.

## Implementação

- `pulse-presentation.ts`: descritores tipados/identidades, inicial Unicode/NFC e mapeamento de estado visual, sem modelo de feed.
- `TrainingPulseRegion`: único consumidor comum, lê DemoState.user pelo provider existente.
- `TrainingPulseStrip`: renderer contextual usado também pelos consumidores técnicos de teste/Lab.
- `training-pulse.css`: namespace local, nenhum token global/circular ou estilo de Publicações.
- PrototypeApp conserva uma ref de posição horizontal, estado de apresentação; os treinos e dados sociais permanecem intactos.

Primeiro item: identidade própria `own:<user.id>`, nome derivado do estado e inicial, sem letra J fixa. O + é Lucide real no badge19px; controle de criação é desabilitado, não um uploader ou botão ativo falso. Nome próprio não ganha legenda visual redundante; identificação completa está no nome acessível.

Segundo: identidade institucional `institutional:goudduo`, wordmark branco oficial já público `assets/brand/goudduo/goudduo-wordmark-white.svg`, blob **7a07c1ec6c42f16ec7b536f93b7e60049228168f**. Bytes preservados, sem reconstrução textual/raster. Fundo charcoal local, sem badge1/contador. Representação não interativa, sem tela institucional fictícia.

Não há demais itens na aplicação comum sem dados legítimos. Fixtures adicionais de identidades explicitamente demonstrativas vivem apenas no Lab/testes. Não são publicados posts, perfis reais ou catálogo social.

## Geometria

| Viewport | Avatar | Raio | Gap | Gutter |
| --- | --- | --- | --- | --- |
| 320 | 54×54 | 18 | 10 | 10 |
| 375/390/414/430 | 58×58 | 19 | 10 | 13 |

Padding local14px superior/17px inferior; row2px superior/4px inferior; legenda10px/line-height1,08 e gap7px. Altura total108,8px/112,8px substitui exatamente a reserva B6. Removidas somente as regras de altura dessa reserva em home-training.css; nenhum gutter/Bento/hero alterado.

Scroll horizontal nativo, sem carrossel/indicadores/engine. Dots continuam somente no Hero. Sem título visual Pulses, header extra ou controles técnicos no app comum. A largura real do frame do app define a área rolável, sem transportar limites820px/statusline do HTML. Safe areas continuam responsabilidade do Shell, não reaplicadas pelo Pulse.

Paleta neutra usa papéis existentes: gelo, tinta institucional, orientação/foco e azul do badge. Charcoal institucional deriva da superfície de referência, não estado não visto. Visto=gelo é local. Gradientes azul/lime do HTML e vistos cinza/azul antigos não são semântica aprovada.
