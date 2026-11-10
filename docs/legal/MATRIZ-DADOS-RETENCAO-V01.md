# goudduo — Matriz de tratamento, visibilidade, retenção e exclusão v0.1

> **STATUS: MODELAGEM TÉCNICO-JURÍDICA PARA REVISÃO, NÃO IMPLEMENTADA / NÃO HOMOLOGADA.**
>
> **Controlador informado:** Juliano de Lima Pedroso (pessoa física); canal de privacidade e exclusão: **smkahrun01@gmail.com**.
>
> **Uso:** subsídio obrigatório aos documentos [Política de Privacidade](POLITICA-DE-PRIVACIDADE-V01.md), [Termos de Uso](TERMOS-DE-USO-V01.md), [Gate de UX e publicação](GATE-LEGAL-UX-OPERACIONAL-V01.md) e [Issue #12](https://github.com/jukazilli/goudduo/issues/12). Esta matriz não comprova que algum fornecedor, política RLS, mecanismo de backup, sistema de exclusão ou função comercial já esteja implantado.

## 1. Regras transversais

1. **Minimização:** coletar somente os campos necessários para a função ativada, nunca todo o inventário prospectivo.
2. **Visibilidade explícita:** permitir que a pessoa controle audiência por objeto (Perfil, Publicação, Pulse, Rotina, Exercício), sem efeito colateral sobre registros privados.
3. **Dados corporais privados por padrão:** peso, medidas, fotos de progresso, séries, cargas, histórico e insights de saúde. Maior proteção conforme risco e caracterização do dado no contexto concreto.
4. **Acesso por ID interno imutável:** alteração de @ não muda titularidade, autoria, direitos nem histórico; tratar links antigos, conteúdo atribuído e cache.
5. **Dados compartilhados com terceiros:** não fazer exclusão em cascata de informações legitimamente pertencentes a outras contas; retirar identificação do titular quando apropriado e definir política de autoria/mídia.
6. **Pedido de exclusão:** o canal por e-mail é ponto inicial; requer verificação proporcional, registro de protocolo, auditoria mínima, expurgo de banco/arquivos/índices/caches, fornecedores e backups, com exceções justificadas.
7. **Base legal e retenção:** valores concretos **não estão aprovados**. A existência de botão "Excluir" não determina prazo de backups, obrigação fiscal, logs ou proteção de terceiros.
8. **Sem atribuição de encarregado formal por inferência:** avaliar enquadramento de pessoa natural conforme ANPD. Responsável pelo tratamento já identificado e canal disponível.
9. **Futuro não é operação atual:** Match com localização, Business, profissional, verificação CREF, pagamentos e integração de saúde só entram na política pública quando efetivamente habilitados.

## 2. Inventário de dados e direitos por objeto

| Domínio / objetos | Dados e visibilidade proposta | Finalidade | Ação de exclusão/anonimização proposta | Retenção concreta |
| --- | --- | --- | --- | --- |
| Identity/UserAccount | ID interno, status, @; @ visível segundo perfil | Identidade/relacionamentos | Desativar autenticação, limpar perfil e vínculos de apresentação; manter identificador técnico opaco só se houver necessidade jurídica | **PENDENTE** |
| Auth/Session/Credentials | E-mail privado, hash de senha ou provedor de credenciais, sessões, OTP, tentativas | Segurança/acesso | Invalidar sessões/tokens, eliminar conta auth e desafios quando cabível; nunca exportar senha/OTP | **PENDENTE** |
| Eligibility/DOB | Data de nascimento privada, aferição de 18+ | Elegibilidade | Retirar dado bruto quando a finalidade terminar ou mediante obrigação; avaliar se basta status 18+ e prevenção de fraude | **PENDENTE** |
| AccountAcceptances | Versão dos Termos, aceite explícito, método, timestamp, evidência mínima | Contrato e conformidade | Conservar prova mínima quando houver fundamento legal; não manter dados excessivos | **PENDENTE** |
| UserProfile | Nome de exibição opcional, avatar, bio, links autorizados | Presença social | Remover página/mídia pública, metadados e índice; invalidar caches | **PENDENTE** |
| Follow/Reaction/Save/Block | Interações e preferências, relacionamentos por ID | Comunicação e controle social | Excluir arestas do titular, desvincular de terceiros sem apagar o conteúdo deles | **PENDENTE** |
| Routine / Plan / Exercise | Rotinas, séries prescritas, exercícios, categorias, autoria | Organizar treino | Privados: eliminar; compartilhados/copied: verificar autoria/licença, preservar estrutura independente sem dados de titular quando lícito | **PENDENTE** |
| WorkoutSession/Performance | Séries reais, cargas, reps, datas, duração, recordes, consistência | Histórico pessoal | Excluir sessões/derivações, recalcular agregados e rankings; não deixar metadados identificáveis em painéis | **PENDENTE** |
| BodyMeasurementEntry | Peso, circunferência, fontes e datas; **privado** | Evolução pessoal | Expurgo por titular e índices/derivações; avaliar dados potencialmente sensíveis | **PENDENTE** |
| ProgressPhotoEntry | Foto corporal, categoria/ângulo, data; **privada** | Comparação corporal | Excluir original, miniaturas, transformações, storage/CDN; EXIF minimizado antes do armazenamento | **PENDENTE** |
| Publication / Photo / Pulse / Discussion | Conteúdo e mídia segundo audiência escolhida | Expressão e comunidade | Retirar conteúdo do feed/índice/caches; gerir replies e provas legítimas sem remover dados de terceiros | **PENDENTE** |
| CommunityExercise / GIF / Equipment | Nome/mídia, autor e referências em rotinas de terceiros | Biblioteca | Remover obra/mídia conforme direitos; manter IDs de referência técnicos apenas se cabíveis e sem falsa autoria | **PENDENTE** |
| Messaging | Remetente/destinatário, conteúdo e timestamp; **não público** | Comunicação | Definir semântica de "excluir para mim" vs "excluir para todos", denúncias e backups; não prometer E2EE não implementada | **PENDENTE** |
| DuoFixed / Invitation | Convites, aceites, vínculo e possíveis espaços de dupla | Companhia e comunidade | Romper vínculo, remover dados de conta; proteger histórico de terceiros e conteúdo deles | **PENDENTE** |
| MatchOneOff / Availability | Toggle, modalidades, hora, área/local, aceite, parceiros | Encontros por intenção explícita | Interromper novas descobertas, revogar localização/sessão; não conservar histórico de movimento por padrão sem necessidade | **PENDENTE** |
| Report / Moderation | Denúncias, evidências mínimas, status, decisões | Segurança e aplicação das regras | Reduzir identificadores, manter só evidência necessária com controle de acesso e prazo documentado | **PENDENTE** |
| Professional / CREF / Business | Nome/registro/habilitação de profissional, empresas/serviços | Segurança e serviços futuros | Verificar legitimidade e obrigação de guarda; não publicar dados de registro não necessários | **FUTURO** |
| PaymentTransaction | Identificadores, repasses, estornos e documentos | Pagamento/tributação futuros | Conservar o exigido por lei e PSP, evitar dados de cartão na aplicação | **FUTURO** |
| Security/Analytics Logs | IP, user agent, IDs, eventos mínimos, falhas | Segurança e operação | Expurgar registros obsoletos, pseudonimizar quando possível, respeitar obrigações legais aplicáveis | **PENDENTE** |
| Support/DataSubjectRequests | Pedidos LGPD, protocolos, evidências de resposta | Atendimento e defesa de direitos | Reter prova mínima necessária, minimizar anexos e documentos de autenticação | **PENDENTE** |
| Backup / Replica / Cache | Réplicas de qualquer categoria, snapshots, CDN e índices | Recuperação/entrega/performance | Propagar tombstones, purgar cache quando cabível, impedir reimportação de excluídos após restore | **PENDENTE** |

**Nota:** campos e nomes do modelo de dados são **conceitos de engenharia**, não nomes reais de tabelas verificados em backend ativo.

## 3. Operações técnicas para exclusão: proposta de processo rastreável

### Passo A — Recepção e validação

- Receber por **smkahrun01@gmail.com**, identificar pedido e gerar protocolo interno, com data, canal e tipo.
- Não solicitar senha nem código OTP no e-mail. Evitar RG/CPF e documentos de identidade quando não necessários; preferir confirmação autenticada na própria conta ou método seguro proporcional.
- Permitir pedidos de acesso, correção, exportação, oposição, revogação de consentimento específico, restrição e exclusão. A recusa parcial deverá ser fundamentada.
- Não prometer atendimento automático ou prazo fixo sem infraestrutura e previsão normativa específica.

### Passo B — Planejamento e bloqueio lógico

- Identificar a conta por **ID interno**, e-mail normalizado e identificadores técnicos necessários.
- Revogar sessões, tokens, capacidades de escrita e filas futuras vinculadas ao titular conforme status do pedido; evitar novo processamento desnecessário.
- Congelar somente dados cuja conservação estiver fundamentada, documentando finalidade e acesso reduzido.
- Registrar a decisão de conservar, eliminar ou anonimizar por categoria; não usar o desejo de "manter estatísticas" para conservar identificadores sem justificativa.

### Passo C — Expurgo dos dados ativos

- **Auth:** remover sessão, verificação pendente e conta conforme o serviço e obrigações.
- **Database:** eliminar ou desidentificar linhas vinculadas à conta nos domínios listados; garantir que foreign keys e triggers não resultem em danos a outros usuários.
- **Storage:** remover mídia, thumbnails, GIFs próprios e fotos privadas, incluindo objetos derivados e URLs assinadas ainda válidas.
- **Feed/search/cache:** retirar os registros de índices e caches e invalidar referências que voltem a exibir o titular.
- **Queues/jobs:** cancelar notificações, e-mails programados, processamento de mídia e jobs que reintroduziriam o dado.
- **Logs/analytics:** eliminar ou reduzir identificadores pessoais não necessários, sem impedir retenções legalmente exigidas.
- **Third parties:** acionar rotinas e APIs dos fornecedores pertinentes e confirmar resposta/alcance real das exclusões.

### Passo D — Dependências de outros usuários

- **Rotina copiada:** o usuário destinatário pode ter estrutura independente; estudar preservação sem atribuição de autoria identificável ou manutenção indevida de mídia.
- **Mensagens:** definir antes da liberação se ambos armazenam cópia, se há recurso de "excluir para todos" e como lidar com denúncias.
- **Discussões/Comentários:** remover o conteúdo criado pelo titular quando cabível, preservando posts e conteúdo legítimo de terceiros.
- **Match/dupla:** encerrar vínculo do titular; não apagar registros privados de outros participantes apenas por ele ser parte do histórico.
- **Denúncias/evidência:** reter dados mínimos estritamente quando fundamentados, com acesso restrito.

### Passo E — Backup e restauração

- Manter inventário de **tipo de backup, periodicidade, retenção, política de sobrescrita, regiões, acesso, criptografia e prazo de expurgo** por fornecedor.
- Quando um pedido de exclusão ocorrer, registrar referência mínima (tombstone protegido) que permita **reaplicar a exclusão após qualquer restauração de backup**.
- Não restaurar em produção um backup que ressuscite uma conta excluída sem executar novamente a rotina de exclusão.
- Informar quando cópias de contingência forem expurgadas segundo cronograma validado; não afirmar "30 dias" ou "90 dias" sem contrato/documentação/arquitetura que sustente.

### Passo F — Resposta, auditoria e recurso

- Comunicar conclusão, indeferimento justificado ou limitações, sem expor dados de terceiros.
- Manter evidência mínima de atendimento pelo tempo juridicamente aplicável; auditar não apenas saída do banco principal, mas também caches, storage, logs e restauração.
- Permitir contestação e atendimento pelo mesmo canal até que seja modelado fluxo de Configurações e atividade.

## 4. Terceiros de infraestrutura: inventário de contratação (não homologado)

| Terceiro potencial | Função em análise | DPA/risco a verificar | Regiões/dados |
| --- | --- | --- | --- |
| **Supabase** | Postgres/Auth/Storage/Edge Functions | [DPA do fornecedor](https://supabase.com/legal/customer-resources/data-processing-addendum), suboperadores, exclusão, backup, configuração de RLS, autorização por usuário | Há região específica [São Paulo, sa-east-1](https://supabase.com/docs/guides/platform/regions); escolher região não garante que logs, suporte, cache e acesso estejam sempre no país |
| **Cloudflare** | Edge, roteamento, WAF, DNS, CDN, Workers, armazenamento se contratado | [DPA da Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), [suboperadores](https://www.cloudflare.com/gdpr/subprocessors/cloudflare-services/), regras de cache, logs, Retenção/Região, segurança das funções | Infra global; identificar efetivamente serviços usados e lugares envolvidos |
| **Prestador de e-mail/OTP** | Mensagens transacionais e verificação | DPA, logs/entregas, suboperadores, política de IP, rate limit, exclusão | **Fornecedor não definido** |
| **PSP de pagamentos** | Pagamentos/repasse de futuros serviços | Bases legais, dados financeiros, regulação, obrigações fiscais, retenção | **Futuro; não ativo/contratado confirmado** |
| **Demais APIs** | Mapas, geolocalização, observabilidade e analytics | Inventário e DPA, transferência internacional, minimização, trackers não necessários | **Somente se integrados** |

### Pontos críticos para Cloudflare + Supabase

1. O **controlador permanece responsável por suas decisões e pelas respostas LGPD**; serviços de terceiros não transferem automaticamente a responsabilidade de decidir finalidades.
2. O projeto precisa registrar o que fica em **banco, auth, storage, logs, backups e CDN**, e não apenas "dados na nuvem".
3. **Supabase São Paulo (sa-east-1)** é possibilidade oferecida pelo provedor, **não confirmação da região usada no goudduo**. A documentação do fornecedor informa que há processamento extrarregional em hipóteses limitadas: verificar versão e serviços contratados.
4. **Cloudflare é uma rede global**, e a região de execução/cache pode variar por produto e configuração. Não afirmar transferência internacional inexistente nem ausência de transferências.
5. Conferir contratos e mecanismos da [Resolução ANPD nº 19/2024](https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados) quando houver transferência internacional.
6. **Dados corporais, fotos e conteúdo de usuário** exigem revisar configuração de buckets, URL, autorização (inclusive RLS/políticas) e proteção a compartilhamentos indevidos.

## 5. Matriz de base jurídica e sensibilidade — para parecer jurídico

**Este documento não homologa bases legais**. Cada operação precisa de análise concreta, considerando natureza dos dados, finalidade e risco. Critérios:

- Se informação de saúde ou dado corporal revelar condições de saúde, avaliar **categoria sensível e hipóteses do artigo 11**; não usar legítimo interesse para tratamento sensível.
- A **data de nascimento** é privada e pode ser necessária para 18+; minimizar sua exposição e avaliar eventual conservação de prova de elegibilidade.
- **Compartilhamento de foto de progresso** exige ação explícita de publicação; possuir foto privada não significa consentir em publicá-la.
- **Match** e dados de localização devem exigir controles próprios, separados de aceitação geral dos Termos e da criação da conta.
- **Profiling, anúncios e recomendações automáticas** precisam de avaliação de finalidade e transparência, sobretudo se baseados em saúde/proximidade.
- **Direitos autorais de GIFs/obra comunitária** são distintos de dados pessoais; a exclusão do autor não resolve automaticamente licença e atribuição.

## 6. Segurança e incidentes (gate técnico)

- Disponibilizar um canal funcional de privacidade e segurança. Identificar responsáveis por incident response.
- Aplicar controles de acesso, separação ambientes, credenciais, logs minimizados, rotacionar secrets, backups testados e proteção de mídia, conforme projeto real.
- Avaliar incidentes que envolvam dados pessoais e **comunicar ANPD e titulares em conformidade com a Resolução CD/ANPD nº 15/2024** quando houver risco ou dano relevante, com prazos aplicáveis ao enquadramento concreto.
- Conservar o registro dos incidentes conforme prazo regulamentar aplicável, inclusive quando não houver comunicação.
- Avaliar necessidade de **Relatório de Impacto à Proteção de Dados Pessoais (RIPD)** quando o contexto, escala e dados sensíveis indicarem risco relevante.

## 7. Critérios obrigatórios antes de lançar a política/conta real

- [ ] Inventário de tabelas, storage, mídia, links e eventos gerados **realmente** pelo produto, não apenas mock.
- [ ] Classificação de dados pessoais/sensíveis por contexto e base legal revisada.
- [ ] Documentação dos contratos efetivos com Cloudflare, Supabase e outros serviços; mecanismos de transferência internacional.
- [ ] Lista de regiões e prazos concretos de processamento/retirada.
- [ ] Implementação e testes de exclusão em **auth + database + storage + índices + CDN + backup restore**.
- [ ] Resposta gratuita ao titular, comprovação proporcional de identidade e rastreabilidade.
- [ ] Visibilidade privada por padrão para corpo/treino/fotos e testes automatizados de autorização.
- [ ] Remoção segura de EXIF/localização de fotos quando aplicável.
- [ ] Fluxo de aceite transparente e links completos da política/termos, com prova mínima de versão/aceite.
- [ ] Revisão especializada jurídica, incluindo proteção do consumidor, saúde, serviços presenciais e operação por pessoa física.
- [ ] Aprovação expressa antes de uso em produção e comunicação de novos tratamentos.

**Esta matriz deve ser atualizada sempre que uma nova feature ou novo provedor começar a processar dados.**

**Fonte de produto:** [GODUOIT #157](https://github.com/jukazilli/GODUOIT/issues/157) e [#159](https://github.com/jukazilli/GODUOIT/issues/159), além de Issues de Cadastro, Perfil, Match, Publicações, Biblioteca, Rotinas, Treino e Configurações.

**Fonte legal:** [ANPD — direitos](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares), [ANPD — agentes pequenos](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022), [ANPD — transferência internacional](https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados), [ANPD — RIPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd), [ANPD — incidentes](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis).

**Referência de fornecedores:** [Supabase DPA](https://supabase.com/legal/customer-resources/data-processing-addendum), [Supabase regiões](https://supabase.com/docs/guides/platform/regions), [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/) e [Cloudflare suboperadores](https://www.cloudflare.com/gdpr/subprocessors/cloudflare-services/).
