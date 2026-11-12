# P1 / P1-R1 — Fundação executável em revisão

A P0 foi homologada documentalmente e a PR #30 integrada em `f04307eca83dbd8cc442f5f034e1665b3acb5c47`. Registros: [decisão](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6818835814) e [integração](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6818843535). A [Issue #29](https://github.com/jukazilli/goudduo/issues/29) permanece aberta. O pacote `docs/reconciliation/` é histórico auditado; esta P1 não homologa as superfícies pendentes nem resolve C03–C06 visualmente.

**P1-R1:** [reconciliação do Shell](P1-R1-RECONCILIACAO-SHELL.md) registra diagnóstico, contratos, correções e gates. A P1 ainda não está homologada pelo proprietário.

## Arquitetura efetivamente implementada

- React 19.3.1 + TypeScript 5.9.3 + Vite 6.4.5, versões exatas compatíveis com o lock investigado do GODUOIT. Resolução independente das dependências públicas, com lock próprio; não houve importação do lock privado.
- `src/app/navigation.ts`: adaptador único da History API, destinos/contextos tipados, rotas diretas, push/pop/replace, Voltar/Avançar, último contexto Home, overlays no histórico e posições de scroll por entrada. Nenhum React Router ou runtime de aplicação adicional.
- `src/app/AppShell.tsx`: header Home ou contextual/Editor conforme rota; acesso e imersivo sem chrome global; cinco destinos Home/Rotinas/Match/Mensagens/Perfil e três contextos Treinos/Publicações/Business. Ícones House/Dumbbell/Map/MessageCircle/User; usuário sintético sem foto. Sem chevron de contexto da marca. Superfícies finais não integradas usam estados neutros, sem métricas, Feed improvisado ou capability profissional.
- `src/app/surface-contracts.ts`, `ShellHeader` e `TabBar`: contratos de chrome/composição por família, slots independentes de Home/Pulse, ação somente com handler e footer do Editor acima da TabBar. Sem implementação das telas finais.
- `src/state/`: Context de estado + Context de dispatch com useReducer; usuário/rotinas/dias/treinos/exercícios e estados sociais por IDs. Commit local atômico, revisão contra atualização obsoleta, parâmetros por instância, validação de duplicidade e clonagem de rascunho. Não é CRUD completo nem backend. Selectors de Home/Rotinas leem a mesma entidade; não há coleção independente por tela.
- `src/components/`: Button/Input/EmptyState com consumidores reais no Shell/Lab; OverlayHost com sheet/modal, foco, inert, backdrop, Escape/Voltar, gesto descendente no handle, saída antes de unmount e reduced-motion. Fechamento idempotente impede dois eventos rápidos de voltar duas páginas. Opener é capturado antes de aplicar inert para retorno de foco confiável.
- `src/styles/app.css`: Plus Jakarta Sans local, Lucide e SVG já público. Tokens técnicos de safe area sem offsets fixos; papéis institucionais/chrome em tokens.css e primitives prefixadas foundation-*, sem reset genérico de controles. Sem importação do CSS privado de Publicações, sem promoção do azul candidato #0866E8 a regra global. Medidas da casca neutra são escolhas técnicas de fundação para alvos/legibilidade, não nova homologação de design das telas.
- `src/lab/` e `lab/index.html`: entrada separada com seleção de superfície/viewport, edição de cenário sintético, teste de sheet/modal e stress de scroll. O inspetor não entra no grafo da aplicação comum. O Lab permite verificar estado compartilhado sem colocar controles de QA no produto.

## Fronteira e proveniência

Ver [allowlist e segurança](SECURITY-AND-PROVENANCE.md). **Zero arquivos privados transportados.** O código desta fundação é original P1, implementando os contratos aprovados e os pontos de integração. A autorização P1 permite explicitamente essa estrutura independente enquanto o port seletivo aguarda liberação. Não é reinício do produto nem substituição das superfícies homologadas.

| Grupo | Reuso / adaptação real |
|---|---|
| Arquitetura e contratos da origem | Referência investigada de shell, cinco destinos, intents/retorno, domínio e dependências; implementação independente nesta branch |
| Componentes privados GODUOIT | Nenhum copiado ou adaptado por transporte; HomeShell/Feed/Pulse/Rotinas/Sessão/Perfil/brand/domínios antigos permanecem bloqueados para divulgação |
| Wordmark goudduo | Mesmo arquivo público `assets/brand/goudduo/goudduo-wordmark-black.svg`, sem alteração de bytes; já na main antes da P1 |
| Fontes/ícones/bibliotecas | Dependências públicas; versões, licenças e avisos preservados em THIRD_PARTY_NOTICES.md e no artefato |
| Fixtures | Originais, sintéticas, determinísticas, sem pessoas reais/mídia/serviços; permanecem apenas na memória |

## Rotas e retorno

Rotas principais: `/` e `/home/treinos`, `/home/publicacoes`, `/home/business`, `/rotinas`, `/match`, `/mensagens`, `/perfil`. Caminho inválido recebe estado de página não encontrada. `?panel=search/create/activity` abre overlay diretamente sem dados pessoais na URL. Ao fechar uma entrada direta, replace preserva a página; em navegação interna, back recupera a entrada anterior. Controles modificados de link (Ctrl/Cmd/Shift) preservam comportamento nativo.

Rotas preparatórias de Splash/Acesso/Onboarding, Editor, Sessão, Histórico e Perfil subordinado: ver [tabela e políticas R1](P1-R1-RECONCILIACAO-SHELL.md#rotas-e-políticas-preparatórias). Elas não implementam autenticação, telas finais ou uma jornada de convidado. `/` continua Home neutra até a integração autorizada de Acesso.

Estado e posições de scroll sobrevivem às transições dentro da sessão da página; reload reinicia fixtures e posições em memória. Na Home, também é restaurado o último scroll de cada contexto; Home já ativa volta ao topo. A identidade da rota sobrevive via URL; isso não significa persistência de dados. Não há localStorage, sessionStorage, autenticação, OTP, envio, Match confirmado ou habilitação profissional.

## Execução local reproduzível

Node **24.22.1**, pnpm **11.25.0** (fixados em .node-version/packageManager). Não atualizar Vite/React indiscriminadamente.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Aplicação local: `http://127.0.0.1:5173/`. Lab local de desenvolvimento: `http://127.0.0.1:5173/lab/`. Em distribuição, o Lab usa um artefato/origem separado; não existe rota de Lab no bundle comum.

```sh
pnpm typecheck
pnpm test
node --test tests/bundle.test.mjs
pnpm run build
pnpm run build:lab
pnpm exec playwright install chromium
pnpm exec playwright test
```

O Playwright inicia dois servidores de teste somente no loopback (4173 app, 4175 Lab), consumindo os builds. Se Chromium já existir, definir `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` para seu executável; o ambiente desta entrega usou `/usr/bin/chromium`. Isso não altera a aplicação. Para inspecionar manualmente o build, `node scripts/serve-preview.mjs app 4173` e, em outro terminal, `node scripts/serve-preview.mjs lab 4175`.

`pnpm-workspace.yaml` permite scripts nativos apenas de esbuild e workerd. A política de instalação do ambiente registrou exceções de idade para versões beta exatas da ferramenta cf e dependências transitivas; elas estão explícitas e fixadas, não autorizam atualizações automáticas. O runtime de aplicação continua exclusivamente React/TS/Vite. Basic SSL e QRCode da origem foram omitidos porque esta P1 não tem consumidores correspondentes.

## Build, licenças e Cloudflare

`dist/app` e `dist/lab` independentes, sem sourcemaps/publicDir/service worker. `build-info.json` identifica alvo, SHA, estado dirty e hash do lock; o inventário do bundle calcula tamanho/hash de cada arquivo. Avisos de terceiros são distribuídos junto aos assets. Builds de homologação/publicação exigem SHA e árvore limpa, com audiência/artefatos autorizados.

Ver [guia Cloudflare](CLOUDFLARE-PREVIEWS.md). Workers + Static Assets foi validado localmente por cf dry-run; nenhum recurso, domínio, segredo ou deployment foi criado. Não existe link público desta P1. Workflow de validação não faz deploy.

## Diferenças justificadas em relação à P0

1. Em vez de transportar componentes privados sem liberação, foi executada a alternativa independente explicitamente autorizada na P1. Os pontos de integração permanecem documentados; Publicações não foi reconstruída.
2. O CLI atual cf beta.30 aceita diretório estático diretamente e emite Build Output válido, sem exigir plugin beta do Vite ou arquivo Wrangler. Isso preserva Vite 6 e dispensa servidor/adapter próprios de Cloudflare. cf/miniflare são ferramentas de desenvolvimento, não runtime da aplicação.
3. O contrato de navegação é pequeno e tipado com History API, conforme proposta; não foi necessária biblioteca de rotas. Persistência em disco foi deliberadamente omitida.
4. Componentes foram adicionados somente com consumidores Shell/Lab; não foi criada uma biblioteca genérica inteira nem um editor/Feed alternativo.

## Gates e próximo recorte

[Baseline de Publicações](BASELINE-PUBLICACOES.md) e [relatório de testes](TEST-REPORT.md). P2 recomendada: liberar allowlist específica de tipos/componentes necessários e reconciliar referência/placement de Home V5.3; depois integrar Home Treinos + Rotinas/Editor/Biblioteca V7.4 sobre esta store. Não construir Peso/Medidas/Consistência ou nova descoberta de navegação por inferência. Publicações permanece protegida; habilitar seu port somente quando a divulgação dos arquivos estiver autorizada.

Esta branch/PR P1 termina em revisão Draft. Merge, deploy público e P2 dependem de autorização posterior.
