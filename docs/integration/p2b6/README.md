# P2-B6 — Home Treinos V5.3 integrada

Entrega na [PR Draft #39](https://github.com/jukazilli/goudduo/pull/39), para revisão do proprietário, vinculada à [Issue #29](https://github.com/jukazilli/goudduo/issues/29). Branch `feat/p2b6-home-treinos-v53`, base **7e421cfb97e8a8ab2c6ba3271571a604b2d501ea**. Não houve merge da implementação P2-B6, deploy ou início de P2-B7.

## Homologação P2-B5

[PR #38](https://github.com/jukazilli/goudduo/pull/38) reauditada no head **ce61b50ddbc18898b46146e49a0d492efa2ec529**, base fba23be34bbd370e2dccef4d94d2c6a23265e6c1, sem conflitos. [CI 43551844323](https://github.com/jukazilli/goudduo/actions/runs/43551844323) no mesmo SHA: 93 unitários/integração,100 Playwright,4 bundle, typecheck/builds e dry-run preexistente. Diff, hashes de fontes/80 capturas e ausência de mudanças de Shell/estado concorrente/hospedagem reconferidos. Marcada pronta e integrada exclusivamente por merge controlado em **7e421cfb97e8a8ab2c6ba3271571a604b2d501ea**. [Homologação registrada](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6885318456); Issue permanece aberta.

Isso não homologa catálogo profissional, Biblioteca independente, equipamentos selecionáveis, mídia/GIFs, substitutos, cópia versus referência, limite final de nome ou QA físico.

## Implementado

Corpo React no slot HomeCompositions.treinos: Bento assimétrico com Ranking/Status/Peso, Hero charcoal vinculado ao treino salvo, widgets Medidas/Biblioteca/Fotos/Recordes e faixa Consistência. Expansão local por grupos, reflow/órfão e restauração sem preferência salva. Região Pulse vazia, não interativa, reservada para P2-B7.

Um único AppShell, DemoProvider/reducer, histórico e OverlayHost. CTA Ver treino/Organizar treinos abre a Home Rotinas real, com principal expandida e dia preservado; Editor/Biblioteca/salvamento seguem o fluxo homologado. Nenhuma Sessão é iniciada. Valores sociais/corporais não são inventados: esses widgets são estruturais e neutros, com estado de indisponibilidade.

- [Contrato e precedência](HOME-V53-CONTRACT.md)
- [Bento e motion](BENTO-LAYOUT-AND-MOTION.md)
- [Fonte de dados e navegação](HOME-TRAINING-DATA.md)
- [Matriz funcional dos widgets](WIDGET-STATUS-MATRIX.md)
- [Comparação e capturas](V53-VISUAL-COMPARISON.md)
- [Testes, regressões e segurança](REGRESSION-REPORT.md)
- [Gates para P2-B7](NEXT-GATES.md)

Node24.22.x/pnpm11.25.x fixados. `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, `pnpm run build`, `pnpm run build:lab`, `node --test tests/bundle.test.mjs`, `pnpm exec playwright test`. App e Lab continuam builds separados. Sem novo backend/persistência/dependência/asset privado.

Validação local concluída:102 unitários/integração,125 Playwright,4 bundle, typecheck e builds app/Lab aprovados. A CI do SHA efetivo está vinculada à PR. Safari/iPhone e Android físicos continuam pendentes.
