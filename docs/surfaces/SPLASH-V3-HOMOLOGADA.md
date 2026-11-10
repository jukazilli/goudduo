# Splash Screen — Contrato visual homologado V3, copy atualizada em V4

> **Issue canônica:** [#1 — Splash](https://github.com/jukazilli/goudduo/issues/1)
>
> **Marco 10/11/2026:** o proprietário aprovou visualmente a **composição da V3** e solicitou seu commit no Git. Posteriormente, atualizou a frase-manifesto da marca e a convenção gramatical: **“Seu parceiro na vida real.”** e **o goudduo**. Por isso a composição da V3 está **HOMOLOGADA**, mas a **variante V4 com nova copy permanece sujeita à avaliação visual**.
>
> **Não confundir:** aprovação visual, arquivo versionado e implementação funcional são fatos diferentes.

## 1. Evidência aprovada (V3)

- [HTML V3 original, preservado sem alterações](../../lab/screens/splash-screen/goudduo-splash-v3-homologada.html).
- **Fundo:** branco puro (`#FFFFFF`).
- **Marca:** wordmark preta `goudduo` centralizada na composição.
- **Ornamento discreto:** filetes finos com losango pequeno abaixo da marca, antes da frase-manifesto.
- **Texto apresentado na V3:** “Conecte-se com a” / “vida real.” — aprovado visualmente à época, **substituído posteriormente na identidade verbal**.
- **Hierarquia:** 1ª linha em peso médio (500) e 2ª em peso forte (800), tamanho ligeiramente maior, sem itálico e com respiro amplo.
- **Sem:** gradiente de fundo, fotografias, ilustrações, CTAs, status bar decorativa, efeitos luminosos.
- **Entrada:** fade/pequena translação; respeitar preferência por redução de movimento.
- **Preview:** botões de viewport (320×844, 390×844 e 430×932) aparecem **fora da Splash** e pertencem apenas à ferramenta de avaliação.

## 2. Copy e tratamento verbal vigentes

A revisão da marca oficial, [PR #4](https://github.com/jukazilli/goudduo/pull/4), substituiu:

- Frase-manifesto anterior → **“Seu parceiro na vida real.”**
- Forma de referência anterior → **“o goudduo”, “do goudduo”, “no goudduo”, “pelo goudduo”**.

A nova copy deverá ser aplicada em contextos de Splash/Login de forma coerente com a jornada; **não presumir que a quebra de linha ou a escala esteja homologada pela aprovação visual da V3**.

**V4 candidata para avaliação:** [HTML V4](../../lab/screens/splash-screen/goudduo-splash-v4-frase-parceiro-candidata.html), usando a **mesma composição da V3**, trocando exclusivamente o texto por:
- Primeira linha: **“Seu parceiro na”**.
- Segunda linha: **“vida real.”**.

O slogan antigo não está ativo; a V3 existe para rastreabilidade visual.

## 3. Fonte oficial da marca — implementação futura

O snapshot HTML standalone da V3/V4 utiliza **PNG transparente extraído de referência visual** embutido em `data:image/png;base64` para evitar a falha de carregamento externo do primeiro protótipo. Ele **não usa o SVG oficial no próprio HTML** e não prova equivalência geométrica pixel a pixel.

Na implementação final, **substituir a imagem raster de preview pelo SVG oficial**:
[assets/brand/goudduo/goudduo-wordmark-black.svg](../../assets/brand/goudduo/goudduo-wordmark-black.svg).

Não reconstruir curvas e glifos usando uma fonte CSS, desenho manual ou imagem de IA. A fidelidade do logo é gate específico de QA.

**Tipografia:** o preview declara Plus Jakarta Sans com fallbacks locais, mas não incorpora os arquivos da família. Em execução, carregar explicitamente a fonte e pesos usados para garantir a aparência. A referência histórica de tipografia da goduoit não substitui a medição/validação visual no goudduo.

## 4. QA e limites

**Verificado em código:** documento HTML registrado no Git, fundo branco, textos, hierarquia 500/800, três tamanhos de avaliação, imagem embutida, prefência por movimento reduzido. **Não equivale a testes de dispositivos.**

**Pendente:** inspeção visual V4 em diferentes aparelhos, aplicação do SVG real, safe areas/navegação de abertura, estados de sessão e redirecionamento, redução de movimento na execução final, QA de fidelidade e merge para software de produção.

A navegação de login e sessão existente está **fora do escopo de homologação visual V3**. A Issue permanece aberta até handoff, implementação e auditoria.

## 5. Histórico de decisões

1. V1: composição branca com frase; SVG carregado externamente não apareceu para o proprietário.
2. V2: gradiente inspirado na referência de Login; proprietário considerou o fundo pesado.
3. **V3: fundo branco + logo preta + frase + ornamento discreto, aprovada pelo proprietário.**
4. **Revisão de marca (posterior à V3):** frase-manifesto passou a “Seu parceiro na vida real.” e tratamento da marca ao masculino; nova variante **V4 candidata** apenas substitui copy mantendo a composição.

**Futuras alterações devem gerar comentário append-only na [Issue #1](https://github.com/jukazilli/goudduo/issues/1), preservando o contrato anterior e identificando expressamente o que foi substituído.**
