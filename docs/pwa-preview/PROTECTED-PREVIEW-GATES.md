# Publicação protegida — bloqueada

## Evidência desta execução

- PR #43 ainda Draft, aberta e sem merge; fonte fixa 9829952.
- Cloudflare API (conector autenticado): listagem Access da conta conectada respondeu HTTP403 com `access.api.error.not_enabled` — Access não ativado.
- CLI `cf auth whoami`: `authenticated: false`, `Not logged in`.
- `cf@1.0.0-beta.30` oferece `cf previews deploy [directory] --preview-name ... --mode ...`; não existe comando singular `cf preview`.
- `cf deploy dist/app --dry-run --mode device-preview --provision=false`: empacotamento sem bindings, sem upload.
- `cf previews deploy dist/app --dry-run --mode device-preview --preview-name device-review`: `executed:false`, `validated: arguments only`. Não é teste remoto.

O proprietário determinou interromper a publicação quando a proteção depender de configuração adicional. Não foi ativado Access/Zero Trust, criada policy, alterado Worker existente ou usado link público/conta temporária como alternativa. Nenhum recurso remoto criado ou modificado. Não há URL a fornecer.

## Antes de qualquer upload

1. Proprietário confirmar a conta alvo e habilitar/configurar Access/Zero Trust e uma policy restrita à identidade exata autorizada. Não presumir que todos os membros da conta sejam elegíveis. Não colocar e-mail/account ID/segredo no repo público.
2. Autenticar a CLI cf fixada nessa conta, com permissões mínimas de Workers/Access. Conector autenticado não equivale a login do processo CLI. Não copiar tokens para arquivos públicos ou shell history.
3. Revalidar a policy e sua cobertura do novo Worker/preview antes de liberar qualquer URL. Não mudar policy account-wide que afete Workers existentes.
4. Usar alvo novo `goudduo-device-preview`; não reutilizar o antigo ou Workers já presentes. O modo preparado tem workersDev/previewUrls false: só habilitar a exposição estritamente necessária após proteção comprovada, com mudança revisável.
5. Artefato app somente, SHA identificado e árvore limpa; não publicar dist/lab, previews HTML ou raiz do repo. Sem bindings/API/banco/DNS/domínio oficial/CI de deploy.

Este documento não autoriza executar a configuração adicional bloqueada. Mudanças futuras devem respeitar o escopo autorizado pelo proprietário.

## Validação remota ainda pendente

- Anônimo e identidade não autorizada não recebem HTML/JS/manifest/SW/PNG/fontes protegidos. Sem hostname/preview alternativo aberto.
- Identidade do proprietário consegue HTTPS, manifest MIME application/manifest+json, SW JavaScript com scope /, PNGs corretos, fontes/SVG, deep links e refresh.
- Home → Rotinas → Editor/Biblioteca → Salvar → Home → Sessão → Resultado/Histórico; dados em memória coerentes.
- Dois releases reais: worker novo aguarda, jornada não recarrega sozinha, fechar/reabrir ativa release correto e limpa cache antigo.
- Expirar sessão Access/OTP, abrir pelo ícone standalone iOS/Android, renovar acesso e verificar assets/manifest/SW. Validar também o que já permanece em cache offline.
- Safari/iPhone e Android físicos, teclado, safe areas e leitor de tela: pendentes. Não declarar aprovado com mocks locais de 403/redirect.

Referências consultadas: [cf agents](https://developers.cloudflare.com/cf/agents/), [Workers Previews](https://developers.cloudflare.com/workers/previews/), [Access para Workers](https://developers.cloudflare.com/workers/configuration/cloudflare-access/). Políticas Access não são um backend da aplicação, mas exigem configuração de conta atualmente ausente.
