# goudduo — Perfil P0 V0.3 · homologação condicional e correções de UX

> **G4 — HOMOLOGADO COMO REFERÊNCIA VISUAL E COMPORTAMENTAL, COM RESSALVAS, EM 10/11/2026.** Decisão expressa: “Blz chat podemos homologar com ressalvas…”, condicionada a **cidade não ser um campo livre** e a **saída dos popups ser suave e padronizada no aplicativo inteiro**.
>
> O arquivo V0.3 materializa as duas correções **somente no HTML da família Perfil**. Essa homologação **não equivale a QA em dispositivos, backend implementado, catálogo IBGE hospedado, busca real ou autorização para merge na main**.

## Links e precedência

- [HTML V0.3 atualizado e commitado](../../lab/screens/profile/goudduo-perfil-p0-v03-homologado-ressalvas.html) — **referência principal após ressalvas**.
- [HTML V0.2 preservado](../../lab/screens/profile/goudduo-perfil-p0-v02-complete-duplas-proposta.html) — referência histórica, contendo campo livre **que NÃO deve ser usado em produção**.
- [HTML V0.1 preservado](../../lab/screens/profile/goudduo-perfil-p0-v01-complete-proposta.html) — antes do card de duplas.
- [Handoff V0.2 histórico](PERFIL-P0-COMPLETE-DUPLAS-V02-PROPOSTA.md).
- [Issue Perfil #20](https://github.com/jukazilli/goudduo/issues/20); [Issue Duplas #23](https://github.com/jukazilli/goudduo/issues/23); [Issue Central de Atividade #24](https://github.com/jukazilli/goudduo/issues/24); [Issue Design System / Motion global #25](https://github.com/jukazilli/goudduo/issues/25).
- [PR Draft #22](https://github.com/jukazilli/goudduo/pull/22) — branch do laboratório; **sem merge automático**.
- Fontes antigas preservadas: [GODUOIT Perfil #77](https://github.com/jukazilli/GODUOIT/issues/77), [convites #81](https://github.com/jukazilli/GODUOIT/issues/81), [gestão #92](https://github.com/jukazilli/GODUOIT/issues/92) e [Perfil da Dupla #144](https://github.com/jukazilli/GODUOIT/issues/144).

## 1. Homologação do fluxo Perfil

**Aprovado como referência:** cinco contextos de Perfil, estrutura original, carrossel opcional “Complete seu perfil”, tarefas nome/região, foto, interesses, conhecer pessoas, **Encontrar uma dupla**, popup de descoberta, múltiplas parcerias independentes, convites pendentes, Perfil da Dupla por par aceito e gestão em Configurações e atividade → Duplas.

**Não existe serviço real nesta versão:** pessoas demonstrativas, convites e aceites de laboratório, base de pares em memória, nenhum envio/recebimento de notificações, exportação, execução de Match ou atualização de usuário/servidor. A Central de Atividade mantém sua Issue específica.

## 2. Estado ANTES de cidade — entrada controlada e identificador IBGE

**Direção expressamente obrigatória:**
1. A pessoa entra voluntariamente na tarefa **Nome e região**.
2. Digita **Nome de exibição**; seleciona **Estado (UF)** em controle estruturado com as **27 UFs**.
3. Somente após a UF pode **pesquisar a cidade**, em controle de busca semelhante à Biblioteca de Exercícios: digitando consulta, vê **resultados estruturados** e escolhe uma opção explícita.
4. O texto digitado é apenas a **consulta**, não é o valor final: **Salvar é bloqueado** até selecionar um item real da lista de municípios válidos para a UF.
5. O item selecionado guarda no estado demonstrativo **UF, nome oficial e código IBGE do município** (`cityId`). Ao trocar a UF ou alterar a pesquisa, seleção anterior é invalidada; evitar salvar cidade de um estado diferente.
6. **Nenhum campo livre de município é persistido**. Validação futura deve ser repetida no backend contra catálogo autoritativo e constraint de UF/código, inclusive para bloquear manipulação do navegador.
7. Os dados permanecem **opcionais para uso geral** e não ativam Match, busca ativa, geolocalização precisa nem visibilidade pública sem regra de privacidade própria. Objetivo é melhorar o algoritmo de descoberta por localidade **apenas quando houver intenção/consentimento aplicáveis**.

**Proveniência de municípios:** Serviço de Dados do IBGE, API de Localidades — endpoint público de Municípios por UF:
`https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios?orderBy=nome`
Documentação: `https://servicodados.ibge.gov.br/api/docs/localidades`.
O HTML não envia nome/cidade do usuário para essa API; busca apenas o catálogo de municípios da UF e filtra localmente a consulta.

**Fallback do protótipo, com aviso explícito:** quando o IBGE não responde, apenas para demonstração, amostra estruturada previamente identificada:
- SC → Joinville (4209102), Florianópolis (4205407)
- PR → Curitiba (4106902)
- Outras UFs → **sem fallback**, bloqueio de seleção até carregar o catálogo. **Nunca inventar cidades ou salvar texto digitado**.

A implementação real deve avaliar catálogo versionado local/cache próprio e sincronização, disponibilidade, limites/rate e privacidade do envio da solicitação. A referência não implementa matching por distância geográfica; proximidade municipal/regional precisa de regras futuras sobre municípios vizinhos e opt-in.

## 3. Suavidade das transições — prioridade de Design System

**Ressalva de UX do proprietário:** fechar popup não pode gerar corte seco. Regra global estabelecida na [Issue #25](https://github.com/jukazilli/goudduo/issues/25), aplicável às próximas implementações de Login, Cadastro, Onboarding, Perfil, Publicações, Rotinas, Home, Business e Match sem contaminar composições já aprovadas.

**No HTML V0.3:**
- Backdrop e painel animados em abertura ≈ **300 ms**, fechamento ≈ **310 ms**, curva desacelerada.
- Bottom sheets novos (nome/região, foto, interesses, descoberta e confirmação) usam **classes is-open/is-closing**; não removem o elemento imediatamente na saída.
- Tela demonstrativa **Configurações → Duplas** usa a mesma filosofia para entrar e sair.
- **Bottom sheets herdados da referência P0** receberam ajuste pontual de entrada/saída para evitar corte seco também no cenário de Perfil antigo.
- Troca deliberada de uma folha por outra pode desmontar a folha anterior imediatamente **somente para evitar overlay duplo**, com abertura suave do novo estado.
- **prefers-reduced-motion: reduce** desativa as animações e permite desmontagem imediata; não depender de um evento de CSS que nunca dispara.
- Não foram modificados arquivos de implementação React ou todas as telas existentes. Para a aplicação real, usar motion tokens/componentes comuns, gerenciamento de foco e estado de montagem, com QA de regressão.

## 4. Do / Don't

**Fazer:** botão azul `#0866E8` + texto branco; estado antes de cidade; lista com códigos IBGE; confirmar seleção; transição de fechar inversa e suave; movimentos do mesmo padrão; modal com safe area e acessibilidade; cidade não pública por padrão.

**Não fazer:** `input` livre para cidade como valor persistido; salvar só o texto da pesquisa; manter cidade antiga quando UF mudou; buscar/usar GPS sem necessidade; criar Match por completar perfil; autorizar convite pelo próprio remetente em produção; remover popup do DOM antes de animação de saída; misturar textos+ícones decorativos em CTAs; criar novos gradientes internos.

## 5. QA e conclusão de gate

**Executado no GitHub/ambiente de script:**
- [x] HTML V0.3 versionado separadamente dos HTMLs V0.1 e V0.2.
- [x] Scripts original e aditivo parseados (V8) sem erros.
- [x] Verificados por inspeção: estado antes de cidade; busca somente após UF; código IBGE, invalidação de seleção, validação de save; fallback demo limitado; tokens/caminhos de fechar, redução de movimento.
- [x] Cinco perfis e estados de duplas múltiplas preservados.
- [x] Registro das regras sistêmicas na Issue #25.

**Não executar afirmação de conclusão funcional:**
- [ ] QA de navegação real em Chromium 320/390/430 e Safari/iPhone/Android, inclusive teclado e acessibilidade.
- [ ] Verificar rede/CORS/cache e indisponibilidade real do endpoint IBGE no navegador hospedado.
- [ ] Testar casos de troca rápida de UF, busca sem opção, race conditions, entradas inválidas e preferência por movimento reduzido.
- [ ] Integrar o picker ao design system e ao backend com validação de códigos IBGE.
- [ ] Aplicar o contrato de movimento a **todo o aplicativo**, componente por componente, com testes.
- [ ] Revisão legal/privacidade e autorizações de descoberta, em conjunto com [Issue #12](https://github.com/jukazilli/goudduo/issues/12), antes de produção.
- [ ] QA de performance, assets WebP reais, segurança de duplas, notificações, perfil compartilhado e permissões.

**Governança final:** V0.2 **homologado visualmente com ressalvas**; V0.3 **contém as correções documentadas e commitadas como referência**, mas ainda exige testes reais e reconciliação do Design System global. Manter PR #22 Draft sem merge na main, salvo autorização explícita de integração.
