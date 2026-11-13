# Relatório de testes P2-B1

Execução local em **13/11/2026 UTC**, Node24.22.1, pnpm11.25.0, Chromium156.0.8078.79, Playwright1.56.1. Código: commits `dd7e231` (domínio/rascunhos), `fb4468c` (seletores), `a9e8d13` (testes). Configuração e dependências preservadas.

| Verificação executada | Resultado e evidência |
| --- | --- |
| pnpm install --frozen-lockfile | PASS; lockfile inalterado, dependências já atualizadas conforme lock |
| pnpm typecheck | PASS; TypeScript sem erros na versão final |
| pnpm test | **55 PASS / 5 arquivos**: 35 casos novos em training.test.ts +20 existentes; model.test.ts ajustado à restrição de propagação implícita |
| pnpm run build | PASS; artefato estático app em dist/app, guard de bundle aprovado |
| pnpm run build:lab | PASS; artefato isolado dist/lab, guard aprovado |
| node --test tests/bundle.test.mjs | **4 PASS**: allowlist/inventário, mapas/arquivos inesperados, credenciais/Lab e symlinks |
| pnpm exec playwright test | **35 PASS**, sete cenários em cada largura320/375/390/414/430; duração2,5min; Chromium touch |
| pnpm cloudflare:prepare | PASS, assets-only, guard aprovado, --dry-run, sem bindings |
| pnpm cloudflare:validate | PASS, --prebuilt --dry-run; nenhuma publicação |
| git diff --check / revisão de escopo | PASS; somente src/domain, src/state e docs/integration/p2b1; nenhum arquivo protegido alterado |

Playwright local utilizou `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. Relatório JSON regenerável em test-results/report.json e logs locais de investigação em /workspace/scratch/p2b1/ (não versionados). A CI da PR reproduz a suíte; o estado observado da CI será informado na PR/relatório de entrega, sem presumir aprovação futura. O manifesto build-info identifica SHA e dirty status de cada build; reexecutar os builds após commit fornece rastreio do checkout limpo.

## Cobertura de domínio

Identidade de catálogo/instância/rotina/dia, cenários determinísticos, relações inválidas e chaves herdadas, parâmetros por tempo/distância/repetições, equipamento/músculos/substitutos, valores numéricos inválidos, duplicidade e colisão de instância, criação/edição/continuação/cancelamento de rascunhos, isolamento de objetos do chamador, reordenação, zero/um/múltiplos, nome vazio, revisão obsoleta, mudança de vínculo, commit atômico, entidades compartilhadas bloqueadas, independência por ID, Home/Rotinas derivados da mesma entidade, desvinculação e vazio, snapshot para futura Sessão. A ação antiga do Lab não consegue editar prescrições ou vincular outro dia.

Durante a implementação, o teste antigo de propagação implícita foi substituído pelo contrato conservador descrito na reconciliação. Um erro de import de tipo durante limpeza foi corrigido e o typecheck final passou. Falhas intermediárias não foram tratadas como execução aprovada.

## Regressão da fundação

Playwright cobre cinco destinos, seleção/ordem/ícones e Match central; três contextos Home; histórico/back/forward/recarga e rotas diretas; isolamento e estado do Lab; scroll; headers contextuais e superfícies sem Shell; safe areas/alvos/overflow; overlays/foco/teclado/backdrop/gesto/inert/saída suave; prefers-reduced-motion e axe. A suíte captura pageerror e console.error e exige lista vazia em cada cenário: nenhum erro nesses testes.

Não se modificaram testes de navegador ou componentes visuais para fazer a suíte passar. Estilos e tokens são idênticos à base homologada. As verificações de bundle recusam mapas, conteúdo técnico de laboratório no app e padrões proibidos; não houve inclusão de assets ou código privado.

## Limitações explícitas

Não foi executado Safari/iPhone físico, Chrome/Android físico ou QA de uma Home/Rotinas React final, pois essas superfícies não foram integradas. Não se declara fidelidade visual dessas superfícies. A Publicações privada não foi transportada nem recebeu nova comparação visual; proteção aqui é ausência de alterações no Shell/CSS/social e testes da fundação pública. Não há backend, autenticação, upload, persistência de treino ou Sessão real para validar. Dry-run não valida permissões reais de uma conta Cloudflare nem entrega URL pública. Avisos NO_COLOR/FORCE_COLOR do runner não foram erros de console do aplicativo.
