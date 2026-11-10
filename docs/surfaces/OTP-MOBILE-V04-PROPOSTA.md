# goudduo — Acesso Mobile V0.4 · Verificação de e-mail OTP

> **STATUS (10/11/2026): G4 / DIREÇÃO VISUAL E UX DO OTP V0.4 HOMOLOGADAS PELO PROPRIETÁRIO** — HTML de referência aprovado, sem envio/validação reais de código, sem integração React ou QA de produção. A PR #14 permanece Draft e não mesclada.
>
> **Tela canônica:** [Issue #13 — OTP](https://github.com/jukazilli/goudduo/issues/13).
>
> **Dependência:** [Cadastro Mobile V0.3 #9 — direção visual homologada](https://github.com/jukazilli/goudduo/issues/9), documentado em [PR #11](https://github.com/jukazilli/goudduo/pull/11). A branch OTP é **empilhada sobre a branch da PR #11**. Não alterar Signup/Login aprovados sem nova decisão.

## 1. Objetivo e escopo

Apresentar **uma única tela de verificação de e-mail** com seis dígitos, feedback inline, reenvio com contador de **90 segundos** e retorno ao Cadastro para corrigir e-mail. Não criar segundas telas para erro, expired, reenvio, sucesso, etc.

O design segue a política **telas internas calmas**: branco, carvão `#10202B`, azul de ação `#0866E8` com texto branco, superfícies neutras, Plus Jakarta Sans e logomarca escura. Não há gradiente, imagem decorativa, ícones com fundos automáticos ou setas em botões de texto.

**HTML de referência homologado visualmente:** [`goudduo-acesso-mobile-v04-otp-proposta.html`](../../lab/screens/access-mobile/goudduo-acesso-mobile-v04-otp-proposta.html).

## 2. Contratos canônicos da goduoit reconciliados

1. [Issue #21 — composição `check-email` homologada](https://github.com/jukazilli/GODUOIT/issues/21#issuecomment-6538546422): título **“Confirme seu e-mail”**, destinatário contextual, seis posições, **“Confirmar código”**, **“Corrigir e-mail”** e dicas curtas de spam. Sem confirmação paralela por link, “Já confirmei” ou rota intermediária.
2. [Issue #22 — reenvio 90s aprovado](https://github.com/jukazilli/GODUOIT/issues/22#issuecomment-6538064943): depois que o backend confirmar a solicitação/emissão de OTP, contador **01:30**; não exibir “Reenviar código” durante o bloqueio. Reenvio somente após prazo e elegibilidade autoritativa do servidor. Reenvio aceito inicia nova janela de 90s e revoga desafio anterior.
3. [Issue #26 — sete mensagens exatas e regiões A/B homologadas](https://github.com/jukazilli/GODUOIT/issues/26#issuecomment-6545735968): erros de código abaixo dos slots/antes do CTA (região A); avisos de reenvio abaixo do CTA/junto do contador (região B). Preservar reflow sem sobreposição; sem toast/modal adicional.

### Feedback aprovado, literal

| Região | Condição | Texto |
| --- | --- | --- |
| A | OTP incorreto | **Código incorreto. Confira e tente novamente.** |
| A | Expirado | **Este código expirou. Solicite outro quando disponível.** |
| A | Usado ou revogado | **Este código não pode mais ser usado. Solicite outro quando disponível.** |
| A | Muitas tentativas | **Muitas tentativas. Aguarde para tentar novamente.** |
| A | Falha de rede/servidor | **Não foi possível verificar agora. Tente novamente.** |
| B | Pedido de novo código aceito | **Solicitamos outro código. Confira seu e-mail.** |
| B | Falha no reenvio | **Não foi possível solicitar outro código agora. Tente novamente.** |

**Não aprovado como contrato definitivo:** validade de 10 minutos, máximo de 5 tentativas, fornecedor SMTP/autenticação, endpoint, limites definitivos de rate limit, permissão de onboarding baseada somente no OTP.

## 3. Diferenças de implementação de referência

Na origem, `AccessMobileSurface.tsx` usa **seis divs estáticas preenchidas via seletor de preset**, CTA sem validação de backend e salto de OTP direto a Onboarding. Na V0.4:
- Seis **slots visuais** espelham um **input acessível real** de até seis dígitos, com `inputmode=numeric`, `autocomplete=one-time-code`, digitação e colagem de números. Esse comportamento é demonstrativo, não uma validação de token real.
- No formulário já homologado, submissão **localmente válida** conduz à prévia de OTP **após uma resposta fictícia** de emissão. **Não afirmar envio real**.
- O painel de testes *fora do aparelho* controla os sete feedbacks, demonstra espera de 90s, permissão/negação de reenvio e sucesso de laboratório. O botão Confirmar, em situação padrão, demonstra **erro inline**, nunca criação real de conta.
- “Corrigir e-mail” volta à mesma tela Cadastro, sem apagar os campos. O e-mail contextual usa o valor informado ou um placeholder fictício.
- Não incluir “Pular onboarding” da antiga UI de laboratório.
- Quando o relógio chegar a 00:00 **mas a autorização estiver negada**, o link segue oculto; isso é demonstrado no laboratório. A implementação real deve usar `next_resend_at`/`retry_after` do **servidor**, não `Date.now` como fonte da verdade.
- O preview usa raster da marca já embutido no HTML herdado da V0.3 para funcionar offline; **produção exige o SVG oficial** em `assets/brand/goudduo/goudduo-wordmark-black.svg`.

## 4. QA executado nesta etapa

**Evidência técnica concluída:**
- O JavaScript da V0.4 passou em `node --check`.
- Chromium/Playwright com documento injetado (remoção **apenas durante o teste** de links externos de Google Fonts, devido a bloqueio de rede do navegador de teste), em **320×740, 390×844, 430×932 e 1440×1000**.
- Em todos: OTP renderiza, exibe contador 01:30 e oculta o botão reenvio, inserção de seis dígitos, sete presets inline, erro A abaixo dos slots, aviso B abaixo do CTA, sem colisões, permissão/bloqueio de reenvio, reinício do contador após reenvio fictício, volta para Cadastro, percurso de Cadastro válido → OTP e erro demonstrativo na confirmação.
- **Sem exceções JavaScript e sem overflow horizontal** nos quatro viewports.
- Screenshots de referência 320, 390, 430 e desktop gerados localmente para avaliação.

**NÃO verificado:** a fonte remota carregada pela internet em navegadores externos, iOS/Safari real, Android real, leitor de tela, código por SMS/auto preenchimento nativo, backend, identidade pendente/OTP único, emissão/revogação real, limites do provedor, contador baseado em backend, testes E2E e persistência após refresh. Uma falha de navegação automática por bloqueio de `file://`/`localhost` no Chromium foi contornada por `set_content`; **não declarar hospedagem web testada**.

## 5. Navegação / gate seguinte

1. Splash / Entrada/Login **V0.2 homologados visualmente** → Cadastro **V0.3 homologado visualmente** → OTP **V0.4 HOMOLOGADO VISUALMENTE (10/11/2026)**.
2. **Próxima frente de trabalho, após esta homologação:** modelar, revisar e aprovar Termos de Uso e Política de Privacidade na [Issue #12](https://github.com/jukazilli/goudduo/issues/12), **antes do Onboarding simplificado**.
3. **Obrigação anterior na produção:** Termos/Privacidade completos, links reais e mecanismo de acordo adequado devem ser acessíveis no Cadastro antes de habilitar criação real de conta; o gate processual antes do Onboarding não autoriza iniciar contas de produção sem documentos.

## 6. Estado de aprovação

- **HOMOLOGADO (origem GODUOIT, UX):** composição OTP, seis dígitos, 90 segundos, sete feedbacks/duas regiões.
- **HOMOLOGADO PARA REFERÊNCIA VISUAL (goudduo, decisão expressa em 10/11/2026):** UI V0.4 com CTA azul, hierarquia, composição responsiva, seis dígitos e regras de UX recuperadas. Aprovação do HTML visual, não da implementação funcional.
- **NÃO IMPLEMENTADO:** cadastro real, envio de e-mail, verificação, OAuth, aceite, servidor, regra de reenvio autoritativa e integração no app.
- **NÃO MESCALAR AUTOMATICAMENTE** esta branch. A PR da OTP fica empilhada em Cadastro #11, por sua vez derivada do Acesso #8.

## 7. Registro de homologação do proprietário — 10/11/2026

**Aprovação expressa:** “pode homologar chat é isso mesmo que quero.” A validação se refere à apresentação e aos estados demonstrativos da **tela OTP V0.4** anteriormente entregue, sem ressalvas visuais adicionais.

**Aprovado como contrato visual e UX:**
- uma tela `check-email` com seis dígitos, foco/colagem e botão `Confirmar código`;
- fundo branco, tipografia Plus Jakarta Sans, grafite, CTA azul com texto branco e ausência de gradientes;
- erros na região A, avisos de reenvio na região B, **sete mensagens literais herdadas da GODUOIT**;
- contador de **90 segundos** e link `Reenviar código` oculto durante a espera, sempre subordinado à autorização do backend no produto real;
- ação `Corrigir e-mail` retornando ao Cadastro, preservando dados relevantes;
- continuidade visual da Entrada/Login V0.2 e Cadastro V0.3 previamente homologados.

**Não aprovado como implementação:** emissão de código/entregabilidade, autenticação, confirmação atômica, TTL, máximo de tentativas, provedor, regras de autorização por servidor, mecanismos legais de aceite, testes em dispositivos reais, liberação para produção ou salto automático para o Onboarding.

**Governança:** manter a [PR Draft #14](https://github.com/jukazilli/goudduo/pull/14) empilhada na [PR #11](https://github.com/jukazilli/goudduo/pull/11), sem merge automático; a [Issue #13](https://github.com/jukazilli/goudduo/issues/13) permanece aberta somente para dependências/QA técnicos, enquanto a **frente visual está concluída**. A próxima frente documental é a [Issue #12 — Termos de Uso e Política de Privacidade](https://github.com/jukazilli/goudduo/issues/12) **antes do Onboarding**; esses documentos devem existir e estar acessíveis já no cadastro de produção.

**Controle de mudanças:** nenhuma alteração no HTML V0.4 é necessária; o commit desta homologação altera somente a documentação e o estado das Issues/PRs. Não reescrever o desenho aprovado.
