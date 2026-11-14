# Busca e inclusão

`library-model.ts` lê as entidades compartilhadas. Sem query, retorna as quatro primeiras definições, preservando ordem determinística. Com query, normaliza NFD/acentos, caixa pt-BR e espaços; pesquisa nome e metadados existentes de grupo/equipamento, com até 15 resultados, como o limite observado na V7.4. O catálogo atual tem 12 entradas. Não há filtros/pills novos, modalidade inventada, busca remota ou algoritmo de recomendação.

Identidades de tabela devem corresponder ao ID da definição. Registros herdados/aliases incoerentes não viram resultados. Sem correspondência ou catálogo vazio apresenta Nenhum exercício encontrado, sem dados fabricados. Sugestões são somente um recorte determinístico do mesmo catálogo.

## Inclusão real

1. O consumidor valida contexto de Editor/painel e referência do draft; relação/revisão são verificadas por validateDraftContext.
2. Confere se exerciseId já existe no próprio draft e se há intenção em voo para esse exercício.
3. Cria ID de instância novo e prescrição incompleta da definição real.
4. Despacha draft/add no reducer existente.
5. O reducer revalida contexto, existência do exercício, ID de instância e duplicidade antes de inserir. Rejeições mantêm o salvo e as instâncias válidas intactos.
6. Somente a presença do novo par (instanceId, exerciseId) após a alteração de estado confirma a inclusão. Colisão/rejeição não produz Adicionado.

`validateDraftContext` é a função de vínculo/revisão/compartilhamento antes privada na validação de draft. O mesmo gate continua sendo usado no salvamento. A inclusão usa só esse gate contextual, não a validação completa de parâmetros: isso permite adicionar um segundo exercício enquanto o primeiro está incompleto, sem permitir salvar qualquer um deles prematuramente.

## Check e feedback

Condição adicionado e contagem vêm de draft.exercises, sem cache concorrente. Remover no Editor libera imediatamente a mesma definição para reinclusão, gerando outra instância com campos iniciais em branco. Nada copia parâmetros removidos silenciosamente.

Linha é um único botão, com Plus/Check Lucide reais. aria-disabled indica o estado e o handler impede nova inclusão; a linha continua focável para não perder foco ao trocar o ícone. O reducer reforça o bloqueio. O teste negativo de clique forçado verifica o handler mesmo com aria-disabled; não habilita a operação.

Intenções em voo guardam somente pares de IDs para correlacionar o resultado, não uma lista de exercícios adicionados. Feedback em região status/aria-live/aria-atomic dura 1.350 ms, é reiniciado somente por outra inclusão efetiva e usa uma nova chave para anunciar eventos repetidos. Timers e intenções são limpos ao desmontar. Check permanece após o texto transitório expirar; popup não fecha.

Erros tipados são exibidos com as mesmas mensagens do Editor. Revisão obsoleta, vínculo alterado, compartilhamento pendente ou contexto ausente não recebem confirmação de sucesso. Nenhum item é gravado no treino salvo antes do fluxo final de commit.
