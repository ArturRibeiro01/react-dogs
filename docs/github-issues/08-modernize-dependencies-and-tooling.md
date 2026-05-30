## Contexto

O projeto esta em React 17, `react-scripts` 4 e React Router beta. Para portfolio senior, vale atualizar a base tecnica com cuidado e documentar as decisoes.

## Objetivo

Modernizar dependencias e tooling sem perder comportamento.

## Escopo

- Decidir entre npm e yarn e remover lockfile duplicado.
- Atualizar React e React DOM.
- Atualizar React Router para versao estavel.
- Avaliar migracao de CRA para Vite.
- Ajustar scripts e configuracoes necessarias.
- Rodar build e smoke test.

## Criterios De Aceite

- Existe apenas um lockfile.
- `npm run build` ou equivalente passa.
- App roda localmente com stack atualizada.
- README documenta o gerenciador escolhido.

