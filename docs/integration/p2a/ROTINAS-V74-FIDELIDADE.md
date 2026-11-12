# Rotinas Motion V7.4 — fidelidade visual e comportamental

Contrato: [#28](https://github.com/jukazilli/goudduo/issues/28), HTML [V-ROT](REFERENCIAS-E-SNAPSHOTS.md), commit **3f8b2c7c93a33a713c780305e672e1ec7998ceaf**. HOMOLOGADO como UX/UI; IMPLEMENTADO em HTML de referência, **não integrado em React**. A execução local não transforma serviços demonstrativos em backend.

## Rotinas e widgets

Principal full-width acima das secundárias em Bento; expandir uma secundária não a move para o começo. O HTML troca localmente a secundária da direita com a vizinha da esquerda, preserva principal e restaura a ordem ao recolher. Órfão real ocupa largura inteira conforme quantidade de cards de meia largura. Alinhamento de scroll calcula geometria após layout/expansão, não antes de scrollHeight estabilizar; evita clamp que deixa título fora de vista. Não transpor todo algoritmo imperativo/DOM para React.

Dias Segunda–Domingo por rotina, contexto de dia preservado ao salvar/voltar, semana e preview de treino no card expandido. Reordenação **intencional de rotinas** é distinta do reflow temporário ao expandir: permite mover secundárias, principal permanece fixo; cancelar restaura ordem anterior, confirmar mantém a nova. Incluir acesso por teclado, sem depender só de drag.

Criação/edição de rotina, capa, principal, duplicar/excluir/mover treino têm código legado/HTML; nenhuma dessas ações deve adquirir efeitos de compartilhamento, upload ou reajuste real inexistentes. Preservar capacidades válidas por recorte e contratos, sem expandir P2-B para infraestrutura.

## Editor e Biblioteca

Header: chevron esquerdo, nome contextual central e check à direita; inativo com zero exercícios. Campos por instância: séries, carga, repetição mínima/máxima, descanso e equipamento ligado ao catálogo. Card ocupa largura disponível; navegação anterior/próximo/contador/gesto atual preservada. CTA Adicionar exercício fixo acima da TabBar, sem pesquisa no topo do Editor. Nomeação só na etapa final.

Biblioteca contextual: sheet ~75% útil com busca/sugestões no próprio popup, 3–4 sugestões visíveis quando houver altura. Resultados roláveis, pesquisa/foco/scroll preservados ao adicionar; + passa a check e bloqueia repetição por lógica; feedback Adicionado transitório (~1.350ms observado). A remoção no rascunho deve permitir reinclusão ao reabrir. Não confundir com Biblioteca independente de catálogo/detalhe/equipamentos/criação.

Fechar por toque fora/gesto descendente/Escape/back conforme componente integrado; sem X adicionado à Biblioteca. Entrada/saída/foco/teclado/insets usam fundação com extensão de conteúdo/tamanho, não segundo overlay concorrente. Troca entre confirmação e nome deve preservar o rascunho sem instância fantasma.

## Salvamento e estado compartilhado

1. Zero: bloquear; não criar exercício livre automaticamente.
2. Um: confirmar **Salvar assim mesmo / Continuar editando**. Continuar retorna ao mesmo rascunho.
3. Dois ou mais: ir à nomeação sem confirmação intermediária.
4. Nome final conforme dia, vazio inválido; cancelar não comita.
5. Confirmar: um commit atômico por workoutId/routineId/weekday/revision; retornar à rotina/dia expandido e Home derivar a mesma entidade.

O HTML usa arrays/strings/nome para deduplicar, `Date.now()` para IDs e estado privado da closure. Na aplicação: IDs de catálogo/instância estáveis, sem colisões por acento/case/alias, entidades normalizadas e validação do reducer. A unicidade por nome do HTML é referência de comportamento anti-duplicação, não identidade de domínio suficiente.

P1 `workout/commit` já rejeita zero/duplicados/revisão obsoleta e clona valores. **Não** contém rascunhos, confirmação, fluxo de nomeação, CRUD/ordem de rotinas, catálogo/equipamento completos ou persistência. Confirmar 1 exercício é gate de UI/draft; não um booleano fake que autoriza salvar dados incompletos.

## Legado reutilizável versus substituído

| Fonte | Aproveitável | Delta obrigatório |
|---|---|---|
| #140/#146 | Modelos semana/rotina/prescrição, navegação/retorno e seleção Home | Substituir stores locais concorrentes pela store P1; não portar HomeShell todo |
| #151/#153/#154 RoutinesSurface | Catálogo/equipamento/substitutos, parsing de reps, campos, menus/ordenação e casos de teste | Retirar busca no topo, duplicação forçada e fallback “Exercício livre” ao salvar vazio; usar fluxo V7.4 |
| domain/equipment | Tipos/filtro/seleção | Separar fotografia importada/fixtures; IDs em vez de strings soltas |
| VolumeFieldsGroup | Referência de campos por modalidade | Confirmar compatibilidade com reps min/max e descanso numérico; não descartar tempo/distância existentes |
| #148 Sessão | Contratos e dependência futura | Não integrar por arrasto; branch diverge de #146 atual e Sessão não é implementação deste lote |
| Biblioteca independente main | Busca/ficha/equipamentos existentes | Não substituí-la pela sheet de sugestões do Editor nem importar upload/moderação fora de escopo |

## Dimensões observadas, com precedência

No CSS V7.4: grade com gap11px (8px em <=350px), hero192px, secundárias171px, expanded card124px, raio18px e detalhe17px; header com alvo44px e título20px (composer17px); campos de busca48px e fonte16px; Biblioteca75%. São medidas **observadas no artefato** com wrapper próprio, não novas escalas globais nem garantia da altura útil do Safari. Header/tabbar compartilhados devem respeitar a fundação homologada; ajustes locais de tipografia/composição exigem registro do delta.

A referência possui TabBar com legendas e altura/seleção diferentes, SVGs inline aproximados, moldura/cenários técnicos e desenhos ocultos por CSS. Esses elementos não substituem os cinco Lucide/50px+inset/sem legendas de P1-R1 nem entram no app comum. O CTA do HTML mistura + e texto; a regra transversal prefere texto OU ícone. Apresentar esse conflito ao proprietário, sem retirar um elemento homologado por inferência.

A Biblioteca HTML fecha com 250ms CSS/260ms timer; DS #25 orienta 300/310ms. Recomendação: lifecycle da fundação e revisão de ritmo; documentar exceção somente se aprovada, sem copiar o timer antigo. Descanso no HTML tem `inputmode=text` e sem validação numérica robusta: reproduzir a informação/fluxo, mas planejar validação de número/unidade e fonte >=16px, não a deficiência do protótipo.

## Investigação no navegador e limites

Executado Chromium com touch em 320/375/390/414/430, sem editar o HTML: reflow local/retorno da ordem, zero bloqueado, sheet75%, sugestões/busca, adicionar+check/feedback/duplicidade, 1→confirmar→nome de domingo→salvar/retornar, remoção/reinclusão e 2→nome. Quatro sequências completas passaram; em 390 a segunda tentativa de Escape após reinclusão deixou Biblioteca aberta; sequência anterior de confirmação/salvamento desse viewport passou. Zero pageerrors nos cinco cenários e zero overflow horizontal de documento. [QA com limites](QA-VISUAL-P2.md).

Falha potencial de referência: handler Escape é registrado no root e o foco pode escapar ao desabilitar a linha adicionada; não há trap equivalente ao motor P1. Causa provável, não diagnóstico definitivo de todas as sequências. P2-B deve usar o foco/trap da fundação e testar repetição, sem transportar esse bug como fidelidade obrigatória. Não se alterou a referência.

O legado PR154 também foi executado em worktree separado, viewport390, abrindo Rotinas pelo HomeShell; screenshot privada e ausência de pageerrors confirmadas. Não é V7.4 nem baseline de paridade visual final.

A melhoria de **descoberta de navegação entre exercícios** continua PENDENTE em #28. Não tornar setas sticky, criar dicas ou tutorial por inferência. Dados/modelos/overlays necessários estão nos riscos e plano; esta missão não os implementa.
