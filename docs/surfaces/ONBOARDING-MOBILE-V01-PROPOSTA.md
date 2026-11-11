# goudduo — Onboarding mobile V0.1: apresentação, não formulário

> **G2 · PROPOSTA VISUAL E HTML PARA AVALIAÇÃO — NÃO HOMOLOGADO.** 10/11/2026.
>
> **Issue da tela:** [#19 — Onboarding](https://github.com/jukazilli/goudduo/issues/19). **Próxima tela separada:** [#20 — Perfil/Complete seu perfil](https://github.com/jukazilli/goudduo/issues/20). **Gate jurídico:** [#12](https://github.com/jukazilli/goudduo/issues/12), com minutas editoriais homologadas na PR #15, **sem vigência nem implementação de direitos/aceite**.

## Artefato HTML e acesso

[HTML navegável, stand-alone e com logo embutida](../../lab/screens/onboarding/goudduo-onboarding-v01-proposta.html).

**Somente laboratório**: nenhuma alteração em Login, Cadastro V0.3, OTP V0.4, Splash aprovado, tela de Home, navegação global ou banco. Versão de referência para avaliação no navegador; não é um aplicativo nem componente React final.

## Fonte / investigação

- [GODUOIT #63](https://github.com/jukazilli/GODUOIT/issues/63) e [OnboardingMobileSurface.tsx](https://github.com/jukazilli/GODUOIT/blob/main/src/surfaces/onboarding-mobile/OnboardingMobileSurface.tsx): 29 estados catalogados — 1 entrada, 12 treino, 6 Match, 4 Personal, 5 Profissional, 1 Comunidade. O catálogo marca 16 como obrigatórios **dentro das jornadas antigas**, não globalmente; há divergências de IDs vs perguntas realmente renderizadas.
- [GODUOIT #54 / Home Treinos V5.3](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720) e handoff aprovado: Bento assimétrico, cards e fontes; o onboarding faz **composição conceitual**, não cópia ou redesign da Home.
- [GODUOIT #81 / Match](https://github.com/jukazilli/GODUOIT/issues/81): dupla fixa por convite explícito versus encontro avulso iniciado pela ação `Ir`, consentimentos separados.
- [GODUOIT #90](https://github.com/jukazilli/GODUOIT/issues/90), [#36](https://github.com/jukazilli/GODUOIT/issues/36): conta única com capabilities Business sob verificação e elegibilidade, não nova identidade automaticamente.
- [GODUOIT #77 / Perfil](https://github.com/jukazilli/GODUOIT/issues/77), [PR #147](https://github.com/jukazilli/GODUOIT/pull/147) e [HTML perfil P0 V0.2](https://github.com/jukazilli/GODUOIT/blob/faa2276ecb56d6aaf6a3dd90d082c0693973bf02/lab/references/profile/goduoit-perfil-p0-v02.html): base para estudo da próxima tela; ainda candidata e não substituída.

## Experiência V0.1 — somente três cenas

| Cena | Headline | Ilustração | Ações |
| --- | --- | --- | --- |
| 01 · Treinos | **Treine no seu ritmo.** | Widgets Bento conceituais de treino, progresso e rotinas | Pular; Próximo |
| 02 · Conexões | **Conexões que saem da tela.** | Cards de pessoas e modalidade corrida; **personas ilustrativas**, não sugestões reais | Voltar; Pular; Próximo |
| 03 · Comunidade | **Faça parte da comunidade.** | Pulses e publicação ilustrativos; não busca dados externos | Voltar; Explorar o goudduo |

**Fim da prévia:** apresenta tela de confirmação **somente demonstrativa**, com frase de marca **“Treine. Conecte-se. Viva.”** e botão `Rever apresentação`. **Não abre a Home real**, não registra conclusão, não grava respostas e não configura Match ou Business.

**Navegação:** três indicadores discretos, chevron somente na segunda/terceira cena, barra superior de avanço, swipe horizontal com detecção para não confundir rolagem vertical, setas de teclado e opção Pular. Não há timeout ou avanço automático.

**Ausentes por decisão:** perguntas obrigatórias sobre peso, altura, sexo, objetivo de treino, tempo, dias, equipamento, local, interesses, cidade, Match e registro de profissão. Dados e consentimentos são contextuais, em suas funções e Preferências.

## Visual e componentes

- Tokens: `#FFFFFF` superfície, `#10202B` charcoal, `#0866E8` CTA, `#F1F8FB` gelo, `#D9DEE4` borda e tipografia Plus Jakarta Sans com fallback de sistema.
- CTA azul com texto branco; botões de texto isolado ou ícones isolados, sem mistura decorativa. Imagens demonstrativas são compostas com HTML/CSS/SVG locais, sem chamadas externas para mídia.
- Única dependência externa opcional: Google Fonts; HTML funciona offline com fallback.
- Wordmark preto está **embutido em PNG já usado na referência do Cadastro** para não quebrar visualização offline. A integração deve substituir por **SVG oficial da marca** sem alterar suas proporções.
- Animações suaves, `prefers-reduced-motion`, tratamento responsivo e safe area em dispositivos de tela cheia.
- As personas ilustradas no Match não equivalem a pessoas reais, a sugestão de parceiros ou consentimento. Preservar o fato de que esse componente serve **apenas como apresentação**.

## QA executado (Chromium/Playwright)

- Viewports testados: **320×700, 390×844, 430×932 e 1440×940**.
- Logo embutida carregada nas quatro resoluções (`naturalWidth=352`).
- Passagem por 3 cenas, CTA de conclusão, Pular e Rever apresentação retornando ao começo.
- Nenhuma exceção JavaScript reportada. `document.documentElement.scrollWidth === clientWidth`, sem rolagem horizontal.
- Capturas de avaliação das cenas após a animação foram geradas localmente em 390 px.
- Testes com requisições externas bloqueadas (fonte fallback), para provar a independência de rede do HTML.
- **Pendências de QA:** Safari/iPhone físico, Android, VoiceOver/TalkBack, teclado/foco completo, swipe em dispositivo físico, comparação tipográfica com Plus Jakarta Sans carregada, acessibilidade final e integração com app React.

## Gate de homologação e integração

- [x] Inventário da GODUOIT recuperado e contraste entre catálogo e UI investigado.
- [x] Três cenas HTML V0.1 versionadas.
- [x] QA básico local.
- [ ] **Homologação visual do proprietário**, incluindo copy e densidade.
- [ ] Definir destino real após Pular/Explorar: **Home Treinos V5.3 ou Publicações** sem restrição a quem só deseja consumir conteúdo; não presumir seletor de entrada nem mudar tabbar.
- [ ] Definir exibição única versus repetir no futuro; persistência de `onboarding_seen` somente quando backend aplicável.
- [ ] Garantir condições e aceite legal para cadastro/OTP reais antes de expor onboarding em produção.
- [ ] Integrar com React e controle de session/auth; no laboratório nada é persistido.
- [ ] QA dispositivos/acessibilidade, revisão de segurança/comunidade e final de jornada.
- [ ] PR review e merge somente após decisão expressa.

**Não iniciar o HTML do Perfil nesta mesma Issue**: a [Issue #20](https://github.com/jukazilli/goudduo/issues/20) exige investigação do HTML GODUOIT P0 V0.2 e preservação de todos os contratos existentes antes de adicionar “Complete seu perfil”.