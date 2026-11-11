# goudduo — Design System / Movimento e transições V0.1

> **DIREÇÃO DE UI/UX HOMOLOGADA PELO PROPRIETÁRIO EM 10/11/2026, IMPLEMENTAÇÃO GLOBAL PENDENTE.** As transições dos popups precisam ser suaves e consistentes **em todo o aplicativo**. O fechamento seco é uma regressão a evitar. **Não representa que todas as telas estejam migradas** nem substitui seus layouts específicos já homologados.

## Tokens recomendados

| Token | Valor de referência | Uso |
| --- | --- | --- |
| motion.sheet.enter | 300 ms | Entrada de modal e bottom sheet |
| motion.sheet.exit | 310 ms | Saída gradual e legível de modal e sheet |
| motion.sheet.easing | cubic-bezier(.22,1,.36,1) | Desaceleração natural, sem quique |
| motion.page | 250–320 ms (faixa para QA) | Navegação contextual de página, conforme padrão homologado |
| motion.reduced | sem animação espacial | Respeitar preferência de movimento reduzido |

Os valores são **ponto de partida de QA para velocidade normal**, não licença para criar padrões diferentes em cada tela; ajustar uma única biblioteca de tokens depois de validar em dispositivos reais.

## DO

- Animar **backdrop + painel** de modo sincronizado; entrada suave e saída inversa, sem saltos.
- Em React, separar **visibilidade desejada** de **montagem do elemento**; aguardar término de saída antes de desmontar; garantir timeout seguro e interrupção quando outro modal for aberto.
- Cuidar de foco, retorno ao gatilho, Escape, toque fora, Safe Area, rolagem e teclado.
- Manter estado de overlay único; em substituição direta modal A → B, remover/cancelar A deliberadamente sem exibir dois painéis sobrepostos.
- Usar transform e opacity, com renderização estável (evitar mudanças de altura durante o deslocamento).
- Se prefers-reduced-motion estiver ativo, **não aguardar evento de transição que não ocorre**; fechar sem atraso ou com efeito minimizado.
- Verificar iPhone/Safari e Android/Chrome, dimensões 320/390/430 CSS px, reapertar rapidamente botão de fechar, múltiplos overlays, leitura por leitor de tela.

## DON'T

- Não remover modal da árvore imediatamente ao clicar fechar no modo normal.
- Não aplicar duração de 0–100 ms a fechamento de sheets que cause corte.
- Não usar bounce/zoom/scale excessivos ou efeitos de apresentação que prejudiquem o estilo sóbrio das telas internas.
- Não forçar movimento quando o sistema solicitou redução.
- Não presumir que o HTML de laboratório corrigiu a implementação real.
- Não aplicar redesign de telas já aprovadas enquanto ajusta somente transição.

## Fontes internas e implementação

- [Issue #25 — padrão global e QA](https://github.com/jukazilli/goudduo/issues/25).
- [Perfil V0.3 HTML — exemplo local implementado em laboratório](https://github.com/jukazilli/goudduo/blob/lab/perfil-complete-v01-proposta-20261110/lab/screens/profile/goudduo-perfil-p0-v03-homologado-ressalvas.html).
- [Handoff Perfil V0.3](../surfaces/PERFIL-P0-COMPLETE-DUPLAS-V03-HOMOLOGADO-COM-RESSALVAS.md).
- [PR Draft #22](https://github.com/jukazilli/goudduo/pull/22) — ainda sem merge na main.
- Aplicar gradativamente a cada família de tela como tarefa rastreável de QA/engenharia, sem duplicar Issues para estados simples.

## Gate

- [x] Direção de movimento homologada.
- [x] Exemplo no HTML Perfil V0.3 (referência, não aplicativo).
- [ ] Biblioteca central React/CSS/TS com tokens de movimento no app.
- [ ] Auditoria de todas as telas e correção dos fechamentos bruscos.
- [ ] QA interativo e regressões visuais em dispositivos reais.
- [ ] Revisão de acessibilidade e aprovações de integrações.

**Para agentes de IA:** ler o presente contrato, o README aprovado, a Issue da tela e o Design System visual antes de implementar qualquer modal, menu de criação, bottom sheet ou transição; **não afirmar implementação global** só porque existe o exemplo do Perfil.
