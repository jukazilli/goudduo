# Jornadas no aplicativo comum

As jornadas abaixo são consumidores reais do catálogo e reducer, sem ativar ferramentas do Lab. Parâmetros obrigatórios inicialmente em branco são preenchidos pela pessoa/teste antes de salvar.

| Jornada | Caminho e verificação |
| --- | --- |
| A — Um exercício | Rotinas → domingo vazio → Editor → Biblioteca → pesquisar/adicionar → fechar → preencher séries/reps/descanso → preparar → confirmar um → nome contextual editável → commit → domingo com treino. Reabrir conserva workoutId e parâmetros. |
| B — Vários | Terça vazia → incluir Agachamento e Prancha com o sheet aberto → preencher reps e tempo conforme cada tipo → mover Prancha para cima por menu → preparar → nomear sem confirmação intermediária → salvar. Reabrir mostra ordem e carga/duração salvas. |
| C — Editar salvo | Segunda existente → alterar séries → abrir Biblioteca e incluir por tempo → fechar preserva séries anteriores → remover a instância anterior → configurar/confirmar/nomear → retorno. A URL/workoutId continua a mesma; revisão e entidade compartilhada são confirmadas também em integração unitária. Remover/reincluir gera outra instância em branco. |
| D — Cancelar/descarte | Dia vazio → adicionar → fechar por backdrop → Back mantém draft → reabrir encontra item → solicitar descarte e continuar mantém tudo → confirmar descarte remove somente draft → dia segue sem treino salvo e novo Editor abre vazio. |

Os cenários estão em tests/e2e/contextual-library.spec.ts e são executados em 320/375/390/414/430. Uma quinta jornada cobre sugestões, sem resultados, duplicidade, feedback transitório, foco, scroll independente, Back/Forward, redução de movimento e acessibilidade automatizada.

Os testes unitários/de integração verificam IDs/medições, catálogo vazio, alias inválido, duplicidade, colisão de instância sem feedback falso, ID inexistente, draft inexistente, mudança de vínculo, stale-revision, shared-workout-pending, isolamento entre drafts e a mesma entidade/revisão nos seletores Home após commit.

## Fronteiras

Adicionado significa inclusão no draft, não treino salvo ou prescrição válida. Header continua desabilitado se faltam parâmetros. Zero exercícios, nome vazio, parâmetros inválidos e conflito de revisão não geram commit parcial. Somente o sucesso real do reducer encerra o draft e retorna à rotina/dia selecionados.

A aplicação demonstra criação/edição funcional em memória. Não cria um exercício novo no catálogo: escolhe uma definição existente e cria uma instância prescrita. Não há backend, upload, persistência ou catálogo profissional definitivo. Reload reinicia as fixtures e perde contextos efêmeros conforme a fundação.

Safari/iPhone e Android físicos, teclado virtual e VoiceOver não foram executados. O status real de cada suíte e suas limitações ficam no [relatório de regressão](REGRESSION-REPORT.md).
