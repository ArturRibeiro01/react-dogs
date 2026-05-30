# Project Status

Atualizado em 2026-05-30.

## Stack Atual

- React `^19.2.6`
- React DOM `^19.2.6`
- React Router `6.30.2`
- Vite `^6.4.2`
- Yarn Classic

## Ambiente

- Node atual usado durante a modernizacao: `18.16.0`
- React Router 7, Vite 8 e `@vitejs/plugin-react` 6 exigem Node 20+.
- Por isso, o projeto foi modernizado ate as ultimas versoes compativeis com Node 18.

## Concluido

- Migração de Create React App para Vite.
- Remocao de `react-scripts`.
- Entrada HTML movida para `index.html` na raiz.
- Componentes com JSX renomeados para `.jsx`.
- Imports SVG ajustados para `*.svg?react`.
- React atualizado para 19.
- Entry point atualizado para `createRoot`.
- React Router atualizado da versao beta para 6 estavel.
- `history` e `web-vitals` removidos por nao estarem em uso.
- Testing Library atualizada e movida para `devDependencies`.
- Yarn definido como package manager unico.
- `package-lock.json` removido.
- Build validado com `yarn build`.
- Smoke test local validado via Vite com resposta HTTP 200.

## Ainda Pendente

- Configurar testes reais. Hoje `yarn test` e placeholder.
- Migrar para TypeScript.
- Criar API client com base URL por ambiente.
- Migrar estado global de Context API para Zustand.
- Padronizar formularios com React Hook Form e Zod.
- Definir CSS-in-JS e themes.
- Adicionar CI e hooks de qualidade.
- Finalizar README de portfolio com screenshots.

## Observacoes

- A API externa `https://dogsapi.origamid.dev/json` estava funcional em 2026-05-30 para o endpoint publico de fotos.
- O backlog detalhado fica em `docs/github-issues`.

