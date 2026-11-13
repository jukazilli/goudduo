# P2-A — Fidelidade e plano de port seletivo

**Investigação entregue para revisão, sem implementação.** Coordenação [#29](https://github.com/jukazilli/goudduo/issues/29). P0 homologada na [PR #30](https://github.com/jukazilli/goudduo/pull/30); P1-R1 homologada pelo proprietário e [PR #31 integrada](https://github.com/jukazilli/goudduo/pull/31) em **0fbc3ed8b3e1c59245d2349ae14160a2a9c43086**. Os textos antigos “em revisão” nos documentos P0/P1 são snapshots históricos; esta missão não os reescreve.

## Resultado executivo

**P2-A-R1 — G01 resolvido:** Home V5.3 recuperada no commit **073183253fce5fcd0b3474c725e84ff67d3dfec5**, blob **8c698708dd79449472d6f5c7e536664939de4951**, executada nas cinco larguras. RawGitHack forneceu bytes idênticos via HTTP200; navegador abriu o conteúdo após a tela Open the page. [Auditoria A–E, medições e capturas](HOME-V53-HTML-RECUPERADO.md) substitui a lacuna da P2-A original. Referência é do conteúdo Home, **não do Shell**. Geometria interna e presença/posição/Pulse squircle foram verificadas; funções de Progresso #159 continuam pendentes.

Rotinas V7.4 tem HTML imutável acessível, inspecionado e executado em Chromium nas cinco larguras. Seu fluxo de Biblioteca/adicionar/check/duplicidade/confirmar/nomear está verificável. A referência não autoriza copiar scripts nem importar sua TabBar com legendas sobre o Shell aprovado. Foi observada uma falha intermitente de Escape após adicionar/remover/reincluir; não foi corrigida no canônico nem omitida.

O legado React contém lógica útil de catálogo/equipamentos/prescrição e testes, mas o monólito de Rotinas tem 147.188 bytes/4.094 linhas; estados locais, busca no topo, duplicação forçada e fallback de exercício vazio divergem da V7.4. **Não há branch pronta para mesclar integralmente.** A fundação P1-R1 permanece intacta. Ela requer extensões locais de domínio/rascunho/overlays e parâmetros de apresentação por superfície, detalhadas abaixo, sem nova biblioteca.

**Pulse em Treinos:** o comando P2-A reafirma expressamente presença e formato homologados. Logo, não recomendamos eliminá-lo por causa do README/código antigos. A R1 confirma placement antes do Bento,54/58px,raios18/19,gap10 e ausência de dots próprios de Pulse; C06 restante trata estados/dados/destinos, não presença/shape/posição. A variante circular de Publicações permanece protegida.

## Navegação

1. [Home V5.3](HOME-V53-FIDELIDADE.md)
2. [Rotinas/Editor/Biblioteca V7.4](ROTINAS-V74-FIDELIDADE.md)
3. [Matriz de componentes](MATRIZ-COMPONENTES.md)
4. [Allowlist proposta, por arquivo](ALLOWLIST-PORT-PRIVADO.md)
5. [Riscos e regressões / ajustes da fundação](RISCOS-E-REGRESSOES.md)
6. [Plano de PRs P2-B](PLANO-P2B.md)
7. [QA visual e evidências](QA-VISUAL-P2.md)
8. [Índice de fontes, referências e snapshots](REFERENCIAS-E-SNAPSHOTS.md)
9. [HTML Home V5.3 recuperado — extração e comparação com Shell](HOME-V53-HTML-RECUPERADO.md)

## Decisões necessárias antes de implementar

| Gate | Decisão do proprietário | Recomendação |
|---|---|---|
| G01 | **RESOLVIDO — fonte recuperada/auditada** | Referência0731832 obrigatória; nenhuma reconstrução sem fonte; React ainda não implementado |
| G02 | Geometria/posição resolvidas; funções/estados restantes | Preservar squircle antes do Bento; usar SVG atual já aprovado; definir IDs/contadores/conteúdo/mídia, semântica de anéis, destino de toque e ocultação ainda não implementados |
| G03 | Estrutura visual observada; funções #159 pendentes | Manter Peso no cluster; aprovar estado neutro compacto sem número/coleta e vazios dos demais widgets, sem eliminar Peso ou aprovar formulário experimental |
| G04 | Divulgação do código | Aprovar itens A da allowlist por arquivo/recorte; não incluir dependências/fixtures/mídia implicitamente |
| G05 | Fidelidade V7.4 × Shell | Shell P1-R1 preservado por decisão expressa; nenhum chrome HTML será adotado. Validar somente ajustes locais necessários e justificados. Resolver CTA texto+ícone do HTML versus regra transversal, e duração local 250/260ms versus DS 300/310ms; revisar alvos locais diminutos do HTML Home sem contaminação do Shell |
| G06 | Domínio preservado | Confirmar capacidades válidas de tempo/distância/substitutos/capas/modalidades e semântica de cópia versus referência compartilhada por dia; não apagar por limitação do modelo mínimo |
| G07 | QA/aceite | Plano pronto para revisão, com referência recuperada obrigatória; aprovar recortes/gates por PR; Safari/iPhone físico obrigatório antes da homologação visual final |

Capturas anexadas da Home são recortes documentais de fonte pública; não são assets de aplicação nem captura privada. Aprovar esta documentação **não** transporta arquivos nem autoriza P2-B, merge, Cloudflare ou redistribuição de mídia. Não foi alterado código, lock, asset da aplicação, configuração ou fundação P1-R1; somente a documentação P2-A e suas evidências foram revisadas.
