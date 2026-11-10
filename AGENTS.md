# goudduo — Instruções para agentes e colaboradores

> Este arquivo define **processo de trabalho**, não é uma segunda fonte de decisões de marca ou produto. O [README](README.md) e o [Manifesto](docs/brand/MANIFESTO.md) são as referências institucionais vigentes. O processo de redesign está em [docs/process/REDESIGN-SUPERFICIES.md](docs/process/REDESIGN-SUPERFICIES.md).

## Antes de qualquer tarefa de UI/UX

1. Ler `README.md`, `docs/brand/MANIFESTO.md` e o processo de redesign.
2. **Localizar ou abrir uma Issue canônica para cada tela distinta na goudduo**. A Issue concentra estados, decisões, versões e evidências dessa tela. Não criar Issue para cada loading, erro, variação ou microinteração; telas distintas da mesma jornada (ex.: Login, Cadastro, OTP) devem ter Issues separadas e interligadas.
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

**Splash Screen** — [Issue #1](https://github.com/jukazilli/goudduo/issues/1) → Login → Cadastro/Acesso → Onboarding simplificado → Home Treinos e demais superfícies. Não gerar imagem/HTML/código de uma tela antes da discussão e autorização específica.