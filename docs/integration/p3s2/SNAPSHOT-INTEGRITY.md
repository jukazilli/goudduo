# Snapshot versus prescrição atual

Sessão S1 captura SessionPrescription por selectSessionPrescription, clona exercícios/listas de substitutos e preserva nome/revisão/identidades. A P3-S2 projeta exclusivamente essa entidade finalizada. Não consulta o estado atual do Editor, catálogo ou rotina para preencher registros passados.

Prescrito mantém séries, intervalo de repetições ou tempo/distância, carga quando existente, descanso, equipamento e demais metadados válidos do snapshot. Realizado vem somente dos slots confirmados. Um valor não confirmado é actual:null, mesmo que tenha sido digitado99 ou inicializado pela prescrição.

## Prova automatizada

E2E D cria treino em domingo vazio pelo fluxo Editor/Biblioteca existente: uma série, reps6–10, carga5, descanso0 e nome Prescrição original S2. Executa8 repetições/carga7,5, finaliza com confirmação e retorna ao Editor. Salva nova prescrição com reps20–22/carga40/nome revisado. Retorna ao resumo anterior pelo histórico nativo do navegador e abre a lista/detalhe: resultado conserva nome original, revisão1, prescrito6–10/5kg e realizado8/7,5kg.

Unitários também executam o mesmo Workout em revisões diferentes com sessionIds diferentes, preservam os arrays/objetos salvos, e provam que o selector funciona recebendo somente user/trainingSessions. Mudanças ou desaparecimento da prescrição atual não reconstroem nem substituem o resultado antigo.

Reordenação de execução preserva IDs e parâmetros por instância; projeção respeita order da sessão, sem modificar a ordem salva do Workout. Execução/histórico não alteram drafts, revisão, vínculo do dia ou shared-workout-pending. Autoria profissional/direitos e interpretações futuras de equipamentos/substitutos permanecem em seus gates, sem novos cálculos.
