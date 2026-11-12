# Baseline privada de Publicações — P1

## Escopo da evidência

Origem: GODUOIT main `c0936896240e525353b237d92dff31fe0211eb94`; arquivo `src/surfaces/home/HomeShell.tsx` e CSS correspondente. Contratos: [Home Publicações #55](https://github.com/jukazilli/GODUOIT/issues/55), [Shell #72](https://github.com/jukazilli/GODUOIT/issues/72) e [Pulse #73](https://github.com/jukazilli/GODUOIT/issues/73). Baseline de **código da main executada**, não nova homologação visual ou afirmação de equivalência pixel a pixel com PNG histórico.

A origem foi instalada pelo lock, compilada e executada no navegador local. Os 47 testes existentes passaram; build passou com advertência de chunk acima de 500 kB. Primeira instalação com pnpm 11 encontrou política de scripts nativos; nova instalação com --ignore-scripts foi suficiente para executar o esbuild já distribuído e obter build/testes. Nenhum arquivo de aplicação ou lock da origem foi alterado. O arquivo de política gerado automaticamente pelo pnpm foi retirado da árvore de origem e retido no scratch; a árvore Git privada voltou a ficar limpa.

A captura mostra header/wordmark e chevron legados, tabs, Pulse circular visto/não visto/usuário/oficial, feed fotográfico de quatro posts da main, menus e TabBar. A main também contém controles demonstrativos de laboratório e labels de formato; sua presença na captura não os torna UI final aprovada. Não foram transportados os quatro posts extras da PR #152, seu fallback incorreto de perfil ou qualquer mídia privada.

## Ensaios realmente executados

Chromium local, 844px de altura e cinco larguras. Em cada largura: curtir alternou para descurtir; salvar alternou para remover; republicar alternou para desfazer; seguir removeu a ação inicial de seguir; menu abriu; conteúdo interno rolou e voltou ao topo; reload restaurou cenário para captura baseline. Nenhuma exceção JavaScript de página ou overflow horizontal observado nesse roteiro. Isso não prova regras reais de republicação/coleções, backend ou privacidade.

| Largura | Interações acima | Scroll interno | Exceções JS | Overflow horizontal | SHA-256 da captura privada |
|---|---|---|---:|---|---|
| 320 | Passaram | Passou | 0 | False | `718b8538c4e2c6a4103291f057c62b5dca54368e51352e25d71ede5669d5270c` |
| 375 | Passaram | Passou | 0 | False | `e0a01f404e994694ea828c86079b250811a29f479d364d4d6cf91a8acaf2779c` |
| 390 | Passaram | Passou | 0 | False | `a8197a1b06443d963bfef4d3aaaaf08a2f176fc9e35b241b4773646ec099c847` |
| 414 | Passaram | Passou | 0 | False | `3f4cbe0437cd70c65c726594836551dd91348225c02df39325f92794c82caa10` |
| 430 | Passaram | Passou | 0 | False | `6397e60136a4d568665a26c59ccecdccbf96ede15ca25c8825f1a3e1e0e9a0a9` |

Capturas reais foram produzidas e uma captura de 390px inspecionada visualmente; não se alega inspeção pixel a pixel de todas as imagens. Arquivos PNG/JSON detalhados permanecem em `/workspace/scratch/p1/baseline/`, fora do Git público e da distribuição. Sua divulgação depende de autorização específica; os hashes acima permitem rastrear os arquivos disponíveis nesta sessão.

## Estado de integração e regressão

**Port de Publicações bloqueado pela fronteira privado→público.** Nenhum código, CSS ou asset do Feed/Pulse foi transportado. A rota comum /home/publicacoes exibe estado neutro; não é uma réplica improvisada. Portanto, paridade visual/funcional no goudduo ainda é **não avaliada/pendente**, não “regressão zero comprovada”.

Nenhuma mudança foi feita na origem; a baseline continua disponível para o futuro port autorizado. Antes de integrar, selecionar arquivos por allowlist com proveniência, repetir capturas/interações e comparar os dois lados em todas as larguras. Mudanças compartilhadas autorizadas de marca/chevron devem ser listadas; não mudar feed, menus, mídia, Pulse ou comportamento por herança de CSS/tokens.

Não realizados: Safari/iPhone físico, Chrome Android físico, conferência binária/visual do master histórico, testes dos serviços de backend, revisão de todos os menus ou autorização de divulgação das capturas.
