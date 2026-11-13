# P2-B1 — domínio e estado compartilhado

Entrega técnica **para revisão**, sem homologação automática. Coordenação [#29](https://github.com/jukazilli/goudduo/issues/29). A [P2-A-R1 / PR #32](https://github.com/jukazilli/goudduo/pull/32) foi auditada no head `723dc21306e14b779ab3d16a0f5cba676515ae53` e homologada documentalmente pelo proprietário no comando P2-B1. [Registro oficial](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6841865200); merge exclusivamente documental `f5e677a1741f38a0e804594fe528cdebbad64cc1`, com dez Markdown e dez capturas documentais públicas confirmados na main. [Confirmação da integração](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6841874356). Issue permanece aberta.

Branch `feat/p2b1-shared-training-domain` criada desse merge. Fundação preservada: [P1-R1 / PR #31](https://github.com/jukazilli/goudduo/pull/31), `0fbc3ed8b3e1c59245d2349ae14160a2a9c43086`. Os textos P0/P1/P2-A antigos são snapshots históricos de revisão; o registro acima atualiza o estado documental sem reescrever decisões históricas.

## Implementado

Uma única store React Context/useReducer, ampliada com catálogo e prescrições separados, equipamentos/grupos sintéticos, rascunhos, seleção de dia, validação atômica e seletores compartilhados. Repetições, tempo e distância têm contratos distintos. Sessão tem somente tipos de prescrição/execução e snapshot de entrada, sem motor operacional. Não há interfaces novas.

- [Modelo de domínio](DOMAIN-MODEL.md)
- [Reducer, rascunhos e salvamento](STATE-AND-DRAFTS.md)
- [Reconciliação com a origem e segurança](LEGACY-RECONCILIATION.md)
- [Resultados dos testes](TEST-REPORT.md)
- [Próximos gates](NEXT-GATES.md)

## Limites

Home V5.3, Rotinas V7.4, Editor, Biblioteca e Pulse não foram implementados visualmente. Nenhum arquivo privado, mídia ou dado pessoal foi transportado. Não houve dependência nova, persistência, serviço backend, deploy ou alteração de Shell, estilos, navegação, Publicações e Business. A PR de implementação deve permanecer Draft, sem merge automático.

A representação permite referências compartilhadas e identidades independentes. **Editar um treino associado a mais de um dia é bloqueado** com `shared-workout-pending`; nenhuma regra padrão de cópia/propagação foi homologada. Esse bloqueio preserva a pendência de produto em vez de escolher uma política silenciosamente.

## Execução

Usar Node 24.22.x e pnpm 11.25.x definidos no projeto. `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, `pnpm run build`, `pnpm run build:lab`. `pnpm dev` abre a fundação; as superfícies finais continuam indisponíveis. Os testes do novo domínio estão em `src/state/training.test.ts`. Não foram adicionados controles técnicos ao app comum nem modificados os controles do Lab.
