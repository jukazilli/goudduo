# Reconciliação e fronteira privado → público

## Fontes verificáveis

- Destino base: merge documental `f5e677a1741f38a0e804594fe528cdebbad64cc1`, fundação P1-R1 `0fbc3ed8b3e1c59245d2349ae14160a2a9c43086`.
- Origem privada GODUOIT main: `c0936896240e525353b237d92dff31fe0211eb94`, [governança](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/AGENTS.md), README/GEMINI consultados na investigação precedente. Fontes privadas exigem acesso do leitor; não se republicou seu conteúdo.
- [PR #154](https://github.com/jukazilli/GODUOIT/pull/154), head `08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38`: src/surfaces/routines/RoutinesSurface.tsx (blob `e7a44c6de15875243a8ae7f86caa877c29a7e2e6`), src/fixtures/routines-demo.ts (blob `3470cb7c77745488fa52ef01b2344f25359055b8`). Reconsultadas as regiões de clonagem, vínculo por dia e edição no snapshot privado da investigação.
- src/domain/exercise.ts, main privada, blob `f8a4e199718d99ebae7d8a807fa3f9ad28271848`; src/domain/equipment.ts, blob `698ba22e5f550f880d91a99858b8c84c40b2a6e0`: modelos consultados como referência analítica, sem transporte literal.
- [Allowlist P2-A](../p2a/ALLOWLIST-PORT-PRIVADO.md), [domínio/fidelidade V7.4](../p2a/ROTINAS-V74-FIDELIDADE.md), [riscos](../p2a/RISCOS-E-REGRESSOES.md). A allowlist permanece proposta, não autorização.

## Deltas necessários e limites

| Tema | Origem implementada | Contrato P2-B1 independente |
| --- | --- | --- |
| Catálogo e prescrição | Tipos ricos, metadados/mídias e parâmetros string em estruturas distintas | IDs de catálogo e instância separados; parâmetros tipados por medição e unidades explícitas |
| Dias e treinos | Prescrições embutidas por índice de dia; cópia profunda de mapas em duplicação de rotina | Associação rotina/weekday → workoutId, coleção única; cópia/referência não recebe regra padrão |
| Mover treino | Move objeto entre chaves de dias, rejeita destino ocupado | Não implementado como operação; futura regra de mover/copiar exige recorte próprio |
| Rascunho | Estado local no monólito, salvamento por rotina/editor | Drafts no mesmo reducer global; capturam revisão/vínculo e fazem commit atômico |
| Duplicidade | Comparação por nome e opção de duplicação forçada | Bloqueio por exerciseId no mesmo treino; sem duplicação forçada |
| Zero exercícios | Fallback de exercício livre no fluxo antigo | Bloqueado sem fabricar prescrição |
| Nome | Antecipado em partes do legado | Somente no commit após prepare/confirm-single |
| Volume | Séries, reps textuais, descanso formatado, tempo/distância | Séries/reps numéricos, segundos/metros/kg; adapter textual não implementado |
| Substitutos | Metadados/mídia associados aos planos | Referências a catálogo; herança/substituição operacional continua pendente |
| Capa/modalidade/autoria | Valores e mídias misturados a fixtures | Contratos descritivos, sem importar assets ou declarar direitos/habilitação |
| Sessão | Código em PR histórica divergente | Tipos separados de prescrição/execução, snapshot por revisão, sem integração histórica |

**Problema:** a P1 permitia reassociar o mesmo workoutId a outro dia e propagar a edição. **Evidência:** antigo teste model.test.ts com commit de segunda para terça; legado usa mapas embutidos e clonagem, sem contrato normativo de compartilhamento entre dias. **Impacto:** alteração inesperada em mais de um dia. **Alternativas:** referências explicitamente compartilhadas ou cópias independentes com novos IDs. **Solução mínima implementada:** representar ambas sem ativar política; bloquear salvamento/renomeação de entidade multiassociada e criação implícita de segundo vínculo. **Gate:** proprietário decide semântica e UX antes das operações de copiar/mover/editar compartilhado. Os testes cobrem bloqueio e independência.

## Segurança e reaproveitamento futuro

Arquivos privados transportados: **nenhum**. Somente leitura analítica dos modelos/fontes acima. Código publicado nesta PR foi escrito independentemente; não houve cherry-pick, merge histórico, cópia de fixtures, screenshots privadas, GIFs, fotografias ou logo reconstruído. Os caminhos e hashes são metadados de proveniência já investigados, não divulgação de implementação privada.

Dependências e lockfile preservados, sem pacote adicional. Assets da aplicação preservados. Fixtures novas são explicitamente sintéticas (dois exercícios adicionais por tempo/distância, um equipamento e um grupo), sem nomes de pessoas reais, catálogo profissional, coleta corporal ou persistência. Nenhum segredo/credencial/variável de ambiente novo.

O bundle é verificado pelo guard existente: allowlist de arquivos/extensões, proibição de sourcemaps, symlinks, marcadores privados, credenciais e conteúdo de Lab no app comum. Esse controle não é certificação universal de direitos; não libera futura mídia ou port. Código de catálogo completo, busca/taxonomia avançada, criação/moderação, equipamento detalhado, upload/capas e componentes de Sessão continuam candidatos a reaproveitamento seletivo, sujeitos à autorização granular. Não foram reimplementados nesta fase.

Nenhum arquivo Shell/Header/TabBar/OverlayHost/navigation/surface-contracts/tokens/CSS/Cloudflare foi alterado. Feed privado não foi copiado nem executado como baseline nesta P2-B1. A proteção verificável aqui é ausência de diff nessas regiões e regressão da fundação pública; não equivale a paridade visual com Publicações privada.
