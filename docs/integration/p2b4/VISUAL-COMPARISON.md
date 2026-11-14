# QA visual — Editor V7.4

Referência pública fixa `3f8b2c7c93a33a713c780305e672e1ec7998ceaf`, blob `122275b3cb03bd996b477375d1bbc73ae29c5c3e`. Executada localmente com fluxo Rotinas → treino → editar. Nenhum HTML foi copiado para src/main. As imagens desta pasta são evidências para revisão, não novas referências homologadas.

## Método

Chromium touch, DPR 1, altura 844 px, larguras 320/375/390/414/430. Referência capturada só na região `.gd-content`, excluindo Shell/status/frame experimentais. Aplicação tem capturas completas para verificar Shell/rodapé e capturas separadas de `#main-content` para comparar somente o Editor.

O HTML declara Plus Jakarta Sans mas não carrega sua fonte. Foram guardadas capturas brutas e uma comparação com apenas FontFaces públicos 400/500/600/700/800 carregados pelo harness. Layout/scripts/bytes do HTML não mudam. O app usa a fonte real já instalada. Não se declara similaridade pixel a pixel; dados e nomes são sintéticos, com estados de prescrição próprios.

[Medidas e hashes](evidence/measurements.json) registram os arquivos e fontes do Editor. Capturas coletadas dos builds finais de implementação, incluindo retenção na saída e reserva visual de mídia. A saída animada é verificada separadamente pelo teste de navegador, com observação do DOM durante a transição.

## Comparação objetiva

| Região | Referência renderizada | React / diferença |
| --- | --- | --- |
| Largura do card | 284/339/354/378/394 px | Mesmos valores nas cinco larguras |
| Raio / padding | 20 / 16 px | Mesmos valores |
| Título / grid | 18 px / duas colunas, gap 11 px | Mesma composição; nomes sintéticos podem quebrar em outras linhas |
| Inputs | 43 px, fonte 16 px | 44 px para alvo de toque, fonte 16 px |
| Header/TabBar | Chrome experimental | P1-R1 preservado, excluído da comparação da referência |
| Parâmetros | Strings de exemplo por exercício | Números tipados por reps/tempo/distância; Rep min/Rep max separados |
| Descanso | Texto livre do HTML | HH:MM:SS validado e segundos no domínio; label pode ocupar duas linhas em viewport estreito |
| Equipamento | Nome textual e seleção por biblioteca | Campo somente leitura por identidade, sem dropdown ou seleção provisória |
| Mídia | Região experimental de 125 px | Reserva neutra CSS de 125 px preservada; nenhuma imagem importada/reconstruída |
| Substituição | Botão de inclusão no card | Preservado visualmente, desabilitado; IDs de alternativas existentes continuam legíveis |
| Opções | Menu/submenu no laboratório | Grupo contextual local com mesmas operações e limites de ordem |
| Indicadores decorativos | Dots sob card | Não recriados; anterior/próximo/contador/gesto preservados, sem nova faixa/carrossel |
| Descarte explícito | Intenção preparada pela P2-B2 e exigida no prompt completo | Confirmação no mesmo host; voltar/continuar preserva o draft |
| Nomeação | Sheet/limite 60 no laboratório | Host modal preparado P2-B2; limite 100 do domínio preservado, pendência de produto explícita |
| Motion de overlay | 250/260 ms local | Motor homologado 300/310 ms e reduced-motion mantidos |

Essas diferenças estão documentadas para o refinamento posterior autorizado. Reordenar/remover são funcionais; Biblioteca não é simulada. Sem redesenho de Home Rotinas, Publicações ou Business.

## Capturas por largura

### 320 px

[Referência bruta](evidence/reference-editor-raw-320.png) | [Referência com fonte normalizada](evidence/reference-editor-normalized-320.png) | [React — somente conteúdo](evidence/react-editor-content-320.png) | [React — composição completa](evidence/react-editor-320.png) | [Confirmação](evidence/react-confirmation-320.png) | [Nomeação](evidence/react-naming-320.png) | [Campo inválido](evidence/react-invalid-320.png) | [Treino vazio](evidence/react-empty-320.png) | [Por tempo](evidence/react-time-320.png) | [Por distância](evidence/react-distance-320.png) | [Biblioteca indisponível](evidence/react-library-unavailable-320.png) | [Confirmação de descarte](evidence/react-discard-320.png)

### 375 px

[Referência bruta](evidence/reference-editor-raw-375.png) | [Referência com fonte normalizada](evidence/reference-editor-normalized-375.png) | [React — somente conteúdo](evidence/react-editor-content-375.png) | [React — composição completa](evidence/react-editor-375.png) | [Confirmação](evidence/react-confirmation-375.png) | [Nomeação](evidence/react-naming-375.png) | [Campo inválido](evidence/react-invalid-375.png) | [Treino vazio](evidence/react-empty-375.png) | [Por tempo](evidence/react-time-375.png) | [Por distância](evidence/react-distance-375.png) | [Biblioteca indisponível](evidence/react-library-unavailable-375.png) | [Confirmação de descarte](evidence/react-discard-375.png)

### 390 px

[Referência bruta](evidence/reference-editor-raw-390.png) | [Referência com fonte normalizada](evidence/reference-editor-normalized-390.png) | [React — somente conteúdo](evidence/react-editor-content-390.png) | [React — composição completa](evidence/react-editor-390.png) | [Confirmação](evidence/react-confirmation-390.png) | [Nomeação](evidence/react-naming-390.png) | [Campo inválido](evidence/react-invalid-390.png) | [Treino vazio](evidence/react-empty-390.png) | [Por tempo](evidence/react-time-390.png) | [Por distância](evidence/react-distance-390.png) | [Biblioteca indisponível](evidence/react-library-unavailable-390.png) | [Confirmação de descarte](evidence/react-discard-390.png)

### 414 px

[Referência bruta](evidence/reference-editor-raw-414.png) | [Referência com fonte normalizada](evidence/reference-editor-normalized-414.png) | [React — somente conteúdo](evidence/react-editor-content-414.png) | [React — composição completa](evidence/react-editor-414.png) | [Confirmação](evidence/react-confirmation-414.png) | [Nomeação](evidence/react-naming-414.png) | [Campo inválido](evidence/react-invalid-414.png) | [Treino vazio](evidence/react-empty-414.png) | [Por tempo](evidence/react-time-414.png) | [Por distância](evidence/react-distance-414.png) | [Biblioteca indisponível](evidence/react-library-unavailable-414.png) | [Confirmação de descarte](evidence/react-discard-414.png)

### 430 px

[Referência bruta](evidence/reference-editor-raw-430.png) | [Referência com fonte normalizada](evidence/reference-editor-normalized-430.png) | [React — somente conteúdo](evidence/react-editor-content-430.png) | [React — composição completa](evidence/react-editor-430.png) | [Confirmação](evidence/react-confirmation-430.png) | [Nomeação](evidence/react-naming-430.png) | [Campo inválido](evidence/react-invalid-430.png) | [Treino vazio](evidence/react-empty-430.png) | [Por tempo](evidence/react-time-430.png) | [Por distância](evidence/react-distance-430.png) | [Biblioteca indisponível](evidence/react-library-unavailable-430.png) | [Confirmação de descarte](evidence/react-discard-430.png)

## Limites

Não houve Safari/iPhone ou Android físicos, VoiceOver ou teclado virtual real. Valores de safe area nos testes são simulados. Capturas não comprovam upload, serviços reais, catálogo completo, persistência ou a fidelidade de superfícies ainda ausentes. Aprovação de deltas e refinamento final pertencem ao proprietário.
