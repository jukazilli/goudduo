# Jornadas automatizadas

`tests/e2e/session-history.spec.ts`, aplicativo React comum, sem Lab, catálogo paralelo ou injeção de sessões. Cinco jornadas repetidas em320/375/390/414/430×844. Novos testes usam sessões produzidas por ações reais de execução/confirmar finalização.

| Jornada | Evidência |
| --- | --- |
| A — Completa | Inicia Home, registra11 reps/7,5kg, confirma finish, resumo→Histórico→detalhe por teclado, prescrito1–1 versus realizado11, retorno com seleção/foco; reload esvazia e ID antigo indisponível |
| B — Parcial | Quinta com três slots; registra uma série, preenche99 sem confirmar outra, pula exercício, finaliza; detalhe mostra8 realizados, dois slots Não realizada e Pulado, nunca99 como execução |
| C — Múltiplas | Executa/finaliza cinco sessões do mesmo treino, IDs distintos, newest first; retorna por Back/Forward ao item com foco e scroll exatamente200px |
| D — Snapshot | Cria treino novo, executa/finaliza, edita nome/carga/reps, retorna por History API ao resumo anterior e comprova resultado original |
| E — Integridade | Vazio, safe areas/reduce/axe, sessão ativa sem resultado, pausa/retomada, descarte→Histórico vazio na mesma memória, ID ausente/malformado, navegação por teclado |

O salto de histórico nativo em D usa apenas marker.depth para voltar à entrada já existente: não recarrega, injeta estado de aplicação nem fabrica resultado. C verifica geometria do link dentro do viewport antes de clique real por coordenadas, evitando scrollIntoView do automatizador alterar a medida de retorno.

Testes de dados complementam a UI: titularidade, rotas alternativas, slots de tempo/distância, empate de endedAt por ID, ausência de persistência, finished sem séries, descartadas/ativas e prescrição removida. Fixtures de outro titular são exclusivas dos testes; não há UI de troca de usuário/debug no produto.

Suíte anterior permanece integral: P1-R1/P2-B1–B8/P3-S1, incluindo confirmação obrigatória no reducer, overlays/foco, relógios, Navegação, Editor/Biblioteca, Hero/Bento e Pulse por contexto. Novas jornadas não substituem nem enfraquecem esses contratos.
