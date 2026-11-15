# Dados, titularidade e privacidade

Única fonte: DemoProvider → DemoState.trainingSessions. Constructor demonstrativo começa com tabela vazia. Somente session/finish confirmado muda uma entidade para finished; o Histórico não despacha ações de execução e não possui provider/reducer/cache próprio.

selectSessionResult verifica session.userId === state.user.id antes de expor nome, data ou valores. selectSessionHistory aplica o mesmo gate a cada item. Rotas diretas não bastam para autorizar leitura: ID alheio e ID inexistente produzem a mesma superfície indisponível. Seleção local guarda apenas sessionId e não guarda resultado.

## Fechamento de caminho alternativo

A rota antiga /sessao/:id também podia resolver uma entidade apenas pelo ID. O adapter S1 agora filtra sessão e ponteiro ativo pelo titular atual; reduceSession recusa ações de outro titular. Isso impede contornar o gate do Histórico pela superfície antiga. Testes cobrem /historico/foreign e /sessao/foreign e tentativa de retomar entidade alheia. Não altera concorrência, descanso, confirmações ou prescrição.

Esta é proteção do **protótipo em memória**, não autenticação/autorização de servidor ou isolamento de produção. Não há troca de contas operacional; fixtures de outros titulares existem só nos testes para provar negativa de acesso, sem pessoas reais ou dados clínicos. Futuro backend exige autorização e privacidade próprias.

Nenhum endpoint, fetch de resultados, telemetria, log de dados de execução ou compartilhamento. Nada é enviado a Post, Pulse, Feed, Perfil público, Ranking ou Progresso. Nenhuma mídia, fotografia ou GIF foi importado. Não foram transportados arquivos privados.

Sem localStorage/sessionStorage/IndexedDB, banco, Cloudflare D1/KV/R2, sincronização ou recovery. Ao recarregar, o estado demonstrativo é reiniciado e a lista fica vazia; detalhe antigo não reconstrói execução a partir da prescrição. Histórico em memória não equivale a histórico persistente.

Resultados são readonly; não há edição/exclusão retroativa, retenção definitiva, exportação ou cópia de rotina a partir do resultado. Tais políticas dependem de decisão separada. Selecionar data, abrir Home/Rotinas ou editar cargas prescritas não gera sessão ou resultado.
