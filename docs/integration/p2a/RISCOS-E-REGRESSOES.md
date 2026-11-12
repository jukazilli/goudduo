# Riscos, fronteiras e extensões mínimas propostas

Nenhuma correção é executada na P2-A. P1-R1 está homologada; propostas abaixo são necessidades concretas de integração, não autorização para redesenhar o Shell.

## Problema → evidência → impacto → solução mínima → testes

| ID | Problema / evidência atual | Impacto | Solução mínima PROPOSTA para P2-B | Teste/gate |
|---|---|---|---|---|
| R01 | HTML Home V5.3 ausente; medidas flexíveis em abfd989 | “Pixel perfeito” inventado, restauração V5.1 | Recuperar referência ou autorizar recorte visual homologável por contrato; não medir PNG antigo como final | G01; H-01, revisão humana |
| R02 | Peso estrutural citado, detalhes #159 pendentes | Reordenar Bento ou implantar saúde falsa | Gate G03: adiar recorte dependente ou aprovar slot neutro sem número/coleta; sem fabricar UI definitiva | H-04; sem storage sensível |
| R03 | P1 Routine só id/name/days; sem ordem/capa/modalidade; Exercise só id/name | Perder capacidade histórica ou criar stores paralelos | Estender entidades normalizadas com campos autorizados e UI-state por rotina/dia; catálogos separados; manter provider | D-01/D-02; G06 |
| R04 | P1 não tem rascunho, catálogo completo/equipamentos; loadKg opcional/params numéricos | Modificações vazam antes de salvar, ID sem equipamento legítimo | Draft com origin/routine/day/sourceRevision/items e strings transitórias; validar/normalizar na confirmação; catálogo por ID | D-03; cancelamento/revisão obsoleta |
| R05 | `workout/commit` pode vincular mesmo workoutId a dois dias; teste P1 atualiza ambos | Cópia de dia editar outro dia sem intenção | Definir cópia→novo ID versus referência compartilhada; evitar mudar semântica existente silenciosamente | D-04, decisão G06 |
| R06 | Reducer veta zero/duplicados, mas não faz confirmação1/nome; nome máximo100 versus HTML60 | Salvar indevido ou UX divergente | Máquina draft→confirm-single→name→commit; aplicar limite da superfície decidido, não inferir backend | S-01/S-02/S-03 |
| R07 | Page editor só workoutId; routine não codifica dia; sem rota Biblioteca independente | Dia/origem perdidos em link direto ou library substituída | Contexto de retorno/draft por ID e dia; definir URL segura e fallback para ID ausente; rota independente separada | N-01/N-02; sem dados pessoais na URL |
| R08 | Panel P1 = search/create/activity; OverlayHost tem conteúdo neutro fixo e um papel dialog | Sem consumidor Biblioteca/equipamento/confirmação ou segundo motor concorrente | Extensão tipada de conteúdo/payload/apresentação (sheet75%, alertdialog, nome/equipamento); preservar lifecycle/foco/inert e um host; política explícita de replace/back/retorno entre etapas | O-01–O-04; sem bibliotecas extras |
| R09 | ShellHeader título16 técnico e ação contextual só textual; HTML composer17/list20 e ação Plus na lista; resolver não fornece estilo local de header | Contaminar todos os headers com typography de Rotinas, ou duplicar header | Propor identificador de superfície/tokens locais no header existente e variante tipada icon-only para `header.action` (Plus da lista), sem props genéricas excessivas; manter check no Editor | C-01; comparar shared chrome separado do corpo |
| R10 | Library HTML fecha250/260ms, DS300/310; Escape intermitente em390 | Corte/fantasma/foco fora | Motor P1 preservado, default DS; decidir exceção local se necessária, não copiar handler root/timer literal | O-01–O-04; G05 |
| R11 | Descanso HTML `inputmode=text`, legado HH:MM:SS; P1 restSeconds number | Unidade ambígua, parse errado, carga/rep inválida | Escolher representação legível/numérica; mapear para segundos, validação decimal/unidade/limites; não transportar máscara como número | E-02; G06 |
| R12 | Duplicidade HTML por nome; legado permite forceDuplicate | IDs distintos/aliases duplicam ou bloqueiam exercícios errados | ID canônico de catálogo; guardas no draft+commit; registro de mapeamento/migração | L-02/L-03 |
| R13 | Equipment domain importa foto; fixtures importam GIFs e autores | Vazamento transitivo no bundle público | Port granular A02 sem seed/foto; fixtures novas sintéticas; auditoria de imports/bytes reais | B-01; allowlist e direitos |
| R14 | Bibliotecas contextual e independente têm papéis distintos | Perder ficha/criação/equipamentos ou ampliar escopo indevido | Reusar dados/seleção por IDs, manter dois consumidores/destinos; não importar upload/moderação só para incluir exercício | L-04 e gate de escopo |
| R15 | HomeShell contém Feed/Pulse/Business/header/nav em arquivo único | Novo Bento redesenha Feed ou duplica chrome | Corpos locais em HomeCompositions; usar apenas um header/TabBar P1; CSS namespace e tokens locais | P-01–P-05 |
| R16 | #152 inclui posts extras e fallback de perfil ausente para próprio | QA vira conteúdo comum; perfil errado | Não portar #152 em massa. Futuro resolvedor own/visited por ID, unknown→indisponível, sem conteúdo QA | P-03/P-04; sem Feed na P2-A |
| R17 | Público inclui bundle; revisão de licença ainda pendente | Divulgação não autorizada mesmo com minificação | Autorizar cada recorte, dados/mídia; repetir guardas de bundle/maps e registrar provenance/lock/SHA | B-01/B-02 |

## Fronteiras de CSS e composição

Home Treinos `.home-training-v53`, Rotinas `.routines-v74` e Biblioteca contextual `.workout-library-v74`, ou namespaces equivalentes explicitamente revisados. Nenhum import de HomeShell/CSS completo. Paletas locais não escrevem em :root ou atributos de Publicações/Business. Não reutilizar class genérica `.card`, `button`, `header` ou reset universal para impor desenho novo aos componentes preservados.

P1-R1 removeu resets de controles/primitives, mas seus seletores de chrome (ex.: `.app-header`, `.wordmark`) ainda precisam ser tratados como namespace reservado, não como nome a reutilizar dentro de uma superfície. Se o futuro Feed tiver colisão, usar adaptação local revisada, não elevar especificidade global. Paridade do Feed não pode ser certificada enquanto ele não estiver integrado/autorizado.

Safe areas: header consome top; sem header, viewport/superfície conforme contrato. TabBar consome bottom; footer acima dela não soma inset; sem TabBar, footer/main consome uma única vez. Somente conteúdo rola; não adicionar altura fictícia da barra se ela já está fora do scroll. Biblioteca modal possui sua própria área útil/teclado, sem reaplicar notch arbitrário. Safari/visualViewport requer teste físico.

## Público social/Business protegidos

- Feed: mesmos cards, menus, mídia, likes/salvar/republicar/seguir, scroll, autor e retorno. Não usar prova de placeholder P1 para afirmar paridade futura.
- Pulse circular: shape/posição de Publicações não mudam pelo squircle de Treinos. Visto gelo e gradiente não visto seguem contrato, não cores defasadas do CSS.
- Usuário/social: mesmo provider/IDs, nenhuma concessão de Business/profissional por tab ou fixture. Atualizações de rotina não limpam liked/saved/followed.
- Overlays: fechar popup de treinamento não fecha ou reabre menu social por identidade errada. Desmontar somente conteúdo/instância própria, mantendo foco/scroll da origem.
- Baseline privada P1 preservada. Antes de futuro port Feed, recapturar versão exata autorizada sem posts QA e validar referência aplicável; sem redesenho para “harmonizar” Bento.

## O que não é problema estrutural a resolver agora

Ausência de servidor/auth/OTP/pagamentos/Match real, health widgets finalizados, descoberta da troca de exercício e viewer/composer não justifica biblioteca nova ou backend. State/context/header/TabBar/motion da fundação são aproveitáveis. Extensões R03–R09 são pequenas integrações de contrato, não recomeço da aplicação. Nenhuma foi aplicada nesta branch.
