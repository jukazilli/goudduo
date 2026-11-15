# Execução, séries e validação

A série prescrita e sua execução têm identidades separadas. Ao criar a sessão, a quantidade de slots vem de sets da prescrição; valores iniciais podem usar repsMin, duração/distância prescritas e carga existente, porém recordedAt fica ausente. Inicializar o campo não conclui nada.

Valores realizados: repetitions inteiro positivo; durationSeconds/distanceMeters finitos positivos conforme modalidade; loadKg opcional, finito e não negativo. Campos de modalidade incompatível são rejeitados. Rep min/max continuam na prescrição: execução registra um número realizado, sem alterar o intervalo salvo. Nenhuma conversão de unidade silenciosa.

`session/input` altera apenas o slot não confirmado e selecionado no exercício ativo, enquanto running. Valores intermediários inválidos ficam em memória e bloqueiam Concluir série com feedback acessível. Campo de carga permite limpar o opcional; entrada decimal aceita ponto/vírgula sem perder a digitação intermediária. Inputs>=16px, labels e inputMode apropriados; equipamento/substitutos não viram dropdown nem alteram o catálogo.

`session/record` valida e grava recordedAt atomicamente no mesmo slot. ID inexistente, série já realizada, outro exercício/série selecionada, estado pausado/resting/terminal e valores inválidos não geram registro. Não é possível adicionar séries além das prescritas neste recorte.

Depois de confirmar uma série, a seleção não avança automaticamente para outro slot. Próxima série é uma ação distinta; duplo toque não confirma a próxima. Botão primário ignora o segundo click do mesmo gesto (detail>1), e finalizar exige confirmação. Testes cobrem a falha intermediária em que o segundo click atingia o novo rótulo Finalizar.

Pular conserva registros parciais e marca a instância skipped, sem confirmar slots restantes. Exercício já totalmente registrado não é transformado em pulado. Reordenação move apenas IDs no order de execução: valores, nomes, seleção e registros permanecem associados às instâncias.

O resumo lista somente séries com recordedAt e seus valores efetivos. “Exercícios com séries realizadas” pode incluir um exercício depois pulado parcialmente; não é soma de exercícios totalmente concluídos nem elegibilidade de Progresso. Nenhum ponto/caloria/streak/recorde é calculado.

A ajuda contextual permite consultar quantidade de séries, intervalo de repetições ou tempo/distância, carga quando prescrita e descanso do snapshot original, mesmo após alterar os valores realizados. Não há perda do intervalo repsMin/repsMax por usar um único valor realizado.
