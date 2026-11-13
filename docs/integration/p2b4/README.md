# P2-B4 — Editor e salvamento V7.4

Implementação para revisão do proprietário, conforme autorização P2-B4 e [Issue coordenadora #29](https://github.com/jukazilli/goudduo/issues/29). Base verificada: **313d234be321d89c2d3c4ca49e7ef2963b728d4d**, integração da [PR #35](https://github.com/jukazilli/goudduo/pull/35). Workspace inicialmente limpo. Branch: `feat/p2b4-workout-editor-v74`.

A prioridade autorizada é integração funcional antes do refinamento final. Isso não autoriza redesign: o Editor usa o corpo/fluxo V7.4, Shell P1-R1 e o estado P2-B1/adapters P2-B2 existentes. Home Rotinas P2-B3 permanece intacta. Nenhum merge de implementação ou deploy nesta missão.

## Entrega

- Editor React real a partir da Home Rotinas; campos por instância e medição, remoção e reordenação.
- Header único com título contextual, chevron e check; rodapé Adicionar exercício acima da TabBar.
- Fluxo zero bloqueado, um com confirmação, múltiplos com nomeação, commit atômico/revisão/retorno pelo adapter.
- Dia vazio abre rascunho com nova identidade, sem prescrição salva artificial. A Biblioteca do produto informa indisponibilidade. Somente no Lab um consumidor técnico adiciona prescrições sintéticas para testar criação completa.
- Sem novo provider, store, roteador, mecanismo de overlay, catálogo ou persistência.

## Documentos

- [Contrato e matriz de auditoria](EDITOR-CONTRACT.md)
- [Estado, campos e navegação](STATE-AND-SAVING.md)
- [QA visual e diferenças](VISUAL-DELTAS.md)
- [Validação e regressões](TEST-REPORT.md)
- [Gates P2-B5](NEXT-GATES.md)

Execução: versões fixadas Node 24.22.x/pnpm 11.25.x; `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, `pnpm run build`, `pnpm run build:lab`, `node --test tests/bundle.test.mjs`, `pnpm exec playwright test`. Desenvolvimento com `pnpm dev`; Lab em entrada/build separado. Testes locais usam Chromium do ambiente por `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`.

A homologação visual permanece com o proprietário. Biblioteca P2-B5, substitutos operacionais, mídia, cópia/referência entre dias, CRUD de rotinas, Sessão e Home Treinos não são implementados por esta entrega.
