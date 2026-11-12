# QA de fidelidade — plano P2-B e evidência P2-A

Este documento separa investigação executada de testes futuros. Nenhuma versão React de Home V5.3/Rotinas V7.4 foi implementada/testada nesta P2-A. P1-R1 homologada é fundação, não screenshot dessas superfícies.

## Evidência efetivamente produzida na P2-A

- Git/REST: snapshots/mains/PRs/branches/blobs, ancestralidade, integridade dos nove documentos P0 e igualdade do conteúdo homologado P1-R1 com o merge. Busca histórica Home e Drive com limites registrados no [índice](REFERENCIAS-E-SNAPSHOTS.md).
- V7.4: bytes originais extraídos do commit homologado e servidos somente no loopback; Chromium do ambiente com touch em **320/375/390/414/430 ×844**. Nenhuma edição do HTML ou backend. `pageerror` vazio nos cinco cenários e documento sem overflow horizontal.
- Sequências investigadas: expandir secundária direita sem ir para topo, recolher/restaurar ordem; dia livre domingo; salvar0 bloqueado; Biblioteca ratio0,75 do viewport interno do protótipo; sugestões/busca; incluir/check/feedback/duplo evento sem duplicar; Escape após busca; 1→confirmação→Continuar/Salvar assim mesmo→nome contextual→retorno; excluir/reincluir e 2→nome sem confirmação.
- **Resultado: quatro sequências completas aprovadas; sequência390 parcial com falha na segunda tentativa de Escape após reinclusão.** Passos anteriores de salvar/nomear/retornar nesse viewport passaram. Não reportar “5/5 tudo aprovado”. O handler de teclado/foco da referência não substitui o motor acessível P1; reproduzir regressão no teste integrado antes de qualquer correção futura.
- Capturas exploratórias e capturas estáveis de lista/Biblioteca foram mantidas **fora da PR**, com hashes de referência abaixo. Estáveis aguardaram fontes e 450ms após entrada; não são comparação React ou certificação pixel-perfect.
- Origem privada PR154: execução em worktree isolado de 08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38, viewport390, abertura de Rotinas pelo HomeShell; screenshot privada, zero pageerrors no cenário. Não prova versão V7.4 nem homologação do layout antigo. Hash screenshot: `4f866d0a15b343c15b7ca3aa642430f7cc6c0bbf5ced77298d7bd7136104e824`.
- Fundação pública: `pnpm typecheck` e `pnpm test` reexecutados, **20 testes/4 arquivos passaram**, sem alterar código. Suíte P1-R1 de35E2E/builds/bundle é evidência histórica da entrega homologada; não foi renomeada como novo teste V5.3/V7.4. CI documental poderá reexecutar checks existentes, mas não comprova paridade dessas telas.
- Revisão de16 arquivos candidatos: bytes/blobs/imports e padrões GitHub/AWS/PEM; zero matches nesses padrões. Direitos de mídia, licença geral privada e ausência completa de dados pessoais **não** certificados.

Não executados: navegador da Home V5.3 exata (ausente), comparação lado a lado com React dessas superfícies (não implementadas), QA físico Safari/iPhone/Android, leitor de tela real, backend, testes de novo código, merge ou deploy/recursos Cloudflare. Scripts/logs brutos ficam em `/workspace/scratch/p2a`, não fazem parte da PR pública e não são requisito de execução do produto.

## Protocolo de comparação visual futuro

1. Identificar commit+blob/hash da referência, estado/fixture e versão do navegador. Para Home, bloquear pixel parity até G01; nenhuma captura antiga V3.5/V5.1/V5.2 substitui V5.3.
2. Usar larguras **320,375,390,414,430**, mesma altura844 e registrar também altura útil/teclado, DPR/zoom100%, font readiness, tema e scroll. No físico registrar modelo/iOS/Safari e modo browser/PWA. O HTML V7.4 móvel reserva 49px para controles técnicos e usa phone=100dvh−49px: equalizar a altura útil da região comparada e registrar esse delta, sem tratar a bancada como produto. Confirmar também a fonte efetivamente carregada, não apenas font-family computada.
3. Capturar entrada normal, vazio, um/muitos itens, expanded esquerdo/direito, Editor0/1/2/6, Biblioteca vazia/busca/adicionado/rolada/teclado, confirmação/nome/erro/cancelamento e retorno. Aguardar motion concluir sem congelar estado intermediário; capturas reduced-motion são cenário próprio.
4. Comparar lado a lado e, quando apropriado, diff por regiões: chrome compartilhado, corpo, overlay. **Registrar deltas autorizados**: marca goudduo, Lucide reais, TabBar P1 sem legendas e insets reais versus moldura/Nav de referência. Não exigir copiar defeito/artefato do HTML nem excluir regiões arbitrárias para esconder divergência.
5. Medir retângulos/raios/gaps/tipografia do corpo no artefato real, distinguir valor CSS de dimensão renderizada. Gap V7.4 tem regra estreita; altura75% é relativa à região modal definida, não automaticamente 75% do restante do Editor depois do footer.
6. Não estabelecer tolerância universal de pixel que ignore antialiasing/fonte ou mudanças geométricas. Proposta de tolerância por região e diferenças perceptíveis será homologada pelo proprietário. Toda diferença não autorizada fica aberta no registro, com causa/reprodução/impacto/decisão.
7. Entregar capturas de ambas as versões, vídeo curto de interação relevante, resultado automatizado e revisão humana de fidelidade. Build/typecheck não substituem comparação visual.

## Casos e gates de aceite

| ID | Cenário futuro | Automação proposta | Avaliação humana / aceite |
|---|---|---|---|
| H-01 | Bento/Ranking/Status/Treino do Dia conforme referência atual, charcoal sem imagem fixa | Screenshot regional/retângulos nas5larguras; paleta local | Hierarquia/ritmo/aproximações aprovadas; referência G01 disponível ou recorte visual homologado |
| H-02 | Pulse Treinos squircle e Publicações circular | Shape/IDs/sem cross-CSS, swipe/foco/retorno | Placement/miniaturas/estados e direitos aprovados; sem toggle inventado |
| H-03 | Home ativa→topo; tabs independentes; Home inferior selecionada | Scroll por contexto/back/forward/reload, body isolado | Toque/rolagem naturais; sem dashboard em Business |
| H-04 | Peso/Medidas/Consistência/Recordes pendentes | Ausência de valores/CRUD/gráficos não autorizados | Tratamento G03 aprovado e composição sem buracos |
| R-01 | Principal + secundárias, expandir direita e órfão full-width | IDs/ordem/boundingboxes, abrir/fechar/repetição, scroll pós-layout | Sem salto ao topo, overlap, lacuna ou movimento exagerado |
| R-02 | Semana por rotina/dia/preview | Mon–Sun, retorno após editar/salvar, seleção de outra rotina | Diferenciar dia sem treino, vazio e rotina sem exercício válido |
| R-03 | Reordenação explícita/rollback | Botões/drag, principal fixo, confirmar/cancelar | Touch/teclado equivalentes; reflow não grava preferência |
| E-01 | Editor0/1/2/6, cabeçalho/card/footer | Elementos/ordem/foco/back/aria; check bloqueado0 | Largura/legibilidade/teclado; sem pesquisa acima do card |
| E-02 | Séries/carga/reps min-max/descanso/equipamento | Parse inválido/vazio/limites/unidades/round-trip | Unidade/teclado corretos; tempo/distância/substitutos válidos não perdidos |
| L-01 | Sheet75%, pesquisa/sugestões, resultados internos | Altura/scroll/foco/busca; 3–4 quando couber | iPhone com teclado/altura dinâmica/safe area, sem X extra |
| L-02 | +→check/Adicionado, duplo toque, query/scroll preservados | ID canônico/draft e guardas, feedback sem rerender destrutivo | Ritmo/feedback discreto; sem fechar popup ao incluir |
| L-03 | Remover→reabrir→reincluir, aliases/homônimos | Sem duplicação lógica, índices/IDs estáveis | Exercício correto e parâmetros preservados |
| L-04 | Independente versus contextual | Rotas e consumidores distintos, mesmo catálogo permitido | Ficha/criação não desaparecem por troca do fluxo de incluir |
| S-01 | Salvar0/1/>=2 | Zero vetado,1confirma,Continuar preserva draft,2nome direto | Copies/ações canônicas sem falsa gravação |
| S-02 | Nome final conforme dia, vazio, Enter/cancelar | Validação/commit único/retorno dia, limite decidido | Não pedir nome antecipado, não descartar edição sem regra |
| S-03 | Rascunho obsoleto/erro/cancelar/navegar | Revision/idempotência, dirtydraft sem commit implícito | Recuperação honesta, sem sucesso de backend inexistente |
| D-01 | Home e Rotinas leem treino salvo da mesma fonte | Selector por ID e ocorrência; atualização simultânea | Dados coerentes entre superfícies |
| D-02 | Rotina/principal/capa/modalidade/ordem | Migração fixtures sintéticas e campos autorizados | Não apagar escolha válida por novo preset |
| D-03 | Draft versus committed; catálogo/equipamento | Imutabilidade, zero/duplicados, IDs inválidos, reset Lab | Nenhuma saúde real/senha/foto em storage |
| D-04 | Copiar treino para dia/outro dia | NovoID versus referência conforme decisão | Edição não altera outro dia por surpresa |
| N-01 | Caminho Home→Rotinas→Editor→Biblioteca→Salvar→retorno | History/URL/parent/draft/routine/day e scroll | Back/gesto retorna ao contexto correto |
| N-02 | Direto/reload/ID ausente/overlays | Parser e fallback sem sessão/capability fake | Nenhuma navegação impossível exige “convidado” inventado |
| C-01 | Header/TabBar/CTA/safe areas | Cinco ícones/classes/ordem, Map central,50+inset, alvo44, um chrome | Centro/peso/contraste e ausência de clipping em320; escolher deltas G05 |
| O-01 | Entrada/saída/modo normal/reduce | DOM retido na saída/timers/trap/inert/scroll | Ritmo visual sincronizado e sem fantasma |
| O-02 | Escape/back/backdrop/gesto após 1/2adições | Reproduzir sequência390 da referência e variantes | Não depender de foco em elemento desabilitado; QA físico |
| O-03 | Confirmação→nome/equipamento→retorno | Um host/política de replace/back, foco e params | Sem fechar draft inteiro por fechamento de popup |
| O-04 | Scroll/teclado/insets do overlay | Scroller e alvo preservados, chamadas touch | iOS real/VoiceOver/Android; sem zoom involuntário |
| P-01 | CSS Treinos não muda Feed/Business | Snapshot de estilos/componentes/duas tabs antes/depois | Baseline autorizada de Feed, não placeholder |
| P-02 | Pulse circular/Feed/scroll | Estados/shape/posição/retorno | Sem squircle global ou imagem diferente |
| P-03 | Fixtures e autoria | Zero posts extras de QA em app comum | Mesmo conteúdo/destino social esperado |
| P-04 | Perfil visitado/unknown | Identidade por ID; missing→indisponível | Nunca cair no próprio perfil por nome não localizado |
| P-05 | Social/usuário/Business e overlays | Ações de treino preservam likes/saves/follows; capability restrita | Sem habilitação profissional por alternância visual |
| B-01 | Artefato público/privado e Lab | Allowlist/imports/licenças/secrets/maps/SW/roots e hashes | Aprovar arquivos e mídia específicos; Lab separado |
| B-02 | Reprodutibilidade e prévia autorizada | Frozen install/typecheck/tests/build/bundle/SHA/dirty, deep-link HTTPS | Preview por commit após autorização; sem produção silenciosa |

Testes funcionais e visuais podem usar Playwright/Vitest já existentes; vídeos, iPhone real e julgamento de composição exigem avaliação manual do proprietário. Não instalar ferramenta nova sem lacuna demonstrada.

## Registro de diferenças para cada PR futura

ID do componente/caso; referência (commit/blob/hash); React (commit/PR); viewport/estado/scroll; captura/vídeo de ambos; diferença observada e severidade; causa provável; aprovação/delta permitido; responsável/gate; reteste. Bloqueios de fonte, código privado ou mídia devem permanecer visíveis, não substituídos por capturas inventadas.

## Metadados das capturas estáveis de investigação

Origem única: V-ROT no commit homologado, viewport altura844, Chromium touch, fontes prontas e 450ms de estabilização. Arquivos ficam fora da PR, em `/workspace/scratch/p2a/v74-evidence/`. Hash não implica homologação de screenshot ou comparação React.

| Largura | Lista — SHA256 | Biblioteca — SHA256 | Gap renderizado | Hero/secundária | Sheet/phone |
|---|---|---|---|---|---|
| 320 | 7aa0088813190d4efbf9cabcd9ebe0b5a35ea248e36c23e600570db024a22281 | ce5ab59cc15e173f1dc245af170a7e99ab91276c24ed85d52bfee6b041a336f9 | 8px | 192/171px | 0.75 |
| 375 | d1c077b76748d29e2cccfabd14b749c2003254d724654be8f99de19b0701ebe8 | c9215a730c10638555427761366edeaf2e86a4e709dc96ebdce728fc1d1bb1ff | 11px | 192/171px | 0.75 |
| 390 | 621e86dba610836ef465a726e3d5a985ce18ac10083e49adc4152cd51230d300 | 239f299ac106536feaaac1c8147f5558b4a0b84f6db2ac11fdf690267665c15e | 11px | 192/171px | 0.75 |
| 414 | 71a76b33c939f2cd35d59088dc531448a47ede9f241c2b76d66bef25b8a846f8 | 13f21bff9f5d40f3118ea515d0be62efae6a0ccdc5dc44177e62cb199b364e82 | 11px | 192/171px | 0.75 |
| 430 | 6d76b171014425912bab100430d1e776223bb67e30b1d079401d22486e4259c4 | 0609387f00decb315168b7dbcfb08ee46973a8deb881f7da4373ba63ea400039 | 11px | 192/171px | 0.75 |
