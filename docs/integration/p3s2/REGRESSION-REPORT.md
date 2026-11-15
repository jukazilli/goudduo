# Regressões, segurança e resultados

## Gate de homologação da P3-S1

Auditoria inicial confirmou head307fb579eeef45127403fba0093fda739a87dbef/base d12559544044c266dcd5ef7f57685a362b04f990 e CI43738606657 aprovada. Divergência comprovada: session/finish aceitava false quando complete=true. Commit492d024bd5fcaa8e7971dbeed98d8265a66b936c remove a exceção; finish/discard exigem true literal. Dois testes completa/parcial verificam negativa atômica, confirmação positiva e idempotência. Documentação S1 atualizada sem falsificar hashes/capturas anteriores.

CI43743715368 do novo head:133 unitários,185 Playwright,4 bundle, typecheck/builds e --dry-run: exiting now. Merge exclusivo #42:7bf760269fade3a9c8b38b770e3fb1c869cd1aa9, registro na Issue#29. A rodada local anterior sem conclusão registrada não foi contabilizada como aprovação; a CI integral do novo SHA foi o gate de merge.

## Cobertura P3-S2

- `state/session-results.test.ts`:23 casos de projeção, titularidade, ordenação/desempate, estados excluídos, IDs/datas inválidos, snapshots/revisões, parcial/zero registros, modalidades e idempotência.
- `surfaces/history/SessionHistory.test.tsx`:5 integrações de UI, vazio, valores readonly, retorno/seleção, ID ausente e acesso negado por duas rotas.
- `app/session-results-navigation.test.ts`:2 contratos de rota/contexto/IDs seguros.
- `tests/e2e/session-history.spec.ts`:25 jornadas novas nas cinco larguras; fonte de dados comum e ações reais.

Baseline após correção S1:133/185/4. Nenhuma cobertura anterior removida. Resultados finais locais constam abaixo; a CI deve ser conferida no head entregue.

## Falhas intermediárias

| Achado | Tratamento |
| --- | --- |
| Ref não previsto no NavLink existente | Ref no container local, sem ampliar API de navegação por conveniência |
| Fixture de modalidade não estreitada / opção exact de Testing Library | Testes corrigidos com união discriminada e API real, sem cast para mascarar erro |
| Helper history sombreava window.history no teste | Renomeado openHistory e referência explícita a window.history |
| Porta4173 ocupada por prévia órfã da investigação anterior | Encerrados somente os servidores locais4173/4175; config/reuse/retries inalterados; rodada não executada não é PASS |
| Finalizar encontrado no footer e no menu | Selector do teste passou a escopar o diálogo Opções; garantias de confirmação e estado mantidas, sem esconder/remover controle real |

Revisão de privacidade identificou acesso por ID sem titularidade na antiga rota /sessao/:id. Adapter e reducer receberam checks mínimos de titular; testes negam nome/valores de fixture alheia por essa rota e /historico/:id. Histórico em si não cria ações de execução.

## Preservações e limites

Um DemoProvider/store/router/Shell/Header/TabBar/OverlayHost. Model/provider de dados sem nova coleção de resultados. Home/Bento/Pulse, Rotinas, Editor/Biblioteca, tokens globais, fontes, assets, dependências e configuração Cloudflare preservados. Sessão recebe somente projeção compartilhada, acessos readonly e gate de titularidade necessários.

Sem arquivos/mídias privados, backend, telemetria, persistência ou envio externo de resultados. Bundle guard e Lab isolado mantidos. Cloudflare somente dry-run preexistente da CI, sem deploy/recurso/URL pública. Safari/iPhone/Android físicos e VoiceOver/TalkBack/teclado/insets reais NÃO testados; axe não equivale a leitor de tela físico.

## Validação final local

| Verificação | Resultado |
| --- | --- |
| Instalação frozen-lockfile | Aprovada; lockfile inalterado |
| Typecheck | Aprovado |
| Vitest | **163 testes aprovados**, 17 arquivos |
| Build app / Visual Lab | Ambos aprovados; guards de isolamento mantidos |
| Bundle | **4 testes aprovados** |
| Playwright integral | **210 testes aprovados**, cinco larguras, sem retries |
| Coleta regional | **40 capturas e 40 análises axe**, zero violações nos estados capturados e zero erros de página |
| Diff, fontes e assets | Conferência documental e de escopo; hashes no manifesto de evidências |

As 25 novas jornadas Playwright somam-se às 185 anteriores. A cobertura Vitest passou de 133 para 163. Chromium automatizado não aprova Safari/iPhone/Android físicos, VoiceOver/TalkBack, teclado virtual ou safe areas reais. Cloudflare permanece limitado ao dry-run preexistente da CI; nenhum deploy.
