# Matriz de QA e prevenção de regressões — P0

**Plano de testes, não execução de QA do protótipo integrado.** Nenhuma evidência de paridade visual, Safari, backend ou build foi produzida por esta P0. Checagens documentais realmente executadas estão ao final. [Jornadas](MAPA-JORNADAS-P0.md) e [IDs](INVENTARIO-SUPERFICIES-P0.md) são a base de rastreabilidade.

## 1. Ambientes e evidências necessárias por lote

| Ambiente | Cobertura | Quem / automação | Limite |
|---|---|---|---|
| Chromium responsivo | 320, 375, 390, 414, 430 CSS px; alturas úteis incluindo 740/844/932 e teclado emulado | Playwright ou ferramenta existente justificada no lote | Emulação não é Chrome Android físico |
| WebKit automatizado | Mesmas cinco larguras, rotas, foco, scroll, reduce | Complemento Playwright proposto, sem instalar na P0 | WebKit desktop não comprova teclado/safe area/Safari iPhone físico |
| iPhone Safari físico | Pelo menos aparelho compacto e notch/Dynamic Island conforme disponibilidade; retrato/paisagem, barras do Safari, teclado, pinça e VoiceOver | Proprietário executa roteiro; Codex organiza evidências e reproduções possíveis | Listar modelo/iOS/Safari real; se indisponível, gate pendente, nunca declarar passou |
| Chrome Android físico | Teclado, gesto voltar, scroll, toque fora e TalkBack quando disponível | Proprietário/manual + automação de browser complementar | Informar aparelho/Android/Chrome |
| Desktop teclado | Tab/ShiftTab/Enter/Space/Escape e voltar/avançar do navegador | Automatizável + inspeção acessível | Sem importar layout desktop não homologado |

Toda evidência identifica SHA, branch/PR, URL específica do deploy ou build local, browser/versão, viewport e insets, fixture/cenário, passos, esperado, resultado, captura/vídeo/log e limitação. Guardar baseline de c093689/contrato antes da alteração e comparação do mesmo cenário, fonte carregada e animação concluída. Não fazer screenshot com fonte fallback e afirmar fidelidade.

## 2. Grupos transversais de testes

| Grupo | Casos / esperado | Automação proposta | Avaliação manual / aceite |
|---|---|---|---|
| Q-BUILD | Instalação pelo lock, typecheck, testes existentes, build comum/Lab separado | pnpm scripts; jobs com logs por SHA | Resultado real e warnings revisados; não basta suite histórica citada em PR |
| Q-NAV | Entradas reais, voltar UI/browser, avançar, reload/deep link, ID inválido, overlays no histórico | Integração e E2E por jornada | No Safari gesto voltar e retorno ao mesmo contexto |
| Q-STATE | Salvar Editor→Home→Rotinas; Perfil→Header; Feed→Perfil→Feed; snapshot Sessão | Reducer/seletores e E2E; IDs/revisões | Dados sintéticos consistentes; cancelamento não comita; reset só no Lab |
| Q-LAYOUT | Cinco larguras, texto longo/zoom, sem overflow, CTA visível/último item alcançável | Medição DOM + screenshots parametrizados | Comparar referência aprovada; sem ajuste visual arbitrário para passar teste |
| Q-IOS | Input mínimo 16 CSS px em touch, sem bloquear pinça; teclado abre/fecha, visualViewport.scale/height, rotação | CSS computed + E2E parcial | Safari físico obrigatório; distinguir zoom de reposicionamento de teclado |
| Q-SAFE | inset em um nível por eixo, header/rodapé, notch/home indicator, sheet/TabBar | Insets simulados + medição | Insets reais em iPhone; nenhum offset fixo universal |
| Q-OVERLAY | Entrar/sair suave, backdrop/swipe/Escape/Voltar conforme contrato, repetição rápida, sheet sobre sheet | Estados/lifecycle com timers controlados + E2E/vídeo | Sem máscara fantasma, corte seco ou scroll/foco preso |
| Q-MOTION | ~300/310ms referencial, reorder/reflow, reduce sem transitionend | emulação prefers-reduced-motion, fallback de cleanup e stress | Proprietário avalia ritmo/gesto em velocidade normal |
| Q-A11Y | Nome/role/estado, foco inicial/restauração/trap, labels/erros associados, aria-live, targets, contraste | Testing Library + axe proposto apenas se justificado | VoiceOver/TalkBack, texto ampliado; não depender de cor ou swipe exclusivo |
| Q-EMPTY | Sem treino/exercício/dia/resultado/post/foto; falha de fonte/mídia/IBGE e ação cancelada | Fixtures e falhas de rede determinísticas | Mensagem honesta; não anunciar sucesso operacional nem ocultar pendência |
| Q-FEED | Conteúdo/ordem/mídia baseline, ações/menu/abas/Pulse, retorno após Perfil e mudanças de tokens | Snapshot de dados/DOM e E2E + comparação visual | Nenhum post extra da G#152 na experiência comum; mudanças compartilhadas explicitadas |
| Q-ASSET | SVG oficial por blob, fonte real, WebP por direitos, sem raster-logo/ícone improvisado | Inspeção dist e carregamentos/requests | Qualidade visual e aprovação de imagem pelo proprietário |
| Q-PUBLISH | Allowlist dist, sem maps/segredos/privados/Lab/Gooduu/SW legado; HTTPS/deep links/SHA correto | Varredura e smoke do artefato; manifest de build | Audiência/permissões e publicação autorizadas; rollback ensaiado só em etapa futura |
| Q-LIMIT | Sem OAuth/OTP real, sem Match confirmado, sem selo profissional/pagamento/capability por clique | Testes negativos de adaptação de demo | Escopo demonstrativo legível sem contaminar UI com controles de Lab |

Não automatizar apenas a existência das próprias classes CSS. Priorizar invariantes de dados, efeitos observáveis e interações de risco. Testes existentes são ponto de partida, não autoridade sobre comportamento superado por V7.4.

## 3. Casos funcionais por família / referência

| Caso | Superfícies / jornadas | Cenários mínimos | Resultado que libera revisão |
|---|---|---|---|
| QA-A | A01–A07 / A | Login erro/sessão expirada; cadastro vazio/inválido/18+ limite; @ regex/reservado mock; leitor ida/volta; OTP vazio/parcial/colar/90s/reenvio/falha; recovery distinto | Valores mantidos, foco correto, sem OAuth/Nome obrigatório e sem afirmação de backend; gates visuais Splash/recovery separados |
| QA-I | I01 / A-11 | Três cenas, swipe/teclado/voltar, pular nas cenas previstas, concluir, reduce | Sem formulário longo, nova coleta, Match ou Business; destino final homologado |
| QA-H | H01/H02 / A/B/C | Cinco destinos, tabs Home, card dia com/sem treino/capa, expansão e volta, Status placeholder | Charcoal sem imagem fixa; data não registra treino; Peso/Medidas/Consistência não tratados como aprovados |
| QA-R | T01–T03 / B | Rotinas vazias/múltiplas, expansão/reflow e órfão; dias; editor 0/1/2/6 exercícios; check; nome final; salvar/cancelar | Mesmo workoutId na Home; biblioteca permanece aberta ao adicionar; duplicação bloqueada; query/scroll preservados |
| QA-R-EDGE | T02/T03 / B-07…B-14 | Dois toques rápidos, incluir item já presente, excluir/reabrir/incluir de novo, teclado aberto, sem resultados, campos de outro exercício | Um item por ID de catálogo conforme contrato; campos e ordenação preservados; nenhuma nova affordance de navegação sem aprovação |
| QA-LIB | T04–T06 / B-15 | Catálogo vs prescrição, autoria, origem, equipamento, retorno de seleção, mídia ausente | Só após contrato visual/asset; excluir catálogo não apaga histórico; mock não promete upload |
| QA-SESSION | T07/T08 / C | Iniciar/navegar/series/carga/reps/descanso, mapa reorder, sair via TabBar/header, retomar, finalizar parcial/cancelar | Prescrição intocada; todos IDs/valores/resto/tempo preservados; sem duplicar resultado nem pontuar não elegível |
| QA-SOCIAL | H03/S01/S02/S04/S05 / D | Formatos de mídia/menu, likes/salvos/ocultar, autor→Perfil→voltar (Lia não pode cair no próprio perfil pelo fallback de G#152); Pulse visto/não visto e contexto de viewer | Baseline Publicações preservada; pendências de viewer/composer continuam explícitas |
| QA-PROFILE | P01–P06/Q01 / E | Cinco contextos, próprio/visitado, editar/salvar/voltar, Bio150, UF→município, pills multisseleção, dispensar/reabrir conclusão | Sem tasks em visitado; header/perfil coerentes; sem dado corporal obrigatório ou status pro concedido |
| QA-ACCOUNT | Q01/Q02/A07 / F-04 | Menu preservado exceto Meu perfil redundante; documentos/retorno, pedidos de dados/exclusão de demo | Nenhuma ação destrutiva ou aceite jurídico fictício; versão da minuta identificada |
| QA-PENDING | C01–C05/H04/E01–E05 / F | Retorno de placeholder, restrições de convite/pro/capability, ausência de dados/serviços, privacidade | Nenhuma UI/serviço pendente aparece concluído; cada desbloqueio tem contrato e teste próprio |

## 4. Rastreabilidade de todas as 47 superfícies

Todos os grupos aplicáveis também cobrem 320/375/390/414/430px e casos de acessibilidade/retorno. Linhas PENDENTE significam **planejamento/critério de desbloqueio**, não ordem de QA de funcionalidade inexistente.

| ID | Grupo funcional | Grupos transversais de maior risco | Gate |
|---|---|---|---|
| A01 | QA-A | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| A02 | QA-A | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| A03 | QA-A | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| A04 | QA-A | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| A05 | QA-A | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-IOS/Q-SAFE/Q-OVERLAY/Q-MOTION | Gate de referência + implementação + QA + proprietário |
| A06 | QA-A | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| A07 | QA-A | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| I01 | QA-I | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| H01 | QA-H | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| H02 | QA-H | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| H03 | QA-SOCIAL | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-FEED | Gate de referência + implementação + QA + proprietário |
| H04 | QA-H | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| S01 | QA-SOCIAL | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-FEED | Gate de referência + implementação + QA + proprietário |
| S02 | QA-SOCIAL | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-FEED | Gate de referência + implementação + QA + proprietário |
| S03 | QA-SOCIAL | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| S04 | QA-SOCIAL | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| S05 | QA-SOCIAL | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| T01 | QA-R | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-STATE | Gate de referência + implementação + QA + proprietário |
| T02 | QA-R | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-IOS/Q-SAFE/Q-OVERLAY/Q-MOTION + Q-STATE | Gate de referência + implementação + QA + proprietário |
| T03 | QA-R | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-IOS/Q-SAFE/Q-OVERLAY/Q-MOTION | Gate de referência + implementação + QA + proprietário |
| T04 | QA-LIB | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| T05 | QA-LIB | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| T06 | QA-LIB | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| T07 | QA-SESSION | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-STATE | Gate de referência + implementação + QA + proprietário |
| T08 | QA-SESSION | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| P01 | QA-PROFILE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-STATE | Gate de referência + implementação + QA + proprietário |
| P02 | QA-PROFILE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-FEED | Gate de referência + implementação + QA + proprietário |
| P03 | QA-PROFILE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| P04 | QA-PROFILE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-IOS/Q-SAFE/Q-OVERLAY/Q-MOTION + Q-STATE | Gate de referência + implementação + QA + proprietário |
| P05 | QA-PROFILE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-IOS/Q-SAFE/Q-OVERLAY/Q-MOTION | Gate de referência + implementação + QA + proprietário |
| P06 | QA-PROFILE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| C01 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| C02 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| C03 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| C04 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| C05 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| Q01 | QA-ACCOUNT | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| Q02 | QA-ACCOUNT | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Gate de referência + implementação + QA + proprietário |
| E01 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| E02 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| E03 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| E04 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| E05 | QA-PENDING | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT | Contrato/homologação própria antes de implementar |
| F01 | fundação Q-BUILD/Q-NAV/Q-STATE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-FEED | Gate de referência + implementação + QA + proprietário |
| F02 | fundação Q-BUILD/Q-NAV/Q-STATE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-IOS/Q-SAFE/Q-OVERLAY/Q-MOTION | Gate de referência + implementação + QA + proprietário |
| F03 | fundação Q-BUILD/Q-NAV/Q-STATE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-ASSET/Q-PUBLISH | Gate de referência + implementação + QA + proprietário |
| F04 | fundação Q-BUILD/Q-NAV/Q-STATE | Q-NAV/Q-LAYOUT/Q-A11Y/Q-LIMIT + Q-STATE | Gate de referência + implementação + QA + proprietário |

## 5. Regressão de Publicações como gate obrigatório

1. Capturar o cenário baseline de G main c093689: mesmos posts/mídias, tabs, menus, likes/salvos/seguindo/ocultos e Pulse. Registrar ações operacionais versus placeholders, sem chamar o placeholder de funcionalidade entregue.
2. Antes de cada PR em HomeShell, tokens, header, store, overlays, brand ou Perfil, executar QA-SOCIAL + Q-FEED contra a baseline; mudanças permitidas precisam estar listadas (marca atual/remoção de chevron compartilhado).
3. Comparar primeira/última posição do Feed, abrir perfil em post fora da primeira dobra, voltar, verificar scroll e estados. Testar todos formatos existentes sem corrigir proporção de referência por inferência.
4. Verificar que squircle/localização de Pulse de Treinos não alteram anéis de Publicações; que menu/gesto/scroll não interceptam ações de post.
5. Não aceitar G#152 integralmente se os novos posts mudarem baseline. Cenários extras de perfis ficam somente no Lab.

## 6. Gates, severidade e responsabilidade

- **Bloqueio de lote:** perda de treino/rascunho/execução, regressão Feed, rota sem retorno, foco/overlay preso, campo inacessível/teclado impede salvar, capacidade profissional/Match/pagamento falso, publicação indevida de dados/código/assets.
- **Pendência visual:** diferença não autorizada de marca/copy/tokens/layout/ritmo exige revisão; não ajustar referência para coincidir com implementação.
- **Codex:** produz logs, testes automatizáveis, inspeção/comparação e roteiro de reprodução; informa precisamente o que não conseguiu testar.
- **Proprietário:** avalia fidelidade/UX e executa ou acompanha teste físico disponível; decide homologação e autoriza publicação/merge em gates distintos.
- Suíte verde não homologa o produto. Sem evidência em Safari físico, relatar pendente; com falha reproduzível, não promover o lote como pronto.

## 7. Verificações realmente executadas nesta P0

Leitura documental, Git/REST, confirmação de arquivos/blobs/SHA-256 das referências, ancestralidade entre PRs e existência dos imports de onboarding. Validação do pacote: consistência dos 47 IDs/classificações entre inventário/matriz/QA; links locais e caminhos GitHub por commit; whitespace do diff; escopo somente docs/reconciliation/*.md; ausência de instrução de fechamento automático na PR. Evidências e resultados finais constam no README e na PR.

**Não executados:** pnpm install, build/typecheck/Vitest da aplicação, screenshots ou browser QA, Safari/Android físico, comparação pixel a pixel, upload/deploy/rollback ou teste de serviços reais. Relatos históricos das PRs não são apresentados como testes P0. Não houve alteração de código de aplicação para obter uma suíte verde.
