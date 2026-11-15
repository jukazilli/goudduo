# Instalação física — instruções condicionais

**Não há preview publicado ou instalação física comprovada nesta entrega.** Executar estes passos somente na URL HTTPS exata depois de concluídos os gates de proteção. Não usar localhost do computador como endereço no telefone.

## iPhone / Safari

1. Abrir a futura URL protegida no Safari, autenticar apenas a identidade autorizada e verificar Home/Rotinas/Sessão/Histórico.
2. Compartilhar → Adicionar à Tela de Início → Adicionar.
3. Abrir o ícone goudduo; verificar modo standalone, identidade, safe areas, teclado e navegação.
4. Se a autenticação não for compartilhada com o standalone, autenticar nesse contexto. Se redirects/OTP, manifest ou SW não funcionarem dentro dele, a experiência permanece bloqueada; não afrouxar a política para contornar.

## Android / Chrome

1. Abrir a futura URL protegida e autenticar com a identidade autorizada.
2. Menu → Instalar aplicativo / Adicionar à tela inicial (o texto varia por versão).
3. Abrir pelo ícone e repetir a jornada integrada, inclusive nomeação e retorno.

Não há evidência de instalação física, Chrome prompt ou WebAPK concluído. Manifest válido e SW ativo no Chromium automatizado não equivalem a essa comprovação.

## Offline limitado

Depois de uma instalação/cache estático concluído online, a interface, fontes e ícones verificados podem abrir offline, inclusive rotas profundas usando o shell. Não há catálogo remoto, autenticação offline nova, uploads, sincronização ou serviço de dados. Um dispositivo novo sem cache exige conexão.

Treinos, rascunhos, séries e Histórico continuam em memória; navegar na mesma instância pode preservá-los, mas reload, fechar app, descarte do processo pelo SO ou nova instância pode perdê-los. Dados de Sessão não são recuperados pelo cache. IDs antigos mostram indisponibilidade segura.

Após sete dias o cache offline expira. Se não houver nova versão instalada, usar online; para repovoar explicitamente o cache do mesmo build, limpar os dados desse site, autenticar online e reabrir. Isso também remove qualquer estado do app; não executar durante uma sessão. Nunca anunciar persistência de treino por ter instalado o PWA.

Cache estático já baixado pode continuar acessível localmente mesmo sem rede/autenticação até expirar ou ser apagado. Access controla o acesso remoto, não apaga cópias locais. Nenhum registro pessoal é guardado nesse cache. Remover ícone não garante apagar os dados do site: limpar armazenamento no navegador quando necessário.
