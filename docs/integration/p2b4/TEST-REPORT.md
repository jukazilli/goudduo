# Testes, regressões e segurança P2-B4

Base 313d234be321d89c2d3c4ca49e7ef2963b728d4d; Node 24.22.1/pnpm 11.25.0 fixados, Playwright 1.56.1 e Chromium 156.0.8078.79 local. Nenhuma dependência ou lockfile alterado.

## Resultados

| Comando/verificação | Estado |
| --- | --- |
| pnpm install --frozen-lockfile | PASS |
| pnpm typecheck | PASS |
| pnpm test | 79 PASS / 8 arquivos: 8 casos novos, 71 anteriores preservados |
| pnpm run build / build:lab | PASS, entradas separadas e guard de artefato |
| node --test tests/bundle.test.mjs | 4 PASS, incluindo marcador negativo do novo consumidor Lab |
| Playwright final | 70 PASS na rodada completa; após o ajuste visual final, 15/15 específicos do Editor novamente aprovados nas cinco larguras |
| Capturas | 55 imagens nas cinco larguras, bruto/normalizado da referência + oito estados do app + conteúdo React; medidas e hashes |
| Links/hash/diff | PASS: links relativos, 55 hashes de capturas, hashes de implementação e diff de escopo conferidos |

CI da PR e head efetivo serão confirmados na descrição da entrega. Cloudflare somente no dry-run do workflow preexistente, sem recurso remoto, configuração extra ou deploy. Builds finais serão regenerados no commit limpo com SHA e hash do lock. Logs locais ficam em /workspace/scratch/p2b4/, fora do Git; report JSON/traces são artefatos ignorados do runner.

## Cobertura

Unitários reais exercitam campos independentes e equipamento por ID; reps/tempo/distância; isolamento do salvo; campos incompletos e bounds de reps; parsing/round-trip de descanso; carga opcional; mover/remover mantendo IDs; zero bloqueado; confirmar um/continuar; nome inválido/cancelar/commit; novo vínculo em domingo somente após validação; múltiplos sem confirmação; revisão concorrente e retorno com mesma entidade nos seletores Home. B1 continua cobrindo duplicatas, compartilhamento e atomicidade.

Playwright acrescenta três jornadas por largura 320/375/390/414/430: edição/salvamento real, medições/ordem/remoção/Biblioteca indisponível, e dia vazio preenchido pelo consumidor técnico isolado no Lab. Inclui foco/nomeação/inert/saída, rodapé acima da TabBar, ausência de overflow, axe, gesto, Escape/Back/Forward, reduced-motion, reload neutro e bloqueio de revisão obsoleta. Todos os cenários exigem zero pageerror/console.error.

Testes B3 que exigiam Editor indisponível foram atualizados para a interface expressamente autorizada: Salvar desabilitado no vazio e habilitado com prescrição válida. Preservadas as asserções de não haver commit por navegação, de retorno/draft/scroll e ausência de diálogo automático. Demais testes P1-R1/B1/B2 não foram enfraquecidos.

## Falhas intermediárias e correções

- Typecheck inicial: propriedades opcionais exatas de header/carga; corrigidas por narrowing e omissão da carga ausente, sem relaxar tipos ou alterar domínio.
- Testes novos: getByRole não aceita exact da Testing Library; nome do input colidia com aria-label do diálogo. Seletores corrigidos por role textbox, sem alterar gates.
- Primeira rodada unitária do novo fluxo: 75 PASS/3 falhas de seletor de nomeação; versão corrigida 79 PASS.
- Primeira E2E alvo 320: um PASS/duas falhas. A área de opções interceptava Próximo; limitada ao botão de 44 px. Equipamento ganhou associação explícita de label/ID. Rodada alvo repetida: 3 PASS.
- Inspeção adicional observou ausência do input de nome durante a saída após Cancelar. Correção do host retém o consumidor por chave da mesma entrada; teste com MutationObserver verifica o conteúdo durante is-closing. Não foi mudado motor/tempo/foco/scroll lock.
- A revisão comparativa preservou a área neutra de 125 px e o botão de substituição indisponível; sem importar mídia, com nova coleta e validação após ajuste.
- A primeira execução completa foi interrompida para validar o ajuste final do host e evitar misturar testes atualizados com build anterior; não é contabilizada como aprovação. A rodada final usa os builds atualizados.

## Proteções

Sem alteração de AppShell, ShellHeader, TabBar, navegação/NavigationProvider, contratos de superfície, estilos/tokens globais, RoutinesHome/layout/CSS P2-B3, domain/training, reducer/training, seletores/model/fixtures/provider, configuração Cloudflare, package.json/lock ou assets. OverlayHost recebeu somente a retenção necessária de conteúdo, descrita acima. PrototypeApp liga os consumidores aos slots preparados.

Arquivos privados transportados: **nenhum**. Não houve leitura/cópia nova de implementação privada nesta fase; reconciliação histórica permanece nas fontes P2-A/B1. Referência visual é o HTML público fixo. Nenhum dataset real, credencial, variável de ambiente, mídia, logo reconstruído, dependência, backend, autenticação ou persistência foi adicionado. Guard verifica allowlist, mapas, symlinks, credenciais/marcadores privados e isolamento do Lab.

## Limitações

Sem Safari/iPhone ou Android físicos, VoiceOver/teclado virtual/insets reais. Não há comparação nova com Feed privado: proteção comprovável é ausência de port/redesign e regressão da fundação pública. Biblioteca completa e criação comum dependem da P2-B5. Nenhum teste declara backend, persistência, Sessão, Home Treinos ou upload reais. Homologação de deltas visuais e funcional final pertence ao proprietário.
