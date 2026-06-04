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
yarn test
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
- SVGs decorativos devem ser importados como URL e renderizados com `img` ou `background`.
- Componentes devem usar Emotion com `styled`.
- Componentes compartilhados devem ficar em pasta própria com `Component.tsx`, `Component.styles.ts` e `index.ts`.
- CSS global fica restrito a reset/base e utilitários em `App.css` e `GlobalStyles`.

## Arquitetura Atual

```txt
src/
  api.ts
  schemas/
  styles/
  types.ts
  stores/
  Components/
    Feed/
    Forms/
    Helper/
    Login/
    User/
  Hooks/
```

Pontos importantes:

- `stores/authStore.ts` centraliza login, logout, usuário logado e validação de token com Zustand.
- A validação automática do token restaura a sessão sem redirecionar, preservando rotas internas como `/conta/estatisticas`.
- `api.ts` centraliza endpoints e tratamento base de erro.
- `ErrorBoundary.tsx` captura falhas inesperadas de renderização para evitar tela branca.
- `StatusMessage.tsx` padroniza feedback acessível de erro, sucesso e informação.
- `useFetch.ts` gerencia estado de loading, erro e data para requests.
- `schemas/forms.ts` centraliza validações dos formulários com Zod.
- `styles/theme.ts` centraliza tokens do tema claro consumidos pelo Emotion.
- `styles/GlobalStyles.tsx` expõe tokens como CSS variables para CSS global.
- Os estilos de componentes ficam em arquivos próprios `*.styles.ts`.
- Os formulários usam React Hook Form integrado aos schemas de Zod.
- `docs/BACKEND_API_PLAN.md` documenta a decisão de criar a API própria em outro repositório.
- `docs/ARCHITECTURE.md` documenta aliases, estrutura atual e convenção de imports.

## Ordem De Trabalho

Consulte sempre:

```txt
docs/github-issues/PRIORITY.md
```

Próxima issue recomendada:

```txt
15 - Adicionar scripts de qualidade com Husky e lint-staged
```

## Ao Finalizar Uma Issue

1. Rode `yarn typecheck`.
2. Rode `yarn build`.
3. Atualize a issue correspondente em `docs/github-issues/`.
4. Atualize `docs/PROJECT_STATUS.md` se a mudança alterar o estado do projeto.
5. Atualize `README.md` se mudar setup, scripts, stack, API ou funcionalidades.
6. Remova o arquivo da issue se ela for concluída e a equipe quiser manter só pendências no diretório.

## Pendências Técnicas Conhecidas

- O modo demo/mock existe no frontend, mas ainda não substitui persistência real.
- A API externa é dependência de disponibilidade.
