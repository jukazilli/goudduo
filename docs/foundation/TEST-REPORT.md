# P1 — Relatório de verificação

## Resultado por escopo

| Verificação | Resultado efetivamente observado |
|---|---|
| P0-H | Head da PR #30 idêntico ao auditado, nove Markdown apenas, referências/IDs/tabelas validados, sem achados na revisão/varredura de padrões de credenciais; main não havia avançado; merge normal autorizado f04307eca83dbd8cc442f5f034e1665b3acb5c47 |
| Origem privada | pnpm lock reproduzido, typecheck via build passou, Vite build passou (warning de chunk >500kB), 47 testes existentes passaram; código/lock preservados e árvore Git limpa |
| Instalação P1 | pnpm install --frozen-lockfile executado com as versões exatas e política de builds explícita; nenhum update indiscriminado |
| Typecheck P1 | tsc --noEmit passou incluindo aplicação, Lab, testes e configuração Cloudflare |
| Unitários/integração | 9 testes / 3 arquivos Vitest passaram: domínio, navegação e lifecycle/foco de overlay |
| Segurança de bundle | 4 testes Node passaram: artefato allowlisted, mapas/arquivos inesperados, Lab/credenciais e symlinks |
| Builds | Aplicação e Lab passaram em diretórios separados; sourcemaps/publicDir/SW ausentes; fontes, SVG e avisos de terceiros verificados |
| Navegador | 20 testes Chromium passaram (4 casos × 5 larguras), sem exceção de página/erro de console nos cenários; resultados resumidos em evidence/qa-results.json |
| Acessibilidade automatizada | Axe sem violações nos cenários da aplicação e modal; teclado/foco, Tab/ShiftTab/Escape e redução de movimento verificados |
| Cloudflare | Preparação e validação por cf dry-run; assets-only, nenhum binding/código de Worker, sem upload; não comprova deployment remoto/Safari |

## Cobertura de navegador

Larguras 320, 375, 390, 414 e 430 CSS px, altura 844. Chromium do ambiente com contexto touch. Casos por largura:

1. Cinco destinos, três contextos da Home, último contexto preservado ao voltar da aba Perfil, back/forward, reload, rota direta e caminho inválido.
2. Sheet/modal, inert, foco inicial/trap/restauração, backdrop, Escape/voltar, gesto descendente por eventos touch reais do Chromium via CDP, reabertura por forward e fechamento rápido idempotente.
3. App comum sem inspetor; Lab separado; nome sintético refletido no Perfil, revisão de treino compartilhada, navegação e restauração de scroll (incluindo abrir/fechar overlay).
4. Ausência de overflow, alvos de navegação >=44px, insets top/bottom simulados, redução de movimento, axe e ausência de dados em localStorage/sessionStorage.

Screenshots da fundação original P1, sem mídia privada: [390px](evidence/p1-shell-390.png), [sheet](evidence/p1-sheet-390.png), [Lab](evidence/p1-lab-desktop.png). Há capturas das cinco larguras e seus hashes em [capture-results.json](evidence/capture-results.json). São evidência de execução da **casca neutra P1**, não novas referências de Home V5.3, Perfil, Rotinas ou Publicações.

## Problemas encontrados e corrigidos

- Console 404 por ausência de favicon: HTML agora referencia a wordmark pública já existente, empacotada pelo Vite.
- Papéis ARIA de main/abas: main mantém landmark e painel de abas fica em seção própria dentro dele; navegação da Home preserva landmark separado.
- Retorno de foco intermitente em 320px: opener agora é capturado antes de aplicar inert; foco só retorna ao contexto apropriado após desmontagem. Rodada final de cinco larguras passou.
- A primeira CI remota passou instalação/tipos/testes/build/CF, mas `ubuntu-latest` apontou para Ubuntu 26.04, não suportado pelo Playwright 1.56.1 fixado. Runner fixado em Ubuntu 24.04; resultado da nova execução deve ser consultado na PR. Não foi atualizada a stack para contornar a imagem do runner.
- Dois fechamentos rápidos de overlay poderiam voltar duas entradas: guarda por chave impede back duplicado até popstate.
- Primeira allowlist de build não contemplava o fallback WOFF legítimo do Fontsource: WOFF/WOFF2 agora explicitamente aceitos; fontes foram limitadas ao subset latino necessário ao português, mantendo licenças.
- Primeira tentativa E2E ocorreu antes de existir build Lab e expirou aguardando servidor. O guia exige ambos os builds e a CI os gera antes do Playwright. Rodadas com falha não são apresentadas como aprovadas; os resultados finais substituem somente o estado técnico desses ensaios.

## Checklist React e arquitetura

Revisão manual apoiada na skill React Best Practices: hooks no topo e dependências estáveis, reducer imutável, dispatch separado, dados derivados por seletores, IDs estáveis, cleanup de listeners/timers, sem fetch/waterfall/backend, sem biblioteca de estado/router/motion extra, import estático de ícones com tree-shaking e nenhuma importação do Lab pela entrada comum. Não se introduziu Next.js/Tailwind ou biblioteca de UI sugerida genericamente por ferramenta, pois a stack e CSS deste projeto são explícitos.

## Limitações e regressões

- **Safari/iPhone e Chrome Android físicos não testados.** Chromium touch/insets simulados e axe não substituem teclado/VoiceOver/TalkBack/safe areas reais. Homologação física continua pendente.
- Publicações foi exercitada somente na origem privada. Seu código não está no destino: **paridade/regressão do port ainda não avaliável**, não “zero regressões comprovadas”. Ver BASELINE-PUBLICACOES.md; capturas privadas não entram na PR pública.
- Nenhum serviço real de autenticação/OTP, persistência, health data, pagamentos, Match ou verificação profissional foi integrado ou testado.
- Nenhum deployment público, recurso Cloudflare, produção ou domínio foi criado/alterado. Teste remoto HTTPS/rotas/cache e autorização de audiência permanecem gates.
- A workflow GitHub apenas prepara validação de instalação/tipos/testes/build/CF dry-run/E2E. Resultado de CI remoto deve ser consultado na PR; execução local não é prova de CI remoto.
- O scanner de bundle usa allowlist, hashes e padrões, com testes negativos; não é certificação exaustiva contra toda forma de informação sensível. Nesta P1 o controle principal é ausência de transporte de arquivos privados.

## Repetição e rastreabilidade

Comandos reproduzíveis no README da fundação. Logs completos locais de execução ficam em `/workspace/scratch/p1/`; relatórios/traces E2E são gerados em `test-results/` (ignorados no Git e anexáveis por CI). Builds incluem SHA/dirty/hash do lock e inventário de arquivos. Depois do commit final, reconstruir/validar artefato limpo antes de qualquer autorização de deploy; não confundir screenshot de árvore em trabalho com versão de produção.

A P1 está entregue para revisão técnica/UX, não homologada automaticamente. Nenhum merge da implementação ou início de P2 faz parte deste relatório.
