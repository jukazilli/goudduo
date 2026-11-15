# Fonte de dados e estados — apresentação, não feed

Auditoria atual: DemoState.social possui toggles liked/saved/reposted/hidden/followed, sem Pulse, mídia, autores, validade, distribuição, contagem ou comandos de visualização. Não se reutilizam likes/hidden de posts como visto/ocultação de Pulse. Model/provider/reducer/seletores/fixtures de treinos não foram alterados.

## Contrato mínimo novo

TrainingPulseIdentity contém somente id, displayName, kind(own/institutional/demonstration) e viewState(unknown/seen/unseen). Não contém mídia/URL de pessoa, conteúdo, timestamp, quantidade, validade ou destino. É um descritor derivado, não entidade salva/store de feed. Não existe ação para marcar visto ou publicar.

`trainingPulseIdentities(user, examples=[])` retorna própria e institucional nesta ordem; extras só aceitam scope=demonstration explícito, IDs/nomes válidos e únicos. O consumidor comum chama sem extras. Identidade institucional é dado público legítimo da marca, não uma publicação institucional. A inicial usa trim/NFC/Unicode e o nome compartilhado; alterar o nome no Lab muda a inicial sem afetar treinos/social.

## Estados e fonte canônica

Confirmados por leitura atual de [#8/6563804391](https://github.com/jukazilli/GODUOIT/issues/8#issuecomment-6563804391) e [#73/6717419889](https://github.com/jukazilli/GODUOIT/issues/73#issuecomment-6717419889):

| Estado | Fonte/implementação | Limite |
| --- | --- | --- |
| Próprio/Criar | Badge+; nunca usa lido/não lido para criação | Controle desabilitado porque fluxo não existe |
| Unknown/indisponível | Neutro, sem pressupor visto | Estado das duas identidades comuns; sem conteúdo/viewer/dado de consumo |
| Seen | Aro gelo#F1F8FB sem gradiente, semântica acessível | Apenas fixture explícita nesta fase; baixo contraste de gelo sobre branco continua questão visual canônica |
| Unseen | Conceito destacado/gradiente confirmado; stops/biblioteca exatos ainda PENDENTES no contrato | Nenhum stop foi promovido por inferência. Fixtures não vistas têm identificação acessível explícita e acabamento neutro provisório, nunca aro de visto |

O warm gradient listado em#73 é referência de CSS existente, não aprovação de novos stops; azul/lime do HTML também não suplanta#8. Não foi copiada nenhuma dessas misturas. `pulseRing(unseen)=neutral` preserva a pendência cromática, não significa visto. A aplicação comum não possui registros com estado conhecido que justificassem anúncio de novos conteúdos ou gradiente real.

Toque, troca de abas, scroll, reload e retorno não calculam visualização, notificações ou contadores. Aro gelo não certifica consumo real; fixtures são identificação técnica de estados demonstrativos. Não existe backend/serviço de expiração/sincronização.

## Fixtures técnicas e ausência de dados

TrainingPulseScenario no Lab usa IDs technical-pulse-* e Identidade N — demonstração, sem pessoas reais, fotografia, GIF ou posts. Permite0/1/2/8 identidades e os três estados. Esses exemplos não são importados pela aplicação comum e são bloqueados pelo guard do bundle.

Sem conteúdos sociais, a aplicação comum ainda mostra os dois pontos de identidade permitidos; isso não alega dois Pulses publicados. Uma lista literalmente vazia é exercitada no renderer isolado e não cria controles vazios focáveis. Não há lista alternativa de posts exclusiva de teste no produto, cache de vistos ou persistência sensível.

Autoria/mídia/validade/distribuição/ordem por serviço, quantidade e significado técnico de conclusão de visualização exigem domínio e autorização futuros. Nenhuma regra foi definida silenciosamente.
