# P1 — Fronteira de divulgação e proveniência

## Decisão de execução

O comando P1 autoriza uma fundação independente quando arquivos privados específicos ainda não estão liberados. Esta branch **não transporta nenhum arquivo do GODUOIT**. Reutiliza decisões de arquitetura, navegação, contratos e versões de dependências públicas, mediante implementação nova e mínima. Não é um novo redesign nem substitui as superfícies existentes.

## Allowlist anterior à implementação

| Grupo permitido | Origem | Finalidade / fronteira |
|---|---|---|
| src/app, src/state, src/components, src/styles | Código original escrito na P1 | Shell neutro, roteamento/retorno, estado determinístico, overlays e safe areas; nenhuma superfície antiga copiada |
| src/lab e lab/index.html | Código original P1 | Cenários/inspeção em build independente; excluído do bundle comum |
| assets/brand/goudduo/*.svg | Já públicos na main goudduo, sem alteração | Consumir wordmark oficial existente, sem gerar novo logo |
| package.json/pnpm-lock.yaml e configurações novas | Metadados recriados com dependências públicas | Mesmas versões compatíveis do lock da origem; não publicar lock privado por cópia |
| scripts/tests/.github/workflows | Código original P1 e ferramentas públicas | Validação/build/QA, sem credenciais nem deployment automático |
| docs/foundation e evidências P1 aprováveis | Documentação original P1 | Proveniência, testes e preparação de deploy; nenhuma captura privada incluída |

Dependências alvo correspondentes à origem: React/DOM 19.3.1, TypeScript 5.9.3, Vite 6.4.5, plugin React 4.7.0, Lucide React 1.66.0, Fontsource Jakarta 5.3.0, Vitest 3.2.7, Testing Library React 16.3.3/jest-dom 6.10.0, jsdom 26.1.0 e types correspondentes. São referências públicas de versão, não autorização de publicar código privado. Playwright/axe são complementos de QA justificados; CLI cf é ferramenta de empacotamento sem backend.

## Bloqueados para publicação nesta branch

Todos os arquivos privados GODUOIT: HomeShell, CSS/Feed/Pulse, App/ApprovedApp/catalog, domain/fixtures, BrandMark/SVGs legados, public/, manifests/SW/Gooduu, referências lab/, mídia/GIFs/Drive, fotos de usuários, logs, .env e histórico Git. Não importar ../GODUOIT, symlinks ou arquivos fora da raiz. Não colocar cópias desses arquivos na pasta pública para contornar o gate.

A Publicações comum permanece em estado neutro enquanto o port não está autorizado. A baseline será capturada **somente em /workspace/scratch/p1**, fora desta branch; código e imagens do Feed não serão replicados ou anexados à PR pública. Regressão visual do Feed no destino é **não avaliável até integração autorizada**, e não “paridade aprovada”.

## Bundle e dados

publicDir desligado; importar apenas a wordmark já pública e fontes de dependência licenciada. Saídas independentes dist/app e dist/lab; nenhuma origem privada ou Lab na aplicação. Sem sourcemaps, service worker ou rede de backend. Usuário/rotina/exercício sintéticos, identificados no Lab; nenhum dado pessoal, senha, saúde, foto corporal, token ou persistência local. Versionar hashes de artefatos/metadados de build sem identidade da conta Cloudflare.

Verificações posteriores devem conferir dependências/licenças, árvore transitiva e arquivos efetivamente gerados. Esta allowlist não é autorização de deploy público: criação de recurso, audiência e divulgação do artefato exigem gate posterior específico. Nenhum Worker existente será alterado.
