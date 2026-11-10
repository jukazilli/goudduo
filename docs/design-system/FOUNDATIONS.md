# goudduo — Design System: foundations v0.1

> **Status: PROPOSTA DOCUMENTADA, aguardando homologação dos valores de escala.** A identidade verbal e os limites de comportamento marcados como **DECISÃO DO PROPRIETÁRIO** já são vinculantes. Números inéditos para alturas, raios, tamanhos, durações e semântica de componentes são **PROPOSTAS**. Nenhum agente está autorizado a reescrever uma tela previamente homologada apenas com base nesta documentação.
>
> **Source of truth estruturada:** [TOKENS.json](TOKENS.json) · [Extração da referência de Login](REFERENCE-LOGIN-EXTRACTION.json) · [Gate de IA](AI-HANDOFF-GATE.md) · [Issue transversal #7](https://github.com/jukazilli/goudduo/issues/7).
>
> **Regra central:** o design system **restringe escolhas arbitrárias**, não padroniza por força todas as superfícies ao mesmo visual. O **Login** é a exceção energética e multicolorida. Cadastro e fluxos internos são predominantemente brancos/neutros. **A Home Treinos V5.3 mantém suas exceções visuais locais já aprovadas.**

## 1. Fontes, precedência e separação de evidência

| Fonte | O que comprova | O que NÃO comprova |
| --- | --- | --- |
| [README / Manifesto / Plataforma estratégica](../../README.md) | Marca **o goudduo**, propósito e frase-manifesto **“Seu parceiro na vida real.”** | Qualquer novo layout/copy exata de uma tela |
| [SVG preto](../../assets/brand/goudduo/goudduo-wordmark-black.svg) e [SVG branco](../../assets/brand/goudduo/goudduo-wordmark-white.svg) | Assets vetoriais oficiais existentes no goudduo | Cores e tamanho de todo componente |
| [Tokens aprovados da GODUOIT](https://github.com/jukazilli/GODUOIT/blob/main/src/theme/dupplla-tokens.css) | Paleta-base e família **Plus Jakarta Sans** do projeto anterior | Que todas as exceções legadas são tokens globais do goudduo |
| [Home Treinos V5.3 — decisão canônica](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720) e [handoff imutável `abfd989`](https://github.com/jukazilli/GODUOIT/blob/abfd989fb1b3e87d617dfd93c0527554b2e283b2/docs/handoffs/home-treinos-v5.3-direcao-ui-ux-homologada.md) | Bento assimétrico, Pulse squircle, pastéis, charcoal, CTA branco e interações preservadas | HTML V5.3 integrado, QA real ou medidas exatas universais |
| HTML `goduoit-home-motion-v5.1-homologada.html` e `goduoit-home-motion-v5.2-pulses-status-proposta.html` (Library da conversa) | Valores experimentais e evolução das decisões de Home | **Não são** o HTML final homologado da V5.3, indisponível nas fontes recuperadas |
| Imagem de Login fornecida em 10/11/2026 | Composição desejada e cores visuais aproximadas por amostras RGB | SVG, foto separada, fonte exata, opacidade de elementos e fórmula CSS do gradiente |

**Decisão do proprietário:** não produzir novas telas antes de consolidar este sistema. **Números deste documento:** propostas para homologação. **Se uma tela homologada divergir, prevalece sua Issue canônica até revisão expressa**, não uma homogeneização por conveniência.

## 2. Arquitetura visual: superfícies por contexto

| Contexto | Personalidade | Cores/superfícies | Gradiente/hero |
| --- | --- | --- | --- |
| Splash | institucional, calma, marca e frase | branco e wordmark preta | **Não** |
| **Login** | **energia, movimento, proximidade humana** | azul/ciano/menta, passagem para gelo, hero fotográfico | **Sim. Exceção de entrada.** |
| Cadastro e Google complementar | claro, confiável, sem distração | branco, gelo, bordas leves, texto grafite | **Não** |
| OTP, Recuperar, Nova senha, Sucesso | focado, preciso, acessível | branco/neutros, erros inline sem reflows agressivos | **Não** |
| Telas internas novas | leve, funcional, hierarquia clara | tokens semânticos e superfícies neutras | **Não**, salvo decisão específica |
| **Home Treinos V5.3** | Bento social/fitness já homologado | pastel Ranking/Status/Peso; widgets suaves | **Exceção local:** card Treino do Dia charcoal com gradiente; anel Pulse apenas no contexto aprovado |
| Publicações/Business/Rotinas | preservar decisões canônicas vigentes | investigar UI específica antes de ampliar regras | **Não importar gradientes de Login** |

A **presença de azul ou lime na marca não obriga** todo botão, card ou ícone a ser azul ou lime. As cores têm funções, não apenas efeito decorativo.

## 3. Cores: papéis semânticos, não 50 azuis

### Paleta institucional de referência

| Token de base | HEX | Papel |
| --- | --- | --- |
| `brand.energeticBlue` | `#00A8E8` | Destaque/ação quando necessário |
| `brand.orientationBlue` | `#006DA9` | Orientação, links e informações contextuais |
| `brand.ink` | `#10202B` | Texto principal e botão escuro |
| `brand.wordmarkGraphite` | `#212121` | Referência de grafite para identidade |
| `brand.white` | `#FFFFFF` | Tela/superfície clara |
| `brand.ice` | `#F1F8FB` | Fundo calmo alternativo |
| `brand.lime` | `#C7F238` | Acento contextual discreto |

**Contraste verificado por cálculo WCAG**: `#10202B` sobre `#00A8E8` ≈ **6,15:1**, enquanto `#FFFFFF` sobre `#00A8E8` ≈ **2,70:1**, insuficiente para texto normal AA. Preferir tinta escura em CTA azul. Sobre `#006DA9`, branco ≈ **5,58:1**. O contraste real **deve ser testado sobre a imagem/gradiente final**, não apenas sobre uma cor isolada. [W3C — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum).

### Cores locais da Home V5.3 — NÃO globais

- **Ranking** azul pastel aproximado `#E3F0FF`; **Status** verde `#EFF8E0`; **Peso** neutro `#F3F3F3`. O handoff explicita que essas são **aproximações de mock**, para validar no contexto real.
- **Treino do Dia**: gradiente **charcoal local** `#20262D → #30363C → #1C2228`, sem imagem fixa; CTA branco com texto escuro. Não transportar esse gradiente para o Login, Cadastro ou cards genéricos.
- **Pulse não visto**: exceção local de anel/estado conforme token e Issue de Pulse; não é permissão para criar gradientes adicionais em toda a navegação.

### Amostras de referência do Login — NÃO paleta global

Cores capturadas do **PNG**: topo esquerdo `#50B0FB`; topo centro `#51CAF2`; menta superior direita `#A9FCDE`; gelo inferior `#D5EEFD`; botão escuro central `#172B3C`. Algumas amostras são pixels já compostos com opacidade, fotografia e sombras. A imagem pode conter vários gradientes radiais. **Não afirmar que são os stops CSS originais.** Ver [extração JSON](REFERENCE-LOGIN-EXTRACTION.json).

**Regra de engenharia:** qualquer nova cor precisa de papel semântico e justificativa com link à Issue; nunca inserir HEX solto em componente por gosto pessoal. Um agente não pode nomear `blue2`, `blueAlternate`, `newPrimary` como fuga dos tokens.

## 4. Tipografia — única família, hierarquia previsível

**Família oficial de referência:** **Plus Jakarta Sans**. Fonte de origem: [tema da GODUOIT](https://github.com/jukazilli/GODUOIT/blob/main/src/theme/dupplla-tokens.css) e carregamento dos pesos 400/500/600/700/800. A imagem de Login **não revela** tecnicamente a família; não tentar extrair fonte de raster.

| Papel | Tamanho PROPOSTO | Peso | Uso |
| --- | --- | --- | --- |
| Display de marca/hero | 32 px / linha 1,13 | 800 | Login somente, adaptativo em 320px |
| Título da tela | 28 px / 1,20 | 700 | Cadastro e telas independentes |
| Título de seção | 22 px / 1,25 | 700 | Blocos importantes |
| Título de card | 18 px / 1,30 | 700 | Widgets quando aplicável |
| Corpo | 16 px / 1,50 | 400–500 | Leitura e formulários |
| Ênfase no corpo | 16 px / 1,50 | 600 | Nome/expressão importante |
| Label de campo | 14 px / 1,40 | 600 | Nome do campo e orientações breves |
| Apoio | 14 px / 1,45 | 400 | Descrição essencial |
| Legenda | 12 px / 1,40 | 500 | Metadado não essencial |
| Botão principal | 16 px / 1,20 | 700 | CTA somente texto |
| Métrica da Home | 28 px / 1,10 | 800 | Valores; decisão V5.3 prevalece |

**PROPOSTO:** escala, não imposição sobre composição já homologada. Usar `rem` na implementação para respeitar zoom/acessibilidade. Campos de formulário **pelo menos 16 CSS px** para evitar zoom de foco indesejado em Safari iOS. Nunca impedir zoom do usuário para mascarar problemas.

**Don't:** misturar 2–3 famílias em uma mesma jornada; usar itálico ornamental apenas porque é bonito; inventar “tokens” de escala a cada tela. **Do:** diferenciar hierarquia principalmente pelo peso e espaço, não por cores aleatórias.

## 5. Espaçamento, dimensões e geometria

**Escala PROPOSTA:** `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48` px. Margem lateral em mobile: **16px compacto, 20px padrão**. Gap de campos **12px** e de seções **24px** (ajustar de acordo com densidade real e teclado).

**Radii PROPOSTOS:** pequenos **8px**, controles **14px**, campos **16px**, cards **24px**, pill **9999px** somente onde houver razão funcional. A Home antiga tinha Bento por volta de **25px**, porém isso veio de HTML anterior: **a V5.3 governa o resultado visual**. Pulse da Home V5.3: squircle próximo de **58×58 CSS px** e raio ~**19px**, referência e não valor rígido.

### Botões e áreas de toque

| Componente | Padrão PROPOSTO | Conteúdo | Estado |
| --- | --- | --- | --- |
| Primário de formulário | altura 56px, largura geralmente full | **Somente texto** | default, pressed, focus, loading, disabled |
| Secundário | altura 48px | **Somente texto** | idem |
| Compacto | altura visual 44px + área ≥48px | **Somente texto** | idem |
| Icon-only | área tocável ≥48×48px, SVG 20–24px | **Somente ícone**, `aria-label` obrigatório | idem |
| Campo | altura 56px, fonte ≥16px | Label persistente, placeholder auxiliar | default/focus/filled/error/disabled |
| Auth provider | área ≥48×48px | **Ícone da marca somente**, nome acessível | default/pressed/focus/disabled |
| Link textual | área clicável confortável | **Somente texto** | hover/focus/pressed |

**Distinção:** o ícone pode ocupar 22px e o botão ter **área interativa** de 48px sem ganhar um círculo visual ou background decorativo. Ícones Lucide devem ter tamanhos e `stroke-width` consistentes com os já homologados; ícones de marca Google/Apple/Meta precisam ser seus símbolos oficiais licenciados/permitidos, não misturados ao conjunto Lucide.

**Base de acessibilidade:** Apple recomenda região de toque de pelo menos **44×44pt**; Android recomenda **48×48dp**; WCAG 2.2 AA tem mínimo formal **24×24 CSS px** com exceções. Nossa proposta de alvo 48×48 CSS px é **meta de conforto do projeto**, não o limiar normativo de toda plataforma. [Apple](https://developer.apple.com/design/human-interface-guidelines/buttons) · [Android](https://support.google.com/accessibility/android/answer/7101858?hl=en) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

### Estados e foco

- Botão **carregando** bloqueia duplo envio; não simular sucesso silenciosamente. Erro inline próximo da causa, com mensagem útil e foco no primeiro campo inválido.
- Input **focus** tem indicador visível; `aria-invalid` e `aria-describedby` quando erro; não depender apenas de cor.
- Campos numéricos são numéricos, não dropdown arbitrário. Pesquisa em biblioteca continua pesquisa; design system **não muda contratos funcionais homologados**.
- Respeitar `env(safe-area-inset-*)` e o teclado; nunca colocar CTA atrás de notch, home indicator ou nav.

## 6. Política de ícones e botões — Do / Don't

| **DO — permitido / esperado** | **DON'T — proibido sem decisão específica** |
| --- | --- |
| Usar **Lucide** com tamanhos/strokes existentes, e SVG oficial para wordmark | Construir símbolos improvisados, caracteres Unicode fingindo ícones, reconstituir a marca em CSS |
| Botão **somente texto**: `Entrar`, `Criar conta`, `Salvar` | Botão **ícone + texto**: `[✓] Entrar`, `[+] Criar conta`, `[→] Continuar` |
| Botão **somente ícone** reconhecível, com label acessível | Ícone isolado sem nome acessível, ou inserir label visual junto sem escopo aprovado |
| Ícone transparente/plain no header e toolbars | **Círculos, quadrados e fundos atrás de ícones por decoração**, especialmente lupa, mapa, mensagens, rotina, chevron |
| Badges/containers **quando codificarem estado real** (ex.: contador, avatar, Pulse não visto) | Badge/sombra/pill sem semântica para “dar vida” ou “melhorar UI” |
| Usar **um CTA principal** claramente identificável por região | Três botões de ação visualmente primários competindo, gradientes diferentes e excesso de controles |
| Manter ícones e navegação **consistentes entre tabs** | Alterar um ícone da tabbar independentemente ou trocar stroke/cor por tela |
| Manter ornamento **somente onde foi homologado** (Splash) | Copiar ornamentos/linhas para todas as telas como enfeite |

**Exceções precisam de justificativa documentada** (por exemplo identidade de um provedor de autenticação, botão de seleção que tem estado, chip já homologado). Não reinterpretar isso como permissão geral para misturar ícone e texto.

## 7. Política de conteúdo — texto serve ao usuário, não ao protótipo

**DO:** labels necessárias, instruções curtas quando o fluxo é realmente ambíguo, ajuda de OTP/segurança, feedback de erro, confirmação e textos legais quando aplicáveis.

**DON'T:** inserir textos explicando a própria interface ou comandos de laboratório: “Sua Home, do seu jeito”, “Toque nos widgets para interagir”, “Personalizar” inventado, “Pode ser ocultado em Configurações e Atividade”, setas decorativas e rótulos duplicados como “Seu Pulse”. Não exibir `Em construção` nem link à Issue dentro do produto **salvo quando esse placeholder foi explicitamente aprovado para o estado** (ex.: Status na Home).

Sempre distinguir `FIXTURE` de dados reais. Não inventar peso, métricas, validação de credenciais, contagem de amigos, resultados de busca, lotação ou progresso como se fossem dados reais.

### Copy e linguagem institucional

- Nome visual: **goudduo** minúsculo; referência gramatical: **o goudduo**, **do goudduo**, **no goudduo**, **pelo goudduo**.
- Frase-manifesto vigente: **“Seu parceiro na vida real.”**.
- Assinatura institucional preservada: **“Experiências, conexões e bem-estar.”**.
- **“Treine junto. Vá mais longe.”** na imagem de Login é **copy da referência**, não uma nova aprovação de produto. Aplicar a frase-manifesto ou outra mensagem no Login somente após decisão da [Issue #6](https://github.com/jukazilli/goudduo/issues/6).

## 8. Movimento e microinterações — velocidade normal

**PROPOSTA:** feedback de botão ~**160ms**, navegação entre superfícies ~**260ms**, bottom sheet ~**300ms**, curva `cubic-bezier(.22,1,.36,1)`. Valores são ponto de partida, não resultado de benchmark cronometrado do Instagram.

**DO:** transição com entrada/saída suave e previsível, foco/gestos preservados, sheet com backdrop e dismiss acessível, feedback visível ao toque, expansão Bento que reordena widgets sem “buracos” e restaura ordem ao fechar.

**DON'T:** transição seca, animação longa que atrasa uso, fade obrigatório de vários segundos, efeito zoom inesperado ao focar inputs, bounce/scale que causa tremedeira na barra de navegação, transições que desrespeitam `prefers-reduced-motion`.

## 9. Política de hero/fotografia

A imagem de Login mostra dois corredores adultos em movimento. Sua função é comunicar parceria humana e energia, **não impor fotografia ao Cadastro**.

**Requisitos de material definitivo:** fotografia autêntica/licenciada ou criação explicitamente autorizada; anatomia natural, equipamentos/roupas plausíveis, expressão espontânea, sem duplicação de rostos, dedos ou artefatos de IA; contraste do texto validado na fotografia final, sem colocar informação essencial atrás do rosto/corpo.

**Não extrair foto ou SVG do screenshot como se fossem originais.** Se a foto isolada não está disponível, registrar pendência de asset. O **wordmark oficial** é fornecido no repositório; usar SVG sem recomposição.

## 10. Contratos de superfícies que o design system NÃO deve sobrescrever

- **Splash:** branca, wordmark preta, filetes/losango discretos na composição V3. A frase vigente está no HTML V4 candidata; rever copy/alinhamento na Issue [#1](https://github.com/jukazilli/goudduo/issues/1).
- **Login:** questão atual da [#6](https://github.com/jukazilli/goudduo/issues/6), sem homologação final. Gradiente/hero da referência pode ser ponto de partida **apenas para o Login**.
- **Home Treinos V5.3:** Bento Ranking alto, Status verde, Peso compacto, card charcoal sem imagem fixa, Pulses squircle, expansão que reordena, widgets sem dados fictícios. [#54](https://github.com/jukazilli/GODUOIT/issues/54) e [#159](https://github.com/jukazilli/GODUOIT/issues/159) preservados. **Cards Peso, Medidas e Consistência ainda exigem refinamento**.
- **Global Shell:** cinco destinos aprovados, header consistente, safe area, ícones com cores uniformes; mudanças precisas precisam de Issue.
- **Acesso Mobile:** 13 IDs catalogados na origem; não tratá-los como 13 telas diferentes, nem fingir backend real. Cadastro/OTP/Recuperação serão Issues distintas com seus estados.

## 11. Critérios de revisão obrigatórios — antes de homologar uma tela

**Checklist mínimo:** código da tela e Issues consultados; asset SVG verificado; tokens semânticos usados; hero restrito ao Login; fonte real aplicada; campos 16px ou mais; contraste analisado sobre fundos reais; CTA principal claro; botões não misturam ícone/texto; ícones sem fundos arbitrários; ausência de microcopy explicativa redundante; estados erro/vazio/loading/acesso testados; mock não é dado real; 320/390/430px, teclado, foco, reduced motion e safe areas; regressão em navegação e decisões de telas homologadas.

**Entrega do agente deve trazer:** tabela `Token usado → origem → componente`, decisões respeitadas, exceções justificadas, diffs, screenshots/QA real quando existirem e itens não testados. Sem esse relatório, trabalho permanece **Em revisão**.

## 12. Próximos gates

1. **Revisão do proprietário:** homologar ou ajustar dimensões 56/48px, escala Plus Jakarta, radii, cores semânticas e proporção de superfícies claras.
2. Após aprovação, promover arquivo `TOKENS.json` a contrato vigente e impedir hardcoded non-semantic HEX nas implementações.
3. Reabrir visual do **Login #6**, usando o JSON de referência e **este sistema**, sem importar literalmente a foto/copy do raster.
4. Construir protótipos de telas **somente após autorização específica**, uma Issue canônica por tela.
