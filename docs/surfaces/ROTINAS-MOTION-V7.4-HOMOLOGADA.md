# goudduo — Rotinas / Motion V7.4 — direção UI/UX homologada

**Data de homologação:** 11/11/2026  
**Status:** homologado como **referência de protótipo**; implementação/integração e QA de produção pendentes.  
**Issue canônica da superfície:** [#28 — Rotinas: V7.4 homologada e investigação de navegação](https://github.com/jukazilli/goudduo/issues/28).

## Referência congelada e rastreável

- HTML aprovado: [`prototypes/rotinas/motion-v7-4/index.html`](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html).
- Commit de aprovação visual de referência (HTML da versão homologada): `3f8b2c7c93a33a713c780305e672e1ec7998ceaf`.
- [Abrir protótipo navegável](https://rawcdn.githack.com/jukazilli/goudduo/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html).
- Branch de laboratório: `preview/rotinas-motion-v7`; **não integrar na main automaticamente**.

## Contrato de UI/UX homologado

**Rotinas:** Bento com expansão ancorada na posição do card; rolagem acompanhando a expansão apenas conforme necessidade; rearranjo sem buracos; card isolado na última linha ocupa toda a largura; fechamento restaura a ordem original; header e TabBar existentes preservados.

**Editor:** cabeçalho com voltar, título do treino e check de salvar; edição dos parâmetros por exercício (séries, carga, repetições min./máx., descanso, equipamento). Não ressuscitar a caixa de pesquisa no topo do editor. Botão **Adicionar exercício** no rodapé acima da TabBar.

**Biblioteca:** bottom sheet ~3/4 da altura útil com busca e sugestões iniciais; idealmente 3–4 resultados sem scroll; botão `+`; pesquisa preservada ao adicionar; sheet segue aberta; fechamento por toque no backdrop ou gesto descendente; animação fluida e sem `X`.

**Proteção contra duplicidade:** ao incluir item, trocar `+` por check; feedback breve **Adicionado**; impedir segundo acréscimo do mesmo exercício. Um exercício anteriormente presente também aparece com check na Biblioteca e o estado deve ser reconciliado após exclusão.

**Salvamento:** 0 exercícios → check inativo; 1 exercício → diálogo curto para **Continuar editando** ou **Salvar assim mesmo**; 2+ → etapa final de nomeação; título solicitado **ao confirmar salvamento**, com copy dinâmica por dia (segunda, terça etc.) e manutenção do nome já cadastrado ao editar. Nenhum dado é salvo antes da confirmação final.

## Pendência deliberadamente não implementada

**Descoberta da navegação entre exercícios para revisão de séries e parâmetros.** Na captura de validação do usuário, os controles de anterior/próximo e o contador ficam na região superior do editor, enquanto os campos de séries, carga, repetições, descanso e equipamento ocupam a área rolável. Quando a pessoa rola para os campos, pode não descobrir como navegar de um exercício ao outro.

**Próximo estudo:** testar a clareza de transição de exercícios e acesso às séries com iniciantes; comparar affordances discretas, indicadores contextuais ou navegação de fácil alcance sem impor tutorial permanente, cards ou textos de laboratório. Avaliar diferença entre navegação **entre exercícios** e eventual navegação **dentro das séries**; não presumir serem a mesma tarefa.

**Critérios da investigação:** conseguir revisar exercícios 1…N, voltar a um anterior, manter orientação durante rolagem, garantir alvos touch/VoiceOver, não conflitar com gestures, teclado, bottom sheet ou safe area; testar telas de 320/375/390/414 px, Safari/iOS, scroll e movimento reduzido. Qualquer solução requer proposta e homologação próprias.

## Decisão de governança

Aprovação visual de V7.4 não equivale a PR mergeado, feature pronta no app real nem a autorização para alterar funcionalidades adjacentes. Preservar esta referência como baseline e registrar mudanças futuras em versões novas; a pendência permanece aberta na [Issue #28](https://github.com/jukazilli/goudduo/issues/28).
