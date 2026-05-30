## Contexto

Esta issue foi executada localmente em 2026-05-30.

O projeto saiu de CRA/`react-scripts` para Vite, atualizou React/React DOM para 19, saiu do React Router beta para React Router 6 estavel, removeu dependencias nao usadas e definiu Yarn como package manager unico.

## Objetivo

Modernizar dependencias e tooling sem perder comportamento.

## Escopo

- [x] Manter Yarn como package manager unico.
- [x] Atualizar React e React DOM.
- [x] Atualizar React Router para versao estavel.
- [x] Revisar configuracao Vite conforme novas migracoes.
- [x] Ajustar scripts e configuracoes necessarias.
- [x] Rodar build e smoke test.

## Criterios De Aceite

- [x] Existe apenas um lockfile.
- [x] `yarn build` passa.
- [x] App roda localmente com stack atualizada.
- [x] README documenta o gerenciador escolhido.

## Observacoes

- React Router 7, Vite 8 e `@vitejs/plugin-react` 6 ficaram pendentes porque exigem Node 20+.
- Ambiente usado durante a execucao: Node 18.16.0.
