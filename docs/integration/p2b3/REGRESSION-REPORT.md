# QA e regressão P2-B3

Base **3d7a16813fcb9b8ec006ba1a36f4f581194f4576**, merge controlado da PR #34 homologada. Código em 699d557 (superfície/layout/motion), 7276d8e (fixtures/domínio), b0e65fc (composição/navegação) e db88984 (testes). Node 24.22.1/pnpm 11.25.0 fixados, Playwright 1.56.1, Chromium 156.0.8078.79 local.

## Resultados observados

| Verificação | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile | PASS, nenhuma atualização de versões/lock |
| pnpm typecheck | PASS na versão final |
| pnpm test | **71 PASS /7 arquivos**, 8 casos novos de Home/layout/estado/navegação e 63 anteriores preservados |
| pnpm run build | PASS, dist/app auditado |
| pnpm run build:lab | PASS, dist/lab isolado e auditado |
| node --test tests/bundle.test.mjs | **4 PASS**, marcador adicional de cenário técnico recusado no app |
| pnpm exec playwright test | **55 PASS**, zero falhas/skips/flaky na rodada final; onze cenários por largura320/375/390/414/430 |
| Comparação visual | Cinco larguras, seis estados por largura, 60 capturas pareadas +5 referências brutas; geometria/cores/raios/fontes registrados |
| Segurança/escopo/links | Diff revisado, git diff --check, hashes de referência/capturas/código e links locais conferidos |

Playwright local usa PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium e builds estáticos. Relatório regenerável em test-results/report.json. Logs/ensaios locais em /workspace/scratch/p2b3/, fora do Git. A CI da PR reexecuta checks no head efetivo; seu status confirmado será informado na PR/entrega, sem presumir aprovação futura.

## Cenários novos

Principal e secundárias, semana da rotina, um/múltiplos/zero exercícios válidos, expansão in-place, permutação local da secundária direita, órfão sem slot vazio, recolher/restaurar ordem, teclado/setas/Home/End, targets 44 px, inert/aria-expanded/aria-controls, reduced-motion, axe, atualização da prévia pela mesma entidade salva, cenário sem rotinas e operação de criar indisponível.

Entrada via TabBar oficial, uma instância de Shell/header/TabBar, CTA chegando somente ao Editor indisponível, nenhum Salvar/popup/sucesso falso, rascunho vazio sem treino salvo no dia livre, reutilização do draft ao voltar, seleção/expansão/scroll preservados, Back/Forward e isolamento de cenários do Lab. Os testes de reflow comparam ordem e geometria e verificam que a coleção salva não foi alterada.

As 35 regressões P1-R1 e 10 ensaios P2-B2 continuam intactos: cinco destinos/ícones/Match central, três contextos Home, retorno ao topo, rotas diretas/recarga, contexto efêmero/rascunhos, overlays/foco/teclado/inert/gesto/saída, safe areas simuladas, scroll e Lab separado. Nenhum teste anterior foi enfraquecido.

Todos os cenários E2E monitoram pageerror e console.error e exigem lista vazia. Axe não encontrou violações nos cenários executados; isso não certifica qualquer estado futuro ou contraste de mídia ainda inexistente.

## Achados e correções

1. Typecheck inicial encontrou tipo amplo do destino global na origem de retorno. Construção explícita do objeto rotinas preservou a união tipada, sem relaxar tipos.
2. Primeiro teste unitário de ausência de Salvar usava getByRole, que lança erro quando o elemento corretamente não existe; corrigido para queryByRole, preservando a exigência de ausência.
3. Primeira E2E: 50 aprovações/5 falhas no teste novo; o locator procurava Expandir depois de o botão mudar corretamente para Recolher. Corrigido o nome esperado; execução alvo e rodada completa passaram.
4. Cascata real do HTML revelou secundárias 147 px e reserva recolhida 27 px, não apenas a síntese 171 px anterior. Corrigido o CSS local para os valores renderizados, com órfão 145px e expanded124px.
5. Inspeção visual identificou fundo de dia planejado herdado de uma regra anterior da referência. Adicionado o mesmo fundo local e asserção de cores por estado.
6. Primeira coleta de screenshots foi interrompida na última largura pelo HMR do dev, que recarregou a rota do Lab como app comum. A coleta final usa servidores de builds estáticos distintos; normalização do frame é registrada, sem alterar CSS de superfície.
7. Seletor técnico de cenário passou a derivar seu valor da coleção, evitando ficar desatualizado após reset. Interpolação FLIP/cleanup complementa o motion local observado, com preferência reduzida respeitada.

Falhas intermediárias não são apresentadas como execuções aprovadas. Asserções finais e diferenças visuais estão na [comparação](V74-VISUAL-COMPARISON.md).

## Escopo e segurança

Arquivos principais: src/surfaces/routines/{RoutinesHome.tsx,routines.css,layout.ts,RoutinesHome.test.tsx}; src/app/PrototypeApp.tsx; src/main.tsx; src/state/{model.ts,routine-fixtures.ts}; src/lab/main.tsx; tests/e2e/routines-home.spec.ts; guard/testes de bundle; documentação/evidências desta pasta.

**Sem alterações** em AppShell, ShellHeader, TabBar, OverlayHost, NavigationProvider, BrowserNavigation, tokens institucionais, contratos de superfície, domain/training, reducer training, seletores e configuração Cloudflare da base homologada. Schema de prescrição e shared-workout-pending permanecem iguais. Model.ts só amplia fixtures e ação técnica de cenário.

Arquivos privados transportados: **nenhum**. A origem GODUOIT permanece apenas referência histórica consultada nas auditorias anteriores, snapshot c0936896240e525353b237d92dff31fe0211eb94; não foram portados RoutinesSurface/fixtures/mídias/estilos privados. Não houve merge histórico ou cherry-pick. Fonte da aparência é HTML público de commit fixo. Screenshots são documentação pública dessa referência e do React, sem capturas privadas.

Nenhuma dependência nova. Asset adicional é o peso 800 da mesma Plus Jakarta Sans pública já instalada; licença/avisos existentes preservados. Sem fotografia, GIF, logo reconstruído ou mídia sem direitos. SVG oficial/Lucide permanecem. Guard verifica allowlist, mapas, symlinks, credenciais, marcadores privados e controles Lab fora do app.

Nenhum backend, persistência ou autenticação. Nenhum recurso/variável/projeto/deploy Cloudflare criado ou alterado. Não foram executados comandos extras de publicação/preparação nesta P2-B3; apenas o dry-run já previsto na CI existente pode validar o artefato.

## Limites

Safari/iPhone e Android físicos não testados. Keyboard/VoiceOver/insets reais permanecem gate. Não há Editor/Biblioteca/Home Treinos/Feed integrados para declarar fidelidade dessas superfícies. Publicações privada não foi portada nem recapturada; proteção comprovável aqui é ausência de mudança no Shell/estilos compartilhados e regressão da fundação pública, não paridade com Feed privado.

Capturas e medidas não homologam automaticamente os deltas técnicos. Builds finais são regenerados após commit com SHA/hash do lock e dirty=false; hashes dos fontes registrados na coleta permitem verificar a correspondência do conteúdo visual. Nenhum preview público foi publicado.
