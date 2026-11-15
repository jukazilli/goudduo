# PWA e preview protegido para avaliação física

Base: PR #43, commit `9829952e3458015c9ca36630cd666aaa838ef094`, preservado sem merge. Branch `feat/pwa-protected-device-preview`. Preparação específica do protótipo React; não é início de produção.

**Publicação BLOQUEADA. Não existe URL HTTPS publicada por esta missão.** A API de Access da conta conectada retornou HTTP 403, `access.api.error.not_enabled`. A CLI fixada `cf@1.0.0-beta.30` retornou `authenticated: false`. Conforme instrução do proprietário, a necessidade de configuração adicional interrompe a publicação: não se publicou abertamente, não se habilitou Zero Trust, não se criou Worker, API, binding, banco ou DNS.

Implementado: manifest pt-BR standalone, PNGs oficiais any/maskable/Apple, metatags iOS, worker próprio versionado com inventário e SHA256, cache apenas estático, navegação SPA offline básica, atualização sem reload automático da jornada em memória. Interfaces, domínio e reducers preservados.

O alvo `device-preview` usa `goudduo-device-preview`, separado do alvo anterior. `workersDev: false` e `previewUrls: false` mantêm o artefato sem exposição acidental. O dry-run validou a configuração local; o comando de preview dry-run validou **somente argumentos**, não autenticação, proteção ou disponibilidade remota.

- [Contrato PWA e cache](PWA-CONTRACT.md)
- [Ícones e proveniência](ICONS-AND-PROVENANCE.md)
- [Instalação e limites offline](INSTALL-AND-OFFLINE.md)
- [Bloqueio de segurança e validação remota](PROTECTED-PREVIEW-GATES.md)
- [Atualização, substituição e retirada](OPERATIONS.md)
- [Testes e regressões](TEST-REPORT.md)

Uma instalação efetiva e a compatibilidade Access × modo standalone dependem de publicação protegida e teste remoto/físico posteriores. Não foram declaradas aprovadas. Nenhuma outra fase do MVP iniciada.

Validação local concluída: 174 unitários/integração, 230 Playwright, oito guards, typecheck, builds e dry-run. Chromium sem erros de critérios de instalação nas cinco larguras. Não há aprovação de publicação ou instalação física.
