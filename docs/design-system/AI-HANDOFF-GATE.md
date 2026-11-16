# goudduo — Gate obrigatório de IA antes de criar/modificar telas

> **Status:** regra de governança solicitada pelo proprietário em 10/11/2026; valores novos de escala do Design System ainda são candidatos até homologação. Este arquivo é o checklist que deve constar em **todo handoff** para Gemini, Codex, ChatGPT ou outros agentes.

## 0. Leitura obrigatória, nesta ordem

1. [`AGENTS.md`](../../AGENTS.md) e [`README.md`](../../README.md) do repositório goudduo.
2. [`MANIFESTO.md`](../brand/MANIFESTO.md) e [`PLATAFORMA-ESTRATEGICA.md`](../brand/PLATAFORMA-ESTRATEGICA.md). Marca referida no masculino: **o goudduo**. Mensagem vigente: **“Seu parceiro na vida real.”**.
3. [`FOUNDATIONS.md`](FOUNDATIONS.md) — regras de componentes e Do/Don't.
4. [`TOKENS.json`](TOKENS.json) — **status dos valores: PROPOSTA até homologação**, não aplicar como se já fossem globais aprovados.
5. [`REFERENCE-LOGIN-EXTRACTION.json`](REFERENCE-LOGIN-EXTRACTION.json) somente quando a tela for Login ou quando for necessário comparar efeitos cromáticos. **Não copiar o gradiente para outras telas**.
6. [`docs/process/REDESIGN-SUPERFICIES.md`](../process/REDESIGN-SUPERFICIES.md) — uma Issue por tela distinta.
7. **Issue canônica da tela atual** no goudduo, com comentários aprovados, histórico de substituição, decisões de copy, estados e links de assets.
8. Para tela herdada, confrontar implementação atual e Issues homologadas na GODUOIT, sem converter legado em aprovação automática.
9. Se afetar Home, ler [V5.3 homologada](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720) e [progresso pendente #159](https://github.com/jukazilli/GODUOIT/issues/159). **O HTML exato V5.3 não foi recuperado**; V5.1/V5.2 são fontes anteriores, nunca prova da V5.3.

## 1. Ordem imutável de trabalho

`INVESTIGAR → IDENTIFICAR STATUS DAS FONTES → CONCILIAR CONFLITOS → PROPOR → OBTER AUTORIZAÇÃO → EXPERIMENTAR → HOMOLOGAR → CODIFICAR EM BRANCH/PR → TESTAR → RELATAR`.

**Proibido:** gerar mock, código, HTML, novo SVG ou mudar main por iniciativa própria quando a tarefa é pesquisa/documentação; introduzir escolhas visualmente “bonitas” sem token/decisão; declarar entregue só porque commitou; fazer merge sem autorização.

## 2. Perguntas que o agente deve responder no handoff

| Pergunta | Critério |
| --- | --- |
| Que tela e Issue estamos trabalhando? | Nome, link e estado da aprovação |
| Quais referências e commits foram lidos? | Links reais, diferenças antiga × nova |
| Qual modo visual? | `login-energetico`, `calmo` ou `home-v53-excecao` |
| Quais tokens? | Referências semânticas de TOKENS.json; aprovada/proposta |
| Quais componentes? | Tipografia, CTA, input, icon-only, links, cards/estados |
| Como os Do/Don't foram respeitados? | Evidência para cada decisão |
| Há gradiente fora do Login? | Se sim, comprovar exceção da Home/Pulse ou decisão explícita |
| Há ícone + texto no mesmo botão? | Não; exceção precisa autorização registrada |
| Há ícones em círculos ou fundos desnecessários? | Não, salvo semântica aprovada |
| Foram inseridas mensagens que “explicam a UI”? | Não; remover instruções de laboratório e cópias redundantes |
| Foi usada fonte ou cor inventada? | Não; se token ausente, registrar lacuna antes de construir |
| Foram afetadas telas homologadas? | Relatar risco, preservar contratos e testes de regressão |
| O que está efetivamente testado? | Viewport 320/390/430, safe area, inputs, 16px, teclado, foco, reduced motion, loading/error/no-data; testes executados ≠ planejados |

## 3. Padrão de botões e iconografia (regra do proprietário)

- **Botão de texto:** `Entrar`, `Criar conta`, `Continuar` — somente texto, sem ícone à esquerda/direita decorativo.
- **Botão de ícone:** ícone isolado Lucide/provider com rótulo acessível, área de toque ampla e **sem background/círculo decorativo por padrão**.
- Não juntar automaticamente `[ícone] + label`, mesmo que bibliotecas de UI ofereçam essa opção.
- Avatar, badge de notificações, estados de Pulse e botão semântico podem ter moldura/contêiner **quando a necessidade funcional estiver aprovada**.
- Não espalhar CTA azul/lime ou gradientes de Login pelo restante das telas.

## 4. Conteúdo, dados e estados

- **Não escrever instrução desnecessária na interface**: “Toque para interagir”, “Sua Home do seu jeito”, “Personalizar” inventado, explicações de protótipo, textos de laboratório.
- Ajuda essencial de autenticação, erro, consentimento, segurança e acessibilidade é legítima e deve ser curta.
- Estados simulados devem ser identificados no ambiente de teste e separados da UI do usuário; não apresentar login OAuth, envio OTP ou dados fictícios como verdadeiros.
- Nunca reescrever SVG oficial goudduo; usar arquivos vetoriais verificados em `assets/brand/goudduo/`.

## 5. Bloco obrigatório para colar em prompts Gemini/Codex

```text
GATE DE DESIGN SYSTEM — GOUDDUO (obrigatório)
Antes de alterar qualquer tela, leia:
AGENTS.md
README.md
docs/brand/MANIFESTO.md
docs/brand/PLATAFORMA-ESTRATEGICA.md
docs/process/REDESIGN-SUPERFICIES.md
docs/design-system/FOUNDATIONS.md
docs/design-system/TOKENS.json
docs/design-system/AI-HANDOFF-GATE.md
Issue canônica da tela e seus comentários aprovados.

Preserve a marca "o goudduo" e a frase-manifesto "Seu parceiro na vida real."
Somente a tela Login pode ter fundo multicolor/hero energético como linguagem principal.
Cadastro, OTP, Recuperação, Sucesso e telas internas: predominância de branco/gelo, sem gradientes decorativos.
A Home Treinos V5.3 possui exceções homologadas: Bento pastel, card Treino do Dia em charcoal e anéis Pulse contextuais.
Botões: APENAS texto OU APENAS ícone; nunca misture texto+ícone automaticamente.
Ícones: Lucide, SEM fundos/círculos decorativos por padrão. Icon-only exige accessible name.
Evite qualquer texto supérfluo de explicação da UI/UX, controles de laboratório e dados inventados.
Use tokens semânticos; valores ainda candidatos precisam de homologação antes de virar baseline.
Investigue código/issues/PRs existentes, documente diferenças e preserve decisões já aprovadas.
Não modifique outros fluxos, não abra PR de UI sem autorização e não faça merge automático.
Entregue matriz de conformidade, evidências de QA realmente executado e itens pendentes.
```

## 6. Gate de revisão e aceite

O agente deve entregar:

1. **Matriz de tokens:** `token semântico / valor / origem / status / componente afetado`.
2. **Matriz de Do / Don't:** decisões com evidência de conformidade, sem autodeclaração vaga.
3. **Mapa de estados:** inicial, loading, erro, sucesso, vazio, invalidação, foco/teclado, 320/390/430, acessibilidade.
4. **Diff e risco de regressão:** arquivos/rotas alterados, telas afetadas, branches/PRs concorrentes reconciliados.
5. **QA de fato:** testes feitos e resultados; capturas quando houver; testes não executados explicitamente.
6. **Status de homologação:** estudo, visual aprovado, implementação feita, QA aprovado — **nunca confundir as etapas**.

**Se algum item obrigatório estiver ausente, a PR continua em revisão.**
