# P2-B7 — Pulse contextual de Treinos

Entrega para revisão do proprietário; [coordenação #29](https://github.com/jukazilli/goudduo/issues/29). Branch `feat/p2b7-training-pulse-squircle`, base **de915615bc928d998796c06a0694b358266a6d6e**. Sem merge da implementação P2-B7, deploy ou início de P2-B8.

## Homologação controlada P2-B6

[PR #39](https://github.com/jukazilli/goudduo/pull/39) reauditada no head **258c04e9681cc3fbe384464049bf683b66474bf5**, base7e421cfb97e8a8ab2c6ba3271571a604b2d501ea, sem conflitos; [CI43650977157](https://github.com/jukazilli/goudduo/actions/runs/43650977157) aprovada no mesmo SHA:102 unitários/integração,125 Playwright,4 bundle, builds/typecheck e dry-run preexistente. Diff, fontes/hashes das75 capturas, Shell/estado/dependências/hospedagem conferidos. Marcada pronta e integrada exclusivamente por merge controlado em **de915615bc928d998796c06a0694b358266a6d6e**. [Homologação na Issue #29](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6896419212); Issue permanece aberta.

Homologação funcional/estrutural da Home V5.3, não aprovação de Ranking/Status/Peso/Medidas/Recordes/Consistência/Sessão ou serviços pendentes de Progresso/refinamento final.

## Implementado e limites

A reserva vazia é substituída por TrainingPulseRegion/TrainingPulseStrip no mesmo HomeCompositions.treinos.pulse. Duas identidades disponíveis: própria, derivada do usuário compartilhado, e institucional com SVG oficial. Squircle54/58px, raios18/19, gap10, scroll horizontal nativo e foco de teclado. Nenhuma pessoa ou publicação acrescentada à aplicação comum.

Criação desabilitada; item institucional sem destino inventado; toques não navegam nem marcam visto. Visto=gelo confirmado; stops exatos de não visto continuam pendentes, portanto não se introduz gradiente candidato. Aplicação comum tem estado desconhecido/neutro, sem conteúdos/contadores. Quantidades e estados conhecidos são fixtures de apresentação somente em testes/Lab isolado.

- [Contrato e geometria](TRAINING-PULSE-CONTRACT.md)
- [Dados e estados](SOCIAL-DATA-AND-STATES.md)
- [Interações e indisponibilidade](PULSE-INTERACTIONS.md)
- [Isolamento por contexto](CONTEXT-ISOLATION.md)
- [Comparação V5.3/capturas](V53-VISUAL-COMPARISON.md)
- [Regressões e segurança](REGRESSION-REPORT.md)
- [Gates P2-B8](NEXT-GATES.md)

Publicações ainda não possui Pulse visual público: seu contrato circle e o estado anterior são preservados, sem implementação antecipada. Não há feed paralelo, novo provider/roteador/host, backend, mídia privada ou persistência. Nenhum viewer, upload/criação ou preferência de ocultação foi implementado.

Node24.22.x/pnpm11.25.x fixados. Executar frozen-lockfile, typecheck, test, build, build:lab, `node --test tests/bundle.test.mjs` e Playwright conforme package.json. Cloudflare somente dry-run da CI preexistente. Safari/iPhone/Android físicos permanecem pendentes.

Validação local concluída: **111 unitários/integração,145 Playwright,4 bundle**, typecheck e builds app/Lab aprovados. Fontes/capturas/hashes conferidos. CI do SHA efetivo será registrada na PR/entrega; QA físico permanece pendente.
