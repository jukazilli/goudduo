# Regressão, testes e segurança P2-B5

Base fba23be34bbd370e2dccef4d94d2c6a23265e6c1, integração controlada da P2-B4. Node 24.22.1/pnpm 11.25.0 fixados; Playwright 1.56.1 e Chromium 156.0.8078.79 local. Nenhuma atualização de dependência ou lockfile.

## Resultados observados

| Verificação | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile | PASS |
| pnpm typecheck | PASS; também executado nos builds |
| pnpm test | **93 PASS /9 arquivos**, 13 casos novos e 80 anteriores preservados |
| pnpm run build / build:lab | PASS, artefatos app/Lab separados e auditados |
| node --test tests/bundle.test.mjs | **4 PASS** |
| pnpm exec playwright test | **100 PASS**, zero falhas/skips/flaky; 25 novos e 75 regressões |
| Capturas | 80, oito estados pareados × cinco larguras, medidas/fontes/hashes; zero pageerrors |
| Links/hash/diff | PASS: 8 documentos, 80 hashes de capturas, hashes de fontes e links relativos conferidos |

Logs locais em /workspace/scratch/p2b5/, report JSON e traces em test-results/ ignorados; regeneráveis pelos scripts. Playwright local usa PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium. A CI no head publicado será confirmada na PR/entrega, sem inferir sucesso futuro. Builds são regenerados no commit limpo para build-info com SHA/dirty=false/hash do lock. Cloudflare somente dry-run do workflow existente, sem comandos extras de publicação/preparação nesta missão.

## Novas verificações

Busca por nome/metadados legítimos, acentos/caixa/espaços, sugestões e IDs estáveis, catálogo vazio/malformado, medições distintas e parâmetros inicialmente inválidos. A fonte compartilhada vazia foi injetada só no teste de erro, sem criar catálogo paralelo no produto.

Inclui duplicatas, remoção/reinclusão, inexistência de catálogo/draft, contextos obsoletos, vínculo alterado, compartilhamento bloqueado, colisão de instância sem feedback falso e mesma entidade/revisão nos seletores Home após commit. Consumers reais verificam query, check derivado, feedback transitório, independência entre drafts e ausência de escrita antecipada no salvo.

As cinco jornadas novas por largura cobrem criação de um, criação múltipla/ordem, edição de salvo, cancelamento/descarte e lifecycle/acessibilidade. A jornada de lifecycle verifica altura 75%, scroll independente/preservado, input/foco, texto de busca, mensagens, duplicidade, retorno de foco, root inert/body lock, Back/Forward, reduced-motion e axe. Cada E2E exige zero pageerror/console.error.

B4 tinha asserções de Biblioteca indisponível: foram substituídas por busca/lista reais, preservando ausência de commit automático e os dados do rascunho/salvo. O título real Adicionar exercício segue a referência; o consumidor técnico B2 conserva default Biblioteca. Nenhuma asserção de domínio, histórico, cinco destinos, Shell, Home, safe areas ou Lab foi enfraquecida.

## Falhas intermediárias e correções

1. Primeira suíte 80:79 PASS/1 falha por expectativa histórica de Biblioteca indisponível. Atualizada para o consumidor real, mantendo a prova de isolamento de dados e fechamento seguro.
2. No teste de colisão, restoreAllMocks reiniciou também o matchMedia da fixture; cinco testes de UI falharam por matches indefinido. Cleanup passou a restaurar somente o spy criado pelo caso, preservando a fixture. Suíte final 93 PASS.
3. Primeira rodada alvo320: quatro jornadas PASS/uma falha porque Playwright corretamente impede dblclick em aria-disabled. O teste negativo passa a enviar clique forçado para verificar também o guard; estado continua bloqueado e contagem não aumenta.
4. Teste de scroll escolhe uma linha inteiramente visível para não confundir auto-scroll de actionability do Playwright com salto do reducer. A rodada alvo de lifecycle e a suíte completa passaram.

Essas falhas não são declaradas como execuções aprovadas. Asserções finais não foram relaxadas para ocultar bugs de produto.

## Escopo compartilhado e proveniência

- Novo catálogo sintético autoral em exercise-fixtures; model.ts acrescenta somente suas definições à fonte existente.
- training.ts exporta o mesmo gate contextual antes privado e o aplica também em draft/add, com validação de identidade. Commit/parâmetros/cópia-referência não ganham regras novas.
- Adapter aceita título opcional do renderer, com default anterior intacto. WorkoutSaveOverlays conecta o consumidor real.
- Novos library-model, ContextualExerciseLibrary e CSS opt-in; testes. Nenhum segundo provider/store/portal/roteador.

AppShell, ShellHeader, TabBar, OverlayHost, NavigationProvider/navigation, surface-contracts, estilos/tokens globais, WorkoutEditor, RoutinesHome/layout/CSS, seletores, fixtures de rotinas, domain/training, configuração Cloudflare, assets e package/lock sem alteração da base homologada. Cinco destinos/Match central, três contextos Home e contratos de Pulse permanecem iguais. Publicações/Business não foram portadas ou redesenhadas.

Código/arquivos privados transportados: **nenhum**. A allowlist P2-A continua proposta; nenhum catálogo, monólito, GIF, foto, captura privada ou implementação GODUOIT foi copiado. Aparência segue HTML público fixo; lógica/dados novos são independentes. Nenhuma mídia/dependência/backend/persistência/autenticação/credencial adicionada. Guard existente preserva allowlist de artefatos, proibição de mapas/symlinks/segredos/marcadores privados e isolamento do Lab.

## Limitações

Sem Safari/iPhone/Android físicos, teclado virtual/VoiceOver ou insets reais. Não se certifica Feed privado por comparação visual nova: proteção verificável é ausência de mudanças nas superfícies e regressão da fundação pública. Catálogo profissional, Biblioteca independente, equipamento selecionável, substitutos, limite final de nome, cópia/referência e refinamento visual continuam gates. Nenhum deploy/preview público ou início de P2-B6.
