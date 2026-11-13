# Estado único e navegação integrada

`src/app/PrototypeApp.tsx` é composição do AppShell existente, usado por src/main.tsx e pelo Lab comum. Não cria Shell, router, provider ou overlay concorrentes. Somente a resolução de `destination=rotinas` fornece conteúdo novo; demais rotas/políticas são preservadas. Não foi adicionada rota de aplicação HTML independente.

## Fontes de verdade

| Informação | Fonte |
| --- | --- |
| Rotinas e vínculo de dias | DemoState.routines |
| Principal | primaryRoutineId |
| Dia escolhido | selectedDayByRoutine + training/select |
| Treino e revisão | workouts + selectWorkoutForDay |
| Exercícios/nomes/grupos | Instâncias Workout.exercises → catálogo exercises → muscleGroups |
| Rascunhos | drafts do reducer P2-B1 |
| Origem/posição/draftId/revisão base | RoutineEditorContext e BrowserNavigation da P2-B2 |
| Expansão | expandedId local ao PrototypeApp, acima da superfície para sobreviver à troca de rota |
| Ordem temporária/órfão | Função pura routinesLayout, sempre derivada; nenhuma ação salva |

O componente guarda somente IDs de apresentação/retângulos de animação, nunca uma versão independente de treino. Atualização válida do mesmo workout aparece imediatamente na prévia; selecionar outro dia não modifica a prescrição ou outra rotina.

## Fixtures

Foram preservados usuário, IDs e treino de segunda-feira da P1/P2-B1. O cenário passa a ter cinco rotinas sintéticas, cinco prescrições válidas com IDs próprios e três definições de catálogo já existentes. Quinta-feira da principal demonstra dois exercícios, alternativa demonstra três, segunda um, rotina Mobilidade vazia demonstra zero. Não se copiaram seed/autores/GIFs/fotografias privados ou exercícios do catálogo real para preencher cards.

As prescrições de rotinas diferentes têm IDs e instâncias próprios; não existe compartilhamento implícito de treino entre dias. Grupos são os metadados sintéticos existentes, sem coleta corporal. Todas as fixtures são determinísticas, sem backend ou persistência. Nomes demo/demonstração evitam apresentar esses dados como informações reais de usuário.

`scenario/routines` é ação técnica de fixture, disponível somente pelo inspetor do Lab, como scenario/reset. Recria cenário de dados várias/uma/nenhuma e reinicia as fixtures/drafts; não é operação de excluir rotina do produto. O valor do seletor deriva da coleção, evitando ficar desatualizado após reset. Não há controles de cenário no bundle comum.

## Entrada no Editor ainda indisponível

Ver treino/Adicionar treino usam openEditor da P2-B2 para abrir rascunho/contexto e chegar à rota preparatória. Não integram header.action, renderers de nomeação ou Biblioteca, e não fazem prepare/commit. O destino continua declarando indisponibilidade, sem Salvar ou sucesso falso.

Se já existe rascunho do mesmo dia/rotina/treino, a navegação reutiliza seu ID/revisão/contexto em vez de duplicar ou descartar dados. Dia livre recebe apenas um draft vazio com ID novo; routines.days e workouts salvos não são alterados. Os testes verificam esse limite explicitamente.

Voltar mantém rascunho, expansão e dia; BrowserNavigation restaura o scroll salvo. Na remontagem da superfície, o alinhamento de abertura não sobrescreve essa posição. Back/Forward e rotas diretas continuam pelo mesmo adapter. Reload reinicia estado/prescrição demonstrativa e expansão, conforme contrato existente; não há recuperação persistente ou dados sensíveis em URL/history.state.

## Pendências de dados

Nenhuma operação nova define ordem persistida, cópia versus referência, autoria profissional ou acesso a mídia. Funções históricas complexas continuam candidatas a port seletivo futuro, com autorização granular. A integração visual desta Home não autoriza copiar branches privadas inteiras, usar catálogo real fictício ou dispensar os gates do domínio.
