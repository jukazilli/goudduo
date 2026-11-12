# Cloudflare — preparação técnica P1

## Configuração e resultado

Cloudflare é principal; Vercel permanece fallback sem configuração. `cloudflare.config.ts` usa `cf/config` com alvo **proposto** `goudduo-p1-preview`, data de compatibilidade 2026-11-12 e `assets.notFoundHandling=single-page-application`. Sem entrypoint, bindings, conta, domínio, rotas de produção ou credenciais. Não se presume que esse nome esteja livre: confirmar e escolher um recurso novo autorizado antes de qualquer publicação; não modificar os três Workers existentes da conta consultada na P0.

cf **1.0.0-beta.30** é fixado como devDependency. Esta versão aceita diretório estático como argumento; não é necessário atualizar Vite 6 ou instalar plugin Cloudflare/Vite beta. `cf` é a CLI escolhida para este projeto novo sem configuração Wrangler, conforme a skill Cloudflare. Nenhum wrangler.toml/jsonc foi criado e nenhum scaffold automático foi usado.

```sh
pnpm run build
pnpm cloudflare:prepare
pnpm cloudflare:validate
```

`cloudflare:prepare` primeiro verifica a allowlist do bundle e executa **`cf deploy dist/app --dry-run --mode production --provision=false`**. O CLI gera `.cloudflare/output/v0` com assets e worker.config.json, sem bundle de código de Worker. `cloudflare:validate` usa **`cf deploy --prebuilt --dry-run --mode production`**, que valida esse mesmo Build Output sem reconstrução/upload. O nome do modo é contexto de empacotamento, **não autorização nem execução de deploy de produção**.

O dry-run não precisa de credenciais; os logs observados indicaram assets-only, zero bindings e saída sem upload. `.cloudflare` é ignorada pelo Git. Esses comandos são de validação; não criam nem alteram recursos da conta.

## O que está pronto

- React/TS/Vite gera dist/app independente do Lab; publicDir=false impede cópia de estudos/SW/ícones legados.
- Rotas diretas/reload têm fallback SPA; arquivos de assets ausentes não devem receber HTML como se fossem JavaScript. O servidor local de QA verifica esse limite; conferir também no primeiro preview Cloudflare autorizado.
- Fontes/SVG públicos e avisos de licença incluídos; sourcemaps excluídos.
- `_headers` define nosniff, referrer/noindex, CSP, cache imutável de assets com hash e revalidação do HTML/manifesto.
- `build-info.json` contém alvo, SHA completo, dirty e hash do lock; `check-bundle` informa hashes/tamanhos por arquivo. O CLI validou a estrutura local, sem comprovar ainda HTTPS/deep links em um Worker remoto.
- Nenhuma lógica server-side, banco, auth ou binding é adicionado para servir a SPA.

## Passos ainda não autorizados

Antes do primeiro deploy, proprietário deve aprovar a audiência e o inventário do **artefato específico**, confirmar autorização de código/assets e liberar a criação de um Worker novo. Leitura de conta na P0 não comprova escrita, plano, disponibilidade de nome, Workers Builds/GitHub App ou permissão de publicar.

1. Confirmar conta e projeto novo, permissões mínimas e audiência; não usar credenciais no repo/chat/variáveis VITE_*.
2. Construir a partir de SHA aprovado com árvore limpa e `pnpm install --frozen-lockfile`; verificar dirty=false no build-info e ausência de código privado.
3. Escolher Worker Previews atuais (ambiente por branch). No CLI fixado, a forma para prévia estática é `cf previews deploy dist/app --preview-name <nome-aprovado>`; executar somente após gate específico. Revisar `cf cli search` e ajuda da versão fixada antes do uso. Não confundir antigo Version URL, que pode usar recursos de produção, com Preview.
4. Se conectar GitHub/Workers Builds, revisar disparos por branch e **não ativar deploy automático da main** por efeito colateral. O workflow P1 só valida; não contém token ou comando de deploy efetivo.
5. Entregar URL HTTPS específica do deployment, alias da branch, SHA/lock, PR e inventário das superfícies. Verificar Safari/iPhone real, refresh, assets, histórico, foco/teclado e headers no ambiente remoto antes de homologar.
6. Para rollback, reusar artefato/SHA aprovado e registrar novo deployment/URL ou escolher uma versão retida. Preview possui limites de retenção; não prometer URL eterna. Não promover produção automaticamente.

Lab: dist/lab deve permanecer isolado e não é enviado pelo script de preparação, que aceita apenas dist/app. Caso seja desejada hospedagem do Lab, decidir origem/proteção separadas explicitamente. Noindex não é controle de acesso.

O guia é preparação, não uma autorização embutida para o operador executar comandos de upload. A P1 para após a PR Draft.

## Fontes consultadas

- [CLI/config de projeto](https://developers.cloudflare.com/cf/projects/cloudflare-config/)
- [CLI CI e dry-run](https://developers.cloudflare.com/cf/ci/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/)
- [Workers Previews](https://developers.cloudflare.com/workers/previews/)
- A ajuda instalada do cf beta.30 confirmou argumento de diretório estático, dry-run e prebuilt. Não se seguiu automaticamente tutorial que instala outro framework/plugin ou cria um backend.
