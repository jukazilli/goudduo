# Responsividade e acessibilidade

Node24.22.1/pnpm11.25.0 fixados; Chromium141.0.7390.37 do Playwright1.56.1, touch, DPR1. Projetos320/375/390/414/430 ×844; sem retries. Testes anteriores repetidos integralmente e dois E2E novos por largura. Geometria/ações reais, não somente imagens.

| Área | Verificação |
| --- | --- |
| Home | Ranking218, Pulse54/58 e raio18/19, gutter10/13, Bento, órfão/reflow/ordem, Hero e revisão |
| Rotinas | Expansão local, dia44px, preview, scroll/contexto e retorno |
| Editor | Fields >=16px, reps separadas, tempo/distância, footer e TabBar sem sobreposição; reorder via teclado |
| Biblioteca | 75%×844, foco de busca, múltiplas inclusões, query/scroll, check/feedback, duplicata, reinclusão |
| Overlays | Back/Escape/backdrop/gesto, saída, foco/restauração, inert, body lock, reduce |
| Navegação | Cinco destinos, três contextos, direto/reload/back/forward, Home→topo, scroll por contexto |
| Acesso | Axe nos cenários disponíveis, labels, aria-expanded/controls, teclado, foco visível |

Novo coletor `tests/qa/capture-integrated.mjs` exige 20 análises axe sem violações (Home, Rotinas, Editor vazio, Biblioteca × cinco larguras), sem pageerrors/overflow de documento, sheet75%, inert/lock e foco restaurado. [Medidas e evidências](evidence/measurements.json). Os E2E anteriores cobrem também confirmação, nomeação, descarte, cenários de parâmetros e controles técnicos isolados.

Reprodução local: build app/Lab; `pnpm exec playwright test`. Coleta adicional: servir app em127.0.0.1:4189; referências públicas exatas Home em4299 e Rotinas em4298, com arquivos de fonte públicos do pacote em /fonts; executar `node tests/qa/capture-integrated.mjs`. SHA256 dos HTMLs deve corresponder ao relatório de segurança antes de coletar. Nenhuma URL pública/deploy necessário.

Safe areas aqui significam propriedade CSS e simulação de viewport/insets pelos testes existentes, não notch físico aprovado. Touch Chromium e inputs16px não comprovam teclado virtual, zoom, leitor de tela ou momentum do Safari. [QA físico permanece pendente](PHYSICAL-DEVICE-QA-CHECKLIST.md).
