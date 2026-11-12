# Fontes congeladas e índice visual

Consulta P2-A e revisão **P2-A-R1, 12/11/2026 UTC**. Na R1, as duas mains continuam nos SHAs abaixo; PR #32 permanece Draft na mesma branch. Nova branch de referência Home foi buscada e conferida. Evidência Git local + REST GitHub. Links privados requerem acesso do proprietário. Conteúdo bruto/capturas de origem privada permanecem em `/workspace/scratch/p2a`, fora da PR pública.

## Preflight verificável

| Fonte | Estado conferido |
|---|---|
| GODUOIT main | c0936896240e525353b237d92dff31fe0211eb94, sem avanço desde P0/P1; checkout limpo |
| goudduo main | 0fbc3ed8b3e1c59245d2349ae14160a2a9c43086, merge normal P1-R1; PR #31 closed/merged, head 0eb0811a910ff10318268212bd8d7fd7b095081e |
| Conteúdo homologado P1-R1 | `git diff 0eb0811... 0fbc3ed...` vazio: integração não introduziu delta de arquivos |
| P0 documental | Nove arquivos em docs/reconciliation; diff com merge f04307eca83dbd8cc442f5f034e1665b3acb5c47 vazio |
| Branch P2-A | docs/p2a-fidelity-and-port-plan, criada diretamente de origin/main acima |
| Abertas relevantes | #140/#146/#148/#151/#152/#153/#154/#161 privadas abertas, nenhuma integrada; 54 branches privadas e 16 públicas consultadas no início, sem inferir aprovação por branch |

AGENTS/GEMINI e README da origem foram confrontados com o comando atual e documentação P0/P1. Stack/identidade/executor atuais prevalecem sobre rótulos legados; regras de fonte, SVG, safe area, privacidade e evidência continuam válidas. Skill mobile-safe-area já aplicável; nenhum offset fixo de notch proposto. Projects #6 não verificado/modificado.

## Referências canônicas e status

Estados são dimensões separadas: **HOMOLOGADO** (aprovação expressa), **IMPLEMENTADO** (código existe), **PROPOSTO**, **PENDENTE**, **SUBSTITUÍDO**. Um HTML implementado pode ser referência homologada sem integração React ou backend.

| ID | Fonte / commit / blob quando verificável | Estado e uso |
|---|---|---|
| V-HOME | [#54 comentário V5.3](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756524720), [handoff](https://github.com/jukazilli/GODUOIT/blob/abfd989fb1b3e87d617dfd93c0527554b2e283b2/docs/handoffs/home-treinos-v5.3-direcao-ui-ux-homologada.md); blob a420a60e80d9c1c8ecfb056f0077eeb5b39ec26d | HOMOLOGADO como direção; documento na PR #161, não na main; HTML recuperado na R1 conforme V-HOME-HTML |
| V-HOME-HTML | [arquivo recuperado](https://github.com/jukazilli/goudduo/blob/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html), [RawGitHack](https://rawcdn.githack.com/jukazilli/goudduo/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html); commit073183253fce5fcd0b3474c725e84ff67d3dfec5, blob8c698708dd79449472d6f5c7e536664939de4951 | Fonte de superfície indicada pelo proprietário; 74.195bytes; SHA2567cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f; title V5.3; [extração e evidências](HOME-V53-HTML-RECUPERADO.md); G01 resolvido, Shell experimental ignorado |
| V-HOME-AUDIT | [auditoria cromática](https://github.com/jukazilli/goudduo/blob/2eeffe9d2e9b12cbeb0c84fd1768a49d9f39786b/docs/design-system/HOME-V53-SOURCE-AUDIT.md); blob fade4c6c0404542c1e3c2241d60aeb6ad34614fd | Documento de investigação: registrava V5.1 recuperada na Library e V5.3 ausente naquele snapshot; lacuna superada por V-HOME-HTML; não é nova aprovação dimensional |
| V-ROT | [HTML V7.4](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html), [prévia rawcdn](https://rawcdn.githack.com/jukazilli/goudduo/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html) | HOMOLOGADO em [#28](https://github.com/jukazilli/goudduo/issues/28); blob 122275b3cb03bd996b477375d1bbc73ae29c5c3e, 81.601 bytes; SHA256 42ac581d3c76a3852da221ba68495025bbfa26f2d96aeda9c43ba0261a5a849d |
| V-ROT-HEAD | preview/rotinas-motion-v7 head 1a0409f8b7d971f7883ec8d78fd88c0854868005 | Diff desde 3f8b2c7 apenas adiciona docs/surfaces/ROTINAS-MOTION-V7.4-HOMOLOGADA.md; HTML idêntico. Não substitui automaticamente o commit de referência |
| V-SHELL | [#72](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6566854507), [remoção chevron](https://github.com/jukazilli/GODUOIT/issues/72#issuecomment-6756546648), P1-R1 em 0fbc3ed8b3e1c59245d2349ae14160a2a9c43086 | HOMOLOGADO; cinco destinos, ícones, safe areas, Home ativa e estado compartilhado protegidos |
| V-PULSE | [#73 visto gelo](https://github.com/jukazilli/GODUOIT/issues/73#issuecomment-6717419889), V-HOME, comando P2-A | Squircle local em Treinos; circular Publicações; forma não autoriza inventar viewer/composer/ocultação |
| V-PROGRESS | [#159 refinamento](https://github.com/jukazilli/GODUOIT/issues/159#issuecomment-6756662990), [#54 adendo](https://github.com/jukazilli/GODUOIT/issues/54#issuecomment-6756663557) | PENDENTE: Peso/Medidas/Consistência/Recordes e estados; aparecer em mock não conclui homologação |
| V-FEED | [#55](https://github.com/jukazilli/GODUOIT/issues/55) e baseline privada P1 em c093689 | Preservar experiência; versões históricas de PNG não são prova V5.3/V7.4 |
| V-BRAND | [SVG público](https://github.com/jukazilli/goudduo/blob/0fbc3ed8b3e1c59245d2349ae14160a2a9c43086/assets/brand/goudduo/goudduo-wordmark-black.svg), blob 04276a5ac2a927294f48e7fec2c2281754ad75c3 | Asset oficial já público; não redesenhar/substituir por tipografia |

## Histórico da busca inicial — resultado superado pela recuperação R1

Reconsultadas as branches remotas, histórico `git log --all`, nomes/objetos alcançáveis e HTMLs em ambas as origens. Inventários locais: 2.796 objetos/nome na origem privada e 582 no destino; 9 caminhos HTML históricos privados. Buscas por v5.3/v53/v5.1/charcoal/home-motion/bento encontraram o handoff, não seu HTML final. `git fsck --no-reflogs --unreachable` não revelou objeto local perdido relevante. Isso não cobre commits apagados que nunca chegaram a estes clones ou artefatos externos.

Drive: buscas restritas `goduoit-home-motion-v5`, `goduoit home v5.3`, `goduoit-home-motion-v5.1-homologada.html` retornaram zero resultados. Skill Google Drive usada somente para leitura; nenhuma alteração/compartilhamento. **Library de conversas ChatGPT não tem ferramenta de acesso disponível nesta sessão**. Na P2-A inicial não foi possível inspecionar uploads históricos externos nem localizar o HTML nas fontes acessíveis naquele momento. Não se afirma inexistência universal do HTML.

**R1:** proprietário forneceu a nova branch preview/home-treinos-v53-rawgithack e commit fixo acima. Git confirmou arquivo/blob; curl HTTP200 retornou os mesmos bytes. Chromium inicialmente recebeu External Content Notice; após Open the page, exibiu a V5.3 com cinco Pulses e zero pageerrors. Execução local dos bytes originais nas cinco larguras confirma geometria/comportamentos. Nenhuma inferência de indisponibilidade anterior continua como gate atual.

V3.5/PNG antigo, V5.1, V5.2 e Motion V2 são históricos/estudos nas propriedades substituídas. Não produzir imagem nova da Home e chamá-la de recuperação.

## PRs de código: snapshot de dependências

| PR | Base SHA | Head SHA | Uso nesta auditoria |
|---|---|---|---|
| [140](https://github.com/jukazilli/GODUOIT/pull/140) | c0936896240e525353b237d92dff31fe0211eb94 | d9b34db249f4a1ef1f9a1dc312f9af2103b71d69 | R0-01J, modelos/rotinas históricos |
| [146](https://github.com/jukazilli/GODUOIT/pull/146) | c0936896240e525353b237d92dff31fe0211eb94 | 3456074fa34d2efc79662c9ddc0137f9feba5cbd | Home ↔ Rotinas ↔ Sessão |
| [148](https://github.com/jukazilli/GODUOIT/pull/148) | f593e59433aaee9360a040294a22fb0858f37ac9 | b09820f5dc38ad0e43c49fdf560a15b477f3f7f2 | Sessão divergente; fora do port P2-B por padrão |
| [151](https://github.com/jukazilli/GODUOIT/pull/151) | c0936896240e525353b237d92dff31fe0211eb94 | 2b8890929bb8c04c2539965af5379869b82dd13b | Editor R4; inclui trabalho #146 |
| [153](https://github.com/jukazilli/GODUOIT/pull/153) | 2b8890929bb8c04c2539965af5379869b82dd13b | 0308e2c4f667e35497d254f24e78d18208272b96 | Header contextual R5; não V7.4 React |
| [154](https://github.com/jukazilli/GODUOIT/pull/154) | 0308e2c4f667e35497d254f24e78d18208272b96 | 08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38 | Header + delta mínimo de input iOS, escolhido como candidato de inspeção |
| [152](https://github.com/jukazilli/GODUOIT/pull/152) | c0936896240e525353b237d92dff31fe0211eb94 | 69833d2110671a5380a6b8b873c6712681bf57c1 | Perfil/Feed com deltas indesejados; não portar integralmente |
| [161](https://github.com/jukazilli/GODUOIT/pull/161) | c0936896240e525353b237d92dff31fe0211eb94 | abfd989fb1b3e87d617dfd93c0527554b2e283b2 | Direção Home documental |

Ancestralidade executada: #146 é ancestral de #151; #151 de #153 e #152; #153 de #154. Head atual #146 **não** é ancestral de #148. Não aplicar a pilha por merge/cherry-pick nem presumir que PR aberta foi integrada. #154 e main têm package/lock iguais no diff consultado. Nenhuma recomendação de port deriva apenas de ser o head mais novo.
