# goudduo — Acesso Mobile V0.2 — Homologação visual com ressalva resolvida

> **Data:** 10/11/2026
>
> **Status:** **HOMOLOGADO COMO REFERÊNCIA VISUAL DE HTML**, após correção pontual solicitada do texto central. **Não** equivale a implementação final de autenticação, fluxos de convidados, OAuth, OTP ou aprovação de todos os estados futuros.
>
> **Issue canônica:** [#6 — Login/Acesso Mobile](https://github.com/jukazilli/goudduo/issues/6).

## Decisão expressa do proprietário

Após comparar alternativas, o proprietário escolheu **“Treine. Conecte-se. Viva.”** e aprovou o HTML do Acesso Mobile **com a ressalva de trocar a frase central**.

### A alteração V0.1 → V0.2

- Headline central da **Entrada visual**: `Seu parceiro na vida real.` → **`Treine. Conecte-se. Viva.`**.
- Destaque textual da parte superior da tela de **Login (formulário)**: mesma substituição para evitar inconsistência entre telas.
- No inspetor **fora do aplicativo**: renomeado o botão “Manifesto oficial” para **“Frase aprovada para Acesso”** e atualizado o texto padrão da alternância. A antiga frase “Treine junto. Vá mais longe.” continua disponível apenas como **estudo não homologado**, fora da UI do produto.
- Nome interno do protótipo atualizado para **V0.2**. **Nenhuma alteração** de cores, layout, botões, campos, assets embutidos, transições ou estados.

**Importante:** a troca de frase **está homologada para o HTML de Acesso Mobile**, mas **não substitui automaticamente** o manifesto institucional vigente no [README](../../README.md), a [Splash #1](https://github.com/jukazilli/goudduo/issues/1), nem outras superfícies. Uma mudança na identidade verbal global precisa de decisão documental específica.

## Arquivo canônico do protótipo

[HTML navegável V0.2 — snapshot commitado](../../lab/screens/access-mobile/goudduo-acesso-mobile-v02-homologado-copy.html).

O HTML é autocontido para imagens de prévia e permite navegar entre: Entrada visual (`welcome`, nova proposta visual), Login, erro de login, sessão expirada, loading, prévia de recuperação, prévia de cadastro e continuidade simulada. **Não há backend**; Login não valida credenciais reais. O inspetor/laboratório não é parte da UI final.

### Limites e pendências

- A origem [GODUOIT](https://github.com/jukazilli/GODUOIT/blob/main/src/surfaces/access-mobile/AccessMobileSurface.tsx) possuía 13 IDs técnicos de Acesso Mobile; a nova entrada visual `welcome` é um acréscimo de proposta, **não um ID implementado em produção**.
- O wordmark no protótipo usa PNG embutido para funcionar sem internet. **A implementação final deve carregar o SVG oficial** [branco](../../assets/brand/goudduo/goudduo-wordmark-white.svg) ou [preto](../../assets/brand/goudduo/goudduo-wordmark-black.svg) segundo o fundo.
- A foto incorporada é um recorte da referência fornecida para a prévia; seu asset definitivo e direito de uso precisam de validação.
- A fonte Plus Jakarta Sans é chamada por fonte externa e usa fallback quando não há rede.
- A experiência convidado e outros destinos do protótipo permanecem simulados. Cadastro e OTP requerem Issues próprias de UI, segurança e regra de negócio.
- A proposta do Design System [v0.3 no Figma](https://www.figma.com/design/5hEOaSAGN1pLo6ml7ckV4Q?node-id=8-2) está [documentada na PR #2](https://github.com/jukazilli/goudduo/pull/2), sem merge. Defeito de Auto Layout dos quatro botões no próprio Figma ainda está pendente. Isso não bloqueia o snapshot HTML que segue a largura correta.

## QA realizado nesta rodada

Executado com **Chromium/Playwright** em CSS viewport **320×740, 390×844, 430×932 e 1440×1000**, incluindo:
- headline central da Entrada e destaque da tela Login com a **nova copy correta**;
- fluxo Entrada → Login, erro inline, sessão expirada, reiniciar;
- alternância “Frase da referência (estudo)” → “Frase aprovada para Acesso”;
- sem erros JS e sem overflow horizontal nas quatro dimensões.

**Não realizado:** Safari físico/iOS, Android real, QA de credenciais/backend/OAuth/OTP, pixel-perfect da foto, navegação de produção, testes e2e integrados ou substituição dos assets pelo SVG real.

## Precedência

**Aprovado:** composição visual do HTML V0.1, com nova copy V0.2 aplicada, conforme solicitação do proprietário.

**Pendente:** homologação técnica de implementação, fluxos de guest/cadastro/OAuth, tokens numéricos globais, integração de código React e QA em dispositivos. Não declarar produto pronto e não fazer merge automático da PR por conta desta homologação visual.
