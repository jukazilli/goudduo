# P2-A — Fidelidade e plano de port seletivo

**Investigação entregue para revisão, sem implementação.** Coordenação [#29](https://github.com/jukazilli/goudduo/issues/29). P0 homologada na [PR #30](https://github.com/jukazilli/goudduo/pull/30); P1-R1 homologada pelo proprietário e [PR #31 integrada](https://github.com/jukazilli/goudduo/pull/31) em **0fbc3ed8b3e1c59245d2349ae14160a2a9c43086**. Os textos antigos “em revisão” nos documentos P0/P1 são snapshots históricos; esta missão não os reescreve.

## Resultado executivo

Home V5.3 tem direção canônica detalhada e vigente; o **HTML exato continua não localizado** após busca renovada. Ranking dominante à esquerda, Status/Peso à direita, Treino do Dia charcoal/CTA branco e Pulse squircle estão documentados. Valores de gap/raio/alturas não comprovados não podem virar decisões por reconstrução. Peso/Medidas/Consistência/Recordes continuam pendentes em #159.

Rotinas V7.4 tem HTML imutável acessível, inspecionado e executado em Chromium nas cinco larguras. Seu fluxo de Biblioteca/adicionar/check/duplicidade/confirmar/nomear está verificável. A referência não autoriza copiar scripts nem importar sua TabBar com legendas sobre o Shell aprovado. Foi observada uma falha intermitente de Escape após adicionar/remover/reincluir; não foi corrigida no canônico nem omitida.

O legado React contém lógica útil de catálogo/equipamentos/prescrição e testes, mas o monólito de Rotinas tem 147.188 bytes/4.094 linhas; estados locais, busca no topo, duplicação forçada e fallback de exercício vazio divergem da V7.4. **Não há branch pronta para mesclar integralmente.** A fundação P1-R1 permanece intacta. Ela requer extensões locais de domínio/rascunho/overlays e parâmetros de apresentação por superfície, detalhadas abaixo, sem nova biblioteca.

**Pulse em Treinos:** o comando P2-A reafirma expressamente presença e formato homologados. Logo, não recomendamos eliminá-lo por causa do README/código antigos. C06 passa a ser reconciliação do placement/detalhes e atualização futura do índice canônico, não uma preferência técnica por omissão. A variante circular de Publicações permanece protegida.

## Navegação

1. [Home V5.3](HOME-V53-FIDELIDADE.md)
2. [Rotinas/Editor/Biblioteca V7.4](ROTINAS-V74-FIDELIDADE.md)
3. [Matriz de componentes](MATRIZ-COMPONENTES.md)
4. [Allowlist proposta, por arquivo](ALLOWLIST-PORT-PRIVADO.md)
5. [Riscos e regressões / ajustes da fundação](RISCOS-E-REGRESSOES.md)
6. [Plano de PRs P2-B](PLANO-P2B.md)
7. [QA visual e evidências](QA-VISUAL-P2.md)
8. [Índice de fontes, referências e snapshots](REFERENCIAS-E-SNAPSHOTS.md)

## Decisões necessárias antes de implementar

| Gate | Decisão do proprietário | Recomendação |
|---|---|---|
| G01 | Fonte visual exata da Home | Recuperar HTML/capturas V5.3 da Library/origem original; caso impossível, autorizar recorte de reconstrução a partir do contrato, com homologação visual específica, sem declarar pixel parity |
| G02 | Presença/placement Pulse | Presença em Treinos já reafirmada; confirmar detalhe de posição antes do Bento, tamanho/spacing/indicadores e regra de ocultação, sem retirar por legado |
| G03 | Widgets pendentes | Não inventar números/gráficos; escolher entre adiar o recorte Home dependente de Peso ou aprovar slot neutro compacto sem coleta. Não omitir/reorganizar silenciosamente o Bento |
| G04 | Divulgação do código | Aprovar itens A da allowlist por arquivo/recorte; não incluir dependências/fixtures/mídia implicitamente |
| G05 | Fidelidade V7.4 × Shell | Manter cinco Lucide/TabBar P1-R1; validar títulos/espessuras locais. Resolver CTA texto+ícone do HTML versus regra transversal, e duração local 250/260ms versus DS 300/310ms |
| G06 | Domínio preservado | Confirmar capacidades válidas de tempo/distância/substitutos/capas/modalidades e semântica de cópia versus referência compartilhada por dia; não apagar por limitação do modelo mínimo |
| G07 | QA/aceite | Aprovar comparações e gates por PR; Safari/iPhone físico obrigatório antes da homologação visual final |

Aprovar esta documentação **não** transporta arquivos nem autoriza P2-B, merge, Cloudflare ou redistribuição de mídia. Não foi alterado código, lock, asset, configuração ou documento canônico prévio.
