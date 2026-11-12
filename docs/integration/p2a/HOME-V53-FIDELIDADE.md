# Home Treinos V5.3 — contrato de fidelidade

Referências [V-HOME/V-HOME-AUDIT](REFERENCIAS-E-SNAPSHOTS.md). A direção é **HOMOLOGADA**. O React V5.3 é **não implementado** e seu HTML exato **não foi localizado**. Ausência de artefato não revoga a decisão nem autoriza inventar uma Home.

## Composição a reproduzir

Bento assimétrico: Ranking dominante/alto à esquerda, Status e Peso compactos empilhados à direita; Treino do Dia full-width em destaque; demais destinos válidos com superfícies suaves e hierarquia. A aprovação **substitui** escolhas conflitantes V3.5/V5.1: não exigir a antiga dupla de cards iguais Ranking/No ritmo, números de engajamento, card azul com fotografia/ilustração fixa ou Pulse circular em Treinos.

Ranking: azul pastel; `#E3F0FF` é referência aproximada local. Troféu/label/contexto por contrato, valores só de fonte verificável ou fixture demonstrativa explicitamente identificada. Não apresentar posição real inexistente.

**Status substitui No ritmo como entrada visual**, sem apagar histórico de frequência/streak. Verde pastel, exemplo `#EFF8E0`; resumo social curto só quando existir evento. “Ravi enviou um feedback” é exemplo de Lab, não feed real. Sem evento, tratar vazio honesto. Tocar leva ao estado Em construção relacionado a #160; não implementar lotação/check-in/geolocalização. Remover placeholders/números revogados e microcopy laboratorial.

Treino do Dia: gradiente contextual charcoal exemplificado por `#20262D → #30363C → #1C2228`, CTA branco, título/metadados da ocorrência selecionada. **Sem imagem fixa** de garrafa/kettlebell/pessoa. Capa escolhida pelo usuário é contrato independente: não apagar escolha nem pressupor que ela sempre se torna imagem do card. Sem capa, fallback charcoal. Exato tratamento de capa pede gate visual próprio.

## O que não foi medido

Handoff informa Pulse aproximadamente 58×58px, raio 19px, adaptável ao estreito. Não informa alturas finais exatas de Ranking/Status/Peso, razão das colunas, gap/raio Bento/tipografia completa ou espaçamentos finais. Gap 11px e raio 25px encontrados na auditoria de **V5.1** não são medidas finais V5.3. Paletas de mock não substituem tokens institucionais.

Qualquer proposta de dimensões na P2-B deverá estar marcada PROPOSTA e passar por revisão comparativa. Não afirmar extração de um HTML V5.3 que não foi acessado. A Home histórica executável e suas capturas são baseline de comportamento legado, não oracle visual V5.3.

## Header, TabBar e contextos protegidos

P1-R1 homologada já fornece wordmark oficial goudduo, centralização independente das laterais, Search/Plus/Heart Lucide, sem chevron, header consumindo inset superior. Componente Home futuro fornece **apenas corpo/Pulse**, não outro header/tab bar. Preservar ações neutras ou integrar somente contratos autorizados de Busca/Criar/Atividade; não transformar um toque em sucesso de serviço.

TabBar única P1-R1: Home/Rotinas/Match/Mensagens/Perfil, House/Dumbbell/Map/MessageCircle/User, Match central, 24px/stroke2, base50px + inset inferior, alvos >=44px, seleção local #00A8E8. Sem legendas/pills/fundos novos ou transform de viewport. Home permanece ativa nas três tabs; retocar Home volta ao topo da tab atual.

Treinos/Publicações/Business são contextos superiores, não destinos extras. `HomeCompositions` disponibiliza nós independentes; estados sociais e dados de rotina continuam no provider existente. Usar namespace `.home-training-v53` e tokens locais no subtree; não alterar :root, `.app-header`, `.tab-bar` ou CSS de Feed por regra Bento. Não inserir treino em Business nem condicionar publicação social para usar treinamento.

## Pulse em Treinos — presença preservada, detalhe por confirmar

O handoff e #54 aprovam squircle 1:1 com cantos contínuos, descartando moldura preta, cápsula/círculo/retângulo alongado. O comando P2-A reafirma a **presença**, que deve ser preservada no plano. Recomendação de placement: região superior do conteúdo, depois das tabs e antes do Bento, sem consumir safe area novamente; detalhe exato depende da referência recuperada/revisão do proprietário.

Ordem do exemplo: J com +, institucional antigo goduoit, Lia/Ravi/Bia; produto atual utiliza identidade **goudduo**, IDs e ordem reais do cenário, sem hardcode de nomes como pessoas reais. Identificação acessível permanece mesmo sem “Seu pulse”. Usar somente mídia aprovada; não copiar avatares privados nem criar logo novo.

Preservar swipe horizontal/toque/foco e estados sem Pulse/não visto/visto; visto gelo #F1F8FB conforme decisão posterior, não azul do CSS antigo. Gradientes não vistos têm contrato próprio; não inventar stops. O slot `shape:'squircle'` da fundação não implementa miniaturas/estado/viewer: ainda será necessário consumidor explícito.

**PENDENTES:** dimensões/fold/spacing finais, dots/indicadores de carrossel (nenhuma geometria final comprovada), comportamento exato do item institucional e abertura quando viewer indisponível, regra e persistência de ocultação via Configurações. Não criar toggle ou viewer completo sem contrato. Acessibilidade pode identificar item/estado sem inventar ação funcional. Se o destino real ainda for placeholder, ele deve ser honesto e retornar ao contexto.

C06: README/main privada têm Pulse só em Publicações, enquanto homologação V5.3 e comando atual o incluem em Treinos. Impacto: excluir por legado perderia requisito; globalizar forma alteraria Feed. Alternativas: atualizar localmente o índice/contrato com esta precedência e confirmar medidas, ou recuperar referência completa antes do visual. **Recomendação:** manter presença squircle planejada, confirmar detalhe; circular em Publicações permanece inalterado. Não editar índices canônicos nesta missão documental.

## Expansão, dados e widgets pendentes

Preservar expansão inline/contextual e fechamento restaurando ordem/scroll/foco, sem lacunas, sem migrar card para o topo por conveniência. Treino do Dia navega para seu destino próprio; não converter toda ação em expansão. Reordenação visual de layout não pode regravar a preferência/ordem do usuário sem ação correspondente. Data selecionada é navegação; não acrescentar feito/faltou/descanso ao seletor por inferência.

Peso/Medidas/Consistência/Recordes/Fotos da #159: a direção cita forma/cor/papel, mas detalhes e algoritmos continuam **PENDENTES**. A futura integração não pode ligar “Salvar peso” a um falso registro real nem gerar gráficos/streaks. Biblioteca independente já válida deve continuar acessível.

**Tratamento seguro proposto para aprovação:** manter destinos válidos e excluir métricas/CRUD não homologados; para o Peso estrutural à direita, aprovar slot neutro compacto sem número/coleta ou adiar o recorte Home até fechar o widget. Não remover Peso/reorganizar Bento ou criar placeholder visual definitivo silenciosamente. Outros widgets pendentes entram apenas no recorte aprovado. A existência de uma demo com dados sintéticos não homologa seu desenho nem permite saúde em localStorage.

## Aceite e bloqueios

IDs HM01–HM08 na [matriz](MATRIZ-COMPONENTES.md), testes H-* no [QA](QA-VISUAL-P2.md). Até recuperar/validar a referência não há pixel parity, tolerância dimensional comprovada ou screenshot final V5.3. O proprietário deverá homologar o recorte visual e o tratamento dos widgets antes de sua integração na P2-B. Nenhuma superfície foi construída aqui.
