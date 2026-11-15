# Relógio de descanso e pausa

Descanso vem de restSeconds da instância prescrita. Cada confirmação elegível inicia um único deadline: now+restSeconds×1000. Saldo exibido=max(0,deadline-now), formato HH:MM:SS arredondado para cima; não se decrementa um contador a cada callback.

Um único intervalo de UI de250ms existe no adapter quando a superfície da sessão está montada e status running/resting. Ele atualiza a apresentação e solicita rest-expire ao atingir o deadline; reducer valida a expiração e torna a ação idempotente. Cleanup ocorre na pausa, no encerramento e na desmontagem/saída da rota. Teste com fake timers confirma exatamente1 intervalo ativo e0 após saída/unmount.

Pular descanso remove apenas o intervalo, sem registrar outra série. Concluir descanso não finaliza sessão ou avança automaticamente seleção. Mesmo na última série, o descanso prescrito pode ocorrer; finalizar explicitamente encerra esse estado sem fabricar execução.

## Política conservadora deste protótipo, não decisão definitiva

Pausar congela **tempo ativo e saldo do descanso**; retomar restaura o mesmo ID, seleção, ordem e séries, com novo deadline a partir do saldo. Tempo ativo é o período da sessão iniciada sem pausas, incluindo descanso enquanto não pausado. Tempo ativo usa referência temporal e acumulado, não soma de ticks; pausa/terminal nunca continuam acumulando.

Sair por navegação interna pausa automaticamente. Não há promessa de cronômetro de fundo após fechar/recarregar o aplicativo, offline sync, notificação ou persistência. Eventos com relógio retroativo são recusados; relógios concorrentes/mudanças do sistema e conciliação entre dispositivos exigem contrato futuro.

A região central permanece228px na mídia neutra, descanso e pausa. O relógio substitui a mídia, nunca cria um painel adicional abaixo dela. Somente dados legítimos e mídia autorizada poderão ocupar esse slot futuramente.
