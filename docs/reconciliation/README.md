# goudduo — Pacote de Reconciliação P0

**Entrega documental para revisão — 12/11/2026 UTC.** Coordenação: [Issue #29](https://github.com/jukazilli/goudduo/issues/29). Estado: arquitetura/plano **PROPOSTOS**, aguardando Gate 1 do proprietário. **Não é aplicativo implementado, integração homologada, autorização de merge ou deploy.**

## Resultado executivo

A base React + TypeScript + Vite do GODUOIT é aproveitável. A main ainda é um Visual Lab: Rotinas, Sessão e Perfil React estão fora dela, em PRs encadeadas. A main do goudduo contém marca/documentação; os HTMLs aprovados estão em branches e servem como contratos de referência para port React modular, não como aplicativo a copiar.

Inventário: **47 superfícies/fundação** — 10 SUBSTITUIR, 3 PRESERVAR, 17 ADAPTAR e 17 PENDENTE. Auditoria: **27 PRs abertas** (17 GODUOIT, 10 goudduo), mais branch de referência Rotinas V7.4. Todas permanecem sem integração de seus heads nas mains congeladas.

**Recomendação:** consolidação seletiva em goudduo após gate explícito de divulgação do código privado; shell único, navegação tipada, Context/useReducer para estado demonstrativo compartilhado, tokens por contexto, motion centralizado e Lab separado. Workers + Static Assets é a hospedagem principal proposta, sem lógica server-side; Pages é alternativa Cloudflare e Vercel só mediante autorização.

## Documentos para revisão

1. [Inventário de superfícies](INVENTARIO-SUPERFICIES-P0.md) — existência de código, estados técnicos e classificação principal.
2. [Matriz GODUOIT × goudduo](MATRIZ-RECONCILIACAO-P0.md) — reuso, delta autorizado, preservação, lacunas e aceite por ID.
3. [Mapa das jornadas](MAPA-JORNADAS-P0.md) — origem/destino, dados, retorno, erros e condições das jornadas A–F.
4. [Auditoria de PRs](AUDITORIA-PRS-P0.md) — SHAs/base/head/arquivos, ancestralidade, hotspots e estratégia por PR.
5. [Arquitetura e lotes futuros](ARQUITETURA-E-PLANO-INTEGRACAO-P0.md) — proposta React/TS, estado, shell, fronteira de repositório e plano executável.
6. [Estratégia de previews Cloudflare](ESTRATEGIA-PREVIEWS-CLOUDFLARE-P0.md) — Workers versus Pages, acesso, limites, fluxo e fallback Vercel.
7. [Matriz QA e regressões](MATRIZ-QA-E-REGRESSOES-P0.md) — cobertura, automação/manual e gates de evidência.
8. [Fontes e decisões](FONTES-E-DECISOES-P0.md) — governança, comentários determinantes, snapshots/branches, hashes de assets e limitações.

## Fontes congeladas

| Origem | Main congelada |
|---|---|
| [GODUOIT privado](https://github.com/jukazilli/GODUOIT) | `c0936896240e525353b237d92dff31fe0211eb94` |
| [goudduo público](https://github.com/jukazilli/goudduo) | `5fa1b70f6b860ee26e4c7fde222042a1da104099` |
| [Rotinas V7.4 homologada](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html) | `3f8b2c7c93a33a713c780305e672e1ec7998ceaf` (HTML; branch head diferente não muda a aprovação) |

Links privados exigem acesso ao GODUOIT. Apenas metadados/documentação da investigação solicitada estão nesta PR pública; nenhum código/asset privado foi transportado.

## Principais conflitos — problema, evidência, impacto e recomendação

| ID | Problema → evidência | Impacto | Alternativas | Recomendação |
|---|---|---|---|---|
| C01 | Marca/stack legadas: README/AGENTS GODUOIT dizem goduoit e stack não homologada; handoff atual determina goudduo e React/TS/Vite | Reintroduzir identidade/executor antigos | Seguir legado ou aplicar substituições expressas atuais | Aplicar goudduo/stack obrigatória e preservar regras técnicas ainda válidas; não reescrever README legado na P0 |
| C02 | Cadastro antigo cinco campos/Google versus N#9 quatro campos sem OAuth | Coleta excessiva e fluxo divergente | Copiar formulário antigo ou port seletivo | Quatro campos, nome opcional posterior; manter 18+/handle/consentimento |
| C03 | Splash V3 aprovada usa frase substituída; V4 ainda em avaliação em N#1/#5 | Publicar copy revogada ou homologar V4 por inferência | Aprovar V4; apresentar outra reconciliação autorizada | Manter bloqueio da aplicação final de copy até decisão específica |
| C04 | DS N#2 v0.1/v0.3 propostos; azul local aprovado nas telas posteriores | Globalizar token candidato e alterar Feed | Tema único imediato ou tokens por contexto | Preservar aprovação local e pedir baseline global antes de propagar |
| C05 | Home V5.3 é direção aprovada, HTML exato não localizado; widgets N/A em G#159 | Inventar precisão visual ou widgets completos | Recuperar referência; homologar recorte fiel ao contrato | Recuperar referência quando possível e validar detalhes faltantes; Progresso permanece pendente |
| C06 | Main posiciona Pulse só em Publicações; V5.3 descreve squircle local em Treinos | Propagar forma/placement a superfícies protegidas | Confirmar presença/placement local ou manter fora até gate | Decidir placement antes de construir; Publicações circular preservada |
| C07 | G#146→#151→#152; #153→#154 paralela; #148 diverge | Duplicar/omitir correções e estado de sessão | Integração cega da pilha ou portar deltas por contrato | Port seletivo com mapa de dependências; nenhum merge/cherry-pick na P0 |
| C08 | Home e Rotinas têm coleções próprias; G#152 acrescenta posts de teste e lookup de perfil ausente cai no próprio perfil | Treino salvo não reconhecido e regressão de Feed | Preservar stores locais ou store demo única | Store compartilhada e baseline Feed sem posts extras |
| C09 | Perfil N#20/comentários antigos chamam R2 proposta; N#26 e doc G4 de 11/11 registram aprovação | Usar status antigo ou ampliar homologação além da UI | Ignorar histórico ou distinguir escopo/data da aprovação expressa | R2 visual aprovada no escopo descrito; backend/QA/capabilities seguem pendentes |
| C10 | Minutas N#15 aprovadas editorialmente, leitor N#18 visualmente; não vigentes | Simular conformidade ou cadastro real | Demo identificada versus serviço real após gate legal | Demo sem criação de conta/envio; documentos acessíveis no Cadastro antes de qualquer aceite real |
| C11 | GODUOIT privado → goudduo público; build atual gera sourcemaps e copia public/Gooduu/SW | Divulgar código/estudos/assets sem autorização | Port público allowlist ou integração temporária privada | Aprovar fronteira e auditar dependências/artefato antes de mover/publicar |
| C12 | Antiga investigação exige refinamento Home antes MVP; #29 pede P0 documental e futura ordem de lotes | Tratar bloqueio de MVP como impedimento de investigar ou como autorização de construir | Seguir etapas antigas literalmente ou aplicar escopo atual | Executar P0 já autorizada; manter gates de widgets e propor lotes sem antecipar construção |

## O que pode avançar e o que permanece bloqueado

**Pronto para planejar implementação após Gate 1:** modelos de domínio/componentes existentes, preservação de Publicações, referências de Login/Cadastro/OTP/leitor, três cenas opcionais, Rotinas/Editor/Biblioteca contextual V7.4 e Perfil R2. Cada recorte ainda exige integração React, assets permitidos e QA; não existe uma branch pronta para copiar tudo.

**Bloqueado ou parcial:** Splash com copy atual, detalhe/asset exato de Home V5.3 e widgets Progresso; viewer/composer Pulse; Sessão/histórico com branches divergentes e homologação final; funcionalidades completas de Match/Mensagens/Business/Duplas; autenticação/OTP reais, verificação profissional e pagamentos. Minutas legais não autorizam operação real.

## Decisões para o proprietário no Gate 1

| ID | Decisão necessária | Recomendação / efeito |
|---|---|---|
| D01 | Destino técnico e divulgação seletiva do código/artefatos privados | goudduo após autorização de allowlist; se não autorizado, branch privada GODUOIT temporária |
| D02 | Arquitetura e plano de estado/navegação/Lab | Aprovar shell único + store demo em memória + retorno tipado; sem backend/biblioteca adicional por padrão |
| D03 | Baseline de tokens por contexto | Aprovar mapa de valores locais sem generalizar v0.3; preservar Feed e não refazer Figma nesta missão |
| D04 | Home/Splash: referência faltante, placement Pulse e widgets | Homologar recortes específicos antes de implementação visual; não dar todos por resolvidos pela P0 |
| D05 | Saída Pular/Explorar e limite funcional de Entrada/Convidado | Proposta: Home Treinos ao concluir/pular; nenhuma permissão de convidado sem contrato próprio |
| D06 | Estratégia Cloudflare e audiência das previews | Workers + Static Assets/Worker Previews; validar escrita/GitHub App/plano e proteção antes de criar projeto |
| D07 | Proveniência e produção de assets reais | Aprovar arquivos/mídias por lote, especialmente Onboarding/Perfil/hero; sem redistribuir Drive/GIFs automaticamente |
| D08 | Ordem e recorte inicial de implementação | Manter 1 Fundação → 2 Treinos/Rotinas → 3 Acesso/Onboarding → 4 Social/Perfil → 5 demais, com gates por superfície |
| D09 | Critério de QA físico e homologação | Aceitar plano de cinco larguras + Safari iPhone/Chrome Android, evidências e regressão Feed; registrar aparelho e pendências |

Essas recomendações **não requerem resposta para concluir a P0 documental já autorizada**. São decisões para a etapa posterior. Aceitar este pacote não autoriza todos os lotes, migração pública, merge, configuração Cloudflare ou deployment.

## Validação da entrega e limitações

Executado: consulta Git/REST, existência de referências/blobs e SHA-256, ancestralidade/overlap, leituras de governança e inspeção de código; checagens de IDs/classificações, links relativos e caminhos por commit, tabelas e diff apenas documental. Scripts de auditoria e respostas brutas ficaram fora da PR. Resultado documental: 9 arquivos, 47 IDs × 3 tabelas (141 linhas), 94 classificações conferidas, 26 links relativos, 20 links de arquivos por commit, 346 referências de Issues/PRs e 19 de comentários conferidos contra Git/coleta, 28 tabelas sem divergência de colunas; zero erros nessa validação. Quatro URLs oficiais complementares responderam HTTP 200. SVGs oficiais parseados: viewBox 0 0 214 62, sem scripts ou raster; nenhuma inspeção visual foi inferida. As duas mains remotas foram reconsultadas e permaneceram nos SHAs congelados. A validação final do diff é registrada no corpo da PR.

Não executado: instalação/build/typecheck/testes de aplicação, browser/screenshots/paridade visual, QA de Safari/Android físico, backend, merge ou deploy. Relatos antigos de testes foram tratados como relatos, não reexecutados. Projects #6 está sem permissão de leitura; Figma/Drive/Library não foram reinspecionados. Cloudflare tem leitura confirmada, escrita/integração Git e plano ainda não verificados.

**Encerramento da missão:** somente branch documental + PR Draft referenciando #29 sem fechamento automático. Revisão e homologação pertencem ao proprietário; a construção aguarda autorização posterior.
