## Contexto

O projeto ja saiu de CRA/`react-scripts` para Vite, mas ainda esta em React 17, React Router beta e Testing Library antiga. Para portfolio senior, vale continuar atualizando a base tecnica com cuidado e documentar as decisoes.

## Objetivo

Modernizar dependencias e tooling sem perder comportamento.

## Escopo

- Manter Yarn como package manager unico.
- Atualizar React e React DOM.
- Atualizar React Router para versao estavel.
- Revisar configuracao Vite conforme novas migracoes.
- Ajustar scripts e configuracoes necessarias.
- Rodar build e smoke test.

## Criterios De Aceite

- Existe apenas um lockfile.
- `npm run build` ou equivalente passa.
- App roda localmente com stack atualizada.
- README documenta o gerenciador escolhido.
