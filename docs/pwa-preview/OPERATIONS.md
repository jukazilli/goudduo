# Operação do artefato

Nenhum Worker/preview foi criado nesta execução. Não há nada remoto a retirar ou substituir agora.

## Atualizar o PWA depois de publicação protegida

Salvar/finalizar ou descartar conscientemente a jornada em memória antes de recarregar. Conectar à rede e abrir a aplicação permite procurar versão nova. Fechar todas as abas/janelas do mesmo preview e o app instalado; reabrir online ativa o worker atualizado. Não forçar atualização apagando rascunhos durante uma sessão.

Se não atualizar: verificar rede e autenticação Access, fechar todos os clientes, conferir SHA em `/build-info.json` quando autorizado e repetir. Último recurso é limpar dados do site e reabrir online, sabendo que dados em memória/cache desaparecem. O build-info não é precacheado.

## Substituir um preview futuro

Partir do commit aprovado, executar instalação frozen, typecheck, unitários, builds app/Lab, oito guards de bundle e Playwright integral. Inspecionar inventário app, manter conta/policy e URL isoladas e executar primeiro dry-run com CLI fixada. Usar o endereço estável do preview nomeado para preservar a origem/escopo do PWA entre releases, sem inventar a URL antes do deploy. Um endereço imutável de deployment diferente não atualiza o PWA da origem anterior. Fazer novo deploy **apenas do app e do preview autorizado**; validar novamente autenticação anônima/owner, tipos MIME, SHA remoto e atualização entre releases. Não promover para produção, trocar DNS ou habilitar deploy da main.

## Retirar um preview futuro

No painel Cloudflare, selecionar exclusivamente o novo Worker/preview identificado e desabilitar seu tráfego/URL ou remover o preview. Confirmar por request anônimo e autorizado que não serve mais. Não apagar Workers/policies compartilhados ou bindings de outros projetos. Política dedicada só deve ser removida depois de confirmar que não protege outra aplicação. Nunca revogar uma policy antes de retirar a exposição.

Para remover do dispositivo: excluir o ícone e limpar dados/cache do domínio de preview no navegador; isso pode exigir ação separada. O cache local de uma aplicação já baixada não é apagado por remover o Worker. Consultar `pnpm exec cf cli search "delete worker preview"` para o comando suportado na versão instalada e revisar alvo antes de uma operação destrutiva; não adivinhar sintaxe.
