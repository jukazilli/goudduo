# goudduo — Instruções para agentes e colaboradores

> Este arquivo define **processo de trabalho**, não é uma segunda fonte de decisões de marca ou produto. O [README](README.md) e o [Manifesto](docs/brand/MANIFESTO.md) são as referências institucionais vigentes. O processo de redesign está em [docs/process/REDESIGN-SUPERFICIES.md](docs/process/REDESIGN-SUPERFICIES.md).

## Convenção institucional obrigatória (homologada na main em 10/11/2026)

**Sempre se referir à marca no masculino: o goudduo, do goudduo, no goudduo, pelo goudduo.** O logotipo é escrito `goudduo`, minúsculo. Não alterar a assinatura institucional "Experiências, conexões e bem-estar." por conta própria; "Seu parceiro na vida real." é uma frase-manifesto e requer decisão por tela antes de uso visual.

Consultar [README](README.md), [Manifesto](docs/brand/MANIFESTO.md) e [Plataforma estratégica](docs/brand/PLATAFORMA-ESTRATEGICA.md) atualizados na main. Histórico: [PR #3](https://github.com/jukazilli/goudduo/pull/3) foi substituída quanto a gênero/frase pela [PR #4](https://github.com/jukazilli/goudduo/pull/4) (**vigente**).

## GATE ZERO — Design System (obrigatório antes de qualquer tela)

**NENHUM agente deve iniciar novo desenho, HTML, imagem, código de UI, reestilização de componente ou prompt de implementação antes de:**

1. Ler integralmente [FOUNDATIONS.md](docs/design-system/FOUNDATIONS.md), inclusive **Do / Don't**, as regras de densidade/ícones/botões e a divisão de superfícies.
2. Ler [TOKENS.json](docs/design-system/TOKENS.json), **respeitando o status de homologação de cada valor**. Não promover tokens candidatos por inferência.
3. Ler [AI-HANDOFF-GATE.md](docs/design-system/AI-HANDOFF-GATE.md) e incorporar o checklist na saída e no handoff Gemini/Codex.
4. Para Login, confrontar [REFERENCE-LOGIN-EXTRACTION.json](docs/design-system/REFERENCE-LOGIN-EXTRACTION.json) com a referência enviada pelo proprietário. Cores do raster são **amostras observadas**, não tokens globais e não SVG recuperado.
5. Reconciliar a Issue da tela atual e as decisões aprovadas nas anteriores; **não alterar telas já homologadas sem autorização**.

**Políticas expressas do proprietário:** Login energético, com gradiente/fotografia apenas nele; outras telas de acesso e telas internas calmas, branco/gelo e **sem gradientes decorativos**; Home Treinos V5.3 é exceção local pré-aprovada (pastéis e card charcoal). **Botão contém somente texto OU somente ícone**; nunca misturar ambos por padrão. **Não desenhar círculos/fundos em ícones sem razão funcional homologada**. **Não inserir textos que explicam a própria UI/UX** ou dicas e controles de laboratório na interface. Ícone isolado requer nome acessível; SVG oficial não pode ser reconstruído.

O requisito de ler e aplicar o Design System é **gate bloqueante de review**: ausência de matriz de tokens, conformidade Do/Don't, estados e evidência de QA mantém a PR em revisão.

## Antes de qualquer tarefa de UI/UX

1. Ler `README.md`, `docs/brand/MANIFESTO.md`, `docs/brand/PLATAFORMA-ESTRATEGICA.md`, o processo de redesign e os arquivos obrigatórios de `docs/design-system/` antes de qualquer estudo visual.
2. **Localizar ou abrir uma Issue canônica para cada tela distinta no goudduo**. A Issue concentra estados, decisões, versões e evidências dessa tela. Não criar Issue para cada loading, erro, variação ou microinteração; telas distintas da mesma jornada (ex.: Login, Cadastro, OTP) devem ter Issues separadas e interligadas.
3. Antes de propor tela, investigar a fonte relevante na [GODUOIT](https://github.com/jukazilli/GODUOIT): `AGENTS.md`, `README.md`, implementação, issues canônicas e comentários aprovados, assets originais e PRs. A implementação/decisão da goduoit **não equivale automaticamente a decisão ou implementação goudduo**.
4. Registrar na Issue a situação de cada item separadamente: `APROVADO`, `PROPOSTA`, `ESTUDO`, `PENDENTE`, `SUBSTITUÍDO`; distinguir `visual homologado`, `código integrado`, `QA comprovado` e `demo simulada`.
5. Explicar objetivos, alternativas, conflitos, dependências e riscos de regressão antes de começar alterações.

## Durante

- Seguir gates de `docs/process/REDESIGN-SUPERFICIES.md`: investigar → propor → experimentar (com autorização) → refinar → homologar → handoff Gemini → implementar em branch/PR → auditar.
- **Nunca presumir aprovação**; registrar a decisão explícita do proprietário com link na Issue.
- Registrar **cada rodada** em comentário cronológico na Issue, com fontes, antes/depois, estados afetados, evidências, commits/PRs, testes realizados/não realizados e pendências. Preservar decisões substituídas com links, sem apagar histórico.
- Não reconstituir o SVG oficial goudduo com texto CSS, uma fonte ou imagem de IA; usar a versão oficial verificada. Não fixar dados fictícios de laboratório nas superfícies finais.
- As superfícies nesta fase são **protótipos navegáveis de UX/UI**, sem contrato de backend. Navegação coerente, acessibilidade, simulações identificadas e testes de regressão são necessários.
- Utilizar branch/PR para alterações, **não fazer merge automaticamente**, nem atualizar README/manifesto com estudos não homologados.

## Ao finalizar

- Comparar entrega com o contrato homologado e registrar QA e lacunas reais.
- A Issue só pode ser encerrada com a situação de design, protótipo, implementação e QA **explicitamente separadas** e as evidências linkadas.
- Reportar exatamente o que foi feito e o que não foi, sem declarar entrega por criação de Issue, PR ou preview.

## Ordem inicial aprovada

**Design System — [Issue #7](https://github.com/jukazilli/goudduo/issues/7)** antecede o redesenho do **Login — [Issue #6](https://github.com/jukazilli/goudduo/issues/6)**. **Splash — [Issue #1](https://github.com/jukazilli/goudduo/issues/1)** já tem contrato visual V3, com copy V4 pendente; em seguida Login → Cadastro/Acesso → Onboarding simplificado → Home Treinos e demais superfícies. Não gerar imagem/HTML/código de uma tela antes da discussão e autorização específica.