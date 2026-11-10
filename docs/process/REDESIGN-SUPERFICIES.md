# GOUDDUO — Processo de redesign por superfícies

> **Estado:** proposta operacional em PR, aguardando revisão e aprovação do proprietário. Não modifica contratos visuais, identidade verbal, manifesto, código ou ativos.
>
> **Marco:** 10/11/2026. Primeira superfície: [Splash Screen — Issue #1](https://github.com/jukazilli/goudduo/issues/1). Depois: Login → Cadastro/Acesso → Onboarding simplificado → demais jornadas conforme inventário e dependências.

## convenção verbal vigente

Usar sempre o masculino para a marca: **o goudduo**, **do goudduo**, **no goudduo**, **pelo goudduo**. O [Manifesto vigente](../brand/MANIFESTO.md) e a [Plataforma estratégica homologada](../brand/PLATAFORMA-ESTRATEGICA.md) definem o posicionamento e o escopo inicial de produto. A expressão "Seu parceiro na vida real." é a frase-manifesto oficial; sua aplicação na Splash está em refinamento visual após substituir a copy da V3 aprovada (Issue #1). Não transplantar automaticamente para outras telas.

## Gate transversal — sistema antes da tela

**Decisão do proprietário:** não começar o Login ou outro redesign criando imagem, HTML ou código. A primeira entrega é o **Design System da [Issue #7](https://github.com/jukazilli/goudduo/issues/7)**, reconciliando [referência do Login em JSON](../design-system/REFERENCE-LOGIN-EXTRACTION.json), [tokens semânticos](../design-system/TOKENS.json), [Foundations + Do/Don't](../design-system/FOUNDATIONS.md), e [checklist obrigatório dos agentes](../design-system/AI-HANDOFF-GATE.md).

**Handoff de IA obrigatório:** confirmar leitura integral e preencher matriz de tokens, hierarquia, regras Do/Don't e QA; se faltar, não aprovar entrega da tela. **Os valores numéricos novos do design system são propostas até homologação.** Não tornar `#E3F0FF` ou uma cor medida da foto em token global por inferência.

**Política de personalidade:** Login é a única experiência de acesso com gradiente multicolorido/hero energético. Cadastro, Google complementar, OTP, Recuperação, Nova senha, Sucesso e telas internas são predominantemente **branco/gelo, sem gradiente decorativo**. A **Home Treinos V5.3** preserva exceções locais homologadas — Bento pastel e Treino do Dia com gradiente charcoal — sem transferi-las para outras telas.

**Restrições absolutas de composição:** não inserir textos que explicam a UI/UX desnecessariamente; não pôr círculos/fundos em ícones sem função; botões com **apenas ícone OU apenas texto**; preservar Lucide, wordmark SVG original e componentes já aprovados.

## 1. Princípios

1. **goudduo é a fonte das decisões do produto novo**; o repositório [GODUOIT](https://github.com/jukazilli/GODUOIT) é fonte de referência e aprendizado, não código a importar sem crítica.
2. A experiência inicial atende **pessoas que treinam ou querem começar**: Treinos/Widgets como primeiro valor; Pulses, Publicações e conexões disponíveis como experiência social. Profissionais e negócios ficam para etapas de validação posteriores.
3. O trabalho produz **protótipos de UI/UX navegáveis**, com estados controlados e dados simulados. Sem contratos de backend nem alegações de autenticação, pagamentos ou Match real.
4. O proprietário decide o que é **APROVADO**. Alternativa proposta, HTML experimental, imagem, código commitado, PR aberta, teste de laboratório e homologação são dimensões diferentes.
5. **Uma Issue canônica para cada tela distinta**, no repositório goudduo. Estados (loading, vazio, erro, sucesso, teclado, modal/variante) pertencem à Issue dessa mesma tela e não geram automaticamente novas Issues. Telas diferentes dentro de uma jornada (por exemplo Login, Cadastro e OTP) recebem Issues próprias, com links de dependência entre elas.
6. **Toda alteração, decisão e evidência fica rastreada na Issue** por comentários cronológicos com links para os artefatos, PRs e commits correspondentes. Não apagar o histórico para fazê-lo parecer concluído.
7. Não executar geração visual, HTML, código ou merge antes do respectivo gate de autorização.

## 2. Sequência de trabalho em cada superfície

| Gate | Atividade | Registro obrigatório | Autorização |
| --- | --- | --- | --- |
| G0 — Criar Issue | Conferir se a tela já possui Issue, criar uma se não existir | Objetivo, fontes e dependências | Autorização para iniciar o recorte |
| G1 — Investigar | Ler READMEs, fontes de código, Issues, comentários e artefatos da goduoit, confrontando com o goudduo | Diagnóstico, evidências, estados, conflitos e lacunas | Sem autorização de implementação |
| G2 — Propor | Apresentar alternativas de UX/UI, hierarquia, estados e acessibilidade | Proposta, Do/Don't, impactos e decisões abertas | Proprietário escolhe abordagem |
| G3 — Experimentar | Criar imagem, HTML ou outra referência navegável apenas conforme escopo autorizado | Links de artefatos, versão, capturas e mudanças | Autorização expressa por etapa |
| G4 — Refinar | Testar visualmente, revisar dispositivos, corrigir problemas sem regressão | Antes/depois, feedback e resultado do teste | Rodadas com o proprietário |
| G5 — Homologar | Fixar variante, estados, copy, regras visuais e de interação aprovadas | Comentário de homologação explícita, fonte da verdade | Aprovação expressa do proprietário |
| G6 — Implementar protótipo | Gerar prompt de handoff para Gemini e implementar no repo goudduo com branch/PR | Diff, PR, links, testes realizados/não realizados | Autorização de execução e merge separados |
| G7 — Auditar e encerrar | Comparar protótipo contra contrato homologado, validar navegação e dependências | Relatório de QA, regressões, pendências e decisão de encerramento | Encerramento somente após auditoria |

A sequência entre telas considera dependências; não é obrigação concluir todo o app antes de testar a primeira jornada.

## 3. Modelo mínimo da Issue por tela

- **Identificação:** `[TELA][UI/UX] <Nome> — investigação, estados e homologação`; objetivo e público.
- **Fontes:** README/manifesto goudduo; arquivos, questões, commits e documentos de origem; SVGs oficiais e revisão atual.
- **Estado atual comprovado:** comportamento observado no código, comportamento apenas simulado, aprovação legada, limitações de investigação.
- **Matriz de estados:** entrada, carregamento, sucesso, erro, vazio, interação, navegação, retorno, viewport e acessibilidade.
- **Questões de UX e propostas:** hipóteses com razões, alternativas, impacto em outras superfícies e riscos.
- **Critérios de aceite:** UI/UX, navegação, responsividade/safe areas, teclado, foco, redução de movimento, autenticidade dos dados e regressões.
- **Checklist dos Gates G0–G7** e vínculos para a próxima tela.
- **Diário append-only:** todas as decisões e execuções registradas na própria Issue, com links verificáveis.

### Modelo de comentário de diário

```markdown
## [AAAA-MM-DD] Gate G# — <assunto>
**Tipo:** INVESTIGAÇÃO | PROPOSTA | APROVADO | PENDENTE | SUBSTITUÍDO | QA | EXECUÇÃO
**Fontes e versão:** <links reais, commit/hash>
**Antes → depois:** <alteração ou hipótese, sem alegar implementação>
**Decisão do proprietário:** <texto literal ou "aguarda decisão">
**Estados/áreas afetados:** <lista ou "nenhum">
**Artefatos:** <links para imagem, HTML, branch, commit, PR, quando existirem>
**Validações:** <testado; não testado; limitações>
**Conflitos/risco de regressão:** <descrição>
**Próximo gate:** <ação>
```

Quando uma decisão for substituída, referenciar o comentário anterior e indicar explicitamente o que mudou e o que continua válido.

## 4. Autoridade, marca e consistência

- A [goudduo/README.md](../../README.md) registra somente decisões consolidadas de marca e produto; o [manifesto](../brand/MANIFESTO.md) é sua expressão verbal vigente.
- A frase-manifesto **“Seu parceiro na vida real.”** está **homologada como mensagem da marca**, complementa e não substitui a assinatura institucional vigente **“Experiências, conexões e bem-estar.”**
- Os SVGs oficiais goudduo devem ser localizados e verificados antes de compor interfaces. **Não reconstruir a marca em CSS/fonte, não gerar logotipo por imagem**.
- A Home Treinos V5.3 documentada na [GODUOIT #54](https://github.com/jukazilli/GODUOIT/issues/54) é referência **visual homologada**, mas os seus widgets ainda possuem refinamentos pendentes na [#159](https://github.com/jukazilli/GODUOIT/issues/159). Sua aprovação **não comprova implementação/QA no goudduo**.
- Preservar a direção de **superfícies energéticas × calmas**: login pode ser energético; formulários e telas de leitura devem priorizar baixa carga cognitiva. As cores do novo login serão extraídas e homologadas depois da referência final; não inventar tokens como se já estivessem aprovados.
- Preservar acessibilidade, foco, safe areas, toque, navegação, `prefers-reduced-motion` e conteúdo real ou claramente simulado.
- Não importar labels demonstrativos, dados inventados ou comportamentos exclusivos do Visual Lab como produto aprovado.

## 5. Regras para protótipos

- Navegação **entre telas homologadas** deve funcionar, com possibilidade de simular erros e sucessos sem backend.
- A aplicação de protótipos não é laboratório de controles permanentes; controles de depuração não devem contaminar a experiência das superfícies.
- Estados não implementados podem apontar para `Em construção` apenas quando isso for autorizado e houver Issue relacionada.
- Ao preparar prompt Gemini, especificar: contexto, Issue canônica, links de decisões aprovadas, arquivos permitidos, testes, restrições de regressão, branch/PR e critérios de aceite.
- Nenhum merge automático; PR e commit não mudam o status de homologação por si só.

## 6. Início do redesign

**Primeiro recorte:** [Issue #1 — Splash Screen](https://github.com/jukazilli/goudduo/issues/1).

**Sequência inicial:** Splash (V3 composição aprovada; V4 copy em revisão) → **Design System (Issue #7 antes de código visual)** → Login (Issue #6) → Cadastro/OTP/Recuperação → Onboarding enxuto → Home Treinos (V5.3 como referência) → demais superfícies inventariadas.

**SVGs verificados em 10/11/2026:** [wordmark preta](https://github.com/jukazilli/goudduo/blob/main/assets/brand/goudduo/goudduo-wordmark-black.svg) e [wordmark branca](https://github.com/jukazilli/goudduo/blob/main/assets/brand/goudduo/goudduo-wordmark-white.svg). Os dois arquivos são vetoriais; símbolo isolado/lockup vertical não foi verificado. Ver detalhes na [Issue #1](https://github.com/jukazilli/goudduo/issues/1).

**Pendente agora:** escolher composição/variantes da Splash, definir gatilho de navegação simulada (com e sem sessão), validar o ativo visualmente e autorizar a criação da referência visual/HTML.