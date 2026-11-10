# Home Treinos — auditoria de precedência cromática e geométrica (V5.1 → V5.3)

> **Objetivo:** impedir que o Design System do goudduo use um HTML antigo da Home para justificar cores/tamanhos contrários à direção V5.3 homologada.
>
> **Fonte de verdade:** [Issue GODUOIT #54 — decisão V5.3 de 09/11/2026](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720) e [handoff fixo `abfd989`](https://github.com/jukazilli/GODUOIT/blob/abfd989fb1b3e87d617dfd93c0527554b2e283b2/docs/handoffs/home-treinos-v5.3-direcao-ui-ux-homologada.md).
>
> **Origem auxiliar inspecionada:** HTML `goduoit-home-motion-v5.1-homologada.html`, recuperado na Library da conversa; `goduoit-home-motion-v5.2-pulses-status-proposta.html` era estudo. **Não foi recuperado o HTML exato V5.3**. O handoff/Issue V5.3 não declara medidas rígidas globais; propostas dimensionais v0.1 do Design System exigem homologação.

## 1. O que a V5.1 tinha (HTML examinado; NÃO contrato vigente)

Variáveis locais e valores observados no HTML anterior:

```css
--bento-ink: #161719;
--bento-sub: #6D7982;
--bento-pale: #A0A8AE;
--bento-blue: #E3F0FF;
--bento-mint: #EFF8E0;
--bento-neutral: #F3F3F3;
--bento-lavender: #F3F2FB;
--bento-ivory: #FFF8E9;
--bento-radius: 25px;
--bento-gap: 11px;
--bento-shadow: 0 3px 12px rgba(19,37,46,.035);
--bento-easing: cubic-bezier(.22,1,.36,1);
```

Em outro trecho de HTML antigo o card Treino do Dia exibia gradiente **azul** `#0B3854 → #006DA9 → #00A8E8`, com CTA e ilustração. Isso **não representa a V5.3 atual**. O HTML antigo também tinha Pulses circulares e textos demonstrativos que foram explicitamente revisados.

## 2. Precedência obrigatória (do antigo ao vigente)

| Propriedade | Origem/estudo anterior | Contrato V5.3 vigente | Decisão para o Design System |
| --- | --- | --- | --- |
| Hierarquia | cards reordenáveis em Bento; versões de layout anteriores | **Ranking alto à esquerda; Status/Peso empilhados à direita**, Treino do Dia full-width; widgets suaves | **Preservar apenas Home**; não impor Bento a Login/OTP |
| Ranking | `#E3F0FF` em HTML anterior | **azul pastel de maior hierarquia**; `#E3F0FF` aparece como aproximação de mock no handoff | **Local, não cor de marca global**; validar contraste |
| Status | foi “No ritmo”, com valores de engajamento demonstrativos | **Status verde pastel**, resumo social curto e estados reais; `#EFF8E0` aproximado | Não ressuscitar “No ritmo”/números antigos |
| Peso | azulado/variações em HTML anterior | **compacto e neutro**; `#F3F3F3` referência aproximada | Área de contexto Home; não pintar todos inputs |
| Treino do Dia | card de fundo azul com arte/elementos experimentais | **gradiente charcoal `#20262D → #30363C → #1C2228`**, CTA branco; **sem ilustração fixa** | Exceção local da Home, não novo primário global |
| Pulse | círculo/anéis anteriores | **squircle ~58×58px, raio ~19px**, referência flexível na Home Treinos; estados visto/não visto | Não copiar círculo de HTML antigo; preservar estados reais |
| Ícones | círculos e fundos em várias provas visuais | Lucide/ícones aprovados, evitar setas decorativas; não mudar outras tabs automaticamente | **Ícone sem fundo extra por padrão**, salvo semântica específica |
| Copys | “Seu pulse”, “Reiniciar”, labels e dicas mockadas | **Não importar textos de laboratório**; estados vazios verdadeiros | Regra global Do/Don't: evitar explicar a UI |
| Interação | expansão podia causar espaços vazios dependendo da versão | expansão reordena widgets sem buracos; fechar restaura posição | Preservar comportamento; não perder por CSS novo |
| Escopo | versões experimentais incluíam outros destinos como demo | **Somente Home Treinos** recebe esse redesign; Publicações e Business preservadas | Não usar HTML de demo como implementação do shell |

## 3. Classificação dos valores numéricos

- `#00A8E8`, `#006DA9`, `#10202B`, `#212121`, `#FFFFFF`, `#F1F8FB`, `#C7F238`, fonte Plus Jakarta Sans: **fonte institucional anterior aprovada na GODUOIT**, candidata a uso semântico no goudduo.
- `#E3F0FF`, `#EFF8E0`, `#F3F3F3`: **referências locais de mock** reconhecidas no handoff V5.3; precisam validação de contraste/integração. **Não** são tokens institucionais globais.
- `#20262D`, `#30363C`, `#1C2228`: **composição charcoal local do Treino do Dia**, aprovada na direção V5.3; não muda o fundo padrão do aplicativo.
- `25px` raio Bento e `11px` gap: **observados no HTML V5.1**, não fixados pela V5.3. Recomendações numéricas do TOKENS.json seguem propostas.
- Cores `#50B0FB`, `#51CAF2`, `#A9FCDE`, `#D5EEFD`: **pixels amostrados do novo Login**, não cores da Home nem valores recuperados de CSS.
- A foto da referência Login **não é um asset de Home**. V5.3 proíbe a ilustração fixa do Treino do Dia.

## 4. Regras de implementação futura

1. Para **Home**, ler a Issue canônica V5.3 e #159 antes de qualquer mudança; preservar a direção Bento e as exceções locais.
2. Para **Login**, usar referência energética e os tokens semânticos sem transformar os pastéis da Home em campos de login.
3. Para **Cadastro/OTP/Recuperação**, preferir branco/gelo e minimalismo, sem gradiente/foto de Login.
4. No prompt Gemini, anexar a tabela de precedência. Se o código atual divergir da documentação, não “corrigir” sem reproduzir o estado, identificar branch/PR e solicitar decisão no recorte relevante.
5. Medidas ausentes da V5.3 não devem ser apresentadas como “extraídas do HTML final”; primeiro medir a versão final quando recuperada, depois homologar.

## 5. Situação de QA

**Feito:** leitura de `src/theme/dupplla-tokens.css`, HTML V5.1/V5.2 disponibilizados e handoff V5.3 de commit fixo; classificação de origem/status.

**Não feito:** leitura do HTML exato V5.3 (não localizado), inspeção no navegador do layout V5.3, comparação visual lado a lado, integração do produto, validação de acessibilidade em dispositivos. **A direção V5.3 permanece homologada em sua Issue e não é enfraquecida pela ausência do HTML.**
