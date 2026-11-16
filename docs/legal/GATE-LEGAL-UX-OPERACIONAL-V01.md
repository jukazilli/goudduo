# goudduo — Gate legal: UX, aceite, direitos e publicação v0.1

> **Homologação editorial do proprietário — 10/11/2026:** a modelagem v0.1 foi aprovada para servir como **baseline documental do goudduo**, incluindo Termos de Uso, Política de Privacidade, matriz de dados/retenção e UX de direitos/exclusão. **Não é parecer jurídico nem aprovação para produção.** Antes de publicar ou habilitar cadastro real: revisão jurídica especializada, confirmação de bases legais, contratos, regiões, prazos, exclusão operacional, links públicos e registro adequado de aceite.
>

> **Status: UX E GATES APROVADOS COMO MODELO DOCUMENTAL V0.1 EM 10/11/2026; sem alteração de telas homologadas, sem implementação e sem publicação.**
>
> Controlador informado: **Juliano de Lima Pedroso (pessoa física)**. Canal LGPD: **smkahrun01@gmail.com**.
>
> Registros associados: [Issue #12](https://github.com/jukazilli/goudduo/issues/12), [Cadastro #9](https://github.com/jukazilli/goudduo/issues/9), [OTP #13](https://github.com/jukazilli/goudduo/issues/13) e [GODUOIT #157](https://github.com/jukazilli/GODUOIT/issues/157).
>
> Este documento especifica **o que precisa ser implementado**, não declara que os controles já existem.

## 1. Sequência e pré-requisitos

**Processo de design:** Splash → Acesso V0.2 → Cadastro V0.3 → OTP V0.4 → **modelagem Termos/Privacidade** → Onboarding. As três telas anteriores têm referência **homologada visualmente**; isso não implica auth, OTP ou aceite implementado.

**Gate de produção real:** Termos e Política de Privacidade **publicados, acessíveis e atuais antes de o usuário concluir um cadastro real**. Não deve ser possível criar conta real com links que só exibem "documento pendente", mesmo que o OTP funcione.

Não confundir **aceite dos Termos**, **ciência/recebimento da Política de Privacidade** e **eventual consentimento específico da LGPD** (por exemplo, tratamento opcional de dados sensíveis ou marketing). A aceitação contratual não é base jurídica universal.

## 2. Composição visual no Cadastro V0.3

Manter sem redesign o contrato homologado da [Issue #9](https://github.com/jukazilli/goudduo/issues/9):

- Texto curto aprovado abaixo do CTA: **“Ao criar uma conta, você concorda com nossos Termos de Uso e com nossa Política de Privacidade.”**
- A expressão **Termos de Uso** abre o documento integral, versão/data identificadas e possibilidade de voltar ao mesmo cadastro **sem perder campos**.
- A expressão **Política de Privacidade** abre o documento integral com link permanente, versão/data, leitura acessível e retorno preservado.
- Links são texto navegável real, com foco visível e sem aparência de botão de ação nova.
- Se a análise jurídica exigir mecanismo de manifestação inequívoca adicional, propor seu comportamento e **homologá-lo separadamente**, sem inserir automaticamente checkbox ou modal que altere a composição aprovada.
- **Marketing opcional** nunca pode estar implicitamente ativado pelo CTA do Cadastro.
- O backend guarda versão dos Termos aceitos e evidência mínima de manifestação quando cabível; não armazena cópia desnecessária de toda sessão.

### Exemplos de estados

| Estado | UX proposto | Efeito no fluxo |
| --- | --- | --- |
| Documento publicado | Abre leitura integral responsiva, link/URL persistente | Pode voltar ao Cadastro preservando campos |
| Documento indisponível | Mensagem curta "Não foi possível carregar o documento. Tente novamente." | Não concluir cadastro real sem acesso efetivo aos documentos exigidos |
| Versão atualizada antes do envio | Nova leitura/ciência conforme materialidade e base legal | Não registrar versão anterior como nova |
| Dispositivo sem rede | Tratamento acessível conforme cópia segura da versão vigente se houver; senão falha recuperável | Não simular aceite de documento não disponível |
| Discorda dos Termos | Opção de sair/voltar, sem conta criada | Não impor tratamento opcional |
| Documento acessível no app | Configurações e atividade → Privacidade e documentos legais | Acesso também sem login por URL pública |

**Pendente:** decisão de marca/UX de nome exato do item de menu, escolha de WebView/tela, checkbox se necessário, uso de consentimento específico para dados corporais e revisão jurídica de copy. Não aplicar alteração automaticamente ao HTML do Cadastro V0.3.

## 3. Configurações e atividade — controles de privacidade (proposta)

Área de destino a construir na família de [Configurações GODUOIT #84](https://github.com/jukazilli/GODUOIT/issues/84), com hierarquia sóbria do goudduo e sem microcopy explicativa gratuita:

| Seção | Ações esperadas | Dependência |
| --- | --- | --- |
| Conta e segurança | Atualizar e-mail, senha, nome de exibição opcional, sessões | Auth backend |
| Privacidade do perfil | Visibilidade de dados públicos autorizados, perfil de terceiros, bloqueios | Domínios Perfil/Social |
| Treinos e progresso | Controles de divulgação; **privado por padrão** para medidas, peso, fotos, cargas | Produto + autorização real |
| Match e localização | Opt-in de descoberta, controle de disponibilidade, revogar permissões | Match ainda não liberado |
| Seus dados | **Solicitar cópia / Acessar / Corrigir / Excluir conta** | Implementação de exportação e exclusão |
| Políticas | Termos de Uso, Política de Privacidade, versão/data, contato LGPD | Documentos legais publicados |

**Atenção:** uma pessoa pode querer excluir **uma foto, medida, treino, postagem ou conversa** sem encerrar a conta. O design deve permitir exclusão granular quando essa função for oferecida, sem confundir com ação destrutiva global.

## 4. Fluxo de exclusão de conta — modelagem para implementar

**Ponto de entrada:** Configurações e atividade → Seus dados → Excluir conta (ou solicitação por e-mail **smkahrun01@gmail.com**, desde a fase em que o controle in-app ainda não existir).

1. **Identificar a ação:** título claro "Excluir conta" e resumo factual do que será afetado, distinguindo dados públicos, privados e possíveis exceções legais. Sem mensagens emocionalmente coercitivas.
2. **Mostrar consequências essenciais:** sessão será encerrada; conteúdo próprio sairá da plataforma conforme regras; exclusões de outras pessoas e cópias externas não são garantidas; exceções legais/backup podem ter prazo.
3. **Conferir intenção:** confirmação explícita e autenticação proporcional, não apenas clique acidental; sem exigir documentação excessiva, não coletar senha por e-mail.
4. **Solicitar exclusão:** backend deve retornar protocolo/estado; ao concluir, revogar autenticação e bloquear repopulação. Se demorar, exibir status verdadeiro em vez de “Excluído” sem confirmação.
5. **Executar expurgo:** regras da [matriz](MATRIZ-DADOS-RETENCAO-V01.md), com banco, auth, storage, CDN/cache, mídia, logs/filas, serviços de terceiros e backup.
6. **Comunicar conclusão:** enviar confirmação ao canal seguro adequado e indicar exceções fundamentadas, quando houver; preservar apenas prova mínima.

### Estados sem novas telas desnecessárias

- Padrão: informação objetiva e CTA destrutivo claramente distinguível.
- Confirmação: requer autenticação/intenção.
- Em processamento: progresso honesto, sem prometer que todas as cópias já sumiram.
- Excluído: apenas após confirmação das etapas necessárias.
- Indisponível/falha: reentrada/contato LGPD sem perda do pedido.
- Pedido parcialmente atendido: justificativa e contato para contestação.

**Do/Don't:** botão de exclusão pode utilizar estilo semântico de perigo definido no futuro, mas não introduzir cor vermelha fora do design system sem token/critério. Nada de botões que misturem ícone + texto por decoração, círculos de ícone arbitrários ou frases que expliquem o óbvio.

## 5. Solicitação de acesso, cópia de dados e correção

- Via e-mail **smkahrun01@gmail.com** e, posteriormente, opção no app.
- Pedir identificação mínima e reconhecer os direitos do titular gratuitamente, com verificação proporcional.
- A resposta deve distinguir dados fornecidos, conteúdo publicado, histórico privado, registros de privacidade/consentimentos e informações de tratamento.
- **Exportação:** formato interoperável quando cabível; para fotos e mídia, incluir referências/arquivos apropriados, preservando dados de terceiros.
- **Correção:** e-mail e @ devem obedecer aos contratos de segurança e unicidade existentes; data de nascimento precisa de mecanismo apropriado para não contornar 18+.
- **Consentimentos opcionais:** retirada tão simples quanto concessão, com impacto na funcionalidade explicitado e sem eliminar histórico de exercício que dependa de outra base legal válida.

**Não declarar prazos universais além da lei/regulação**, e documentar atendimento e motivos de impossibilidade.

## 6. Regras de conteúdo que afetam exclusão

| Caso | Regra a homologar |
| --- | --- |
| Foto privada de progresso | Excluir objeto/storage, thumbnails e metadados derivados; não afetar Posts |
| Post ou Pulse | Retirar conteúdo da audiência, indexação e mídia, respeitando fundamentos excepcionais para evidência |
| Exercício GIF criado pelo usuário A usado em rotina B | Separar direitos autorais, titularidade do GIF e preservação de estrutura de B; não manter @ ou imagem indevidamente |
| Rotina que B copiou de A | B pode ter cópia independente; autoria/atribuição removidas ou preservadas só quando apropriado e justificável |
| Mensagem enviada a B | Definir antes de lançar "Excluir para mim" versus "Excluir para todos" e retenção para denúncia |
| Dupla fixa | Desvincular conta e acesso a espaço de dupla; não revelar dados privados retroativamente |
| Match avulso | Interromper busca/notificações, limpar informações de localização não necessárias, tratar registros de encontros |
| Ranking/social | Recalcular ou anonimizar contribuições sem reidentificar pessoa excluída |

## 7. Critérios de aceite do gate legal

### Jurídico/documental

- [ ] Validar identificação de Juliano de Lima Pedroso como controlador PF e o contato **smkahrun01@gmail.com**.
- [ ] Revisar [Termos](TERMOS-DE-USO-V01.md), [Política](POLITICA-DE-PRIVACIDADE-V01.md) e [matriz](MATRIZ-DADOS-RETENCAO-V01.md) com profissional jurídico brasileiro.
- [ ] Confirmar serviços Cloudflare/Supabase, outras integrações, DPA, regiões, suboperadores e transferência internacional.
- [ ] Definir bases legais, retenção concreta, configurações de segurança e impacto de dados possivelmente sensíveis.
- [ ] Distinguir contrato, privacidade como informação e consentimentos opcionais.
- [ ] Publicar URLs reais, versão, vigência e mecanismos de histórico.

### Produto/UI/engenharia

- [ ] Testar links reais e voltar ao Cadastro preservando valores e posição.
- [ ] Guardar versão e evidência mínima de aceitação; não realizar cadastro real se os documentos exigidos não estiverem acessíveis.
- [ ] Proteger dados corporais/históricos/fotos como privados por padrão, com testes de autorização.
- [ ] Implementar pedido de exclusão com protocolo, segurança, reversibilidade antes da confirmação e tratamento de falhas.
- [ ] Testar exclusão de ponta a ponta (Auth, banco, storage, indexação, CDN, backups/restauração, terceiros).
- [ ] Implementar exportação/correção/bloqueio e canal de resposta LGPD sem fricção indevida.
- [ ] Validar 320/390/430, teclado, acessibilidade, loading, erros e safe areas.
- [ ] Atualizar AGENTS/handoff/Issues correspondentes quando controles forem homologados visualmente.
- [ ] **Gate:** antes do **Onboarding**, documentos e mecanismos de leitura/aceite modelados/revisados; antes de **cadastro real**, documentos e links realmente operacionais.

## 8. Fontes e precedência

**Decisões do produto:** [GODUOIT #157](https://github.com/jukazilli/GODUOIT/issues/157), [#19](https://github.com/jukazilli/GODUOIT/issues/19), [#84](https://github.com/jukazilli/GODUOIT/issues/84), [#81](https://github.com/jukazilli/GODUOIT/issues/81), [#124](https://github.com/jukazilli/GODUOIT/issues/124), [#159](https://github.com/jukazilli/GODUOIT/issues/159).

**Fundamentos externos:** [ANPD — direitos dos titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares), [ANPD — pequenos agentes](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022), [ANPD — transferências internacionais](https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados), [ANPD — incidentes](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis).

**Condição de governança:** não fazer merge automático ou publicar antes da revisão e homologação expressa; manter a [Issue #12](https://github.com/jukazilli/goudduo/issues/12) aberta para dúvidas e decisões, sem alterar visual previamente aprovado.
