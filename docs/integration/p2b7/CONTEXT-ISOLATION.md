# Isolamento Treinos × Publicações

A fundação mantém PulseSlot<'squircle'> em HomeCompositions.treinos e PulseSlot<'circle'> em .publicacoes. Nenhum desses tipos foi alterado; os testes de composição P1-R1 continuam exercitando os dois shapes independentemente.

TrainingPulseRegion substitui o nó reservado no slot de Treinos, sem outro Shell/header/TabBar/navegação. CSS training-pulse-v53 é opt-in de consumidor e não seleciona [data-pulse-shape] globalmente, Publicações, Business ou classes de Feed. Não se promove raio19 a token global.

Publicações ainda não possui Feed/Pulse visual implementado no repositório público. Estado atual e contrato circular preservados; não se declara paridade visual com Feed privado nem se antecipa sua integração. Nenhuma imagem/post/curtida/republicação/perfil foi portado. Business segue independente e sem capacidade profissional nova.

Arquivos de Shell, header, TabBar, navegação, OverlayHost, tokens/app.css e contratos de superfície permanecem sem diff. HomeTraining.tsx só perde a função vazia antiga; home-training.css só perde as regras da reserva anterior, substituída pela geometria intrínseca do Pulse. Ranking/Status/Peso/Hero/CTA/expansão/reflow/gradientes/vazios não mudaram. Padding superior total antes do Bento permanece108,8/112,8px, sem duplicar altura/gutter/inset.

User/social/rotinas/workouts/exercises/drafts/revisões/seletores/reducer/provider não foram estendidos ou substituídos. Modelo de Pulse novo é somente apresentação; nenhum estado social concorrente. A única memória adicional é uma ref de scroll do consumidor de Treinos em PrototypeApp.

A jornada Home→Rotinas→Editor→Biblioteca→salvar→Home continua usando a mesma identidade e revisão. Teste novo verifica troca Treinos/Publicações/Business e commit real;125 testes anteriores continuam obrigatórios, incluindo criação completa e swipe do Hero.

Testes antigos que exigiam reserva vazia foram atualizados para a alteração expressamente autorizada: exigem2 identidades, criação desabilitada, estados desconhecidos e ausência de links; seguem exigindo1 squircle em Treinos,0 em Publicações/Business e snapshot externo de estilos sem alterações. Nenhuma asserção de chrome/estado/segurança foi retirada para acomodar regressão.

Lab separa um consumidor técnico independente de apresentação, não uma segunda aplicação ou simulador de backend. Marcadores/fixtures techniques e novos rótulos de inspector são recusados pelo guard do app; não aparecem na navegação comum.
