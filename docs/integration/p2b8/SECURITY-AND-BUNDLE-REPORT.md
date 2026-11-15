# Segurança, dados e bundle

Nenhum arquivo/código/mídia do GODUOIT foi transportado. Não houve consulta necessária a novas fontes privadas nesta missão: a análise usa contratos públicos consolidados e código independente já integrado. Allowlist P2-A permanece proposta, não autorização. Nenhum asset/fonte/dependência/lockfile/configuração Cloudflare ou workflow foi alterado.

Assets existentes: wordmark SVG oficial, fonte Plus Jakarta Sans licenciada pelo pacote e Lucide. Pulse não usa fotos de pessoas, GIFs, avatares privados, conteúdo, contadores ou estados de visto fictícios. Fixtures são sintéticas e determinísticas; os novos testes não inserem controles técnicos nem catálogo alternativo no app comum.

Bundle guard existente preservado: allowlist de artefatos, proibição de sourcemaps/credenciais/marcas privadas/symlinks e marcadores do Lab no app. Quatro testes negativos/positivos permanecem; builds app/Lab executam guard. Bundle não contém HTML experimental ou capturas documentais. Nenhuma persistência sensível/backend/storage ou serviço social novo.

Referências locais usadas na coleta, conferidas antes da execução:

| Artefato público | Commit | Blob | SHA256 |
| --- | --- | --- | --- |
| Home V5.3 |073183253fce5fcd0b3474c725e84ff67d3dfec5|8c698708dd79449472d6f5c7e536664939de4951|7cb2bedd0af72c09c703337f889e94cb4e223ab9d5ff6104b584d62895ffb18f|
| Rotinas V7.4 |3f8b2c7c93a33a713c780305e672e1ec7998ceaf|122275b3cb03bd996b477375d1bbc73ae29c5c3e|42ac581d3c76a3852da221ba68495025bbfa26f2d96aeda9c43ba0261a5a849d|

URLs: [Home](https://github.com/jukazilli/goudduo/blob/073183253fce5fcd0b3474c725e84ff67d3dfec5/lab/previews/home-treinos-v5.3-charcoal.html) e [Rotinas](https://github.com/jukazilli/goudduo/blob/3f8b2c7c93a33a713c780305e672e1ec7998ceaf/prototypes/rotinas/motion-v7-4/index.html). HTMLs permanecem fora da branch de aplicação; screenshots públicas ficam em docs e não entram no dist.

Verificação de escopo: git diff da base para src de produção, package/lock/assets/styles/config/workflow deve ser vazio; apenas novos testes, coletor e documentos. `git diff --check`, install frozen, typecheck, unitários, builds, bundle e Playwright integram a validação. Metadados de build registram SHA/dirty/hash do lock; build de entrega regenerado em árvore limpa.

Cloudflare permanece **sem publicação**. Somente dry-run do workflow preexistente, sem novo comando de provisionamento/configuração ou recurso remoto. Não foi gerada URL pública. Código de teste não é prova de serviço em produção.

[Manifesto de escopo e resultados](evidence/scope-and-test-audit.json):49 arquivos de produção/config/dependências conferidos byte a byte contra a base, sem alteração; hashes de cada arquivo e estatísticas reais dos155 E2E (zero unexpected/skipped/flaky). Testes novos não fazem parte desses arquivos de produção. O git diff final deve mostrar somente testes/coletor/docs.
