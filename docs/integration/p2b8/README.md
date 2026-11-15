# P2-B8 — consolidação e QA integrado

Base homologada **84366dc0242e37e5d4999fdf805d9b3ee0d2be45**, merge exclusivo da [PR #40](https://github.com/jukazilli/goudduo/pull/40). Head reauditado **4c4e58b808c9136815692cfab1d7f14efbce8130**, base anterior **de915615bc928d998796c06a0694b358266a6d6e**; CI [43729864306](https://github.com/jukazilli/goudduo/actions/runs/43729864306) aprovada nesse head. Sem conflitos ou mudança material. [Homologação técnica na Issue #29](https://github.com/jukazilli/goudduo/issues/29#issuecomment-6897053848); Issue permanece aberta.

Homologação limitada à apresentação contextual do Pulse: não autoriza viewer, composer, upload, publicação, ocultação ou visualizações reais. Shell, tokens, domínio, dependências e configuração Cloudflare preservados.

Branch `test/p2b8-integrated-prototype-qa`. Esta entrega acrescenta provas de integração e documentação. **Não foi necessário alterar código de produção**: nenhum defeito P0/P1 foi reproduzido nos cenários disponíveis. Isso não constitui aprovação de dispositivos físicos, superfícies ausentes ou MVP inteiro.

- [Jornadas](INTEGRATED-JOURNEYS.md) e [arquitetura](ARCHITECTURE-AUDIT.md).
- [Inventário de regressões](REGRESSION-INVENTORY.md).
- [Responsividade/acessibilidade](RESPONSIVE-AND-ACCESSIBILITY-QA.md) e [protocolo físico pendente](PHYSICAL-DEVICE-QA-CHECKLIST.md).
- [Deltas visuais](VISUAL-DELTAS-BACKLOG.md) e [segurança](SECURITY-AND-BUNDLE-REPORT.md).
- [Prontidão por superfície](PROTOTYPE-READINESS.md) e [próximos gates](NEXT-GATES.md).

Referências obrigatórias: Home **073183253fce5fcd0b3474c725e84ff67d3dfec5**, Rotinas **3f8b2c7c93a33a713c780305e672e1ec7998ceaf**. Somente corpos das superfícies; componentes globais continuam regidos pela P1-R1. Documentos das fases anteriores são snapshots históricos: “não iniciado” em NEXT-GATES antigo não revoga a autorização atual nem atualiza retroativamente aquele snapshot.

A recomendação é submeter o conjunto funcional de treinos à revisão do proprietário, mantendo os limites registrados. Sem merge desta implementação, deploy, nova fase ou funcionalidades adicionais.

## Validação da entrega

| Check | Resultado local |
| --- | --- |
| pnpm install --frozen-lockfile | PASS, lockfile preservado |
| pnpm typecheck | PASS |
| pnpm test | **113 PASS/12 arquivos** (111 anteriores+2 novos) |
| pnpm run build / build:lab | PASS, entradas e bundles separados |
| node --test tests/bundle.test.mjs | **4 PASS**, guards preservados |
| Playwright integral | **155 PASS** (145 anteriores+10 novos), zero falhas/skips/retries na rodada final local |
| Coleta regional | **50 capturas/5 larguras/20 análises axe sem violações**, zero pageerrors |
| QA físico | **PENDENTE**, não executado |

Logs locais em /workspace/scratch/p2b8; testes de navegador geram screenshots/relatórios em test-results e artifact foundation-qa da CI. O status remoto deve ser conferido no SHA da PR, sem inferir aprovação a partir da rodada local. Cloudflare somente dry-run preexistente da CI.
