# Contrato PWA e atualização

Aplicação principal somente. `src/main.tsx` registra `/sw.js` apenas no build; o Visual Lab tem entrada/artefato/origem separados e não importa o registro. `publicDir` permanece desabilitado. Sem plugin PWA ou nova dependência.

## Manifest e identidade

`id: /`, nome e nome curto goudduo, `start_url: /home/treinos`, `scope: /`, idioma pt-BR, display standalone, fundo e tema brancos derivados do Shell oficial. Apple touch icon 180×180 e metatags capable/title/status-bar. Manifest com `crossorigin=use-credentials` para permitir a sessão de acesso de mesma origem, quando houver proteção corretamente configurada. Nenhum dado pessoal nas URLs.

## Inventário exato

O build app copia somente os cinco PNGs permitidos e o manifest próprio. `scripts/pwa/build.mjs` produz `/sw.js` a partir de `scripts/pwa/worker.js`, SHA do commit e hashes de index/JS/CSS/fontes/SVGs/ícones/manifest. Não precacheia build-info, avisos, SW, rotas, responses de API, payloads, query strings ou registros do store.

Instalação all-or-nothing: GET mesma origem com credentials, no-store e redirect:error; exige sucesso, MIME esperado e digest SHA256 exato. Login HTML, redirects e bytes alterados são rejeitados. Respostas cacheadas retêm apenas headers de conteúdo/segurança permitidos e timestamp local; headers de identidade não são retidos.

Navegações são network-first, sem gravar a URL ou a resposta de rota. Só uma falha de rede usa `/index.html` estático previamente verificado. 401/403 e redirects online continuam sendo respostas de acesso, não fallback offline. Recursos do inventário usam cache-first; unknown URLs, POST, origens externas e assets com query não recebem tratamento de cache.

Cache `goudduo-static-<digest>`, exclusivo desta origem/aplicação. Validade máxima de sete dias por resposta. Expirado não vira interface offline indefinida; o uso online continua e uma instalação nova verificada recompõe o conjunto. Ao ativar nova versão, remove apenas caches antigos com esse prefixo. Não remove caches alheios.

## Atualização sem perda silenciosa

Registro `updateViaCache: none`; busca atualização ao registrar, retornar à aba, recuperar conexão e a cada 30 minutos enquanto visível. SW e manifest recebem política de revalidação; SW no-store. O digest muda com o artefato/commit.

Não há skipWaiting, auto-reload ou recarga por controllerchange. Nova versão aguarda o fechamento dos clientes anteriores. Isso evita apagar séries/rascunhos da memória por atualização em segundo plano. Fechar todos os clientes e reabrir online ativa a versão nova e limpa o cache antigo. A navegação online pede HTML atual da rede mesmo enquanto o worker anterior ainda espera substituição.

Mecanismo não oferece armazenamento de treinos/resultados, recuperação pós-reload, sincronização nem garantia de funcionamento offline de serviços futuros.
