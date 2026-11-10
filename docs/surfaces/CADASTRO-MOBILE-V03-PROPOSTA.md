# Cadastro Mobile V0.3 — proposta de referência visual, com legado GODUOIT preservado

> **Data:** 10/11/2026 · **Issue:** [#9](https://github.com/jukazilli/goudduo/issues/9)
>
> **Status:** campos e diretrizes aprovados pelo proprietário; **HTML V0.3 gerado para avaliação visual**, ainda **não homologado**. Não há backend, conta criada ou OTP enviado. **Acesso Mobile V0.2** permanece referência visual homologada (ver [PR #8](https://github.com/jukazilli/goudduo/pull/8)). Este documento não altera a Home V5.3.

## 1. Decisão do produto goudduo

1. **Quatro campos obrigatórios, nesta ordem:** E-mail, Nome de usuário (@), Data de nascimento, Senha.
2. **Removido o campo Nome** do cadastro: nome de exibição pode ser preenchido **posteriormente e de modo opcional em Preferências**, sem confundi-lo com o identificador público.
3. Elegibilidade inicial **18+**, verificada a partir da data de nascimento **privada**; checagem obrigatória também no servidor.
4. **Sem Google, Apple, Meta ou outros provedores nesta fase.** Login e cadastro apenas e-mail+senha. A remoção de Google é substituição explícita do estado visual anterior, não autorização para reescrever Login ou autenticação em produção.
5. Rodapé: **“Ao criar uma conta, você concorda com nossos Termos de Uso e com nossa Política de Privacidade.”**, com ambos os nomes vinculados a documentos reais antes do lançamento. Revisão jurídica e consentimentos específicos ainda pendentes.
6. Identidade: **o goudduo**; entrada visual homologada com frase **“Treine. Conecte-se. Viva.”** sem alterar a assinatura institucional/manifesto global.
7. Cadastro é **superfície calma**: fundo branco, wordmark preta oficial em produção, Plus Jakarta Sans, CTA azul `#0866E8` e texto branco, inputs neutros `#F4F5F7`, texto charcoal `#10202B`, sem gradiente nem hero; uma ação só texto OU só ícone.

## 2. Origem — status e precedência

- [GODUOIT #19 · decisão 18+ e @](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6514059752).
- [GODUOIT #19 · regras de @ aprovadas](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6514339870).
- [GODUOIT #19 · composição visual antes aprovada](https://github.com/jukazilli/GODUOIT/issues/19#issuecomment-6535633480): cinco campos incluindo Nome e disposição própria; **conteúdo de campos substituído por decisão expressa do goudduo**.
- [GODUOIT #20 · validação inline e foco](https://github.com/jukazilli/GODUOIT/issues/20#issuecomment-6538545870): validações dentro do mesmo formulário, preservação de valores, feedback acessível; especificações de mensagens e backend pendentes.
- [Código de Acesso da GODUOIT](https://github.com/jukazilli/GODUOIT/blob/main/src/surfaces/access-mobile/AccessMobileSurface.tsx): `sign-up` / `sign-up-validation` / `sign-up-submitting` são estados representativos de laboratório, sem cadastro real.

## 3. Validações e contratos

| Campo | Contrato |
| --- | --- |
| E-mail | Obrigatório, formato e-mail. Unicidade/identidade no backend, sem enumeração na interface pública. |
| Nome de usuário | Obrigatório, **3 a 24 caracteres** `a-z`, `0-9`, `.`, `_`; normalizado minúsculo; começa/termina alfanumérico, não permite separadores consecutivos; nomes reservados; disponibilidade prévia só informativa, **servidor decide unicidade atômica**. Alteração futura com 30 dias mínimos entre trocas, ID interno estável. |
| Data de nascimento | Obrigatória, `DD/MM/AAAA`; data de calendário válida, não futura, **18 anos completos**, **privada** e revalidada no backend. Não salvar idade estática no lugar do nascimento. |
| Senha | Obrigatória, protótipo usa mínimo de 8 caracteres conforme placeholder original, porém **política final de segurança ainda a homologar**. Mostrar/ocultar só com ícone acessível. |
| Legal | Texto ao final com links acessíveis para termos e privacidade; documento jurídico final/URL e política de consentimentos pendentes; não fingir publicação. |

**Erros:** mensagens inline, `aria-invalid`, foco no primeiro inválido após tentativa de envio, preservar campos já válidos, sem tela nova de erro e sem dados falsos de disponibilidade.

**Submitting:** desabilitar duplo envio; no protótipo, indicar que dados apenas passaram pela checagem local e que OTP/servidor estão pendentes. **Não afirmar que e-mail foi enviado ou conta criada**.

## 4. HTML experimental gerado na conversa

Arquivo de avaliação: **`goudduo_acesso_mobile_v03_cadastro_referencia.html`** (entregue como anexo na conversa), derivado do HTML V0.2 sem redesenhar Entrada ou Login.

Diferenças práticas no preview:
- Formulário Cadastro agora com quatro campos e data de nascimento em formato numérico.
- Campo @ com prefixo textual, normalização minúscula, formato e palavras reservadas exemplificadas; **não realiza disponibilidade real**.
- Validação de maioridade e datas impossíveis, senha mínima indicativa, feedback inline e botão de alternar visibilidade.
- Aviso legal com links de demonstração que **informam pendência documental**, não fornecem textos inventados.
- Método Google removido da tela Login para esta etapa, conforme decisão do proprietário.
- Os outros estados do protótipo V0.2 continuam representados e não executam operações reais.
- O arquivo permanece fora do Git até homologação visual específica; esta PR é **apenas documental**.

## 5. QA da prévia (não de produção)

**Chromium executado em 320 × 740, 390 × 844, 430 × 932 e 1440 × 1000:** quatro inputs, ausência de botão Google, navegação Cadastro no inspector, ausência de overflow horizontal, screenshot do formulário em cada largura; validação de campos vazios, @ com separadores consecutivos, menor de 18 anos, correção dos campos, simulação da fronteira de OTP sem backend e links jurídicos que declaram pendência; sem erros JavaScript reportados.

**Não executado:** Safari/iPhone real, Android real, disponibilidade @ API, envio OTP, Termos/Privacidade reais, políticas de senha/consentimento definitivas, banco de dados e fluxo de autenticação integrado.

## 6. Gate seguinte

1. Proprietário visualiza o HTML e decide se **homologa a composição do Cadastro**.
2. Somente após aceite, versionar o HTML final em `lab/screens/access-mobile/` com PR de protótipo sem merge automático; manter a V0.2 histórica.
3. Criar/atualizar Issue de OTP, aprovar contratos jurídicos e política de senha/segurança com foco em implementação.
4. Integrar em frontend real apenas com QA de acessibilidade/teclado, servidor para 18+ e unicidade, e revisão das telas já homologadas.
