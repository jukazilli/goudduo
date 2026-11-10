# goudduo — Cadastro Mobile V0.3 · proposta para homologação visual

> **Status:** **EM REVISÃO** — HTML criado e commitado para avaliação do proprietário, **não homologado visualmente**; sem autenticação/backend implementados.
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

## 3. HTML para avaliação

[**Acesso Mobile V0.3 — Cadastro em revisão**](../../lab/screens/access-mobile/goudduo-acesso-mobile-v03-cadastro-proposta.html).

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

**Critério de homologação da tela:** aprovação visual expressa do proprietário após abrir e navegar no HTML. Não fazer merge desta proposta antes disso.

## 5. Governança e integração

Esta versão é uma **proposta v0.3 independente**, derivada da [PR #8](https://github.com/jukazilli/goudduo/pull/8). A PR de Cadastro deve ser **empilhada na branch da PR #8**, evitando uma segunda cópia da base do Login. A PR #8 permanece sem merge até autorização própria.

Antes de implementar React, Gemini/Codex devem ler [Design System Figma v0.3](../design-system/FIGMA-BENTO-V03.md), [Foundations](../design-system/FOUNDATIONS.md), [Gate de IA](../design-system/AI-HANDOFF-GATE.md), [AGENTS.md](../../AGENTS.md), [Issue #9](https://github.com/jukazilli/goudduo/issues/9) e a proposta HTML atual. Não alterar o layout de Home Treinos V5.3.
