# Regressão e resultados P2-B2

Execução em 13/11/2026 UTC, Node 24.22.1 / pnpm 11.25.0 fixados, Playwright 1.56.1 e Chromium 156.0.8078.79 do ambiente. Base `86d0b968`. Commits de implementação: c4add67 (contratos),7042187 (adapters/integração mínima),9ecec80 (Lab),2d82028 (testes e proteção de bundle).

## Resultados finais observados

| Comando | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile | PASS; dependências e lock sem alterações |
| pnpm typecheck | PASS na versão final, inclusive builds após correções |
| pnpm test | **63 PASS / 6 arquivos**, incluindo 8 testes novos de adapter/contexto/host; 35 casos de domínio P2-B1 preservados |
| pnpm run build | PASS; app estático em dist/app, bundle auditado |
| pnpm run build:lab | PASS; Lab isolado em dist/lab, bundle auditado |
| node --test tests/bundle.test.mjs | **4 PASS**, com novo caso negativo do consumidor técnico dentro do teste de vazamento Lab |
| pnpm exec playwright test | **45 PASS**, zero falhas/skips/flaky: 35 regressões existentes + 10 novos ensaios (dois por largura) |
| pnpm cloudflare:prepare | PASS, assets-only, dry-run sem bindings/upload |
| pnpm cloudflare:validate | PASS, prebuilt dry-run; configuração não alterada |
| git diff --check e revisão documental | PASS; links relativos conferidos; nenhuma mídia/código privado ou mudança fora do escopo |

Larguras 320/375/390/414/430 CSS px, altura 844, touch Chromium. Os testes novos selecionam também a largura correspondente do frame Lab. Browser local usa PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium. Cada teste E2E exige zero pageerrors/console.error; suíte final não registrou esses erros.

## Cobertura nova

- Contexto efêmero por entrada, mesmo URL com draftIds distintos, markers puros em history.state, IDs seguros em URL e perda explícita do contexto no reload.
- Header único, chevron, título completo/long title, enabled/disabled por validação; placeholder direto sem ação Salvar.
- Preparar→confirmar um→nomear; erro de nome sem commit; revisão salva somente após confirmação final; retorno e scroll da origem.
- Biblioteca técnica 75%, foco inicial, scroll independente, input/teclado, adicionar sintético sem fechar, identidade preservada, Escape/restauração, Back/Forward e gesto descendente.
- Múltiplos exercícios vão à nomeação; reduced-motion desativa animação contextual; fechar/Voltar não descarta rascunho.
- Cancelamento requer true explícito e afeta só seu draft; stale-revision desabilita ação; mesmo validateDraft mantém shared-workout-pending no teste de domínio compartilhado.
- Conteúdo permanece durante saída; scroll lock/inert restaurados; foco volta ao opener ou ao título da página após mudança de destino.

A suíte anterior continua verificando cinco destinos/Match central/ícones, três contextos Home, Home ativa volta ao topo, histórico/reload/rota direta, scroll por contexto, safe areas simuladas, alvos, overlays/foco/backdrop/reduced-motion/axe e separação Lab/app. Nenhuma asserção existente de navegador foi enfraquecida para acomodar mudanças.

## Falhas intermediárias e correções

1. Typecheck inicial após ampliar Panel apontou títulos ausentes e prop resolve ainda não declarada no host. A extensão tipada do host completou esses contratos; a versão final passou.
2. Primeira rodada E2E: **40 passaram /5 falharam**, todos no cenário novo de nomeação. O seletor global role=status alcançava outputs técnicos do Lab. Restringido ao diálogo, mantendo a expectativa name-required e revisão ainda 1.
3. Revisão do retorno de foco identificou que querySelector com lista de seletores priorizava main pela ordem do DOM. Corrigido para buscar primeiro h1 acessível e depois main. A rodada final comprova título focado após salvar nos cinco viewports.

Relatório JSON final em test-results/report.json e traces de falha são artefatos de teste ignorados; logs/primeiro relatório preservados em /workspace/scratch/p2b2/, fora do Git. CI da PR reproduz instalação/types/unitários/bundle/builds/dry-run/Playwright e publica artefato de relatório. Seu estado efetivo será informado na PR/entrega; resultado local não presume CI aprovada.

## Arquivos compartilhados revisados

| Arquivo/grupo | Delta limitado |
| --- | --- |
| src/app/routine-context.ts | Novos tipos de contexto/origem/painel e classificador |
| src/app/surface-contracts.ts | onBack opcional, ContextualOverlay/OverlayResolver e slot resolveOverlay |
| src/app/navigation.ts | Painéis adicionais, contexto em memória, opções de contexto/scroll, troca de etapa via replace e opener original preservado |
| src/app/useRoutineEditorAdapter.ts | Hook que liga intents ao reducer e chrome, sem lógica de prescrição paralela |
| src/app/AppShell.tsx | Encaminhar resolvedor opcional ao mesmo OverlayHost; nenhuma outra composição alterada |
| src/components/ShellHeader.tsx | Callback onBack opcional, fallback original; markup/ícones/CSS preservados |
| src/components/OverlayHost.tsx | Conteúdo contextual, retenção de saída, foco inicial/restauração e controles adicionais no trap; mesmo motor |
| src/styles/app.css | Somente seletor opt-in library para altura contextual; sem alteração das regras existentes |
| src/state/training.ts | Exportar validateDraft e usá-la nos mesmos gates anteriores |
| src/lab/main.tsx e RoutineAdapterScenario.tsx | Cenário técnico opcional e consumidor isolado, nenhum componente de produto final |
| scripts/check-bundle.mjs | Recusar marcadores novos de consumidor técnico no app comum |
| src/app/routine-adapters.test.tsx; src/state/training.test.ts | Testes novos e asserção do gate compartilhado reutilizado |
| tests/e2e/routine-adapters.spec.ts; tests/bundle.test.mjs | Dois fluxos novos ×5 larguras e marcador negativo adicional |
| docs/integration/p2b2/ | Seis documentos desta entrega |

TabBar.tsx, tokens.css, domínio/model/provider/seletores P2-B1, NavigationProvider, configuração Cloudflare, package.json/lock, assets e referências HTML **sem alterações**. Plus Jakarta Sans, wordmark SVG, Lucide, cores/dimensões globais e duração dos overlays preservados. Nenhum segundo Shell/header/roteador/store/host.

## Segurança, fontes e limites

Origem técnica privada consultada como referência: snapshot GODUOIT main `c0936896240e525353b237d92dff31fe0211eb94`, governança AGENTS/GEMINI/README e recorte de Rotinas, PR #154 no head `08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38` já auditado na [reconciliação P2-B1](../p2b1/LEGACY-RECONCILIATION.md). **Arquivos privados transportados: nenhum.** Não se copiaram UI/CSS, fixtures, screenshots privadas, mídia ou assets. Direitos e allowlist permanecem pendentes. Status de cartões Projects privados não foi atualizado ou presumido.

Nenhuma dependência nova, persistência sensível, backend, autenticação, catálogo real ou recurso Cloudflare. Build guard mantém allowlist/maps/symlinks/credenciais/marcadores privados e agora os novos marcadores técnicos. Não é certificação universal de direitos, mas não há novo asset/arquivo privado no recorte. Builds de entrega são regenerados após commit para build-info com SHA/dirty=false.

**Não testado:** Safari/iPhone ou Android físicos, teclado virtual iOS/VoiceOver, serviço real, paridade visual de Home/Rotinas ainda ausentes. Publicações privada não foi portada ou recapturada nesta fase; não se declara paridade do Feed. Proteção verificável é ausência de port/redesign e regressão da fundação pública. Nenhuma URL de preview foi publicada.
