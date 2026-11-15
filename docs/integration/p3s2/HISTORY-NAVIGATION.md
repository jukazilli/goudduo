# Navegação e retorno contextual

| Caminho | Contrato |
| --- | --- |
| /historico | Destino existente, agora com lista real de finished próprios ou vazio honesto |
| /historico/:sessionId | Novo Page session-result, contextual e tipado; apenas ID opaco |
| /sessao/:sessionId | Execução/resumo existentes, com gate adicional de titularidade |

BrowserNavigation/NavigationProvider existentes preservam History API, parse/encode e markers. parentPage de session-result é history. ID malformado vira página não encontrada; válido ausente/alheio/não finalizado vira Resultado indisponível, sem revelar nome ou valores. Nenhum payload de séries/cargas é serializado na URL ou history.state.

Header contextual é o ShellHeader único; Histórico/resultado usam a política contextual existente sem sexta aba ou TabBar própria. Chevron retorna à origem no stack; entrada direta sem stack usa parentPage. O detalhe também oferece link explícito para Histórico. Resumo terminal conserva Voltar à origem e oferece Histórico; Ver resultado existe somente quando há projeção finished autorizada. Descarte pode consultar a lista, mas não ganha resultado.

Lista→detalhe→Back/Forward restaura o mesmo entry key/scroll do navegador. PrototypeApp guarda somente o ID selecionado em estado de apresentação. aria-current e descrição de data/estado identificam o item; ao retornar, foco volta ao link selecionado quando estiver no viewport, sem mudar scroll. A origem por resumo continua distinta de uma seleção feita na lista.

## Acesso atual e gate de entrada permanente

Entradas comuns disponíveis nesta missão são os resumos terminais de Sessão e o destino /historico. Não se criou atalho global, sexta aba ou botão redundante em Rotinas/Perfil. Ponto permanente de entrada via Perfil/Atividades/Rotinas depende de contrato futuro. Digitar uma URL/recarregar cria nova instância sem sessões; não prometer acesso durável por link.

Consultar resultados/lista é readonly e não pausa/finaliza uma sessão por efeito próprio. **Sair da superfície de execução continua pausando pela política S1 homologada**; não foi introduzida exceção por abrir Histórico. Sessão já pausada permanece com seus dados, e consulta não cria execução ou commit.

Reload limpa dados, seleção e memória de scroll da instância. IDs antigos são tratados com segurança, sem recuperação ou associação a outro Workout. Foco, safe areas e estados vazios seguem o Shell existente; não há segundo sistema de navegação.
