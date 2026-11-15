# Regressão, segurança e resultados P2-B7

Base **de915615bc928d998796c06a0694b358266a6d6e**, merge controlado da PR#39 homologada. Node24.22.1/pnpm11.25.0 fixados, Playwright1.56.1/Chromium141.0.7390.37 do pacote, touch/DPR1/320/375/390/414/430×844. Sem atualização de dependência ou lockfile.

## Checks observados

| Check | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile | PASS |
| pnpm typecheck | PASS, inclusive builds |
| pnpm test | **111 PASS/11 arquivos**,102 anteriores e9 novos |
| pnpm run build / build:lab | PASS; app/Lab auditados e separados |
| node --test tests/bundle.test.mjs | **4 PASS**, com marcadores negativos adicionais do cenário Pulse |
| Playwright |**145 PASS**,125 anteriores+20 novos; zero falhas/skips/flaky na rodada final local |
| Capturas |80, cinco larguras, origem/medidas/hashes e fonte normalizada explícita; zero pageerrors |
| Diff/assets/fontes | Revisão de escopo, referência e SVG oficial conferidos; guard público preservado |

Logs/harness em /workspace/scratch/p2b7; relatórios/traces em test-results ignorados. A CI do head efetivo será confirmada na PR/entrega, sem inferir sucesso remoto. Builds de entrega regenerados após commits para SHA/dirty=false/hash do lock. Cloudflare somente dry-run do workflow preexistente; nenhuma preparação extra, configuração, recurso, upload/deploy ou URL pública.

## Cobertura

Unitários: própria/institucional em ordem, ID/nome/inicial Unicode derivada, deduplicação/IDs vazios,2 identidades default sem posts/contadores/mídia,0/1/múltiplos, mapeamento seen gelo/unseen pendente/unknown neutro, SVG oficial, criação disabled e institucional sem botão, toques sem navegação/escrita, mudança de nome sem alterar social/treinos/drafts, isolamento de contexto e memória somente de scroll.

E2E novos, quatro jornadas×cinco larguras: geometria54/58/raio18/19/gap10, slot108,8/112,8 sem deslocar Ranking218, toque sem fake viewer/publicação/visto, teclado/ordem/foco/axe, overflow horizontal touch/setas no Lab com0/1/2/8 identidades e estados tipados, scroll vertical iniciado sobre criação disabled, retorno Home→topo, troca de contextos e edição/salvamento reais preservando o mesmo workout/revisão e Pulse. Zero pageerror/console.error exigido.

Suítes P1-R1/B1/B2/B3/B4/B5/B6 permanecem obrigatórias:125 E2E anteriores e102 unitários anteriores. Contrato circle/squircle continua exercitado em surface-contracts.test.tsx, sem inventar implementação de Pulse circular público. Os testes B6/foundation que exigiam região vazia foram atualizados para2 identidades reais de apresentação, criação desabilitada, ausência de links/estados vistos e isolamento de Publicações; snapshots externos/chrome/segurança mantidos.

## Falhas intermediárias

1. Primeira rodada dirigida320:3 PASS/1 falha no foco visível. focus() após mouse não garante :focus-visible; teste agora percorre Tab/Shift+Tab real e mantém asserções de outline/ordem. Rodada corrigida4 PASS.
2. Primeira coleta visual encontrou dois seletores .pulse-shell no HTML (Treinos e view oculta). Harness restringido a #homeView; nenhuma alteração no HTML/app. Coleta completa80 imagens concluída.
3. Primeira suíte completa:144 PASS/1 falha em430. O cenário misturava gesto touch com clique de mouse em Home durante momentum, deixando27px de scroll. A troca para tap real durante momentum ainda falhou em10/15 execuções dirigidas. Instrumentação nas cinco larguras mostrou pointerdown/touchstart/pointerup/touchend, mas nenhum click entregue à aplicação: o navegador consome esse toque para parar a inércia. O teste aguarda estabilização nativa (oito frames sem deslocamento, sem sleep fixo), então faz tap e mantém igualdade exata0. A rodada dirigida final passou15/15 (três por largura, páginas novas, não retries). Nenhuma alteração de Shell ou relaxamento do contrato.

4. Segunda integral:144 PASS/1 falha no gesto B2 em430; os20 cenários novos Pulse passaram. O teste antigo media o handle durante a animação de entrada. Passou a aguardar animation.finished antes de obter as coordenadas e executar o mesmo gesto, mantendo fechamento/revisão/histórico/foco. Host/motion não alterados.

Rodada integral final: **145 PASS**, incluindo os125 cenários anteriores e20 novos, após as sincronizações acima. Nenhuma alteração de componente global foi necessária.

Falhas não são contabilizadas como aprovações. Não há skip/retry/timeout ampliado para fazer teste passar. Qualquer falha ainda encontrada será registrada na PR/entrega, sem ser tratada como cosmética.

## Escopo e proteção

- Novos componentes/modelo/CSS de apresentação local; PrototypeApp apenas troca consumidor e guarda ref de scroll. HomeTraining perde só função vazia e CSS perde só altura da reserva anterior; corpo V5.3 sem redesign.
- Modelo/reducer/provider/seletores/fixtures de domínio, navegação, SurfaceIntegrations/PulseSlot, AppShell, Header, TabBar, OverlayHost, tokens/app.css, Rotinas/Editor/Biblioteca de produto, configuração Cloudflare e package/lock permanecem sem alteração.
- Lab ganha consumidor técnico isolado, com fixtures de identidades e estados. Guard e seus testes acrescentam proibição de marcadores desse consumidor no app; todas as restrições anteriores ficam intactas.
- Fonte white.svg pública já existente com blob7a07c1ec6c42f16ec7b536f93b7e60049228168f, sem modificação. Nenhum asset novo, raster/wordmark reconstruído, GIF/foto/avatar de procedência incerta.

**Código/arquivos privados transportados: nenhum.** Consultas a governança/Issues e busca pontual por preferência não implicaram cópia/adaptação literal de implementação privada. Allowlist P2-A segue proposta; não foram portados HomeShell/CSS, monólitos, mídia, fixtures privadas ou dados de usuários. Novo código autoral independente usa somente contratos públicos/aprovados. Nenhum backend, autenticação, persistência, serviço social ou segundo store.

## Limites

Aplicação comum sem registros de conteúdo Pulse: duas identidades neutras, sem contagem, viewer, criação ou visto. Gradiente não visto/stops e acabamento do aro gelo seguem gate; fixtures não viram serviços reais. Ocultação via Configurações/Atividade pendente. Publicações visual ainda ausente no destino: preservação comprovável é contrato e ausência de alterações, não paridade com Feed privado.

Safari/iPhone e Android físicos, teclado virtual/VoiceOver/insets reais e momentum físico não testados. Chromium touch não substitui homologação em aparelho. Refinamento visual final pertence ao proprietário. Sem deploy ou início de P2-B8.
