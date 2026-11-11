# goudduo — Perfil P0 V0.2: Complete seu perfil, descoberta e duplas múltiplas

> **G2 — REFERÊNCIA HTML CRIADA PARA AVALIAÇÃO; NÃO HOMOLOGADA VISUALMENTE, NÃO IMPLEMENTADA.** 10/11/2026.
>
> **Decisões novas expressas do proprietário:** adicionar card **Encontrar uma dupla**; abrir **popup de descoberta** com CTA **Formar dupla**; permitir **várias duplas fixas simultâneas**; convite **pendente até aceite do destinatário**; gerar **Perfil da Dupla para os dois** após aceite, separado por par; gerenciar/desfazer em **Configurações e atividade → Duplas**; registrar **convite de dupla como evento futuro da Central de Atividade**; pedir **nome de exibição, cidade e estado** ao completar dados do Perfil.

## Artefatos e histórico preservado

- **[HTML V0.2 navegável](../../lab/screens/profile/goudduo-perfil-p0-v02-complete-duplas-proposta.html)** — nova versão, não altera o HTML V0.1.
- **[HTML V0.1 anterior, preservado](../../lab/screens/profile/goudduo-perfil-p0-v01-complete-proposta.html)** — referência original adicionando conclusão de Perfil.
- **[Handoff original V0.1, preservado](PERFIL-P0-COMPLETE-V01-PROPOSTA.md)**.
- **[PR Draft #22](https://github.com/jukazilli/goudduo/pull/22)** — proposta ainda não aprovada/mesclada; Base `main`.
- **[Issue #20 — Perfil + Complete seu perfil](https://github.com/jukazilli/goudduo/issues/20)**.
- **[Issue #23 — Configurações > Duplas](https://github.com/jukazilli/goudduo/issues/23)**.
- **[Issue #24 — Notificações: Central de Atividade](https://github.com/jukazilli/goudduo/issues/24)**.

**Legado reconciliado:** [GODUOIT Perfil #77](https://github.com/jukazilli/GODUOIT/issues/77), [HTML candidato P0 V0.2](https://github.com/jukazilli/GODUOIT/blob/faa2276ecb56d6aaf6a3dd90d082c0693973bf02/lab/references/profile/goduoit-perfil-p0-v02.html), [convite vs Match #81](https://github.com/jukazilli/GODUOIT/issues/81), [gestão antes estacionada #92](https://github.com/jukazilli/GODUOIT/issues/92) e [Perfil compartilhado efêmero #144](https://github.com/jukazilli/GODUOIT/issues/144). **O princípio de múltiplas duplas, anteriormente em estudo, foi agora expressamente escolhido pelo proprietário para o goudduo.**

## 1. Invariantes — NÃO regredir

- Os **cinco cenários** de Perfil permanecem: pessoal próprio, visitado, profissional visitado, profissional próprio, dupla.
- Contadores Treinos/Seguidores/Seguindo, bio, avatar/Pulse, menu de ações, Publicações, Rotinas, Atividades, follow/mensagem, botão de Formar dupla do Perfil visitado, estados Business e Configurações permanecem.
- Nenhuma mudança na Home Treinos V5.3 nem no Onboarding V0.1 homologado como referência.
- **Uma pessoa, uma conta**, com Business como capacidade a validar, não conta paralela obrigatória.
- A dupla fixa surge somente por convite explícito e aceite de quem recebe. **Match avulso via `Ir` não cria dupla fixa**, nem entrar no popup.
- Aceite de dupla não torna privados públicos peso, altura, fotos corporais, cargas, dados de saúde ou localização.
- **Nenhuma nova fotografia definitiva**: as imagens externas do HTML legado são ilustrações e serão substituídas por **imagens reais em WebP** quando necessário na implementação, com consentimento/direitos de imagem e homologação.

## 2. Complete seu perfil V0.2

Continua **opcional, dispensável e somente no Perfil próprio**. Cinco cards:

| Card | Comportamento neste laboratório |
| --- | --- |
| Nome e região | Abre popup com **Nome de exibição + Cidade + Estado (UF)**; completar requer esses campos **somente dentro da tarefa opcional** |
| Foto de perfil | Seleção de imagem no navegador sem upload ao servidor |
| Seus interesses | Seleção local de temas |
| Encontre pessoas | Jornada já existente de seguir pessoas, distinta de dupla fixa |
| **Encontrar uma dupla** | **Novo popup** de descoberta para convite de dupla fixa |

- Os dados **cidade/UF** são informação **aproximada** que pode servir futuramente ao algoritmo de sugestão, **não GPS preciso**, **não publicação automática** e **não consentimento implícito de aparecer no Match**.
- O painel de nome/região não roda algoritmo nem consulta pessoas reais. O banco e regras de compartilhamento precisam de contratos próprios.
- Módulo/card continua ocultável, com acesso a **Configurações e atividade → Preferências do perfil** para reabrir/editar.

## 3. Popup de descoberta — Formar dupla fixa

- Abre em **bottom sheet/modal**, não substitui navegação global, Home, Perfil ou Match.
- Lista ilustrativa de pessoas, com nome, @, cidade/UF e atividades demonstrativas. **Sem dados reais, serviço de recomendação, GPS ou API**.
- Busca local por texto para inspecionar o componente.
- CTA individual **Formar dupla**:
  1. Primeiro toque → `pending` (convite enviado **somente em memória de laboratório**), botão muda para `Convite pendente`.
  2. Enquanto pendente → nenhuma parceria ativa e **nenhum Perfil da Dupla criado**.
  3. Após aceite **pelo destinatário no produto real** → `active`, perfil compartilhado específico para aquele par, acessível aos dois.
  4. Estado `closing` → novas interações no espaço indisponíveis, conforme contrato final.
- **Sem exclusividade**: par Ana+Marcelo e par Ana+Emili são registros diferentes, podem coexistir; impedir duplicidade de mesmo par e convites de si mesmo no servidor.
- **Pessoas demonstrativas não devem ser interpretadas como usuários reais.** Não prometer que são pessoas próximas; algoritmo local/servidor ainda pendente.
- Diferenciação de semântica: **Encontre pessoas** = seguir/descobrir perfis; **Encontrar uma dupla** = iniciar vínculo fixo mediante convite/aceite.

## 4. Configurações e atividade → Duplas

Uma **tela própria de gerenciamento**, conforme [Issue #23](https://github.com/jukazilli/goudduo/issues/23), acessada da família de Configurações já mapeada na GODUOIT #84.

- **Duplas ativas:** cada vínculo aceito aparece separadamente, com **Ver perfil da dupla** e **Desfazer dupla**.
- **Convites enviados:** cada convite pendente pode ser cancelado pelo remetente. Para permitir QA da referência, existe controle **“Simular aceite” EXCLUSIVO do laboratório**; produção jamais pode aceitar o convite no lugar do destinatário.
- **Em encerramento:** a pessoa pode desfazer o vínculo **unilateralmente**, com confirmação e aviso de ciclo de encerramento; não precisa de aceite de outro participante para desfazer.
- **Sem perda da identidade individual:** conta, dados pessoais, treinos privados e publicações pessoais continuam independentes.
- **Ciclo de até 3 dias** da GODUOIT #144 é direção de produto **a validar juridicamente e tecnicamente** (publicações do espaço, arquivos, CDN e backups). A prévia **não cronometra, apaga ou restaura mídia**.
- **Perfil da Dupla por par:** a V0.2 apresenta **uma página ilustrativa diferente para cada dupla aceita**, com ambos os integrantes e um espaço de conteúdo vazio. No produto real, os dois devem ter acesso autenticado ao mesmo `duo_id`; a prévia não possui contas múltiplas autenticadas nem publicações verdadeiras.
- Perfis de duplas múltiplas não substituem o cenário herdado de **Perfil da Dupla** (P0 legado), que permanece no seletor do laboratório.

## 5. Central de Atividade — gatilho documentado, NÃO criado

[Issue #24](https://github.com/jukazilli/goudduo/issues/24) registra o evento de **convite recebido para formar dupla**, com `Aceitar`/`Recusar`, e futuros eventos de **aceite, recusa/cancelamento e encerramento**, separados dos eventos de Match avulso e sujeitos a anti-spam, notificações in-app e segurança.

**A V0.2 não envia notificações.** Em ambiente de produção, convite deve ser validado pelo servidor, aparecer para o destinatário e **somente o destinatário autenticado** pode aceitar. Ao aceitar, o servidor cria o vínculo e o Perfil da Dupla por par de forma idempotente, mantendo a possibilidade de várias duplas simultâneas.

## 6. Regras do modelo de dados para implementação (não executadas)

- `User` (identidade principal) + `UserProfile` (nome/região opcional e visibilidade) + `DuoInvitation` (from/to, status, timestamps) + `DuoPair` (user_a, user_b, status, shared_profile_id) + `DuoProfile` (mídia/publicações do par).
- Chave do par sem ordem: ordenação de IDs `min/max` ou chave canônica equivalente; evitar duplicidade do mesmo par sem impedir múltiplos **parceiros diferentes**.
- Status: `pending`, `accepted/active`, `declined`, `cancelled`, `expired`, `closing`, `closed`; expiração/cooldown e duração operacional ainda **não homologadas**.
- Ambos podem encerrar parceria sem depender do outro. Qualquer mudança de estado exige autenticação, controle de acesso e auditoria adequada.
- Cidades/UF são campos sensíveis à privacidade contextual: **não expor nem usar para sugerir sem finalidade e controles adequados**; a pessoa não fornece endereço residencial/GPS para concluir o Perfil.
- Separar fotos corporais de progresso, rotinas privadas e histórico de treino do compartilhamento do `DuoProfile`.
- Eventos da Central de Atividade devem estar idempotentemente ligados ao convite/vínculo e não depender de conteúdo da mensagem privada.

## 7. QA e homologação pendentes

- [x] HTML V0.1 antigo preservado, novo HTML V0.2 em arquivo próprio.
- [x] Cinco cenários originais, abas e motor de navegação legado mantidos.
- [x] Novo card de dupla, popup e estados pendente/aceito/ativo/encerramento por vínculo.
- [x] Tarefa Nome e região com três campos e UF.
- [x] Tela de gerenciamento de Duplas e Perfil por par **emulação local**.
- [x] Código JavaScript de ambos os scripts **parseado sem erros** via V8; strings/marcadores inspecionados.
- [ ] **QA de navegador real ainda não executado nesta etapa:** visualização 320/390/430 px, Safari/iPhone/Android, interações completas, Safe Area, teclado, VoiceOver, rolagem, saída dos modais, fluxo de desfazimento e estado de convites múltiplos.
- [ ] **Homologação visual expressa do proprietário da V0.2**.
- [ ] Implementar notificações reais separadamente (#24), integração backend, segurança, privacidade, exclusão e QA.
- [ ] Revisão jurídica/técnica de dados e arquivo após encerramento, respeitando [Issue legal #12](https://github.com/jukazilli/goudduo/issues/12).

**Não mesclar PR Draft #22 ou declarar comportamento funcional/produção antes de QA, homologação e integração.**
