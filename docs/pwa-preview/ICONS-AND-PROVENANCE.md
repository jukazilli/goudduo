# Ícones oficiais

Fonte única: `assets/brand/goudduo/goudduo-wordmark-black.svg`, SHA256 `7dd6a7948ab63a5b776e3adc4c22137752cb941c1fd67df1f00a2f173d58ee47`. SVG original intacto; nenhuma reconstrução tipográfica, recorte de letras, raster externo ou código privado.

`scripts/generate-pwa-icons.mjs` rasteriza o SVG com o Chromium já fixado pelo Playwright, preserva proporção/paths/cores e centraliza a marca em fundo branco. Largura do SVG 72% do canvas; marca completa dentro do círculo seguro maskable de 80%. Não é uma nova versão do logotipo.

Saídas em assets/pwa: icon-192, icon-512, maskable-192, maskable-512 e apple-touch-icon (180), todos PNG. [Proveniência e hashes](../../assets/pwa/PROVENANCE.json) deve ser consultada na raiz do repositório (caminho `assets/pwa/PROVENANCE.json`).

Regeneração: `pnpm exec playwright install chromium` se necessário; `node scripts/generate-pwa-icons.mjs`. Geração não faz parte do build: rasters ficam versionados, evitando dependência de navegador no empacotamento CI. Nenhuma biblioteca extra de imagem instalada. Bundle guard aceita apenas esses nomes/dimensões e bytes oficiais; PNG arbitrário continua proibido.
