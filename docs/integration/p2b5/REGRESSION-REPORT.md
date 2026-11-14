# Regressão, testes e segurança P2-B5

Base fba23be34bbd370e2dccef4d94d2c6a23265e6c1, integração controlada da P2-B4. Node 24.22.1/pnpm 11.25.0 fixados; Playwright 1.56.1 e Chromium 156.0.8078.79 na rodada local inicial; Chromium 141.0.7390.37 do pacote Playwright na reprodução e validação final, igual ao runner de CI. Nenhuma atualização de dependência ou lockfile.

## Resultados observados

| Verificação | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile | PASS |
| pnpm typecheck | PASS; também executado nos builds |
| pnpm test | **93 PASS /9 arquivos**, 13 casos novos e 80 anteriores preservados |
| pnpm run build / build:lab | PASS, artefatos app/Lab separados e auditados |
| node --test tests/bundle.test.mjs | **4 PASS** |
| pnpm exec playwright test | **100 PASS no Chromium 141 do projeto**, zero falhas/skips/flaky; 25 novos e 75 regressões |
| Capturas | 80, oito estados pareados × cinco larguras, medidas/fontes/hashes; zero pageerrors |
| Links/hash/diff | PASS: 8 documentos, 80 hashes de capturas, hashes de fontes e links relativos conferidos |

Logs locais em /workspace/scratch/p2b5/, report JSON e traces em test-results/ ignorados; regeneráveis pelos scripts. A rodada inicial usou PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium; a final usa o navegador padrão instalado pelo próprio Playwright, sem override de executável. A CI no head publicado será confirmada na PR/entrega, sem inferir sucesso futuro. Builds são regenerados no commit limpo para build-info com SHA/dirty=false/hash do lock. Cloudflare somente dry-run do workflow existente, sem comandos extras de publicação/preparação nesta missão.

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

## Correção de scroll após a primeira CI

No head inicial 39f2292, a CI (Chromium 141) passou 93 unitários e 95 E2E, mas falhou nos cinco casos de scroll: esperado 100 px, observado 0 px após inclusão. Chromium 156 local tinha passado os 100. A falha foi reproduzida com o Chromium 141 do mesmo pacote Playwright. Instrumentação confirmou a mesma lista DOM, sem setter JS de reset após o clique; desabilitar somente a ancoragem automática do navegador conservou 100→100.

Correção: overflow-anchor:none apenas em contextual-library__results. Não há reposicionamento global, cache de scroll concorrente, alteração de query/foco ou relaxamento da asserção. O teste mantém igualdade exata da posição e passa a conferir também a propriedade CSS. Os cinco casos alvo e a suíte completa final de 100 testes passaram no Chromium 141, sem falhas/skips/flaky. Essa primeira correção local não encerrou a análise: a segunda CI (43550579582) passou 95 E2E e falhou nos cinco de scroll, agora 100→138 px. Artefato remoto não pôde ser baixado neste ambiente; diagnóstico baseado nos logs CI e reprodução instrumentada local.


### Auditoria diferencial da interação automatizada

A instrumentação adicional mostrou 138 px já em pointerdown, antes de focus/click e antes de qualquer atualização do reducer. A linha estava inteiramente visível (topo 420,15 / fim 489,15 dentro da lista 382,15–806,15 em 430 px). O scrollIntoViewIfNeeded chamado por Locator.click no Chromium 141 alterava a posição antes de entregar o clique. Um clique de ponteiro nas coordenadas visíveis conservou 100→100 px.

O teste agora aguarda o término da animação de entrada, exige geometricamente que a linha esteja inteira na lista e clica em seu centro por page.mouse, gerando eventos reais de ponteiro/foco/clique. Mantém igualdade exata do scroll, foco, query e inclusão confirmada. Não usa dispatchEvent, force no cenário positivo, tolerância, retry ou skip. A tentativa intermediária de restauração imperativa de scroll foi descartada: não integra o produto e não interfere na rolagem da pessoa. O CSS local de ancoragem permanece como proteção; não se atribui a ele a correção de todo reposicionamento observado na automação.
