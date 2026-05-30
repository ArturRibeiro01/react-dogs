# Dogs

Rede social para cachorros baseada no projeto Dogs da Origamid.

Este repositório começou como um projeto de estudo em React e está sendo modernizado como projeto de portfólio, com foco em estabilidade, atualização de stack e melhoria progressiva de arquitetura.

## Stack

- React `^19.2.6`
- React DOM `^19.2.6`
- React Router `6.30.2`
- Vite `^6.4.2`
- Yarn Classic

## Requisitos

- Node 18+
- Yarn 1.x

Observação: Vite 8, `@vitejs/plugin-react` 6 e React Router 7 exigem Node 20+. Enquanto o ambiente estiver em Node 18, o projeto usa as versões modernas compatíveis com esse runtime.

## Scripts

Instalar dependências:

```bash
yarn install
```

Rodar em desenvolvimento:

```bash
yarn dev
```

Build de produção:

```bash
yarn build
```

Preview do build:

```bash
yarn preview
```

Checar saúde da API:

```bash
yarn check:api
```

Testes:

```bash
yarn test
```

No momento, `yarn test` é um placeholder. A configuração real de testes será adicionada em uma etapa própria.

## API

A API base está centralizada em:

```txt
src/api.js
```

Base URL atual:

```txt
https://dogsapi.origamid.dev/json
```

Para apontar o app para outra API, crie um `.env.local` baseado em `.env.example`:

```bash
VITE_API_URL=https://sua-api.example.com
```

Em 2026-05-30, o endpoint público de fotos foi validado com sucesso:

```txt
GET /api/photo/?_page=1&_total=1&_user=0
```

## Estrutura

```txt
index.html
vite.config.mjs
src/
  App.jsx
  index.jsx
  api.js
  UserContext.jsx
  Assets/
  Components/
  Hooks/
docs/
  github-issues/
scripts/
  check-api-health.mjs
```

Os arquivos com JSX usam extensão `.jsx`, porque o Vite é mais estrito que o antigo Create React App.

## Status Da Modernização

Já foi feito:

- Migração de Create React App para Vite.
- Atualização para React 19.
- Atualização do React Router beta para React Router 6 estável.
- Correção dos principais bugs de runtime na API, fetch, validação básica, rotas protegidas e feed inicial.
- Remoção de dependências não usadas, como `history` e `web-vitals`.
- Uso de Yarn como único package manager.
- Base URL da API configurável via `VITE_API_URL`.
- Health check da API via `yarn check:api`.

Próximas frentes planejadas:

- TypeScript.
- Zustand.
- React Hook Form + Zod.
- API client com configuração por ambiente.
- Testes automatizados.
- CI.
- CSS-in-JS e themes.
- README final de portfólio com screenshots.

O backlog detalhado fica em:

```txt
docs/github-issues/
```
