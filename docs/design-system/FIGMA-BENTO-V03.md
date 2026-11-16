# goudduo — Design System Bento Grid · Figma v0.3

> **Status em 10/11/2026:** **referência visual documentada e versionada para revisão**, não homologação de todos os tokens numéricos. Arquivo Figma existente: **[goudduo — Design System Bento Grid · UI Foundations v0.3](https://www.figma.com/design/5hEOaSAGN1pLo6ml7ckV4Q?node-id=8-2)**.
>
> **Bloqueio conhecido:** a seção **03 / Botões & contraste** contém quatro componentes de visualização **incorretamente encolhidos em pills/chips**, conforme evidência do proprietário. Tentativas de correção via conector Figma foram bloqueadas pelo limite de chamadas do plano Starter; **não afirmar que o Figma já foi corrigido**. Contrato da correção nesta documentação e na [Issue #7](https://github.com/jukazilli/goudduo/issues/7#issuecomment-6767593555).

## 1. Objetivo e precedência

A prancha é **referência editável de foundations** e não uma tela de produto pronta. Ela traduz as três referências compartilhadas pelo proprietário em um layout Bento de amostras: uma entrada energética, telas de Cadastro/OTP sóbrias e **Home Treinos V5.3 preservada**.

As fontes a conciliar antes de qualquer implementação são, nesta ordem:
1. [README](../../README.md), [Manifesto](../brand/MANIFESTO.md) e a convenção verbal atual — **o goudduo**; frase **“Seu parceiro na vida real.”**;
2. [Foundations](FOUNDATIONS.md) e este arquivo Figma Bento v0.3;
3. [Tokens estruturados](TOKENS.json) — representam **a proposta documental v0.1 anterior**; não copiar `actionPrimaryBackground: #10202B` como regra geral depois da proposta v0.3. O token azul de ação v0.3 é **`#0866E8` (candidato para homologação final)**;
4. Issues canônicas da superfície, como [Splash #1](https://github.com/jukazilli/goudduo/issues/1), [Login #6](https://github.com/jukazilli/goudduo/issues/6), [Design System #7](https://github.com/jukazilli/goudduo/issues/7) e Home V5.3 de origem;
5. Divergências entre Design System, preview e código **devem ser sinalizadas**, nunca resolvidas por substituição silenciosa de uma decisão homologada.

## 2. Inventário efetivamente criado no Figma

- Arquivo: `5hEOaSAGN1pLo6ml7ckV4Q`.
- Página: `01 · Bento UI Foundations` (atualizada a partir da página inicial).
- Frame principal: `goudduo / Design System Bento v0.3`, **1600 × 1830 px**, node ID `8:2`.
- **13 variáveis primitivas de cor**, **15 variáveis semânticas de cor** e **10 estilos tipográficos** Plus Jakarta Sans.
- **5 pesos de fonte**: Regular 400, Medium 500, SemiBold 600, Bold 700 e ExtraBold 800.
- Componentes editáveis criados: `Button / Criar conta`, `Outline / Já tenho conta`, `Inverted / Entrar`, `Outline Dark / Continuar`, `Input / Default`, `Input / Focus`, `Input / Filled`, `Input / Error`.
- Seções Bento: **01 Cores essenciais**, **02 Tipografia**, **03 Botões & contraste**, **04 Inputs e estados**, **05 Hierarquia de superfícies**, **06 Do & Don't**.

**Inspeção:** o Figma confirmou a criação e renderizou um screenshot completo do board. O proprietário forneceu screenshot adicional que comprova defeito visual nos quatro botões da seção 03. Não foi possível concluir inspeção posterior à correção, pois o provedor bloqueou novas chamadas.

## 3. Paleta e papéis

| Papel | Token v0.3 proposto | HEX | Uso |
|---|---|---|---|
| Surface | `color.white` | `#FFFFFF` | Base de cadastro, OTP, recuperação, rotinas |
| Primary text | `color.charcoal` | `#10202B` | Títulos, texto, ícones e CTA invertido |
| Action primary | `color.action` | `#0866E8` | CTA preenchido com **texto branco** |
| Surface soft | `color.ice` | `#F1F8FB` | Blocos e fundos calmos |
| Secondary text | `color.textSecondary` | `#536674` | Contexto, descrição, metadados |
| Neutral input | `color.surfaceMuted` | `#F4F5F7` | Campos |
| Border | `color.borderSubtle` | `#D9DEE4` | Contornos e separadores |

`#00A8E8` permanece **azul energético de identidade**, não fundo preferido de CTA com texto branco. Menta e ciano pertencem ao **hero do Login**. Lime `#C7F238` é acento ocasional; nenhum deles deve ser propagado automaticamente para telas internas.

**Home Treinos V5.3** preserva Bento azul pastel Ranking, verde claro Status, Peso neutro, card de treino charcoal com gradiente e os estados do Pulse. **Exceções locais não viram paleta universal.**

## 4. Tipografia e hierarquia

Família: **Plus Jakarta Sans**, com fonte real quando implementado. Estilos criados no Figma:

| Estilo | Tamanho/peso de referência |
|---|---|
| Display | 36 / 800 |
| Title | 32 / 800 |
| Section | 22 / 700 |
| Card | 18 / 700 |
| Body | 16 / 400 |
| Body emphasis | 16 / 600 |
| Label | 14 / 600 |
| Support | 14 / 400 |
| Caption | 12 / 500 |
| Button | 16 / 700 |

Escalas são **candidatas de v0.3**, devem suportar compactação, Safe Area e acessibilidade. Inputs com `font-size` mínimo de **16 CSS px** para evitar zoom indesejado no iOS.

## 5. Botões — contrato visual CERTO e defeito no arquivo atual

O sistema de produção deve usar **CTAs mobile de largura confortável**, não chips. O screenshot atual do Figma está incorreto por conta do Auto Layout ter encolhido os componentes até o tamanho dos labels.

| Componente | Largura da amostra na prancha | Altura | Raio | Fundo | Texto/contorno |
|---|---:|---:|---:|---|---|
| `Button / Criar conta` | 307 px | **56 px** | 28 px | `#0866E8` | Branco `#FFFFFF`, **Bold 16** |
| `Outline / Já tenho conta` | 307 px | **56 px** | 28 px | `#FFFFFF` | Charcoal `#10202B`; borda `#D9DEE4` |
| `Inverted / Entrar` | 288 px | **56 px** | 28 px | `#FFFFFF` em superfície charcoal | Charcoal `#10202B` |
| `Outline Dark / Continuar` | 277 px | **56 px** | 28 px | Transparente sobre charcoal | Texto e borda brancos |

**Larguras são do espécime Bento Figma, não restrição fixa de layout:** em formulários e mobile, CTA principal deve ocupar a largura disponível do contêiner. Textos horizontal/verticalmente centralizados, botão text-only **sem seta e sem ícone por padrão**. Botões icon-only usam Lucide e nome acessível; não devem receber círculos/fundos decorativos automaticamente.

### Correção pendente no Figma

- Aplicar `Auto Layout: Horizontal`, eixo principal/contrário centralizados, `primaryAxisSizingMode = FIXED`, `counterAxisSizingMode = FIXED`, `paddingLeft/Right = 24`, `paddingTop/Bottom=0`, `itemSpacing=0`.
- **Após criar/anexar o label**, fixar e verificar `resize(width, 56)` com `cornerRadius=28`, sem deixar Auto Layout em Hug.
- Verificar a visualização a 100%, sem componentes cortados e texto centralizado.
- A atualização via Figma MCP **não aconteceu** por limite de chamadas do Starter. Existe arquivo ZIP de correção local entregue na conversa, mas **a execução desse plugin não foi confirmada**. Nenhum agente pode marcar como corrigido sem evidência.

## 6. Inputs

Padrão visual no Bento: superfície neutra `#F4F5F7`, contorno leve `#D9DEE4`, tipografia 16px, foco sinalizado por cor de ação, erro localizado. Estados de specimen: **default / focus / filled / error**. Definir labels visíveis e mensagens só quando necessárias.

## 7. Hierarquia por superfície

- **Login / entrada:** única tela de acesso com energia visual forte, gradiente azul-ciano-menta, hero humano, logo SVG branca e **CTA branco com texto charcoal** quando em fundo expressivo.
- **Cadastro, Google complementar, OTP, Recuperação, Nova Senha:** **fundo branco/gelo**, logo SVG preta, campos neutros, CTA **azul #0866E8 com texto branco**, sem gradientes e fotografia decorativa.
- **Rotinas e interfaces internas:** brancas e sóbrias, conteúdo de mídia apenas quando funcional.
- **Home Treinos V5.3:** preservar o layout Bento assimétrico, card Treino charcoal, widgets e cores locais. Não importar dados ou microcopy experimental.

## 8. Do / Don't obrigatórios nos handoffs de IA

**DO:** text-only OU icon-only; peso tipográfico hierárquico; tokens semânticos; espaço em branco; CTA de tamanho real; indicadores de estado com função; Lucide e SVG oficiais.

**DON'T:** botões pequenos/chips como CTA mobile, texto+ícone na mesma ação sem exceção aprovada, círculos de fundo em cada ícone, setas decorativas, textos que explicam a própria UI, gradientes de Login em telas calmas, improvisar novos tons de azul por tela, converter screenshots em logos, fazer regressões na Home V5.3.

## 9. Status e próxima etapa

- **Documentado e versionado no Git:** este registro descritivo do Figma e seu contrato de correção, sem alterar o arquivo Figma.
- **Figma v0.3:** editável e visível, porém contém defeito conhecido de Auto Layout nos botões. **Não homologado visualmente** como biblioteca definitiva.
- **Tokens v0.3:** proposta consolidada para validação; não substitui silenciosamente o JSON v0.1 até revisão/reconciliação.
- **Próxima superfície:** [Acesso Mobile / Login #6](https://github.com/jukazilli/goudduo/issues/6), mapear estados e derivar **HTML de referência para avaliação**, sem alterar autenticação de produção.
