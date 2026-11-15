# Regressão e segurança P2-B6

Base7e421cfb97e8a8ab2c6ba3271571a604b2d501ea, merge controlado da P2-B5. Node24.22.1/pnpm11.25.0 fixados; React19/TypeScript/Vite preservados. Playwright1.56.1 com Chromium141.0.7390.37 do pacote do projeto, sem override para navegador mais novo. Viewports320/375/390/414/430×844, touch.

## Verificações

| Check | Resultado |
| --- | --- |
| Instalação frozen-lockfile | PASS, sem alteração de package/lock |
| Typecheck | PASS, inclusive nos dois builds |
| Unitários/integração | 102 PASS/10 arquivos: 93 anteriores e9 novos |
| Build app/Lab | PASS, saída e guard separados |
| Bundle | 4 PASS; guard público intacto |
| Playwright | **125 PASS**,100 anteriores e25 novos, zero falhas/skips/flaky na rodada final local |
| Capturas | 75:6 estados pareados×5 larguras +2 estados só React×5 +5 referências brutas; zero pageerrors |
| Segurança e diff | Sem port/mídia/dependência/backend/persistência; arquivos protegidos sem diff |

Logs/harness de investigação em /workspace/scratch/p2b6, fora do Git; relatório/traces de execução em test-results ignorados. Capturas e medidas/hashes estão na documentação. O estado efetivo da CI fica na [PR #39](https://github.com/jukazilli/goudduo/pull/39), sem presumir aprovação remota por resultado local. A rodada local final usa os builds do commit dc6d183a5c30f8ad3a64d1e3d6b8f3572efca241; a atualização posterior deste relatório é exclusivamente documental, com fontes/capturas idênticas. Cloudflare somente dry-run da CI preexistente; nenhum comando adicional de deploy/preparação ou mudança de configuração.

## Cobertura nova

Unitários: grupos/top/lower/órfão/restauração; entidades por referência; dois indicadores legítimos em vez de três mocks; ID compartilhado deduplicado sem política nova; ausência de rotina/vínculo/prescrição válida; seleção; Hero não mostra rascunho e reconhece commit/revisão/desvínculo; estrutura neutra e ausência de arquivo/upload; isolamento de contextos e manutenção da expansão/dados.

Cinco jornadas E2E por largura: criação completa pelo Editor/Biblioteca da aplicação comum→salvar→Home→editar→nova revisão do mesmo ID; geometria218px/gutter/gap, expansão superior/inferior e órfão; indicadores, estado/contextos/scroll/back/Home ativa; dia livre sem treino inventado; teclado/Escape/foco, ausência de formulário corporal, Pulse vazio, safe areas simuladas e reduced-motion/axe. Cenários exigem zero pageerror/console.error. As100 jornadas anteriores continuam obrigatórias. O Hero também verifica gesto horizontal e rejeição de intenção predominantemente vertical.

## Falhas intermediárias e correções

- Primeiro build bloqueou URL para a Issue privada GODUOIT#160 pelo guard existente. Mantido o guard sem ofuscação/allowlist extra; só o link saiu do runtime, Em construção permanece, referência preservada nos documentos. [Delta X11](HOME-V53-CONTRACT.md).
- Primeiro cenário novo de teclado:4/5 PASS em320; seletor nomeado Expandir Peso deixou de encontrar o mesmo botão após ele mudar corretamente para Recolher Peso. Usado locator estável dentro do card, mantendo aria-expanded/foco/Escape. Rodada dirigida final5/5 PASS.
- O teste anterior de catálogo vazio substituía useDemoState por um retorno sem chamar seu hook original, gerando aviso de ordem de Hooks no PrototypeApp ao renderizar. O mock agora chama o hook original antes de devolver o snapshot de teste. Nenhuma asserção foi removida, nenhum override existe no produto. Nova suíte102 PASS sem esse aviso.
- Primeira suíte completa:120 PASS/5 falhas na expectativa P1-R1 de zero slots Pulse em Treinos. Atualizada para a mudança estrutural expressamente autorizada: exige exatamente um squircle vazio/aria-hidden/sem ações, conserva ausência em Publicações e snapshot de estilos externos. Não foi removida a proteção de contexto; nenhuma lista social passou a existir.
- Primeiro harness Python se chamou inspect.py e colidiu com o módulo padrão; renomeado fora do repositório, depois coleta completa concluída. Isso não é falha do aplicativo.

Não se contam essas falhas como aprovações. Não houve relaxamento de expectativas, timeout, retries ou skip para ocultar regressão.

## Proteções verificáveis

Única integração comum: PrototypeApp injeta a Home em HomeCompositions.treinos e conserva ID de apresentação. Novos módulos ficam em src/surfaces/home; nenhum código privado/copied HTML/CSS reset. Home usa seletores/reducer/provider/fixtures existentes sem alteração. Hero não tem cópia independente da entidade.

AppShell, ShellHeader, TabBar, NavigationProvider/navigation, surface-contracts, OverlayHost, tokens/app.css, RoutinesHome, WorkoutEditor, Biblioteca de produto, domínio/estado/seletores/fixtures, assets, package/lock e configuração Cloudflare preservados. Apenas o mock do teste anterior da Biblioteca foi corrigido conforme acima. Não houve port/redesign de Publicações/Business; não se declara paridade visual com Feed privado ainda não integrado.

Guard/bundle continua exigindo allowlist, sem mapas/symlinks/credenciais/marcadores privados/Lab no app. Verificação adicional confirma ausência de homeView/workoutDots/reflow IIFE/identidade legada/HTML de referência no artefato comum. Documentos/evidências não entram em dist/app.

Arquivos privados transportados: **nenhum**. Nenhuma mídia, raster, SVG alterado, dataset pessoal/corporal, arquivo de catálogo privado ou monólito GODUOIT. Somente ícones Lucide e fontes/wordmark públicos já presentes. Nenhuma dependência nova, armazenamento, backend, autenticação ou Sessão operacional. Projetos GitHub privados não foram modificados nem tiveram status presumido.

## Limites

Não testados Safari/iPhone ou Android físicos, VoiceOver/teclado virtual/insets reais. Chromium com toque e insets CSS simulados não substitui esse QA. Funções de Progresso, Ranking social, Status/check-in, Biblioteca independente, Pulse, Sessão, cópia/referência e direitos de mídia continuam gates. Diferenças cosméticas estão no documento visual; falhas funcionais não são classificadas como refinamento posterior. Nenhum deploy, URL de preview ou início de P2-B7.
