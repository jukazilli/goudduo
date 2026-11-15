# Prontidão por superfície

Classificação da implementação real na base homologada e nesta rodada de QA. “Real” significa operacional no protótipo com dados demonstrativos em memória, não serviço de produção. “Apresentação” e “contrato” não equivalem a funcionalidade final. Sem percentual geral de conclusão.

| Superfície | Implementação | Integração: estado e rotas | Testes comprovados | Pendências funcionais/visuais | Bloqueadores | Próxima ação |
| --- | --- | --- | --- | --- | --- | --- |
| Shell | Real | Provider/navegação/Header/TabBar únicos | foundation, adapters, navigation, axe | Refinamento e QA físico | Dispositivos não testados | Homologar QA e executar protocolo |
| Home Treinos | Parcial: corpo real, widgets neutros | /home/treinos; seletor único/Hero | home-training, B8, axe/medidas | Progresso/Sessão; estética regional | Regras/serviços dessas áreas | Manter neutros; refinamento por recorte |
| Rotinas | Parcial: Home Bento real | /rotinas; routine/day IDs, preview compartilhado | routines-home, B5/B6/B8 | CRUD completo, cópia/referência, estética | Decisão de produto | Homologar integração; recorte de operações |
| Editor | Real no recorte aprovado | /treinos/:id/editar; draft isolado, revisão | workout-editor, B5/B8, reducer | Equipamento selecionável/substitutos/descoberta/limite nome | Contratos e catálogo | Refinar após decisões, sem novo store |
| Biblioteca contextual | Real demonstrativa | routine-library; catálogo único/draft/add | contextual-library, B8, axe | Catálogo definitivo e mídia | Direitos/conteúdo profissional | Validar catálogo e direitos |
| Pulse Treinos | Parcial: apresentação | Slot squircle; própria/institucional neutras | training-pulse, fixtures Lab, medidas/axe | Viewer/criação/visto/ocultação | Dados/serviços/gradiente não homologados | Recortes autorizados próprios |
| Home Publicações/Feed | Placeholder | /home/publicacoes; contrato circular preservado | foundation/B6/B7 isolamento | Feed/ações visuais não integrados | Fronteira privada/mídia/baseline | Auditoria e autorização granular |
| Business | Placeholder | /home/business; elegibilidade não concedida | foundation/B6/B7 | Experiência profissional | Contrato funcional e habilitação | Definir recorte aprovado |
| Perfil | Placeholder | /perfil, /perfil/:id; identidade demo | foundation/rotas | Perfil/edição/interesses visuais | Integração de contratos | Recorte próprio |
| Splash/Login/Cadastro | Placeholder | /acesso/* sem Shell | rotas/history/foundation | Fluxos e autenticação não implementados | Contratos/serviço posterior | Integrar acesso sem fingir autenticação |
| Onboarding | Placeholder | /onboarding sem TabBar global | contratos/rotas/foundation | Jornada visual/dados | Integração futura | Recorte próprio |
| Match | Placeholder | /match; aba central Map | foundation/TabBar | Busca/pareamento | Produto/serviços | Não antecipar |
| Mensagens | Placeholder | /mensagens | foundation/TabBar | Conversas/envio | Serviços e privacidade | Recorte próprio |
| Sessão de treino | Placeholder + contrato | /sessao/:id; SessionPrescription tipado | domínio snapshot/rota | Execução real ausente; CTA Home abre Rotinas | UX/motor de Sessão | Autorizar lote de execução |
| Histórico | Placeholder | /historico | contratos/rotas | Registro e visualização de execução | Sessão/dados reais ausentes | Depois do contrato de Sessão |
| Progresso | Ausente funcionalmente | Slots neutros na Home; sem registros corporais | B6 neutralidade/sem inputs | Peso/medidas/fotos/recordes/consistência | Regras e dados sensíveis não aprovados | Homologação funcional específica |
| Biblioteca independente | Ausente | Widget Home indisponível; não abre sheet do Editor | B6 isolamento | Consulta/gestão própria | Catálogo/UX/direitos | Recorte separado da contextual |
| Configurações e Atividade | Parcial: rota e painel placeholder | /configuracoes e panel=activity | foundation/overlays | Configurações, ocultação Pulse, atividade real | Contratos/dados/persistência | Recorte específico sem toggle improvisado |

Visual Lab: implementado separadamente para consumidores técnicos/fixtures, build próprio; não constitui superfície funcional do produto nem evidência de Feed, viewer ou catálogo profissional concluídos. Acesso direto/reload seguro sem contexto não reconstrói rascunhos ou autenticação.

Pendências de produto não são regressões produzidas nesta missão. A recomendação de homologação funcional é limitada à jornada de prescrição em memória, com gates de QA físico, direitos e serviços preservados.
