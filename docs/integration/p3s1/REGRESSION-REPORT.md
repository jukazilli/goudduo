# Regressões, testes e segurança

Baseline homologada113 unitários/integração,155 Playwright e4 bundle. Node24.22.1/pnpm11.25.0; nenhuma atualização de package/lock. Suítes anteriores preservadas. A expectativa B6 que proibia Começar treino foi substituída explicitamente por presença da entrada real e ausência de sessão criada apenas por selecionar dia; restantes garantias de navegação/isolamento preservadas.

## Novos testes

`state/session.test.ts`: identidade/cópia profunda, criação inválida/vazia, concorrência, limites técnicos, transições, séries por reps/tempo/distância/carga, duplo registro, parâmetros inválidos, deadlines, expiração idempotente, pausa/retomada, skip parcial, reordenação, revisão salva alterada, finalização completa/parcial/vazia/repetida, descarte e ausência de persistência. Tempos explícitos determinísticos, sem sleeps.

`app/training-session.test.tsx`: fake timers provam uma criação por duplo começo, um intervalo, expiração por deadline e zero timers após pausa/saída/unmount, retomada do mesmo ID e conflito seguro.

`tests/e2e/training-session.spec.ts`: seis jornadas×cinco viewports320/375/390/414/430×844: execução completa e resumo; pausa/relógios controlados; mapa/ordem/skip/finalização parcial; edição da prescrição em paralelo e snapshot preservado; duplo clique/conflito/substituição indisponível/descarte/reload; touch horizontal versus vertical, safe areas simuladas, foco/teclado/reduce/axe.

## Falhas intermediárias e correções

| Achado | Causa | Correção / regressão |
| --- | --- | --- |
| Typecheck inicial do modelo | Cast amplo também atingiu ação legacy workout/commit | Type guard session/* estreita união; sem cast para contornar compilação |
| Segundo clique finalizava depois de registrar última série | Mesmo botão mudava de Concluir série para Finalizar antes do segundo click | Proteção por detalhe do gesto + confirmação explícita de toda finalização; E2E E preservado |
| Foco foi para body após finalizar pelo menu | Opener removido na mesma rota; host só tinha fallback para mudança de página | Fallback existente do host passa a focar h1/main também quando opener não existe; E2E C/E exigem foco no resumo. Retorno ao opener conectado continua intacto |
| Axe do coletor alertou contraste no Mapa durante entrada | Opacidade transitória do fade300ms, não cor estável | Aguarda animation.finished antes de medir; sem alterar paleta/motion ou aumentar timeout |

Não classificar falhas funcionais como cosmética. Não remover testes/retries para passar. Resultados finais e CI são registrados na PR e entrega após conclusão, não presumidos pela presença de testes.

## Segurança

Nenhum arquivo/código/asset/mídia privada transportado. Referência histórica apenas consultada, sem HTML/CSS/JS/GIF/foto privados no app ou docs. Nenhuma dependência, backend, persistência ou serviço social novo. Sessões e dados são demonstrativos em memória. Guards de bundle e separação app/Lab preservados; sem source maps/credenciais/HTML candidato no bundle. Configuração Cloudflare permanece intacta, somente dry-run preexistente da CI, sem deploy/recurso/URL pública.

Safari/iPhone, Android físicos, VoiceOver/TalkBack, teclado virtual, zoom e insets reais NÃO testados. Aplicam-se o [protocolo físico P2-B8](../p2b8/PHYSICAL-DEVICE-QA-CHECKLIST.md) e as novas jornadas de descanso/pausa/retorno/inputs. Touch Chromium e CSS16px não substituem aparelhos.

## Resultados finais e sequência de investigação

Instalação frozen, typecheck, **131 unitários/integração em14 arquivos**, builds app/Lab, **4 bundle** e **185 Playwright** aprovados na rodada final local; zero falhas/skips/flaky/retries. **35 capturas/35 axe** sem violações na coleta final e zero pageerrors.

Primeira rodada dirigida390:4 PASS/1 falha real de duplo clique. Após correção,25 cenários dirigidos passaram. Integral preliminar185 PASS; a revisão acrescentou consulta da prescrição na ajuda e reproduziu foco perdido no body ao finalizar pelo menu. Uma rodada em andamento foi interrompida para corrigir esse defeito comprovado; não foi contabilizada como aprovação. Após fallback corrigido, a integral final185 PASS manteve asserções de foco mais fortes. O coletor foi sincronizado com título/opacity1 e animation.finished para medir estado final, sem sleep, relaxar contraste ou mudar paleta.

A política de confirmação final evita encerramento acidental; testes verificam série única por identidade e terminal idempotente. Nenhuma sessão salva de produção é anunciada. Cloudflare permanece somente dry-run preexistente da CI; sem deploy local ou remoto.
