# goudduo — Leitor Legal e Privacidade · referência UI V0.1

> **Status:** proposta visual em avaliação, **não homologada pelo proprietário**. O fluxo foi criado no Visual Lab como **HTML demonstrativo**, não serviço funcional, política juridicamente publicada ou autorização para coletar dados.
>
> **Referências canônicas:** [Issue #16 (Leitor)](https://github.com/jukazilli/goudduo/issues/16), [Issue #17 (Seus dados)](https://github.com/jukazilli/goudduo/issues/17), [Issue #12 (gate jurídico)](https://github.com/jukazilli/goudduo/issues/12) e [PR #15 (textos editoriais v0.1)](https://github.com/jukazilli/goudduo/pull/15).
>
> **Fonte visual intacta:** Acesso/Cadastro/OTP V0.4 mapeado na GODUOIT e homologado em etapas no goudduo ([#6](https://github.com/jukazilli/goudduo/issues/6), [#9](https://github.com/jukazilli/goudduo/issues/9), [#13](https://github.com/jukazilli/goudduo/issues/13)); CSS extra localizado nas novas telas de laboratório, sem redesenhar as anteriores.

## 1. Referência editável/navegável

**[HTML V0.1 — Laboratório Leitor Legal / Privacidade](../../lab/screens/legal/goudduo-leitor-legal-privacidade-v01-proposta.html)**.

O arquivo mantém as telas anteriores e acrescenta duas superfícies novas:
- `legal-reader`: uma tela única de leitura para Termos de Uso e Política de Privacidade (duas abas), com voltar e versão.
- `privacy-settings`: prévia da área `Configurações e atividade → Privacidade e seus dados`, com documentos, privacidade de treinos, solicitar cópia, corrigir informações e excluir conta.

**O ponto de entrada do laboratório é Cadastro** para revisar a mudança dos links; os demais estados homologados permanecem disponíveis no seletor externo de teste.

O wordmark é o fallback raster da prévia original V0.4 para funcionar offline; no aplicativo deve usar os SVGs oficiais da marca. O laboratório não publica política ou endpoint.

## 2. Contrato de navegação — preservação do Cadastro

### Cadastro → Documento
1. Ao tocar **Termos de Uso** ou **Política de Privacidade** abaixo do CTA homologado, abrir o Leitor na aba correspondente.
2. O HTML preserva no DOM os quatro campos originais **e-mail, @usuário, nascimento e senha**. A volta utiliza o mesmo formulário e tenta restaurar sua posição de rolagem; **não navega a uma nova página e não serializa credenciais**.
3. As abas alternam documentos sem voltar ao Cadastro. O botão chevron isolado e o CTA **Voltar** são ações de navegação. **Ler/Voltar não gera aceite legal.**
4. Os links para o documento integral correspondem às **minutas editoriais aprovadas v0.1 na branch da PR #15** — **NÃO** são URLs de política vigente.
5. Quando houver rede, o laboratório tenta buscar **texto integral Markdown** das minutas aprovadas, exibindo seu conteúdo em blocos legíveis. O texto é tratado via `textContent` para não executar HTML injetado. **Quando não há rede**, mostra **resumo demonstrativo**, com aviso explícito e link para a fonte integral; nunca afirma ser o texto final.
6. **Regra obrigatória na produção:** publicar versão vigente e acessível, com histórico, sem depender de uma branch de desenvolvimento; cumprir decisões jurídicas de aceite e tratamento separado de consentimentos opcionais.

### Configurações → Documento
1. `Configurações e atividade → Privacidade e seus dados → Termos/Política`.
2. Ao voltar, retorna às próprias Configurações, não ao Cadastro.
3. Acesso sem conta deve existir para documentos vigentes por URL pública; a UI aqui é somente ilustrativa.

## 3. Contrato de dados e exclusão — sem backend no protótipo

- **Privados por padrão (decisão de produto):** registros detalhados de treino, medidas e fotos de progresso. Preferências e visibilidade não mudam no laboratório.
- **Solicitar cópia:** abre explicação de canal LGPD. **Não envia solicitação nem cria protocolo**.
- **Corrigir informações:** explica dependência de verificação de titularidade. **Não altera cadastro nem dados do banco**.
- **Excluir conta:** abre texto contextual confirmando que a futura exclusão exige autenticação e processamento por servidores. **Não dispara exclusão de dados** nem apresenta falsa confirmação de sucesso.
- **Canal informado pelo controlador:** `smkahrun01@gmail.com`. Não solicitar senhas, OTP ou documentos de identidade no HTML experimental.
- Regra técnica futura de remoção e retenção: [Matriz v0.1](../legal/MATRIZ-DADOS-RETENCAO-V01.md), com auth, banco, storage, mídias, CDN/caches, backups e terceiros.
- **Sem decisão de UX final** ainda sobre o fluxo destrutivo separado de exclusão, autenticação proporcional, preferências de privacidade e exportação.

## 4. Conformidade visual com Design System

- Fundo branco, charcoal `#10202B`, gelo `#F1F8FB`, azul `#0866E8` com texto branco e bordas `#D9DEE4`.
- Plus Jakarta Sans com fallback system-ui em ambiente offline.
- Sem gradiente nas telas internas, sem ícones em círculos decorativos, sem misturar ícone e texto no mesmo CTA, sem textos instrucionais de UI óbvia.
- Tratamento especial para títulos grandes e documentos longos: rolagem interna, contraste e largura de leitura; chevron de retorno isolado.
- Ainda não existem controles de privacidade persistidos: sem afirmação de que recursos internos estão prontos.

## 5. QA executado e limites

**Executado com Chromium/Playwright via documento injetado:**
- JavaScript verificado por `node --check`, sem erro sintático.
- Viewports **320×740, 390×844, 430×932 e 1440×1000**.
- Cadastro com os quatro campos preenchidos; abrir Termos, alternar Política, retornar: **valores preservados** nos quatro tamanhos.
- Configurações → Termos → voltar às Configurações.
- Ação Excluir conta: a UI declara explicitamente que **nenhum dado é removido**.
- Sem exceções JavaScript e sem overflow horizontal no documento, nas quatro dimensões.
- Exibição offline de **resumo identificado**, com link para minutas integrais.

**Não testado / não declarar pronto:** Safari/iPhone físico, acessibilidade com VoiceOver/TalkBack, fetch real dos documentos pelo navegador em rede, renderização completa de tabelas Markdown complexas, prazos e aceites juridicamente válidos, estados de erro reais, formulários e serviços backend, autorização de exclusão, e2e de integração React.

**QA complementar de rolagem:** foi injetado um espaçador de 550px exclusivamente no ambiente de teste para forçar a rolagem do Cadastro a 173px; ao abrir a Política por ação programática (sem forçar scroll automático do navegador) e retornar, a rolagem foi restaurada a **173px**. A rotina agora desfoca o link antes da transição e restaura a posição após o primeiro frame de layout. Isso não substitui a validação do comportamento em Safari/iPhone real. Ao clicar fisicamente em um link fora da área visível, o navegador naturalmente rola até o link antes de abri-lo, portanto a posição registrada é a do instante real de abertura.

## 6. Gate e precedência

- [x] Minutas v0.1 **editorialmente homologadas** no GitHub, PR #15.
- [x] Issues próprias para as novas superfícies #16 e #17.
- [x] HTML experimental versionado em branch derivada da PR #15.
- [x] QA básico de navegador e validação de navegação/preservação de campos.
- [ ] **Avaliação e homologação visual do proprietário para as novas telas**.
- [ ] Revisão jurídica das minutas; confirmação de Cloudflare/Supabase, bases legais, prazos e processos de dados.
- [ ] URLs públicas e vigentes de Termos e Política + aceite adequado **antes do cadastro real de produção**.
- [ ] Modelagem do fluxo funcional de exportação e exclusão de conta, com autenticação e backend.
- [ ] Integração e QA real da aplicação.
- [ ] Gate da [Issue #12](https://github.com/jukazilli/goudduo/issues/12) antes de avançar ao Onboarding.

**Não fazer merge automático desta referência e não alterar a Home Treinos V5.3.**
