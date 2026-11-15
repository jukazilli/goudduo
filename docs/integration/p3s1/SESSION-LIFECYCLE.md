# Ciclo de vida, retorno e encerramento

Início é ação explícita de Começar treino, nunca montagem da Home ou seleção de dia. Adapter resolve prescrição válida, gera UUID próprio e despacha create. Navegação para /sessao/:sessionId ocorre após verificar a criação real no estado; start muda prepared→running. Intenção pendente em ref bloqueia toque duplo e reducer protege concorrência.

Retomar só reutiliza sessão live compatível por rotina/dia/workout; edição posterior da revisão salva não muda o snapshot. Se houver sessão diferente ativa, overlay oferece Retomar treino atual ou Continuar aqui; não cria outra nem sobrescreve dados.

Voltar/Sair preservam execução e pausam. Retorno explícito restaura destino de origem, scroll e seleção da rotina/dia; Rotinas reabre a rotina correspondente. Browser Back/Forward também preserva entidade em memória; retorno à rota pausada não retoma automaticamente o tempo. Reload perde sessão e apresenta placeholder seguro, sem associar workoutId como sessionId.

Finalizar abre confirmação para completa, parcial e sem registros. Antes de confirmar, nada terminal é gravado. Após ação válida, estado finished armazena endedAt, tempo ativo congelado e registros efetivos; activeTrainingSessionId é liberado. Repetir finish/record/resume em terminal não altera nada. Não há evento duplicado de Histórico ou publicação.

Descarte exige confirmação separada e estado discarded irretomável. Prescrição salva fica intacta; registros de outras sessões e drafts não são removidos. Cancelar confirmação ou fechar overlay não altera execução. Resumo deixa explícito ser transitório em memória.

## Limites preservados

Sem backend/localStorage/sessionStorage/IndexedDB, recovery, undo após fechar, conflito entre dispositivos ou histórico definitivo. Pausar não promete durabilidade. Sem postagem, Pulse, ponto, Ranking, Progressão, recorde, calorias ou conclusão social automática. Políticas de sessão parcial para métricas continuam pendentes.
