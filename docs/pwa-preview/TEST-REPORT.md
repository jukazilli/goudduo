# QA e regressões

Base PR43: 163 unitários/integração, 210 Playwright e quatro bundle guards. Nenhum teste anterior removido. O PWA altera apenas entry/metadados/empacotamento e adiciona infraestrutura estática, sem reestruturar aplicação ou modificar interfaces.

## Novos testes

- `src/pwa/worker.test.ts`: 11 testes determinísticos de bytes/MIME/instalação, rejeição/redirect, allowlist GET/origem/query, resposta403, fallback sem guardar rota, expiração sete dias e limpeza exclusiva de caches próprios.
- `tests/e2e/pwa.spec.ts`: quatro jornadas em cada viewport320/375/390/414/430. Manifest/PNG/MIME/ativação/scope/Lab; deep links e reload offline sem recuperação de séries; dois releases sem reload automático; resposta de acesso negado/login; release alterado rejeitado.
- Bundle: oito guards. Quatro anteriores preservados; novos negam registro SW arbitrário/PNG fora da allowlist, PWA incompleto, Lab com PWA e divergência entre worker/manifest e inventário exato.

## Método e limites

Origin local HTTP loopback (secure context permitido pelos navegadores), não URL remota HTTPS. Servidor de fixtures de release/403/login é exclusivo do teste; não é backend, autenticação real ou prova de Access remoto. Nenhum estado de treino é injetado para provar offline: sessão criada/finalizada pela UI comum, valor registrado ausente do cache e reload tratado com segurança.

Disponível: Chromium Playwright141.0.7390.37. Binários Firefox e WebKit não estavam instalados; não foram declarados testados. Safari/iPhone/Android físicos, instalação A2HS/WebAPK, standalone Access, teclado e safe areas reais permanecem pendentes.

Falha intermediária: o primeiro teste unitário do worker foi executado em ambiente Node incompatível com setup DOM já existente. Corrigido para usar o ambiente de testes existente; nenhum setup ou teste anterior foi enfraquecido. O comando inexistente cf preview foi descartado; sintaxe válida descoberta com cf cli search e help de previews deploy.

O guard anterior que proibia qualquer SW foi atualizado estritamente para o SW próprio aprovado nesta missão, com artefato completo/inventário/nomes/bytes exatos; registro arbitrário e qualquer PWA no Lab continuam bloqueados. Contratos históricos sem SW são baseline anterior, substituídos apenas por esta autorização de PWA.

Publicação e QA remoto não executados: Access ausente e CLI sem login. Instalação física não comprovada. Sem deploy, dependência nova, mídia privada, persistência ou recursos remotos. Resultados finais locais/CI são registrados na PR de preparação.

## Critérios nativos do Chromium

`node tests/qa/check-pwa-installability.mjs`, com app servido localmente em4197, consultou `Page.getAppManifest` e `Page.getInstallabilityErrors` nas cinco larguras. Ambos retornaram listas vazias de erros. [Evidência JSON](evidence/chromium-installability.json). Isso comprova critérios automatizados no loopback seguro, não instalação física ou funcionamento de Access remoto.

## Resultado integral local

| Verificação | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile | Aprovado, lockfile preservado |
| Typecheck | Aprovado |
| Vitest | 174 testes / 18 arquivos aprovados |
| Builds app e Lab | Ambos aprovados |
| Bundle guards | 8 aprovados, quatro anteriores preservados |
| Playwright integral | 230 aprovados, cinco larguras, sem retries |
| Critérios nativos Chromium | Cinco larguras sem erros de manifest/installability |
| cf deploy em modo device-preview | Dry-run aprovado, sem bindings/upload |
| cf previews deploy --dry-run | Somente argumentos validados, executed:false |
| Diff e proveniência | SVGs/lockfile/áreas protegidas intactos, hashes conferidos |
| HTTPS remoto e Access real | BLOQUEADO, não publicado/testado |
| Instalação física e standalone autenticado | PENDENTE, nenhuma evidência de execução física |

[Relatório de escopo e proteção](evidence/scope-and-protection.json). A CI da PR de preparação executará novamente os testes do head entregue.
