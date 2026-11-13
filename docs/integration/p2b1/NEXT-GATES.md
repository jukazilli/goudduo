# Próximos gates — sem início automático

P2-B1 termina com PR Draft técnica; merge e homologação de implementação dependem do proprietário. A homologação documental da PR #32 não aprovou pendências funcionais.

| Gate | Estado e decisão necessária | Dependência |
| --- | --- | --- |
| Referência Home/Rotinas | Fontes recuperadas e homologadas documentalmente: Home0731832, Rotinas3f8b2c7 | Futuras capturas comparam somente corpo da superfície; Shell contra P1-R1 |
| Cópia × referência | Modelo representa identidades independentes e compartilhadas; gravação multiassociada bloqueada | Definir criação de cópia, propagação, confirmação, IDs internos e reversão antes de ativar operações |
| Catálogo e parâmetros avançados | Contratos mínimos de medições/substitutos/equipamentos implementados | Adaptar strings/unidades com testes de round-trip; confirmar metas combinadas, herança de substituto e metadados completos |
| Mídia/capas/autoria | Referências tipadas sem importação nem direitos presumidos | Autorização por asset/arquivo antes de divulgar; sem upload/habilitação profissional nesta etapa |
| UI de salvamento | Estados editing/confirm-single/naming prontos; sem popup ou Editor | Implementar confirmação e sugestão contextual de nome pelo dia no recorte visual aprovado |
| Home/Sessão | Seletores derivam entidade/revisão e snapshot de prescrição | Card Home e Sessão operacional permanecem fora desta PR |
| Progresso/Pulse | Funções e dados ainda pendentes; não adicionados ao domínio de treino | Homologação própria; Peso estrutural e Pulse por contexto seguem contratos P2-A |
| QA físico | Nenhum teste em iPhone/Safari físico | Proprietário valida depois das superfícies integradas; Chromium não prova Safari |
| Cloudflare | Configuração preservada; somente dry-run | Publicação exige autorização específica, revisão de artefato e permissões da conta |

## P2-B2 recomendado — adapters contextuais de Rotinas

Escopo proposto, **não iniciado**: conectar draftId/routineId/day/workoutId/revision/origem aos contratos de navegação e composição existentes; título/ação contextual do Editor; extensão local de conteúdo/tamanho de overlays para Biblioteca/confirmar/nomear; retorno preservando dia, rascunho e scroll.

Aproveitar ShellHeader, SurfaceIntegrations e OverlayHost, sem segundo Shell/roteador/host e sem transportar header/TabBar dos HTMLs. Validar antes se contratos existentes bastam; qualquer delta deve ser mínimo e documentado. Manter cinco destinos e três contextos Home. Não é autorização para integrar Home, Bento, Editor ou Biblioteca completos.

Testes esperados: origem/retorno/back/forward/rota direta, fechamento/foco/inert/teclado/movimento reduzido, retenção/cancelamento de draftId, ação de salvar representando stage/issue, safe areas nos cinco viewports, Lab isolado, bundle e dry-run. Gate do proprietário antes de iniciar e ao revisar PR específica. Sem deploy ou merge automático.
