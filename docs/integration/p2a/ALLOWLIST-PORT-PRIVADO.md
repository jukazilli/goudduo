# Allowlist PROPOSTA — nenhum transporte autorizado

Esta seleção permite aprovação por item/recorte, **não concede publicação**. M = branch main, commit c0936896240e525353b237d92dff31fe0211eb94; R = branch fix/ios-input-focus-zoom-20261109, commit 08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38, PR #154 aberta. A escolha de R agrega header R5 e correção de inputs, não o torna superior ao contrato V7.4.

Todos os caminhos abaixo são completos a partir da raiz privada GODUOIT. Nenhum desses arquivos integra esta PR. Imports, blobs, bytes/linhas e varredura limitada foram obtidos de `git show`/`git rev-parse` no commit indicado. **Licença geral de redistribuição não localizada na raiz da origem; código autoral exige liberação expressa do proprietário.** Ausência de padrões de segredo não é certificação exaustiva. Modelos que contêm campos de autor não provam ausência de dados pessoais em fixtures.

## A, D e E — inventário por arquivo

### A01 — src/domain/exercise.ts

- Categoria/função: Autoral — tipos/filtro de catálogo.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/domain/exercise.ts). Blob **f8a4e199718d99ebae7d8a807fa3f9ad28271848**.
- Tamanho/escopo: **3,595 bytes / 107 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Tipos com campos de autoria/URL, sem registros de pessoas neste módulo; filtro é lógica própria.
- Dependências efetivas: `Nenhum import detectado`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **ADAPTAR tipos/matching autorizados; não globalizar DIFFICULTY_COLORS; implementação independente pequena é possível**.

### A02 — src/domain/equipment.ts

- Categoria/função: Autoral com dependência de mídia.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/domain/equipment.ts). Blob **698ba22e5f550f880d91a99858b8c84c40b2a6e0**.
- Tamanho/escopo: **5,290 bytes / 180 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Tipos/search + INITIAL_EQUIPMENT; importa fotografia privada, dados ilustrativos não são inventário real.
- Dependências efetivas: `../assets/home/workout-hero-extensora.jpg`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **ADAPTAR apenas tipos/search; excluir import de foto/seed. Alternativa independente com catálogo sintético**.

### A03 — src/domain/muscle-taxonomy.ts

- Categoria/função: Autoral — taxonomia.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/domain/muscle-taxonomy.ts). Blob **f5dfa6a627e0f55f1ac7de2949603154d1a0af2e**.
- Tamanho/escopo: **3,822 bytes / 149 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Constantes/lookup sem mídia/registro pessoal identificado; taxonomia ainda exige consistência de IDs.
- Dependências efetivas: `Nenhum import detectado`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **PORTAR seletivamente se autorizado; alternativa independente possível, evitar taxonomias divergentes**.

### A04 — src/surfaces/exercise-library/components/VolumeFieldsGroup.tsx

- Categoria/função: Autoral — componente de campos.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/exercise-library/components/VolumeFieldsGroup.tsx). Blob **e41d8f7106e2a103ae53915a3add377a50c09daf**.
- Tamanho/escopo: **6,029 bytes / 172 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Props/callbacks, séries/reps/tempo; pode receber dado pessoal de prescrição em runtime, não contém sessão real verificada.
- Dependências efetivas: `react, lucide-react`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **ADAPTAR campos após autorização; integrar números/unidades e CSS próprio, não duplicar estado**.

### A05 — src/surfaces/exercise-library/components/EquipmentSelectorModal.tsx

- Categoria/função: Autoral — seletor.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/exercise-library/components/EquipmentSelectorModal.tsx). Blob **8736a1ed70028c7681fc5d39a5fcf9d5da368e3e**.
- Tamanho/escopo: **10,481 bytes / 300 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Busca/seleção com lógica própria; depende do catálogo A02 e cria apresentação modal própria.
- Dependências efetivas: `react, lucide-react, ../../../domain/equipment`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **ADAPTAR conteúdo/seleção; usar lifecycle P1, retirar mídia/fixtures e host antigo. Independente viável**.

### E01 — src/surfaces/exercise-library/components/EquipmentFormModal.tsx

- Categoria/função: Privado / fora do recorte contextual.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/exercise-library/components/EquipmentFormModal.tsx). Blob **22f84d44804b2aebe5c5fc03f6eac5e3b7d05b1b**.
- Tamanho/escopo: **10,233 bytes / 292 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: CRUD de catálogo e seleção de mídia; depende A02, pode receber dados/autoria em runtime.
- Dependências efetivas: `react, lucide-react, ../../../domain/equipment`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR agora; Biblioteca contextual não exige criação completa de equipamento**.

### E02 — src/surfaces/exercise-library/components/EquipmentDetailModal.tsx

- Categoria/função: Privado / fora do recorte.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/exercise-library/components/EquipmentDetailModal.tsx). Blob **d5891346fe8bf3a7060f5a45d8dbbae46a4d3145**.
- Tamanho/escopo: **7,741 bytes / 235 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Detalhe de equipamento, depende A02/mídia potencial.
- Dependências efetivas: `react, lucide-react, ../../../domain/equipment`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR agora; preservar como capacidade da Biblioteca independente para lote próprio**.

### E03 — src/surfaces/exercise-library/components/MuscleSelectorModal.tsx

- Categoria/função: Privado / fora do recorte.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/exercise-library/components/MuscleSelectorModal.tsx). Blob **638f3a9ba5ee1ac00c4a612017072575873c4bfe**.
- Tamanho/escopo: **13,181 bytes / 386 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Seletor de taxonomia usado em criação/detalhe do catálogo, depende A03.
- Dependências efetivas: `react, lucide-react, ../../../domain/muscle-taxonomy`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR na sheet de inclusão; reavaliar recorte independente posteriormente**.

### E04 — src/surfaces/exercise-library/ExerciseLibrarySurface.tsx

- Categoria/função: Privado — monólito independente.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/exercise-library/ExerciseLibrarySurface.tsx). Blob **ce887fcdc2c72386e41cf5d799b8e0a275d154c5**.
- Tamanho/escopo: **65,597 bytes / 1614 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: CRUD/detalhe/upload/equipamentos/moderação/autoria e fixtures; dados/URLs de mídia potenciais.
- Dependências efetivas: `react, lucide-react, ../../fixtures/exercise-library, ../../domain/equipment, ../../domain/muscle-taxonomy, ./components/VolumeFieldsGroup, ./components/MuscleSelectorModal, ./components/EquipmentSelectorModal, ./components/EquipmentFormModal, ./components/EquipmentDetailModal, ./components/GifUploadArea, ./components/EquipmentTabContent, ./exercise-library.css`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR integralmente; preservar acesso/contrato independente, nunca substituir por RT07**.

### D01 — src/fixtures/exercise-library.ts

- Categoria/função: Dados e mídia de direitos não confirmados.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/fixtures/exercise-library.ts). Blob **2fa5e0246c2b7d3c358d4eb36589a62c7ce46bf8**.
- Tamanho/escopo: **13,160 bytes / 372 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Catálogo ilustrativo com autoria/handles e 8 imports GIF; origem/licença da mídia e identidade não verificadas.
- Dependências efetivas: `../../assets/exercise-library/candidates/funcional/018-flexao-homem-aranha.gif, ../../assets/exercise-library/candidates/funcional/047-flexao-dive-bomber-revisar.gif, ../../assets/exercise-library/candidates/funcional/007-flexao-hindu.gif, ../../assets/exercise-library/candidates/funcional/005-flexao-arqueiro.gif, ../../assets/exercise-library/candidates/funcional/014-barra-fixa-pronada.gif, ../../assets/exercise-library/candidates/funcional/008-wall-ball-agachamento-arremesso-na-parede.gif, ../../assets/exercise-library/candidates/funcional/024-mergulho-nas-paralelas.gif, ../../assets/exercise-library/candidates/funcional/002-agachamento-com-elevacao-lateral-halteres.gif, ../domain/exercise, ../domain/exercise`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR; criar fixtures sintéticas sem mídia privada após gate de domínio**.

### E05 — src/surfaces/home/HomeShell.tsx

- Categoria/função: Privado — monólito acoplado.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/home/HomeShell.tsx). Blob **d857b5bdaca1bb5c32efa7c19f624924d03fc4a6**.
- Tamanho/escopo: **54,033 bytes / 1320 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Header/Feed/Pulse/Business/fixtures/brand/mídia; lógica e dados ilustrativos misturados.
- Dependências efetivas: `react, ./home-shell.css, lucide-react, ../../brand/BrandMark, ../../brand/brand-registry, ../../brand/dupplla-brand, ../../brand/DuppllaWordmark, ../../brand/DuppllaOfficialSymbol, ../../brand/GoduoitOfficialSymbol, ../../catalog/types, ../../components/UnderConstruction, ../exercise-library/ExerciseLibrarySurface, ../../assets/home/clean/avatar-voce-clean.webp, ../../assets/home/clean/avatar-lia-clean.webp, ../../assets/home/clean/avatar-ravi-clean.webp, ../../assets/home/clean/avatar-bia-clean.webp, ../../assets/home/clean/workout-hero-clean.webp, ../../assets/home/workout-hero-extensora.jpg, ../../assets/home/clean/feed-post-lia-clean.webp, ../../assets/home/formats/feed-format-3-4.jpg, ../../assets/home/formats/feed-format-4-5.jpg, ../../assets/home/formats/feed-format-1-1.jpg, ../../assets/home/formats/feed-format-191-1.jpg`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR arquivo inteiro; selecionar comportamento de ocorrência/data em recorte futuro nominal, aprovado separadamente**.

### E06 — src/surfaces/home/home-shell.css

- Categoria/função: Privado — CSS de várias superfícies.
- Branch/commit: **M** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/c0936896240e525353b237d92dff31fe0211eb94/src/surfaces/home/home-shell.css). Blob **52f9a4d5f644a36f18cee295c08afc9d556ec14d**.
- Tamanho/escopo: **38,926 bytes / 1759 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Regras compartilhadas e Feed; sem dados pessoais identificados no texto, mas pode alterar múltiplas telas.
- Dependências efetivas: `Nenhum import detectado`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR stylesheet inteiro. Referência de comportamento/layout; estilos Home locais orientados V5.3**.

### A06 — src/surfaces/routines/RoutinesSurface.tsx

- Categoria/função: Autoral — SOMENTE recortes.
- Branch/commit: **R** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38/src/surfaces/routines/RoutinesSurface.tsx). Blob **e7a44c6de15875243a8ae7f86caa877c29a7e2e6**.
- Tamanho/escopo: **147,188 bytes / 4094 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Lógica de domínio/UI mais catálogo/fixtures/Lab; monólito inclui fluxos substituídos.
- Dependências efetivas: `react, lucide-react, ../../catalog/types, ../../domain/equipment, ../../fixtures/routines-demo, ./routines-surface.css`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **ADAPTAR só parseRepsPair (191–199), deriveMuscleSummary/formatFrequencyLabel/cloneWorkoutsMap (218–238) se necessários. Não aprovar 4.094 linhas por este item; UI deve seguir V7.4**.

### E07 — src/surfaces/routines/routines-surface.css

- Categoria/função: Privado — visual legado R5.
- Branch/commit: **R** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38/src/surfaces/routines/routines-surface.css). Blob **d86ade32aff0867990a4c24ca8f3557140eb59df**.
- Tamanho/escopo: **48,354 bytes / 2431 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Composer/busca/card/overlays antigos, inclui correção iOS; sem registros pessoais identificados.
- Dependências efetivas: `Nenhum import detectado`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **NÃO PORTAR integralmente; preservar requisito input>=16 e recuperar apenas regra necessária em revisão própria**.

### A07 — src/surfaces/routines/RoutinesSurface.test.tsx

- Categoria/função: Autoral — casos de regressão.
- Branch/commit: **R** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38/src/surfaces/routines/RoutinesSurface.test.tsx). Blob **d49f90215c9902e8ca4e153fbab7953e45bf370b**.
- Tamanho/escopo: **20,118 bytes / 364 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Testes de catálogo/draft/composer; imports da superfície e leitura do CSS privado.
- Dependências efetivas: `@testing-library/react, vitest, node:fs, node:path, ./RoutinesSurface`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **ADAPTAR cenários válidos, reescrever expectativas substituídas e remover dependência do monólito. Não testar fallback inválido como requisito**.

### A08/D02 — src/fixtures/routines-demo.ts

- Categoria/função: Tipos autorais + fixture privada/mídia.
- Branch/commit: **R** conforme snapshot acima; [fonte fixa](https://github.com/jukazilli/GODUOIT/blob/08304f8d2cb3d989dc5cbd923057ae1ec2c6fc38/src/fixtures/routines-demo.ts). Blob **3470cb7c77745488fa52ef01b2344f25359055b8**.
- Tamanho/escopo: **24,931 bytes / 889 linhas** (arquivo completo; recorte permitido pode ser menor).
- Lógica/dados: Tipos e seed juntos; autores/handles e 8 GIFs importados; direitos e ausência de pessoa real não demonstrados.
- Dependências efetivas: `../../assets/exercise-library/candidates/funcional/018-flexao-homem-aranha.gif, ../../assets/exercise-library/candidates/funcional/047-flexao-dive-bomber-revisar.gif, ../../assets/exercise-library/candidates/funcional/007-flexao-hindu.gif, ../../assets/exercise-library/candidates/funcional/005-flexao-arqueiro.gif, ../../assets/exercise-library/candidates/funcional/014-barra-fixa-pronada.gif, ../../assets/exercise-library/candidates/funcional/008-wall-ball-agachamento-arremesso-na-parede.gif, ../../assets/exercise-library/candidates/funcional/024-mergulho-nas-paralelas.gif, ../../assets/exercise-library/candidates/funcional/002-agachamento-com-elevacao-lateral-halteres.gif, ../domain/equipment`.
- Credenciais: nenhum match nos padrões de chave GitHub/AWS/PEM revisados; revisar também variáveis/URLs e import transitivo antes do port. Arquivo não foi executado com dados reais.
- Licença/risco: autoral privado sem licença geral de divulgação confirmada; risco de exposição/transitividade conforme categoria. Mídias associadas não são liberadas junto ao código.
- Recomendação e alternativa: **ADAPTAR apenas declarações de tipos (RoutineExercisePlan/RoutineDayWorkout/RoutineDemoItem etc.) após autorização; NÃO PORTAR seed/imports/URLs; alternativa independente preferível se tipos forem incompatíveis**.

## Aprovação granular recomendada

1. Primeiro A01/A03 e recorte limpo A02 (tipos/search sem imagem/seed): domínio compartilhado, IDs e matching, sem mídias.
2. A04/A05: somente depois de confirmar necessidade real dos campos/equipamento no contrato, adaptar ao OverlayHost P1; não aprovar criação/detalhe/upload de catálogo por arrasto.
3. A06/A08: aprovar os trechos nominais específicos e seus blobs, com diff de saída demonstrando exclusão de fixtures/fluxos incompatíveis. Helpers de reps/frequência não autorizam salvar exercício fictício, forceDuplicate ou searchline antiga.
4. A07: aproveitar casos válidos como regressão; teste antigo não suplanta homologação nova. Implementação independente e novos testes de contrato são alternativa se adaptação exigir publicar material não liberado.

A documentação é descritiva e usa somente metadados apropriados. Nenhum snippet privado foi copiado para o público. Na P2-B, cada PR deve registrar origem/blob/recorte, diff efetivamente transportado, revisão de licenças/dependências e autorização correspondente. Não usar cherry-pick/merge de PRs antigas como atalho.

## B — dependências públicas de terceiros

Já presentes, sem atualização proposta: React/DOM19.3.1 (MIT), TypeScript5.9.3 (Apache-2.0), Vite6.4.5/plugin React4.7.0 (MIT), Lucide React1.66.0 (ISC), Fontsource Plus Jakarta Sans5.3.0 (fonte OFL-1.1). Testes Vitest/Testing Library/Playwright/axe e CLI cf seguem no lock existente. Avisos efetivos em THIRD_PARTY_NOTICES.md da fundação. Reuso da dependência pública não libera arquivos privados que a importam. Não são necessários router/store/motion extras ou backend neste plano.

## C — assets públicos já homologados

Wordmark oficial já pública `assets/brand/goudduo/goudduo-wordmark-black.svg`, blob **04276a5ac2a927294f48e7fec2c2281754ad75c3**, main pública 0fbc3ed8b3e1c59245d2349ae14160a2a9c43086. Consumir o mesmo SVG, sem gerar símbolo novo ou reescrever logo em fonte. Fontes/ícones distribuídos pelo pacote mantêm avisos. HTML V7.4 é contrato público, não biblioteca de SVGs/modelos/código de aplicação a transplantar.

## D — mídia privada ou de direitos não confirmados

GIFs em assets/exercise-library/candidates/funcional, fotos/capas/avatares em src/assets/home e assets correspondentes, URLs de mídia/Drive, recortes de uploads e imagens de pessoas. Não foi obtida licença de redistribuição individual. Nenhuma aprovação visual implica direito de publicar. A02 contém import de fotografia mesmo sendo módulo domain: bloquear transitividade até separar o seed.

Capas escolhidas pelo usuário devem ser preservadas semanticamente; não transportar foto de usuário para fixture pública. Não substituir falta de autorização por imagem falsa/gerada, raster do logo ou SVG alterado. Para P2-B definir mídia pública autorizada ou adiar o componente que depende dela; fixtures apenas sintéticas sem fatos de saúde/identidade reais.

## E — exclusivamente privados / fora desta entrega

Todos os arquivos não incluídos expressamente em uma autorização granular permanecem privados. Em especial: HomeShell/CSS completos; Feed/Pulse/Business e fixtures sociais; ProfileSurface/PR #152 em massa; TrainingSessionSurface/fixtures de execução por arrasto; .env/.dev.vars/segredos, logs, histórico Git, capturas privadas, Gooduu/submódulo/SW/manifests/HTMLs de Lab, diretórios public e assets completos. Não symlinkar material privado no bundle público.

Segurança pré-publicação futura: árvore de imports, licenças, dados/URLs/autoria, sourcemaps ausentes, allowlist do bundle, metadados SHA/lock/dirty e autorização do artefato. Workers/GitHub públicos já expõem código distribuído; minificação não torna código secreto. Nenhuma publicação Cloudflare está autorizada nesta P2-A.
