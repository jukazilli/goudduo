# goudduo — Cadastro Mobile V0.3 · direção visual homologada

> **Status (10/11/2026): HOMOLOGADO PELO PROPRIETÁRIO NO ESCOPO VISUAL E DE REGRAS DE CADASTRO.** HTML V0.3 commitado como referência; sem autenticação/backend implementados. **PR #11 permanece em revisão técnica, sem merge automático.**
>
> **Issue canônica:** [#9 — Cadastro Mobile](https://github.com/jukazilli/goudduo/issues/9).
>
> **Base visual:** Acesso Mobile V0.2 homologado na [PR #8](https://github.com/jukazilli/goudduo/pull/8). Esta versão herda e preserva a tela de Entrada e o Login, **exceto a remoção dos provedores sociais conforme nova decisão do proprietário**.

## 1. Contrato de campos (decisão atual, 10/11/2026)

Cadastro com **quatro campos obrigatórios** e **sem Google/Apple/Meta**:

| Ordem | Campo | Validação do protótipo |
| --- | --- | --- |
| 1 | E-mail | obrigatório e formato HTML válido |
| 2 | Nome de usuário | @ obrigatório, formato 3–24, caracteres minúsculos `a-z 0-9 . _`, sem separadores consecutivos, começa/termina alfanumérico, nomes sensíveis reservados (lista ilustrativa) |
| 3 | Data de nascimento | formato `DD/MM/AAAA`, data real, não futura, mínimo **18 anos completos** |
| 4 | Senha | mínimo demonstrativo de 8 caracteres; **política final depende de decisão de segurança** |

**Nome/Nome de exibição removido**, podendo ser informado posteriormente em **Preferências**, sem exigência aqui.

**Texto legal aprovado como direção de UI:**

> Ao criar uma conta, você concorda com nossos **Termos de Uso** e com nossa **Política de Privacidade**.

No protótipo, os nomes são links **sem URL real publicada**; ao tocar, um aviso aponta essa pendência, sem fingir um documento jurídico válido. A redação e o tratamento de consentimento devem passar por revisão jurídica/de produto antes do lançamento. **O protótipo não constitui mecanismo válido de aceite jurídico por si só.**

## 2. Reconciliação com GODUOIT

- [#19 — requisitos de cadastro](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6514059752): nascimento obrigatório para validar 18+, privacidade, nome de usuário único e aviso legal.
- [#19 — política de @ aprovada](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6514339870): formato, normalização, reservado, consulta de disponibilidade, unicidade atômica no backend e mudanças com intervalo de 30 dias.
- [#19 — referência visual original](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6535633480): minimalista/branca, mas incluía Nome e opções históricas; **decisão atual do goudduo prevalece**.
- [#20 — validação inline](https://github.com/jukazilli/GODUOIT/issues/20#issuecomment-6538545870): feedback sem nova tela, preservar campos, focar primeiro inválido, não exibir erro em campos intocados.
- [Código `AccessMobileSurface.tsx`](https://github.com/jukazilli/GODUOIT/blob/main/src/surfaces/access-mobile/AccessMobileSurface.tsx): três IDs do catálogo para Cadastro `sign-up`, `sign-up-validation`, `sign-up-submitting`; autenticação real não implementada no protótipo legado.

## 3. HTML de referência homologado

[**Acesso Mobile V0.3 — Cadastro homologado visualmente**](../../lab/screens/access-mobile/goudduo-acesso-mobile-v03-cadastro-proposta.html).

**Composição:** fundo branco, wordmark escuro de referência, Plus Jakarta Sans com fallback, 4 inputs de 16px, botão azul `#0866E8` com texto branco, texto legal abaixo do CTA, link Entrar, navegação de volta e estados inline. Sem gradientes na tela Cadastro, sem provedores externos.

**Fluxos do laboratório:** Entrada → Criar conta; Login → Criar conta; Cadastro → Login. Validação local de dados e destino explicativo de simulação; **não envia e-mail, não cadastra usuário e não verifica a disponibilidade real do @**.

**Fonte de marca:** imagem de logo PNG embutida no HTML para prévia offline; no aplicativo, substituir pelo [SVG preto oficial](../../assets/brand/goudduo/goudduo-wordmark-black.svg), respeitando geometria e proporções. A foto da Entrada é referência experimental, não asset de produção homologado.

## 4. QA e limites

**Verificado:**
- Artefato HTML legível e conteúdo inspecionado; quatro campos obrigatórios, ausência de Nome, ausência de botões de provedor.
- JavaScript parseado com `node --check`, sem erro sintático.
- Renderização capturada para a tela Cadastro em 320 CSS px, com a composição observável; navegador executou submissão isolada de dados válidos em Chromium, exibindo a fronteira de simulação, sem criar conta real.

**Ainda pendente, NÃO declarar testado:**
- QA completo com automação encadeada nas três larguras 320/390/430 (a execução encadeada ficou bloqueada por timeout da ferramenta, mesmo que inspeção inicial não tenha indicado overflow em 320).
- Dispositivos reais iOS/Android, teclado, leitor de tela, navegação de volta, foco durante erro, zoom, safe areas e formulários com mensagens longas.
- Disponibilidade do @ real e atômica, aliases reservados, normalização no servidor, política de senha, tratamento de datas em timezone, Termos/Política publicados, consentimento, OTP e integração backend.

**Homologação visual recebida:** o proprietário autorizou expressamente: “ok chat pode homologar e mandar para o git”. A composição V0.3 e as regras de campos ficam **aprovadas** como referência. Isso **não homologa** integração de back-end, envio de OTP real, documentos jurídicos, acessibilidade em dispositivos, disponibilidade do @ ou QA de produção. Não fazer merge de implementação ou elevar o mock a serviço real.

## 5. Governança e integração

Esta versão é uma **referência visual v0.3 homologada, porém não implementada no produto**, derivada da [PR #8](https://github.com/jukazilli/goudduo/pull/8). A PR de Cadastro deve ser **empilhada na branch da PR #8**, evitando uma segunda cópia da base do Login. A PR #8 permanece sem merge até autorização própria.

Antes de implementar React, Gemini/Codex devem ler [Design System Figma v0.3](../design-system/FIGMA-BENTO-V03.md), [Foundations](../design-system/FOUNDATIONS.md), [Gate de IA](../design-system/AI-HANDOFF-GATE.md), [AGENTS.md](../../AGENTS.md), [Issue #9](https://github.com/jukazilli/goudduo/issues/9) e a proposta HTML atual. Não alterar o layout de Home Treinos V5.3.

## 6. Novo gate obrigatório antes do Onboarding — Termos e Privacidade

**Decisão expressa do proprietário, 10/11/2026:** “no final antes de ir para o onboarding temos que modelar os termos de privacidade e uso”. Registrada em [Issue #12 — Termos de Uso e Política de Privacidade](https://github.com/jukazilli/goudduo/issues/12), reconciliada com a frente histórica [GODUOIT #157](https://github.com/jukazilli/GODUOIT/issues/157).

**Sequência:** Cadastro (homologado visualmente) → **Verificação de E-mail OTP (próxima tela)** → **modelagem e aprovação dos Termos de Uso e da Política de Privacidade** → Onboarding simplificado.

**Importante na futura implementação funcional:** os **documentos reais e links de acesso devem estar disponíveis já no momento do cadastro**, pois o aviso “Ao criar uma conta…” aparece antes do envio; modelagem concluída só depois do OTP seria inadequada para o lançamento. O gate antes do Onboarding é um **marco do processo de design**, não autorização para coletar aceites sem documentos válidos.

**A Issue #12 deve cobrir:** conteúdos jurídicos, inventário de dados (incluindo nascimento privado/18+, métricas de treino, fotos e compartilhamento), direitos do titular, regras de comunidade, políticas de publicação/exclusão, links navegáveis, redação do aviso, eventual tratamento de consentimentos distintos, revisão especializada e versionamento dos aceites.

**Preservado:** a frase curta homologada no HTML V0.3; não inventar URL de termos, não simular aceite legal válido e não abrir onboarding funcional até liberar essa dependência.

## 7. Histórico de homologação

- **V0.3 — proposta original:** quatro campos, UI calma sem login social, validações locais, referência da GODUOIT reconciliada.
- **V0.3 — homologação expressa posterior em 10/11/2026:** proprietário confirmou aprovação da tela e autorizou registro no GitHub. **Nenhuma mudança visual** foi necessária no HTML; a alteração desta revisão é **documental**.
- **Pendências mantidas:** QA multi-viewport completo, dispositivos reais, @ único no backend, documentos legais, OTP, integração da autenticação e política definitiva de senha.
