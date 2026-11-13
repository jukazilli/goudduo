# P2-B4 proposta — Editor e salvamento V7.4

**Não iniciada.** A P2-B3 termina em PR Draft, aguardando revisão visual do proprietário. A main contém somente a homologação técnica da P2-B2; implementação P2-B3 não tem merge automático ou autorização de deploy.

## Preparado

Home Rotinas integrada, expansão/reflow e seleção real de dia, prévia derivada do estado único; entrada do Editor com rotina/dia/workout/draft/revisão/origem e retorno/scroll; rascunhos isolados e validação/commit atômico P2-B1; header/overlays e etapas P2-B2.

## Recorte recomendado

Implementar Editor V7.4 com campos por medição e instância, header único com check, footer Adicionar exercício acima da TabBar, revisão/ordem/remoção e fluxo 0 bloqueado/1 confirmação/2+ nomeação final. Usar hosts e gates existentes. A Biblioteca contextual completa depende de escopo/autorização próprios; não será substituída por catálogo/formulário improvisado.

| Gate | Decisão/revisão necessária |
| --- | --- |
| Homologação visual P2-B3 | Revisar capturas/deltas: fonte real, contraste, faixa de dias 44 px/scroll, controles desabilitados e dados sintéticos |
| CRUD/ordem de rotinas | Definir recorte de operações, ordem intencional e capacidade de salvar; expansão temporária não vira preferência |
| Nomeação | Limite 60 do HTML versus 100 do domínio continua pendente para a futura interface |
| Cópia/referência por dia | shared-workout-pending permanece; sem edição propagada ou cópia implícita |
| Cancelamento | Voltar preserva rascunho; UX de confirmação explícita de descarte ainda precisa de interface homologada |
| Volume e equipamentos | Adaptar UI a reps/tempo/distância, unidades e metadados legítimos; não importar foto acoplada ao catálogo privado |
| Biblioteca | Sheet contextual e Biblioteca independente continuam destinos distintos; lista/busca/check/feedback ainda não integrados |
| Descoberta da revisão de séries | Pendência #28 preservada; sem sticky/dicas/setas extras por inferência |
| Mídia e port | Autorização granular e direitos continuam pendentes; nenhuma liberação implícita pela allowlist |
| QA físico | Safari/iPhone e Android reais, teclado/VoiceOver e insets antes da homologação visual final |
| Outras superfícies | Home Treinos V5.3, Publicações, Business e Pulse fora desta missão |
| Cloudflare | Sem publicação ou configuração adicional; novo gate específico antes de qualquer preview remoto |

A P2-B4 só começa após autorização expressa e deverá trazer código, critérios de aceite, QA por superfície e PR própria. Esta documentação não homologa recomendações pendentes.
