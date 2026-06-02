# Development Guide

Guia rápido para retomar o desenvolvimento do Dogs.

## Setup

```bash
yarn install
cp .env.example .env.local
yarn dev
```

O app usa Vite. Por padrão, o servidor local sobe em:

```txt
http://localhost:5173
```

## Comandos De Verificação

Antes de abrir PR:

```bash
yarn typecheck
yarn build
```

O CI roda esses comandos automaticamente em PRs para `develop` e `main`.

Quando mexer em integração com API:

```bash
yarn check:api
```

## Branches

Fluxo esperado:

```txt
feature/* -> develop -> main
```

- Abra PRs de feature para `develop`.
- Use `develop` como integração/homologação.
- Use `main` para produção.
- O GitHub Pages publica `develop` em `/react-dogs/dev/`.
- O GitHub Pages publica `main` em `/react-dogs/`.

## Convenções De Código

- Componentes React usam `.tsx`.
- Hooks, helpers e módulos sem JSX usam `.ts`.
- Tipos compartilhados ficam em `src/types.ts`.
- Chamadas HTTP devem passar por `src/api.ts`.
- Componentes compartilhados devem ter props tipadas explicitamente.
- Evite `any`; prefira `unknown` ou tipos de domínio.
- SVGs usados como componentes React devem ser importados com `?react`.
- CSS atual usa CSS global e CSS Modules.

## Arquitetura Atual

```txt
src/
  api.ts
  types.ts
  UserContext.tsx
  Components/
    Feed/
    Forms/
    Helper/
    Login/
    User/
  Hooks/
```

Pontos importantes:

- `UserContext.tsx` centraliza login, logout, usuário logado e validação de token.
- A validação automática do token restaura a sessão sem redirecionar, preservando rotas internas como `/conta/estatisticas`.
- `api.ts` centraliza endpoints e tratamento base de erro.
- `useFetch.ts` gerencia estado de loading, erro e data para requests.
- `useForm.ts` mantém validação simples enquanto a issue de React Hook Form/Zod não acontece.

## Ordem De Trabalho

Consulte sempre:

```txt
docs/github-issues/PRIORITY.md
```

Próxima issue recomendada:

```txt
22 - Adicionar Error Boundary e feedback global
```

## Ao Finalizar Uma Issue

1. Rode `yarn typecheck`.
2. Rode `yarn build`.
3. Atualize a issue correspondente em `docs/github-issues/`.
4. Atualize `docs/PROJECT_STATUS.md` se a mudança alterar o estado do projeto.
5. Atualize `README.md` se mudar setup, scripts, stack, API ou funcionalidades.
6. Remova o arquivo da issue se ela for concluída e a equipe quiser manter só pendências no diretório.

## Pendências Técnicas Conhecidas

- `yarn test` ainda é placeholder.
- O modo demo/mock existe no frontend, mas ainda não substitui persistência real.
- A API externa é dependência de disponibilidade.
- O estado global ainda usa Context API.
- Formulários ainda usam hook próprio simples.
