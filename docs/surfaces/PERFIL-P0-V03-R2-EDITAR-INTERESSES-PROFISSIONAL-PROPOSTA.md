# goudduo — Perfil P0 V0.3-R2: Editar perfil, Interesses e Conta profissional

> **G4 — REFERÊNCIA VISUAL V0.3-R2 HOMOLOGADA EXPRESSAMENTE PELO PROPRIETÁRIO EM 11/11/2026.** Aprovação da tela Editar perfil, dos interesses em pills e da entrada para Conta profissional, seguindo a referência visual fornecida. A [V0.3 anterior](PERFIL-P0-COMPLETE-DUPLAS-V03-HOMOLOGADO-COM-RESSALVAS.md) permanece preservada. **A aprovação é da referência de UI/UX, não da implementação em produção nem da habilitação profissional.**

## Artefatos e fonte visual

- **[HTML V0.3-R2 navegável](../../lab/screens/profile/goudduo-perfil-p0-v03-r2-editar-interesses-profissional.html)**: nova versão para testar sem substituir a V0.3 existente.
- **[V0.3 anterior preservada](../../lab/screens/profile/goudduo-perfil-p0-v03-homologado-ressalvas.html)** e [V0.2 histórica](../../lab/screens/profile/goudduo-perfil-p0-v02-complete-duplas-proposta.html).
- [Issue Perfil #20](https://github.com/jukazilli/goudduo/issues/20) · [Nova tela Editar perfil #26](https://github.com/jukazilli/goudduo/issues/26) · [Verificação profissional #27](https://github.com/jukazilli/goudduo/issues/27) · [Motion #25](https://github.com/jukazilli/goudduo/issues/25) · [PR Draft #22](https://github.com/jukazilli/goudduo/pull/22).
- **Referência visual fornecida pelo proprietário:** captura da tela *Editar perfil* do Instagram, usada como diretriz de **hierarquia visual** (header, campos claros, ações separadas), sem importar recursos alheios à experiência de treino/comunidade do goudduo.

## A. Interesses — múltipla seleção por pills

A tarefa **Seus interesses** no Complete seu perfil abre agora um seletor de **pills**; a tela **Editar perfil → Interesses** abre o mesmo estilo. Seleções múltiplas independentes; toque novamente desmarca; as opções são opcionais, sem combobox/dropdown, sem necessidade de escolher categoria para entrar no aplicativo.

**Catálogo da referência:** Musculação, Corrida, Caminhada, Ciclismo, Yoga, Calistenia, Mobilidade, Alongamento, Treinos em grupo, Esportes, Bem-estar e Vida ao ar livre.

**Tokens:** pills inativas brancas com borda discreta e texto charcoal; ativas em azul #0866E8 com texto branco; controles com aria-pressed. **Somente estado de demonstração local**: sem algoritmos de Feed ou perfil de interesses salvo.

## B. Nova tela Editar perfil

Botão original **Editar perfil** no Perfil próprio abre uma **tela inteira branca**, com:
- Chevron isolado à esquerda, título **Editar perfil** central, botão textual **Salvar** à direita.
- Campos **Nome**, **Nome de usuário** e **Bio** com limite e contador de **150 caracteres**; inputs com fonte de 16px para evitar zoom do Safari.
- Linhas **Foto de perfil**, **Cidade e estado** (reutiliza a busca UF → município canônico do IBGE já aprovada), **Interesses** (pills), **Links** e **Informações pessoais** (explicação demonstrativa, sem pedir dados sensíveis).
- Ação textual azul **Mudar para conta profissional**, no fim da tela, com aviso de que depende de verificação.
- Edição demonstrativa apenas na memória da página, sem rede, upload, persistência de cadastro, validação real de @username ou backend.

**Configurações e atividade:** retirar **somente a entrada redundante “Meu perfil”**. Preservar Salvos, Evolução fotográfica, Privacidade, Segurança, Preferências do perfil, Duplas e Business quando habilitado; informações editáveis passam ao botão **Editar perfil**.

**Não copiar da referência Instagram por inferência:** Alterar fonte, Banners, catálogo de músicas, selo pago ou badges de verificação. Pronome/Gênero exigem modelagem contextual e escolha separadas; não acrescentar como campos obrigatórios.

## C. Complete seu perfil: novo sexto card

**Conta profissional** — descrição curta **“Atenda pessoas dentro do goudduo.”**, CTA **Conhecer**.

Ao tocar, abre **Editar perfil** e rola até **Mudar para conta profissional**. Ao selecionar a ação, apresenta sheet explicativo sobre a necessidade de verificação e a possibilidade futura de atender pessoas. **Não muda a conta, não ativa Business, não concede selo nem cria solicitação real.** O card é oferecido ao perfil próprio pessoal; quem já está na simulação de perfil profissional próprio não o vê.

## D. Verificação antifraude e LGPD — PENDÊNCIA #27

- Consultar registro público no sistema CONFEF/CREFs **não prova que quem abriu a conta é o titular**. Não conceder capacidade profissional por nome/número autodeclarados; avaliar vínculo seguro e proporcional entre registro e conta.
- Dados mínimos candidatos: **profissão/área de atuação, órgão/UF, número público de registro aplicável, status/fonte/data de checagem e trilha operacional mínima**, sob acesso restrito e retenção definida.
- Evitar coletar por padrão **CPF, RG, cópias de documentos, selfies e biometria**; eventual necessidade exigirá revisão jurídica e política adequada. Nem toda modalidade exige CREF; conferir categoria/regulamentação.
- Avaliar consulta pública oficial, revisão manual, rechecagem periódica, impugnação, bloqueio, antiabuso e possibilidade de **parceria futura com conselhos**. Não prometer API oficial nem automação de scraping.
- Conta social única com capacidade Business sob autorização do **backend**; o visual não concede permissão de atendimento ou prospecção.
- Referências: [FAQ CONFEF](https://faq.confef.org.br/faq/index.php?action=faq&cat=12&id=8&artlang=pt-br), [Consulta CREF/SC](https://online.crefsc.org.br/spw/consultacadastral/Principal.aspx), [ANPD — princípio da necessidade](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/copy_of_guia_legitimo_interesse.pdf).

## E. Preservações e qualidade

- Os cinco contextos do Perfil e a composição GODUOIT P0 v0.2 foram preservados, com Pulse, contadores, bio, Publicações, Rotinas, Atividades, ações e menus.
- Múltiplas duplas, convites pendentes, perfis compartilhados por par, Configurações → Duplas, catálogo IBGE e motion ≈300ms continuam presentes.
- O código original + módulo Perfil V0.3 + camada de edição R2 foram mantidos como **três scripts** e passaram em verificação **de sintaxe V8**; a interceptação de Editar perfil ocorre somente na referência.
- Imagens históricas/externas continuam **placeholders**, sem aprovação como mídia final. Implementação posterior usa imagens reais WebP quando necessárias e assets da marca oficiais.
- **PENDENTE:** QA real no navegador em 320/390/430 px; Safari/iPhone e Android, foco, rolagem, retorno, teclado, links, animações, seleção de pills, inputs, verificação de regressões e acesso ao catálogo IBGE. Teste de sintaxe **não equivale a QA funcional**.
- **CONCLUÍDO:** homologação visual expressa da referência **R2** em 11/11/2026. **PENDENTE:** implementação React, QA funcional e autorização específica para merge.

**Governança:** a **UI/UX de referência está homologada**; manter [PR Draft #22](https://github.com/jukazilli/goudduo/pull/22) sem merge até o gate técnico. Não declarar profissional validado, Feed personalizado, conteúdo salvo em banco ou implementação funcional antes dos respectivos gates.


## Termo de homologação — 11/11/2026

O proprietário declarou expressamente: **“Ok chat aprovado … pode homologar e enviar ao git”**. A aprovação recai sobre a **V0.3-R2 apresentada para avaliação**, com estas decisões:

1. **Editar perfil** é uma tela própria no contexto do goudduo, visual sóbrio, campos Nome, @usuário, Bio (150), foto, região, interesses, links e informações pessoais. A entrada “Meu perfil” redundante sai das Configurações, sem remover as funcionalidades restantes.
2. **Interesses por pills multisseleção**, não combobox; opcionais para personalização futura do Feed, sem coleta obrigatória na entrada.
3. **Conta profissional** como card opcional em Complete seu perfil, com chamada para o botão **Mudar para conta profissional** dentro de Editar perfil. A ação é apenas explicativa na referência.
4. **Preservação do contrato V0.3 anterior**: UF antes de cidade, seleção de município canônico IBGE, motion suave, múltiplas duplas, pendência/aceite bilateral e gerenciamento, sem regressão de Perfil.
5. **Pendência antifraude #27 permanece ABERTA**: verificar habilitação e titularidade real da credencial, minimizar dados e não ativar atendimento sem autorização efetiva do backend.

**Evidência técnica da versão:** HTML versionado em `lab/screens/profile/goudduo-perfil-p0-v03-r2-editar-interesses-profissional.html`, 3 blocos de JavaScript parseados sem erro sintático. **Isso não prova execução funcional nem QA mobile**; testes em navegador, Safari/Android, acessibilidade, autenticação, persistência, segurança e integrações permanecem pendentes. A PR #22 deve continuar **Draft e sem merge automático**.
