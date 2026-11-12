# Mapa de jornadas e dependências — P0

**Modelo de integração proposto**, sem implementação. IDs do [inventário](INVENTARIO-SUPERFICIES-P0.md); decisões na [matriz](MATRIZ-RECONCILIACAO-P0.md). As transições combinam contratos existentes e ligações a validar: **C** = contrato expresso, **P** = ligação arquitetural proposta, **B** = bloqueada por contrato insuficiente. Nenhuma seta implica backend disponível.

## Contrato transversal de navegação proposto

Uma localização contém destino global, subrota, IDs de entidade, origem e chave de retorno. Estado de domínio fica na store; rascunho em memória sobrevive a overlays/voltar; scroll/foco pertencem à chave da localização. Histórico do navegador e botão Voltar da UI usam o mesmo adaptador. Overlays fecham antes de sair, com foco devolvido ao acionador. Caso uma saída destrutiva não tenha contrato de confirmação, registrar para homologação; não inventar perda silenciosa ou novo diálogo.

Para cada linha, a coluna Retorno explicita o estado a recuperar. Parâmetros propostos não devem carregar senha, nascimento, e-mail ou dados corporais em URLs. IDs inválidos geram estado honesto com retorno, não substituição por entidade aleatória.

## A — Entrada, sessão demonstrativa e recuperação

A sequência de design Cadastro → OTP → Legal → Onboarding **não define ordem de consentimento real**. Termos/Privacidade precisam estar consultáveis no próprio Cadastro antes de eventual criação da conta. O leitor pode ser aberto antes/depois conforme origem; a P0 não cria novo aceite pós-OTP.

| ID / gate | Origem → destino | Ação | Dados transportados e estado preservado | Retorno | Condições / erros |
|---|---|---|---|---|---|
| A-01 P/B | A01 Splash → A02 Entrada/Login | Finalizar inicialização de demo | Modo de sessão de teste, destino pretendido em memória | Background preserva localização; reexibição Splash a confirmar | V4/copy e transição manual/automática pendentes; sem timeout como autenticação |
| A-02 P | A01 → H02 Home Treinos | Cenário de sessão demonstrativa existente | ID de usuário fictício, rota anterior válida | Mantém estado do cenário | Não validar token real; destino default a confirmar com proprietário |
| A-03 C/P | A02 Entrada → A02 Login | Entrar | Formulário em memória; nenhuma permissão nova | Voltar à Entrada preservando contexto permitido | Welcome visual aprovado, função Convidado bloqueada |
| A-04 C | A02 → A04 Cadastro | Criar conta | Rascunho vazio ou em edição | Entrar retorna ao Login | Quatro campos; sem Google/Apple/Meta |
| A-05 C | A04 → A04 inválido/submitting | Submeter | E-mail/@/DOB/senha apenas na memória do formulário | Primeiro campo inválido recebe foco; valores preservados | 18+ completos, calendário válido, handle válido; disponibilidade servidor não simulada como real |
| A-06 C/P | A04 → A05 OTP | Sucesso escolhido no cenário de demo | E-mail demonstrativo e ID do desafio fictício; rascunho não vai à URL | Corrigir e-mail volta ao mesmo Cadastro | Sem e-mail enviado/conta criada; política de senha final pendente |
| A-07 C | A04/A05/Q02 → A07 leitor legal | Termos / Privacidade | Origem, documento/versão demonstrativa, campos/scroll anteriores | Voltar à origem exata, não ao início do fluxo | Minuta integral indisponível: estado explícito, não inventar aceite |
| A-08 C | A07 → A07 outro documento | Alternar Termos/Privacidade | Origem permanece, scroll de leitura por documento proposto | Voltar recupera formulário sem perda | Ler não confirma concordância nem ativa conta |
| A-09 C | A05 → A05 feedback/reenvio | Digitar/colar/confirmar/reenvio | Seis dígitos, foco, cenário de desafio, prazo demonstrativo | Erro mantém tela; corrigir e-mail retorna A04 | Link oculto antes de 90s; produção futura depende servidor; sem TTL/tentativas inventados |
| A-10 P/B | A05 → I01 | Confirmação de demo | Sessão demonstrativa e status de introdução em memória | Sem retorno que finja revogar conta real | Gate legal/versões e destino final não resolvidos pelo HTML |
| A-11 C/P | I01 cenas 1↔2↔3 → H02 | Próximo/voltar/swipe/Pular/Explorar | Índice da cena, preferência opcional de apresentação | Revisitar só por mecanismo homologado; não reabrir 29 etapas | Três cenas opcionais; final HTML atual é terminal demonstrativo; ligação Home é proposta |
| A-12 C | A02 Login → A03 loading → H02 ou A02 erro/expirada | Enviar credenciais do cenário | Valores apenas em memória, destino pretendido | Erro inline e nova tentativa | Retirar sucesso incondicional 700ms como regra; sem login real |
| A-13 C | A02 → A06 recuperar e-mail → OTP recuperação | Esqueci senha / Continuar | Finalidade recovery e endereço de demo | Corrigir retorna recuperar, nunca Cadastro | Resposta não revela existência da conta; erro/sem rede não afirma envio |
| A-14 C/B | A06 OTP → nova senha → sucesso → A02 | Confirmar cenário / alterar / entrar | Desafio recovery separado do signup | Sucesso retorna Login; cancelamento retorna origem | Não autenticar ao verificar OTP recovery; visual nova senha/sucesso pendente |
| A-15 P | Q01 → A02 | Sair da sessão de demonstração | Descartar credenciais efêmeras; preservar/resetar dados sintéticos conforme cenário a aprovar | Login | Não afirmar encerramento de sessão servidor; nenhum dado real excluído |

## B — Rotinas, Editor e Biblioteca contextual

| ID / gate | Origem → destino | Ação | Dados transportados / estado preservado | Retorno | Condições / erros |
|---|---|---|---|---|---|
| B-01 C/P | H02/H01 → T01 Rotinas | TabBar/atalho aprovado | routineId selecionada e seleção de Home quando existente | Voltar recupera Home/scroll | Lista vazia não cria rotina fictícia como fato |
| B-02 C | T01 lista → card expandido/detalhe | Expandir widget | routineId, ordem, posição/scroll | Recolher restaura composição | Expansão contextual sem mover card automaticamente ao topo; sem lacunas |
| B-03 C | T01 → dia selecionado | Tocar dia/navegar dias | routineId + weekday, workoutId opcional | Mesmo card e dia | Dia sem treino oferece criação; navegar não marca execução/falta |
| B-04 C/P | T01 dia → T02 Editor | Criar/Editar treino | draftId, routineId, dia, workoutId/revisão se existente | Voltar preserva dia e rascunho conforme contrato | Edição clona prescrição; entidade removida exige estado explícito |
| B-05 C | T02 → T03 Biblioteca | Adicionar exercício fixo no rodapé | draftId, IDs presentes, query/scroll de Biblioteca | Toque fora/swipe fecha ao Editor, devolve foco | ~75% útil, respeitar teclado e safe area; sem X |
| B-06 C | T03 → T03 resultados | Digitar pesquisa | Query e posição da busca, catálogo de demo | Limpar volta sugestões | Nenhum resultado/erro indicados; não criar upload/catálogo real |
| B-07 C | T03 → T03 + rascunho T02 | Tocar + | exerciseId→workoutExerciseId estável, defaults autorizados | Sheet permanece aberta; query/scroll intactos | Regra de unicidade lógica no rascunho; check + feedback Adicionado; múltiplos toques idempotentes |
| B-08 C | T02 → T02 outro exercício | Anterior/próximo/gesto existente | currentExerciseItemId, valores de todos itens | Voltar mantém campos | Não implementar nova affordance: descoberta segue N#28; reorder usa IDs e não índice como identidade |
| B-09 C | T02 → T02 parâmetros | Ajustar séries/carga/reps/descanso/equipamento | Parâmetros privados da prescrição, catálogo intacto | Fecha seletor retorna ao campo | Equipamento por ID; min/max e formato de descanso; não inventar validações clínicas |
| B-10 C | T02 → T02 / T03 | Excluir exercício, reabrir Biblioteca | Remover instância do rascunho, manter catálogo | Current item válido; check da Biblioteca recalculado | Último removido retorna zero; adicionar novamente permitido |
| B-11 C | T02 zero → T02 | Check salvar | Rascunho vazio | Permanece | Check desabilitado; não grava treino |
| B-12 C | T02 um → confirmação | Check salvar | Rascunho e dia intactos | Continuar editando volta T02 | Salvar assim mesmo prossegue à nomeação, não grava por antecipação |
| B-13 C | T02 ≥2 / confirmação um → nomeação final | Prosseguir salvar | draftId, dia dinâmico, nome atual se edição | Cancelar retorna ao rascunho | Nome somente no final; não abrir formulário prévio do V4 |
| B-14 C/P | Nomeação → T01 dia → H02 | Confirmar nome/salvar | Commit atômico local workoutId/revisão + vínculo routine/day; store notifica seletores | Retorna ao dia de origem; Home lê mesmo ID | Nenhuma gravação antes da confirmação; falha mantém rascunho. Não basta atualizar cópia local de RoutinesSurface |
| B-15 B | T04 Biblioteca independente → rotina/dia → treino | Adicionar fora do Editor | Seleção de exercício e destino | Voltar à pesquisa original | Contrato visual T01–T04/entrada inversa ainda pendente; V7.4 não aprova esse novo fluxo integral |

**Lacuna comprovada:** G#146 cria `demoRoutines` no HomeShell e RoutinesSurface mantém seu próprio `useState(createInitialDemoRoutines())`. Home não recebe um callback de salvamento de Rotinas. Logo, o comportamento B-14 exige refatoração autorizada de estado; não está pronto só porque ambas as telas existem na branch.

## C — Sessão, pausa, retomada e histórico

| ID / gate | Origem → destino | Ação | Dados / estado preservado | Retorno | Condições / erros |
|---|---|---|---|---|---|
| C-01 C/P | H02/T01 → T07 Sessão | Começar treino | sessionId, workoutId/revisão e snapshot de prescrição; instâncias da sessão independentes | Origem em memória | Sem treino/exercícios: vazio honesto; tocar data não começa |
| C-02 C | T07 → exercício/série | Navegar/registrar carga/reps/concluir série | Execution itemId + setId, status e timestamps | Anterior recupera valores | Não reescrever prescrição; double-tap não duplica série |
| C-03 C | T07 mídia ↔ descanso | Concluir série/pular descanso | Deadline/estado do descanso de demo | Retorno à demonstração do mesmo contexto | Timer não depende apenas de tick visual; background deve ser testado |
| C-04 C | T07 → mapa/reorder → T07 | Abrir mapa/arrastar/setas | Ordem da sessão por IDs; séries e cargas ligadas a itemId | Exercício corrente preservado | Ordem da rotina original não muda; foco e gesto acessíveis |
| C-05 C/P | T07 → H01 outro destino | Navegar/sair | Snapshot: exercício, séries, carga, reps, descanso, duração e origem | Home oferece Retomar; volta direta restaura sessão | Navegação pausa; não descartar estado nem bloquear com modal redundante; visual de Retomar adaptar ao V5.3 |
| C-06 C | H02 → T07 | Retomar treino | Mesmo sessionId e snapshot | Navegar pausa novamente | Revisão original preservada se plano foi editado; conflito a definir sem trocar execução silenciosamente |
| C-07 C/B | T07 → finalização/parcial → T08 histórico | Finalizar | Resultado imutável de demo, prescrição preservada | Home/Atividades por destino homologado | Confirmação parcial conforme contrato; regras de elegibilidade e UI histórico pendentes |
| C-08 B | T08 → E04/E05/H02 | Consumir sessão concluída | Evento identificado/idempotente; usuário fictício | Mantém origem | Não calcular PR/streak/falta/pontuação sem regras aprovadas; cancelar não gera conclusão |

G#148/G#146 são linhas divergentes: estas transições são contratos a reconciliar, não declaração de execução end-to-end já comprovada. Ver [auditoria](AUDITORIA-PRS-P0.md).

## D — Publicações, Pulse e Perfil visitado

| ID / gate | Origem → destino | Ação | Dados / estado preservado | Retorno | Condições / erros |
|---|---|---|---|---|---|
| D-01 C | H03 → S01 Feed | Selecionar Publicações | Tab ativa, ordem e IDs baseline | Retorno mantém tab/posição conforme origem | Não acrescentar posts da PR G#152 ao baseline por conveniência |
| D-02 C | S01 → mesmo post/menu | Curtir/salvar/seguir/ocultar/menu | Estado social demonstrativo por IDs | Fechar menu mantém card/scroll | Curtir não navega; contadores consistentes; coleção/repost servidor ausente |
| D-03 C/P | S01 autor → P02/P03 | Tocar autor/avatar | userId, postId, chave de origem e scroll | Voltar ao mesmo Feed/post; likes/salvos intactos | Usuário inexistente: estado explícito; sem trocar fixtures baseline |
| D-04 C/B | S02 Pulse → S04 viewer → S01/P02 | Tocar item Pulse | ownerId/pulseId e origem | Fechar retorna a mesma posição | Main possui placeholder; estado visto e viewer completos exigem contrato; não fingir vídeo real |
| D-05 C/B | P02 → seguir/mensagem/formar dupla | Ação contextual | userId, relação/invitationId demonstrativos separados | Retorno ao perfil visitado e depois Feed | Seguir é demo local; DM/dupla só funcionais após gates; remetente não aceita seu convite |
| D-06 B | S05 menu Criar → destino | Foto/Pulse/Rotina/Discussão | Origem, rascunho de conteúdo se autorizado | Cancelar restaura origem | Menu aprovado não implementa composer; Pulse/Discussão podem ser Em construção |

## E — Perfil próprio, edição e conclusão opcional

| ID / gate | Origem → destino | Ação | Dados / estado preservado | Retorno | Condições / erros |
|---|---|---|---|---|---|
| E-01 C/P | H01 → P01 | TabBar Perfil | viewerId, contexto own/proOwn explícito do cenário | Voltar recupera destino anterior | Não confundir perfil visitado com próprio nem ativar pro por query livre |
| E-02 C | P01 → P06 | Rolar até Complete seu perfil | Tasks concluídas/dispensadas opcionais | Ocultar não altera domínio | Nunca aparece em P02 visitado; sem punição por não preencher |
| E-03 C | P01/P06 → P04 Editor | Editar perfil/card profissional | Draft de nome/@/bio/foto/local/interesses/links, origem | Voltar restaura Perfil; perda de rascunho requer contrato | Profissional só rola até ação explicativa; nenhuma capability muda |
| E-04 C | P04/P06 → P05 Interesses | Abrir/tocar pill | Conjunto de IDs opcionais, aria-pressed | Confirmar/cancelar conforme referência | Sem dropdown, entrada livre ou personalização de Feed alegada |
| E-05 C/P | P04 → seleção UF→município | Escolher UF/pesquisar opção | Código canônico município + UF, não texto livre | Fecha sheet ao Editor com draft | UF trocada invalida município incompatível; offline/falha IBGE explícitos; dado privado por padrão |
| E-06 C/P | P04 → P01 | Salvar | Atualiza usuário de demo uma vez; header/avatar leem mesma entidade | Perfil próprio com draft confirmado | Bio150; política @30 dias é futura servidor; foto em memória não é upload |
| E-07 C | P04 ação profissional → explicação | Mudar para conta profissional | Categoria futura apenas se autorizada; nenhum status concedido | Fecha ao mesmo ponto do Editor | N#27 exige verificação de identidade/registro; sem selo/atendimento automático |
| E-08 C | P01 → Q01 Preferências → P06 | Ocultar/reabrir conclusão | Dispensas individuais e da seção | Mesmas tarefas/dados de demo | Não reintroduzir coleta obrigatória pelo caminho alternativo |
| E-09 C/P | P03 profissional / C01 dupla → abas | Ver publicações/rotinas/atividades | Contexto e permissões demonstrativas | Retorno à origem | Histórico corporal privado nunca vira publicação ou atividade pública |

## F — Demais áreas e limites

| ID / gate | Origem → destino | Ação | Dados / estado preservado | Retorno | Condições / erros |
|---|---|---|---|---|---|
| F-01 B | H01 → C02 Match | Tab central Map | Disponibilidade/intenção somente se aprovadas | Destino anterior | Não iniciar busca ao abrir; Ir é ato específico; cancelar antes de Inativo |
| F-02 B | H01/P02 → C03 Mensagens | Tab/ação Mensagem | Destinatário/origem sem criar conversa real | Perfil/Feed correto | Política de DM/solicitações ainda pendente |
| F-03 B | H04/P03 → Business | Aba/atalho autorizado | Capability somente cenário explícito de Lab | Home/Perfil | Perfil visual pro não autoriza serviço/pagamento |
| F-04 C/P | P01 → Q01 → Q02/A07 | Configurações/Seus dados/documentos | Origem e configuração de demo | Mesmo menu e scroll | Remover só Meu perfil redundante; exclusão/exportação meramente demonstrativas |
| F-05 B | Q01 → C01 Duplas → perfil do par | Ver convites/aceitar/encerrar | invitationId/duoId e participantes distintos por par | Menu/lista preservados | Múltiplos pares; aceitar só como destinatário em cenário QA; prazo/retensão não inventados |
| F-06 B | C05 Atividade → convite → C01 | Aceitar/recusar | IDs idempotentes, ator e status | Central original | Notificação não ativa chat/Match/capability; backend inexistente |
| F-07 B | H02/T01 → E01/E02/E03 | Peso/Medidas/Fotos | Registro privado de demo, unidade/data se contratadas | Widget/contexto de origem | UI/dados não homologados; nenhuma foto pública ou dados reais nesta fase |
| F-08 B | H02/T08 → E04/E05 | Recordes/Consistência | Resultado elegível, período e regra futura | Home/Histórico | Não gerar números de saúde/recordes/streaks a partir de fixtures como fatos |

## Dependências críticas para integração

1. F04 (store/navegação) precede B-14, C-05/C-06, D-03 e E-06: salvar/retornar precisa preservar identidade, não remontar fixtures.
2. F02 (motion) + H01 precedem overlays T03/P05/A07: foco, teclado, scroll e saída são compartilhados.
3. H03/S01/S02 fornecem baseline de regressão antes de extrair componentes compartilhados.
4. Contratos legais A07/Q02 não fazem auth real; A04/A05 são simulação até backend e revisão jurídica separados.
5. T07 precisa de um adaptador snapshot→resultado; T08/E04/E05 continuam bloqueados para métricas definitivas.
6. N#19 substitui coleta obrigatória; preferências só nos contextos de P04/P06/Progresso/Match autorizados, com validações de cadastro preservadas.
