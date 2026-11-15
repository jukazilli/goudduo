# Inventário de regressões

Severidades: P0 bloqueadora (dados/navegação/segurança); P1 funcional/UX (foco/toque/scroll/acesso); P2 acabamento cosmético sem perda de uso.

| ID | Reprodução / origem | Classificação | Resultado / correção |
| --- | --- | --- | --- |
| B8-01 | Jornada contínua com duas inclusões, ordem, commit e nova revisão | Risco P0, não reproduzido | Novo E2E passa em cinco larguras; mesmo ID, revisão2, segunda intacta |
| B8-02 | Dois drafts criando no mesmo dia livre | Risco P0, não reproduzido | Novo teste confirma binding-changed e nenhuma entidade órfã/parcial |
| B8-03 | Revisão muda depois de preparar naming | Risco P0, não reproduzido | Novo teste confirma stale-revision e preservação de tabelas |
| B8-04 | Nome preenchido, Escape, contexto trocado e retorno | Risco P0/P1, não reproduzido | Novo E2E confirma dado salvo intacto e draft recuperável |
| B8-05 | First run do novo teste tipado sem estreitar união time | Falha intermediária do teste | Typecheck rejeitou spread ambíguo; fixture agora estreita measurement explicitamente, sem cast nem código de produto |
| B8-06 | Coletor axe usava browser.newPage | Falha intermediária do harness | Exige browser.newContext; coletor corrigido, sem alteração de overlay/app |

Nenhum defeito P0/P1 do aplicativo reproduzido nos cenários finalizados; não houve correção de produção. Riscos não são classificados como bugs corrigidos. QA físico e superfícies não integradas não recebem aprovação por ausência de falha em Chromium.

Falhas finais de suíte ou evidência, se houver, devem ser reportadas antes de recomendar homologação; não aumentar retries/timeouts, remover assert ou alterar layout para acomodar teste. Suíte anterior é preservada, mais novos testes de integração. Resultados consolidados no relatório de responsividade e README.

[Backlog P2](VISUAL-DELTAS-BACKLOG.md) não inclui funcionalidades ausentes como se fossem cosméticas. [Prontidão](PROTOTYPE-READINESS.md) separa essas dependências.

Rodada final local: install frozen, typecheck, **113 unitários/integração**, builds app/Lab, **4 bundle**, **155 Playwright PASS**,50 capturas e20 análises axe sem violações. Zero falhas finais/skips/retries; QA físico não executado. Rodada dirigida inicial dos novos E2E:10 PASS. Não se repetiu a suíte para ocultar falhas: a integral passou na primeira execução desta missão.
