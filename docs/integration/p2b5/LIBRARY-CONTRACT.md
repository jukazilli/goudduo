# Contrato da Biblioteca e do catálogo

Fonte: [Motion V7.4](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html), commit **3f8b2c7c93a33a713c780305e672e1ec7998ceaf**, blob **122275b3cb03bd996b477375d1bbc73ae29c5c3e**, 81.601 bytes. Contratos lidos: [fidelidade](../p2a/ROTINAS-V74-FIDELIDADE.md), [plano](../p2a/PLANO-P2B.md), [allowlist proposta](../p2a/ALLOWLIST-PORT-PRIVADO.md), [domínio](../p2b1/DOMAIN-MODEL.md), [adapters](../p2b2/ADAPTER-CONTRACTS.md), [Home Rotinas](../p2b3/HOME-ROUTINES-CONTRACT.md), [Editor](../p2b4/EDITOR-CONTRACT.md) e [salvamento](../p2b4/SAVE-FLOW.md).

## Fonte única e proveniência

`DemoState.exercises`, equipment e muscleGroups são as únicas fontes. Os três exercícios anteriores foram mantidos com os mesmos IDs e nomes. `src/state/exercise-fixtures.ts` acrescenta nove definições autorais sintéticas, explicitamente nomeadas como demonstração: Agachamento, Remada, Elevação, Desenvolvimento, Flexão e Extensão por repetições; Prancha/Mobilidade por tempo; Caminhada por distância. Total de 12 definições. IDs estáveis demo-*, sem autor/pessoa real, foto, GIF, upload ou dados profissionais.

As adições referenciam somente demo-equipment/demo-muscle já existentes. São metadados demonstrativos legítimos da própria fixture, não um inventário comercial. Rotinas/prescrições anteriores não foram preenchidas com cópias desse catálogo. Não há tabela privada importada, array paralelo dentro da Biblioteca ou catálogo exclusivo de teste no produto.

## Catálogo versus prescrição

Exercise.id identifica uma definição; WorkoutExercise.id identifica a instância no treino. `createUnfilledPrescription` recebe a definição e um ID novo, preserva exerciseId e escolhe o tipo de medição descrito no catálogo. UUID é gerado uma vez na inclusão e permanece estável ao editar/reordenar/salvar. Não se usa nome como identidade ou relógio como ID.

| Campo inicial | Contrato |
| --- | --- |
| Séries / descanso | Em branco, marcador NaN de rascunho já suportado pela P2-B4 |
| Rep min / Rep max | Ambos em branco para repetições |
| Duração | Em branco, segundos, somente exercício por tempo |
| Distância | Em branco, metros, somente exercício por distância |
| Carga | Propriedade opcional ausente; não se assume 0 ou kg recomendados |
| Equipamento | null; não se seleciona automaticamente uma opção do catálogo |

São estados de preenchimento incompleto, não presets de treino. validatePrescription rejeita essas instâncias até os campos obrigatórios serem preenchidos. O Editor mostra os campos vazios/feedback e mantém Salvar bloqueado. Não há persistência de NaN, serialização no histórico ou backend. Ao configurar, usam-se as mesmas ações/parse de campos da P2-B4.

O HTML possui strings/valores demonstrativos; não constituem prescrição inicial profissional homologada para todas as medições. A escolha conservadora em branco segue a autorização expressa da P2-B5, sem inventar recomendações válidas.

## Limites

Equipamento do Editor resolve o valor por ID e segue somente leitura. Pesquisa/seleção de equipamentos e Biblioteca independente têm contrato próprio e não foram antecipadas. Referências de substitutos/modalidade/autoria existentes permanecem no domínio; UI operacional não foi adicionada. O catálogo é demonstrativo e não definitivo.
