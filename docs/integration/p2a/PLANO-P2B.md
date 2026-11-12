# Plano PROPOSTO P2-B — recortes revisáveis

P2-B aguarda autorização expressa. PRs abaixo são **propostas**, não PRs abertas nem tarefas iniciadas. Cada recorte parte da main homologada e registra SHA/allowlist/contrato/testes/pendências. Nada de merge em massa, cherry-pick ou PR gigante de toda a pilha.

## Gates de entrada

**G01 resolvido**: fonte Home V5.3 recuperada e auditada. Revisar G02–G07 do [resumo](README.md), ou liberar explicitamente só recortes independentes das pendências. Plano tecnicamente pronto para revisão; nenhuma autorização P2-B é inferida desta R1. Direitos de mídia são gate separado do código. Publicações/Business permanecem fora do redesign.

| PR proposta | Escopo fechado e componentes | Fonte/arquivos necessários | Contrato de dados/dependências | Testes e aceite | Risco / gate de revisão |
|---|---|---|---|---|---|
| B1 Domínio compartilhado | FD01, identidade/rotina/dia/prescrição/draft/catálogo | A01–A03/A08 autorizados ou implementação independente; src/state e domain futuros | Uma coleção por entidade; ordem/capa/weekday, revisões e semântica de cópia; sem dados reais/storage | D-01–D-04, tipo/build, import/bundle; nenhuma entidade divergente entre consumidores | R03–R06/R13; aprovar migração de dados e campos válidos, sem UI nova |
| B2 Chrome e adapters locais | HM01/HM02, RT04/RT06, FD02; extensão de header/overlay/retorno | P1-R1 ShellHeader/SurfaceIntegrations/OverlayHost/navigation existentes | Tamanho/conteúdo/role de overlay, draftId/origin/day, title/action por superfície (incluindo ação icon-only Plus), sem duplicar header; deps B1 | C-01/N-01/O-01–O-04, cinco viewports; chrome único e safe area sem soma | R07–R10; gate técnico: preservar lifecycle e não globalizar estilos |
| B3 Home Rotinas Bento | RT01–RT03: lista, expansão local, semana/preview, estados zero/uma/várias | V-ROT; A06/A08 só se autorizados; novos módulos de superfície e CSS local | Ordem persistida distinta de reflow; seleção de dia por rotina, principal; B1+B2 | R-01–R-03, visual lado a lado do corpo, teclado/scroll/órfão/rollback | Sem mídia privada, sem reset de capa; owner aprova recorte visual e viewport |
| B4 Editor / salvamento | RT04–RT06/RT09/RT11: params, draft, confirma1 e nome final | V-ROT, A04/A06/A07 autorizados; modelo B1 e chrome B2 | Zero não salva; uma confirma; >=2 nomeia; commit atômico, cancelar não altera; deps B3 para retorno | E-01/E-02/S-01–S-03, campos/teclado; carrossel/contador atuais, sem solução de descoberta nova | Sem catálogo completo por arrasto; usar fixture técnica Lab na revisão até Biblioteca; gate visual/funcional |
| B5 Biblioteca contextual | RT07/RT08/RT10: sheet75, busca/sugestões, check/feedback, equipamento | V-ROT, A01/A02/A05 após liberação; UI própria sobre host B2 | Mesmo draft B4/catálogo B1; IDs, query/scroll/foco, remover/reincluir; Biblioteca independente segue separada | L-01–L-04/O-01–O-04; duplo toque, fechamento, 3–4 resultados, teclado/reduce | Resolver CTA/motion G05; não copiar root Escape bug ou forceDuplicate |
| B6 Home Treinos V5.3 | HM04–HM08 corpo Bento/Status/card de ocorrência; sem Progresso novo | V-HOME-HTML (0731832) obrigatório + handoff/C54/G03, A06 só comportamento autorizado; P1 HomeCompositions | Seletores de B1, rotina/dia/workout partilhados; B3–B5 disponibilizam destinos reais de treino | H-01/H-03/H-04, comparação ao recorte homologado, sem imagem fixa/valorinventado; CSS protegido | Fonte visual recuperada: não reconstruir a partir de texto. Gate restante: G03 (Peso/vazios) e autorização do recorte; comparação só do conteúdo, Shell P1 preservado |
| B7 Pulse Treinos local | HM03, presença/squircle/estados/ordem/scroll horizontal | V-HOME-HTML/V-PULSE + comando R1; posição/gap/shape resolvidos, identidade/mídia/estados por gate | Dados vistos/não vistos por ID, sem alterar circular Feed; deps B6 e G02/direitos | H-02, toque/scroll/foco, 1:1, resize, retorno; viewer pendente honesto | Presença/posição/medidas verificadas; anéis/dados/destino e ocultação ainda separados; nenhum viewer por inferência |
| B8 Integração e QA | Home ↔ Rotinas ↔ Editor ↔ Biblioteca ↔ Salvar; HM02/FD03 | Commits aprovados B1–B7, guardas de bundle e baseline social autorizada | Um treino reconhecido nas superfícies, origem/scroll/draft, troca de tabs sem limpar social | N-01/N-02/D-01/P-01–P-05/B-01/B-02; Safari físico e visual comparativo | PR de correções somente, sem redesign extra/serviço novo; gate final do proprietário |

B2 é desdobramento técnico demonstrável: Header ainda não tem token local por superfície e Panel só admite três placeholders; Biblioteca/Editor precisam disso antes de integrar seu conteúdo sem duplicar chrome. Não é nova stack ou reformulação global. B4 pode ser avaliado no Lab com catálogo sintético antes de B5, mas não será descrito como jornada comum completa até B5.

## Entregáveis por PR

TypeScript versionado, proveniência/autorização dos recortes, contrato de fonte e critérios de aceite, typecheck/build/testes pertinentes, capturas da referência e React no mesmo viewport/dados/estado, diferenças explícitas e relatório de regressões. Para Home usar obrigatoriamente073183253fce5fcd0b3474c725e84ff67d3dfec5, matriz A–E e medições/capturas R1; para Rotinas manter3f8b2c7. Comparar conteúdo por regiões, Shell contra P1-R1. Não aceitar screenshot de outra versão como prova. PR Draft enquanto aguarda revisão; gates técnicos não equivalem a homologação visual.

Prévia futura: somente após autorização do artefato/audiência, build limpo com SHA/lock, allowlist e credenciais/permissões verificadas. Workers + Static Assets já preparado; não adicionar backend ou outro runtime. Não criar recursos/URL na P2-A. Cada recorte autorizado a publicar entrega URL HTTPS+commit+PR, sem ativar auto-deploy main por efeito colateral. Vercel permanece fallback dependente de autorização.

## Fora dos recortes

Home Publicações/Feed e Business novos, Perfil completo, Sessão/histórico operacionais, autenticação real, minutas legais em vigor, Match confirmado, pagamentos, verificação profissional, algoritmos Peso/Medidas/Consistência/Recordes, melhoria de descoberta de exercícios e permissões/capas de usuário reais. Preservar dados/contratos existentes; “fora do lote” não significa cancelado do produto.

Não remover features válidas para caber no modelo mínimo: identificar item e incluí-lo no adapter/escopo autorizado ou registrar bloqueio. Uma adaptação de campo legado exige teste de round-trip; nenhum arquivo inteiro aprovado por dependência implícita.

## Dependência Home ↔ Rotinas reafirmada pela R1

O hero do HTML mantém três exemplos e seu CTA leva à Rotinas mock; não portar array/rota literal. B1/B6/B8 devem usar seleção compartilhada routineId/day/workoutId/revision, título/contagem derivados e contexto de retorno. Treino salvo na V7.4 aparece na Home sem cópia paralela. Sessão operacional continua fora do recorte até autorização própria: nenhum teste pode afirmar treino iniciado só porque abriu a rota mock. Regras V7.4 e pendência de descoberta entre exercícios permanecem inalteradas.
