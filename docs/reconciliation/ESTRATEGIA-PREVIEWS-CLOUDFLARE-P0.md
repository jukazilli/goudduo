# Estratégia de previews Cloudflare — P0

**Recomendação para aprovação: Workers + Static Assets, sem código server-side.** Compilar a mesma aplicação React + TypeScript + Vite e servir somente os artefatos aprovados. Pages permanece alternativa dentro da Cloudflare; Vercel só após autorização específica. Nenhum recurso, pipeline ou deploy foi criado/configurado nesta P0.

## 1. Evidência de acesso e escolha

O plugin Cloudflare autenticou e as consultas GET de contas, Workers e Pages tiveram sucesso. A conta acessível retornou três Workers e nenhum projeto Pages. Não foram lidas configurações internas dos Workers, alterados recursos ou testadas permissões de escrita. Nenhum Worker existente foi eleito como destino. Conta/plano, Workers/Pages Write, instalação GitHub App no repositório escolhido, domínio e controle de acesso de previews ainda precisam ser confirmados antes da primeira configuração autorizada.

A documentação atual da Cloudflare recomenda Workers para novos websites/SPAs. Static Assets serve o build Vite sem adaptar o framework e sem executar código de servidor. O critério é simplicidade + integração Git/previews/versões, não usar funções, banco, agentes ou runtime extra.

## 2. Comparação com Pages

Consulta documental: 12/11/2026 UTC, via plugin Cloudflare Docs. Preços/limites são referência de planejamento, não plano contratado da conta.

| Critério | Workers + Static Assets | Pages | Consequência para goudduo |
|---|---|---|---|
| React/TS/Vite | Consome dist estático; sem adapter SSR | Build estático Vite nativo | Stack preservada nas duas |
| Configuração mínima | Diretório de assets + fallback SPA; sem entrypoint de servidor necessário | Build/output + integração Git; SPA fallback quando não há 404.html de topo | Workers não exige escrever fetch handler |
| GitHub | Workers Builds com instalação/permissões do repo | Integração GitHub/branch controls consolidada | Confirmar acesso real ao repo privado/público antes de conectar |
| Branch/PR | Worker Previews: ambiente por branch e URLs de preview/deployment | Preview por branch/PR do próprio repo, URL por deploy + alias | Workers atende rastreabilidade e isolamento; não confundir modelo antigo Version URLs com Preview |
| Controle de builds | Habilitar previews não produção; configuração de branch menos granular que Pages | Include/exclude branches e controle produção/preview | Se exigir exclusões complexas, Pages/CI controlada pode ser mais simples |
| URL HTTPS | workers.dev ou domínio; alias estável e URL de deployment específica | pages.dev e alias de branch/URL de deploy | Entregar sempre URL específica + SHA, não somente alias mutável |
| SPA/deep link | not_found_handling=single-page-application; navegação resolve index | Sem 404.html de topo, fallback SPA padrão; revisar redirects | Testar reload de rota profunda e assets ausentes; não reescrever JS ausente para HTML silenciosamente |
| Produção/teste | Preview tem settings próprios; bindings podem compartilhar recursos se configurados | Configs produção/preview e branch de produção | Nesta fase somente assets e dados sintéticos; nenhum binding de produção |
| Rollback/comparação | Deployments/versionamento e URLs específicas; rollback/redeploy do artefato aprovado | Rollback para deploy anterior de produção; preview não é alvo direto de rollback de produção | Conservar SHA/build/artefato; rollback não apaga dados de browser ou backend |
| Crescimento | Mesmo produto pode evoluir se backend for futuramente aprovado | Functions possíveis; migração posterior se necessária | Capacidade futura não autoriza adicionar backend agora |
| Operação | Plataforma principal recomendada pela Cloudflare para novos projetos | Adequada e suportada; menos mudança se já houvesse Pages existente | Não há Pages existente retornado na conta; preferir Workers para novo destino autorizado |
| Segurança | URL pública por padrão; Access opcional; source/bindings conforme build | URL pública por padrão; Access em previews; integração Git e funções com credenciais | Noindex não é autenticação; escolher audiência explicitamente |

## 3. Custos e limites pertinentes

| Item | Workers / Builds | Pages |
|---|---|---|
| Requests puramente estáticas | Gratuitas e ilimitadas; sem custo adicional de armazenar assets | Estáticos gratuitos e ilimitados quando não invocam Functions |
| Quantidade de arquivos | Free 20.000 / Paid 100.000 por versão | Free 20.000 / paid até 100.000 (configuração específica exigida) |
| Tamanho de arquivo | 25 MiB | 25 MiB |
| Build | Free 3.000 min/mês, 1 concorrente; paid 6.000 min/mês, depois US$0,005/min e 6 concorrentes | Free 500 builds/mês, 1 por vez; Pro 5.000/5, Business 20.000/20 |
| Timeout build | 20 min | 20 min |
| Previews | Free 100/Worker, paid 500; 100 deployments/Preview; elimina mais antigos ao limite | Número de previews ativos ilimitado, respeitando builds/limites |

Não é necessário contratar plano pago para comprovar o protótipo antes de medir o bundle e builds. Não se promete custo total zero: CI/builds, domínio, controle de acesso e eventuais serviços futuros dependem do plano/uso. Não usar run_worker_first, SSR ou Functions sem necessidade; mudariam o modelo de cobrança e segurança. Retenção limitada de previews requer arquivar evidências/manifesto de builds aprovados sem presumir URL eterna.

## 4. Fluxo de publicação futuro, condicionado a autorização

1. **Gate de projeto e divulgação:** proprietário aprova destino (goudduo público ou integração privada temporária), allowlist de código/assets e audiência da prévia. Selecionar conta/projeto Cloudflare sem reutilizar Worker existente por inferência.
2. **Reproduzir build:** fixar Node/pnpm conforme lock/engines verificados; instalar com `pnpm install --frozen-lockfile`; executar `pnpm run typecheck`, `pnpm test` e `pnpm run build` a partir do commit autorizado. Não trocar lock ou usar latest no CI sem revisão.
3. **Separar distribuições:** entrada comum gera dist de aplicação; Lab tem entrada/build próprio e acesso restrito quando necessário. Configuração atual usa Lab + approved e sourcemap=true: precisa recorte autorizado para publicação segura. Copiar public/ integralmente está vetado sem auditoria.
4. **Configuração Cloudflare mínima futura:** diretório final dist; fallback SPA; zero script de servidor, bindings ou variáveis secretas no cliente. Aplicar headers necessários e cache por tipo (assets hashed imutáveis, HTML/manifesto com política de atualização). Não importar a basicSsl do dev como configuração de TLS público.
5. **Escolher automação:** preferência por Workers Builds + GitHub e Worker Previews para branches não produção. Antes de conectar, revisar que um push na branch produção gera deploy automático: a publicação de produção exige gate separado. Evitar conectar main já de início com autopublish; usar branch de release vazia/controlada ou CI manual conforme capacidades confirmadas, sem publicar conteúdo ainda não autorizado.
6. **Comandos/plataforma:** repositórios consultados não possuem config Cloudflare da aplicação. Seguir orientação atual da skill Cloudflare: CLI **cf** para projeto sem Wrangler; não criar wrangler.toml por hábito. Fixar versão, consultar sintaxe atual antes de implementar. Workers Builds reconhece `cf previews deploy` a partir de **1.0.0-beta.18** segundo documentação consultada; validar versão suportada na configuração futura. Configuração/sintaxe são trabalho do lote autorizado, não arquivo criado pela P0.
7. **Permissões:** preferir integração oficial/segredo de CI com escopo mínimo da conta/projeto. Plugin GET autorizado foi verificado; escrita não. Usar plugin quando a etapa exigir operação suportada; não transmitir token em chat, repo, VITE_* ou logs. GitHub App deve acessar só o repo escolhido.
8. **Rastreabilidade:** registrar SHA completo, branch, PR, lock hash, versões Node/pnpm/CLI, job/log, horário UTC, deployment ID, URL estável e URL específica. Um pequeno manifesto público de build pode conter apenas esses metadados aprovados, sem URLs privadas nem dados pessoais. Produzi-lo durante CI não comita código novo na P0.
9. **Verificação pós-publicação:** HTTPS, carregamento de fonts/SVG, refresh/deep links, retorno, SPA assets, Safari iPhone e jornadas disponíveis; comparar captura com commit. Falha mantém prévia em revisão; não promover produção para obter link.
10. **Entrega ao proprietário:** URL específica HTTPS + branch/SHA/PR, superfícies, o que preservou/mudou, testes com evidências e pendências. Alias de branch serve para último estado, URL de deploy para homologação. Não afirmar backend real.
11. **Promoção/rollback:** somente autorizado após homologação; promover/republicar o artefato do SHA aprovado sem reconstrução não rastreada. Para rollback, escolher deployment/artefato anterior aprovado, verificar código/assets e smoke test. Se uma prévia tiver sido eliminada, reconstituir build do SHA/lock arquivados e emitir nova URL identificada. Não mudar a main ou fazer merge automaticamente.

Worker Previews atual é ambiente por branch com settings próprios. **Version URLs antigas usam recursos de produção e não são o mecanismo recomendado para testes de PR**. No caso puramente estático nenhum recurso backend é necessário; mesmo assim, não habilitar bindings secretos por herança do projeto.

## 5. Fronteira de segurança de distribuição

- Código GODUOIT é privado, goudduo público. Não copiar histórico inteiro, HTMLs internos, logs de investigação ou documentos privados. Um bundle JS público também divulga a lógica nele contida; remover mapas de fonte não torna o código secreto.
- Allowlist futura: entrypoint comum, dependências necessárias, CSS/tokens aplicáveis, fontes licenciadas e SVGs/mídias expressamente liberados. Inspecionar dist e árvore transitiva; licença/proveniência por mídia. P0 não declara direitos do acervo Drive/GIFs.
- Config atual `sourcemap:true` e `public/gooduu.html`, `public/sw.js`, manifests/ícones antigos são pontos de risco confirmados por leitura. Não servir estudos Gooduu ou SW do legado por cópia automática. Política SW/cache/offline precisa recorte próprio; evitar prévia antiga mascarando o commit sob teste.
- Nenhum segredo em VITE_*: o Vite incorpora esses valores ao bundle cliente. Nenhum `.env`, token, conta real, DOB, fotos corporais, fixture com dado pessoal não autorizado ou link privado no artefato público. Conferir também referências externas/base64.
- Publicar sob HTTPS não aprova documentos legais nem transforma demo em serviço real. Preview público exige audiência consentida; preview restrito com Access deve funcionar com login permitido no Safari, sem bypass de proteção.
- Noindex é prevenção de indexação, não proteção de conteúdo. Plano de segregação de acesso de Lab e preview deve ser aprovado explicitamente.

## 6. Quando escolher Pages

Se a configuração de Worker Previews/builds/CLI suportada na conta não atender ao fluxo simples, ou se o proprietário preferir controles granulares de branch Pages, escolher Pages com build Vite e diretório do artefato comum, sem Functions. Decidir antes da criação entre integração Git e Direct Upload: não presumir troca livre de modelo no mesmo projeto. Fork PR não gera preview automático pela integração Pages consultada; pipeline de contribuições precisa política específica, nunca executar código de fork com segredos.

SPA: evitar 404.html de topo quando depender do fallback padrão, conferir `_redirects` e deep links. Produção/preview com configurações separadas e sem credenciais de produção. Pages não resolve a fronteira privado/público; mesmos gates de bundle/licença se aplicam.

## 7. Vercel — plano alternativo, sem configuração nesta P0

Acionar somente com impedimento Cloudflare descrito e autorização do proprietário. Reutilizar Vite, pnpm-lock e o mesmo dist, sem Next.js, Nitro, SSR ou Functions. Integração Git com Preview para branches/PRs, produção separada e verificação de permissões de projeto/equipe. Vite SPA requer rewrite para index.html em rotas de navegação conforme guia oficial; validar exceções de assets para evitar respostas HTML a JS ausente.

Manter relatório SHA/PR/deployment, proteção de preview se necessária, teste Safari e rollback do artefato aprovado. Acesso ao conector Vercel não foi auditado nesta P0 e nenhum projeto foi vinculado. Não presumir plano/preço comercial ou domínio disponíveis; confirmar se o fallback for solicitado.

## 8. raw.githack — auxiliar

Somente arquivos compilados já autorizados em Git público. Não compila TS/TSX, não fornece backend e não substitui build de Vite. Base de assets/subpath e rotas de SPA precisam compatibilidade (p.ex. hash routing só com decisão explícita); fallback de deep link não pode ser presumido. Sem isolamento/revisão/deploy rollback comparável a Worker Previews, não é hospedagem principal. Não publicar repo privado para viabilizar esse serviço.

## 9. Referências oficiais consultadas

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/)
- [Static Assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
- [Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Workers Builds/branches](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)
- [Build limits/pricing](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/)
- [Workers Previews e URLs](https://developers.cloudflare.com/workers/previews/)
- [Preview versus Version URLs](https://developers.cloudflare.com/workers/previews/compare-workflows/)
- [Pages](https://developers.cloudflare.com/pages/)
- [Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Pages previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Pages known issues](https://developers.cloudflare.com/pages/platform/known-issues/)
- [Pages SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Pages rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)
- [Cloudflare CLI para agentes](https://developers.cloudflare.com/cf/agents/)
- [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [raw.githack](https://raw.githack.com/)

Documentação de rollback/serving-pages/CLI será revalidada integralmente antes da configuração; a P0 consultou resultados do plugin e o guia Vite da Vercel, sem testar deployment ou preços da conta.
