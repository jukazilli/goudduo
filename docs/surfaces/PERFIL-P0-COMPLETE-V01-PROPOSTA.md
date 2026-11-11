# goudduo — Perfil P0 V0.1 + Complete seu perfil · proposta para avaliação

> **G2 — HTML DE LABORATÓRIO, NÃO HOMOLOGADO VISUALMENTE NO GOUDDUO.** Novo pedido em 10/11/2026: preservar o Perfil mapeado da GODUOIT, refinar apresentação e acrescentar conclusão progressiva sem criar onboarding obrigatório nem retirar funcionalidades existentes.
>
> **Issue canônica:** [#20 — Perfil](https://github.com/jukazilli/goudduo/issues/20). **Onboarding V0.1 já homologado como referência:** [#19](https://github.com/jukazilli/goudduo/issues/19), [PR Draft #21](https://github.com/jukazilli/goudduo/pull/21). A homologação do onboarding **não aprova automaticamente esta composição do Perfil**.

## 1. Arquivo e proveniência

[**HTML V0.1 navegável do Perfil com Complete seu perfil**](../../lab/screens/profile/goudduo-perfil-p0-v01-complete-proposta.html).

**Fonte original preservada:** [GODUOIT Perfil P0 v0.2 candidato](https://github.com/jukazilli/GODUOIT/blob/faa2276ecb56d6aaf6a3dd90d082c0693973bf02/lab/references/profile/goduoit-perfil-p0-v02.html), blob **`b7ed1180866efb5e6f41d504e511487c9c98ed6c`**, estudado na [Issue #77](https://github.com/jukazilli/GODUOIT/issues/77) e [PR Draft #147](https://github.com/jukazilli/GODUOIT/pull/147). **A origem é candidata e não foi homologada como master/produção.**

**Técnica de construção da nova referência:** copiado integralmente o HTML P0 v0.2 e aplicado somente:
1. nome do documento e **wordmark oficial preto do goudduo embutido em data SVG** — não depende da rede para exibir a marca;
2. token do botão de ação `#0866E8` com texto branco (antes legado `#00A8E8` com texto escuro);
3. **CSS adicional isolado** para a seção de conclusão;
4. **segundo script autônomo**, sem substituir funções `render`, `ownIdentity`, `tabs`, `posts`, `linked`, `renderModal` ou `target` do código legado.

**Não houve alteração no HTML do onboarding, do Cadastro, OTP ou da Home Treinos.**

## 2. Elementos deliberadamente preservados

- Cinco contextos no seletor da referência: **meu Perfil pessoal**, **pessoa visitada**, **profissional visitado**, **meu Perfil profissional** e **Perfil da dupla**.
- Topbar de Perfil, avatar/Pulse (visto, não visto, vazio), menu, ação de criação e acesso às Configurações.
- Contadores **Treinos, Seguidores, Seguindo** e apresentação de bio/nome.
- Perfil próprio: **Editar perfil** e **Compartilhar perfil**.
- Perfil visitado: **Seguir, Mensagem, Formar dupla** e ações de segurança; **Formar dupla** exige aceite do outro lado e não cria Match avulso.
- Abas somente texto **Publicações, Rotinas, Atividades**, grade de mídia e grade de rotinas, ressalvas de privacidade de atividades.
- Estados de credencial profissional, menu Business, simulação de Perfil da Dupla e navegação para destinos em investigação.
- Nenhuma nova tab bar, rota de produção, atribuição de CREF ou troca do shell.
- Dados de progresso (peso, medidas, fotos corporais) **continuam fora do Perfil público e privados por padrão** conforme [GODUOIT #159](https://github.com/jukazilli/GODUOIT/issues/159).

## 3. Novo módulo aditivo e opcional

Local: **depois do conteúdo das abas do Perfil próprio**; não inserir acima do cabeçalho/contadores nem substituir grades. Renderiza somente nas simulações `own` e `proOwn`. **Não aparece em perfis visitados ou da dupla.**

Quatro cards horizontais, dispensáveis individualmente:
- **Seu nome:** editar nome de exibição (ausente no cadastro obrigatório do goudduo).
- **Foto de perfil:** adicionar uma imagem privada local à prévia, sem upload para servidor.
- **Seus interesses:** seleção opcional local (Treinos, Corrida, Caminhada, Bem-estar).
- **Encontre pessoas:** abre cenário de pessoa visitada para experimentar seguir (apenas simulação).

Há ação **Ocultar** para toda a seção e acesso **Preferências do perfil** em Configurações para reabri-la. Marcar um passo concluído na demonstração **não gera estado de backend**, não torna dados públicos, não configura Match, não valida Business e não dispara qualquer ação real.

**Sem progressômetro coercitivo:** nenhum número “3 de 4” obrigatório; ausência de foto, nome, peso ou treinos não gera punição ou restrição à comunidade. O visual é leve e sóbrio, com botões de texto sem ícones misturados.

### Contrato de dados do produto (implementação futura)

- Uma identidade social para pessoa e capacidades profissionais; `Business` depende de habilitação/verificação, não de autodeclaração.
- Nome de exibição e foto de avatar opcionais; não confundir a **foto de Perfil** com **foto corporal privada de Progresso**.
- Interesses opcionais para o Feed, sem consentimento genérico ou acesso automático a dados sensíveis.
- Seguir alguém não cria dupla fixa nem inicia Match; a chamada para descoberta não ativa opt-in de localização.
- Preferências devem existir em **Configurações e atividade → Preferências**; recomendações ocultadas podem ser revisitadas. **Não salvar ações localmente como se estivessem em produção**.

## 4. Referências de imagens e política WebP

- **Esta composição é somente referência.** A origem inclui **URLs externas de imagens ilustrativas Unsplash** e avatares de letras; sua presença não as torna assets oficiais de produção, não garante disponibilidade offline e não constitui aprovação de uso.
- **Requisito homologado pelo usuário no onboarding:** ao implementar cenas/cards que precisam de imagens, selecionar/produzir fotografias **reais, coerentes com a experiência social wellness do goudduo**, com direitos de imagem/licença e **exports WebP** otimizados/responsivos (tamanhos, qualidade, alt e estabilidade de layout). 
- **Não gerar imagens agora.** Assets definitivos precisam de briefing específico, homologação separada e manutenção da tipografia/token/cor da interface. SVG oficial de marca continua sendo SVG, não WebP.
- Arquivos que um usuário selecionar no protótipo para foto de Perfil permanecem em memória do navegador **sem envio**; não são biblioteca de assets de produção.

## 5. QA e limites atuais

- [x] Código da origem lido e conciliado com Issue #77 / PR #147.
- [x] Cinco contextos e abas originais confirmados na nova versão.
- [x] Wordmark oficial preto incorporado como data SVG.
- [x] CSS e script extra isolados do motor de estados original.
- [x] Scripts original e aditivo **parseados em V8 sem erros de sintaxe**, e verificada presença dos controles da nova seção.
- [ ] **NÃO houve execução de QA no navegador** nesta fase: testar 320/390/430 px e desktop, retorno das Configurações, cards, ações nome/foto/interesses, swipe, foco, iPhone/Safari, Android, acessibilidade e possíveis conflitos de renderização em cada contexto.
- [ ] Verificar disponibilidade offline das **imagens externas ilustrativas**, que podem não carregar; wordmark oficial foi embutido para evitar esse problema.
- [ ] Homologar visualmente com o proprietário antes de PR pronta/merge.
- [ ] Confirmar API, storage, perfil próprio/visitado, autorização por objeto e funcionamento real após revisão técnica.

**Gates externos:** [#12](https://github.com/jukazilli/goudduo/issues/12) permanece aberto para Termos/Privacidade vigentes e controles reais de direitos/exclusão; [#19](https://github.com/jukazilli/goudduo/issues/19) está homologado somente como referência; a Home Treinos V5.3 não foi alterada.

**Governança:** manter esta proposta em **PR Draft independente**, sem merge na `main` e sem declarar Perfil homologado ou pronto para produção.
