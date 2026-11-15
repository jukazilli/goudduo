# Contrato implementado da superfície

Fonte pública obrigatória: [Home V5.3](https://github.com/jukazilli/goudduo/blob/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html). Commit073183253fce5fcd0b3474c725e84ff67d3dfec5, blob8c698708dd79449472d6f5c7e536664939de4951, SHA256 **7cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f**, conferidos por extração Git. Referência lida/executada no navegador, não copiada para src/main.

Precedência: [extração A–E](../p2a/HOME-V53-HTML-RECUPERADO.md), direção canônica [#54/6756524720](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720), autorização expressa P2-B6, Shell P1-R1. Referência governa corpo, não statusline/header/TabBar/frame/zoom/fonte global. Publicações e Business não recebem esta composição.

## Componentes

HomeTraining, TrainingHero interno e TrainingPulseRegion em src/surfaces/home/HomeTraining.tsx; funções puras homeBentoLayout e selectHeroChoices; CSS home-training-v53. PrototypeApp injeta os nós nos slots existentes e guarda somente o ID expandido, para preservá-lo entre rotas/contextos. Nenhum componente global, provider ou rota adicional.

Ordem: região reservada Pulse → Ranking à esquerda em duas linhas / Status e Peso à direita → Hero full-width → Medidas/Biblioteca/Fotos/Recordes → Consistência full-width. Pulse não tem miniaturas/pessoas/ícones/anéis/ações/contadores, apenas espaço aria-hidden no consumidor squircle já tipado. A região circular de Publicações não é usada nem alterada.

Paletas locais: Ranking#E3F0FF; Status#EFF8E0; Peso#F3F3F3; Medidas#F2F4FF; Biblioteca#F1F6F9; Fotos#F6F0FB; Recordes#FFF7EA; Consistência#F4F7F8. Nenhuma escrita em :root ou token institucional. Fonte Plus Jakarta Sans existente e ícones Lucide reais; nenhum SVG experimental, fotografia, WebP, imagem fixa ou logo reconstruído.

Hero mantém gradiente radial discreto sobre linear132deg #20262D→#30363C56%→#1C2228, CTA branco e texto claro. Nome, rotina/dia e contagem vêm da entidade salva; sem data/duração ou exemplos inventados. Indicadores são prescrições existentes, não três posições preenchidas artificialmente. CTA corresponde à navegação realmente disponível; Sessão operacional continua pendente.

## Estados neutros e fronteira funcional

A autorização P2-B6 determina neutralidade para os widgets sem serviços. Ranking Sem ranking, Status Sem feedback, Peso/Medidas/Fotos/Recordes/Consistência Sem registros. Não há chart/formulário/upload/coleta/algoritmo/streak, nem zero numérico sugerindo medição concluída. Expansão mostra indisponibilidade honesta. Biblioteca independente não vira o sheet contextual do Editor.

### Delta de Status por fronteira de bundle

A matriz histórica X11 prevê Em construção e link para a Issue privada GODUOIT#160. O guard público preexistente recusa o marcador do repositório privado em qualquer JS/CSS/HTML. O primeiro build detectou esse endereço. Alternativas: relaxar o guard, ofuscar o URL ou retirar somente o link do runtime. Implementado o menor recorte seguro: **Em construção** preservado; link histórico permanece [aqui na documentação](https://github.com/jukazilli/GODUOIT/issues/160), não no bundle. Não houve bypass/relaxamento do guard ou nova funcionalidade de Status. Reposição futura de link para suporte público depende de decisão adequada; não se afirma equivalência integral a X11.

Refinamento final das superfícies e demais gates funcionais continuam do proprietário. Nenhum estado neutro é apresentado como implementação de serviço real.
