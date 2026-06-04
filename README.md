# Dogs

[![CI/CD](https://github.com/ArturRibeiro01/react-dogs/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/ArturRibeiro01/react-dogs/actions/workflows/ci.yml)

Rede social para cachorros baseada no projeto Dogs da Origamid.

Este repositório começou como um projeto de estudo em React e está sendo modernizado como projeto de portfólio. O foco atual é estabilizar o produto, atualizar a stack, documentar decisões técnicas e evoluir a arquitetura sem perder o comportamento já funcional.

## Status

O app já foi migrado de Create React App para Vite, atualizado para React 19, React Router 6 estável e TypeScript. O feed público, o feed da conta, o modal de detalhes e a tela de estatísticas já usam dados reais da API externa da Origamid, com formulários padronizados com React Hook Form e Zod, Error Boundary, feedback acessível, polimento de UI, modo demo/mock e configuração de API por ambiente.

## Ambientes Publicados

Produção:

```txt
https://arturribeiro01.github.io/react-dogs/
```

Dev/homologação:

```txt
https://arturribeiro01.github.io/react-dogs/dev/
```

Ambos são publicados pelo mesmo GitHub Pages do repositório. A separação entre ambientes acontece por subpath: produção na raiz e dev em `/dev/`.

Próxima issue recomendada:

```txt
15 - Adicionar scripts de qualidade com Husky e lint-staged
```

O backlog pendente fica em:

```txt
docs/github-issues/
```

## Stack

- React `^19.2.6`
- React DOM `^19.2.6`
- React Router `6.30.2`
- TypeScript `^6.0.3`
- Vite `^6.4.2`
- Vite SVGR para SVGs como componentes React
- Zustand para estado global de autenticação
- React Hook Form e Zod para formulários e validação
- Emotion para CSS-in-JS com `styled` e tema tipado
- Tokens globais expostos como CSS variables para base global
- Vitest, jsdom e Testing Library para testes automatizados
- Yarn Classic

## Requisitos

- Node 18+
- Yarn 1.x

Observação: React Router 7, Vite 8 e `@vitejs/plugin-react` 6 exigem Node 20+. Enquanto o ambiente estiver em Node 18, o projeto usa as versões modernas compatíveis com esse runtime.

## Como Rodar

Instale as dependências:

```bash
yarn install
```

Crie um `.env.local` se quiser sobrescrever a API:

```bash
cp .env.example .env.local
```

Rode em desenvolvimento:

```bash
yarn dev
```

Faça build de produção:

```bash
yarn build
```

Faça preview do build:

```bash
yarn preview
```

## Scripts

```bash
yarn dev
```

Sobe o Vite em modo desenvolvimento.

```bash
yarn typecheck
```

Executa `tsc --noEmit`.

```bash
yarn build
```

Executa typecheck e build de produção.

```bash
yarn preview
```

Serve localmente o build gerado.

```bash
yarn check:api
```

Valida se a API pública responde com uma lista de fotos.

```bash
yarn test
```

Executa a suíte automatizada com Vitest.

```bash
yarn test:watch
```

Executa Vitest em modo watch para desenvolvimento.

## Configuração

A API base fica centralizada em:

```txt
src/api.ts
```

URL padrão:

```txt
https://dogsapi.origamid.dev/json
```

Variável suportada:

```bash
VITE_API_URL=https://dogsapi.origamid.dev/json
VITE_DEMO_MODE=false
```

### Modo Demo

Para rodar sem depender da API externa, ative:

```bash
VITE_DEMO_MODE=true
```

Credenciais demo:

```txt
usuario: demo
senha: Demo1234
```

Nesse modo, login, usuário, feed, upload e recuperação de senha usam dados mockados em memória. A API real continua sendo o padrão quando `VITE_DEMO_MODE` está ausente ou `false`.

Contrato atual da API:

```txt
docs/API.md
```

## Funcionalidades Implementadas

- Login com JWT.
- Validação automática do token salvo.
- Logout.
- Cadastro de usuário.
- Recuperação e redefinição de senha.
- Modo demo/mock opcional.
- Feed público com fotos reais.
- Feed da conta filtrado por usuário logado.
- Modal de detalhes da foto.
- Tela de estatísticas do usuário.
- Upload de foto autenticado.
- Formulários padronizados com React Hook Form e Zod.
- Error Boundary para falhas inesperadas de renderização.
- Feedback acessível e padronizado para erro, sucesso e informação.
- Polimento de UI, foco, rotas vazias, menu mobile e responsividade.
- Estado de loading, erro e lista vazia no feed.
- Tratamento amigável para falha de rede da API.
- Health check da API externa.
- CI/CD com GitHub Actions.
- Deploy no GitHub Pages para dev e produção.

## Funcionalidades Pendentes

- Automatizar checks locais antes de commit com Husky e lint-staged.

## Estrutura

```txt
index.html
vite.config.ts
tsconfig.json
src/
  App.tsx
  index.tsx
  api.ts
  schemas/
  styles/
  types.ts
  stores/
  App.css
  Assets/
  Components/
    Feed/
    Forms/
      Button/
        Button.tsx
        Button.styles.ts
        index.ts
      Input/
        Input.tsx
        Input.styles.ts
        index.ts
    Header/
      Header.tsx
      Header.styles.ts
      index.ts
    Helper/
      StatusMessage/
    Login/
    User/
  Hooks/
docs/
  API.md
  PROJECT_STATUS.md
  github-issues/
scripts/
  check-api-health.mjs
```

Convenções atuais:

- Componentes React usam `.tsx`.
- Hooks, helpers e cliente de API usam `.ts`.
- Estado global de autenticação fica em `src/stores/authStore.ts`.
- Schemas de validação de formulários ficam em `src/schemas/`.
- Tema e tokens iniciais ficam em `src/styles/theme.ts`.
- Tokens do tema também são expostos como CSS variables em `src/styles/GlobalStyles.tsx`.
- Componentes usam Emotion com `styled`.
- Componentes compartilhados devem ficar em pasta própria com `Component.tsx`, `Component.styles.ts` e `index.ts`.
- CSS global fica restrito a reset/base e utilitários em `App.css` e `GlobalStyles`.
- SVGs decorativos são importados como URL e renderizados com `img` ou `background`.
- O acesso à API deve passar por `src/api.ts`.
- Tipos compartilhados ficam em `src/types.ts`.

## Fluxo De Branches

O fluxo atual do projeto é:

```txt
feature/* -> develop -> main
```

- `develop`: integração, homologação e ambiente dev.
- `main`: produção.

Ambientes publicados via GitHub Pages:

```txt
prod: https://arturribeiro01.github.io/react-dogs/
dev:  https://arturribeiro01.github.io/react-dogs/dev/
```

Para o deploy funcionar, o GitHub Pages do repositório deve usar `GitHub Actions` como source.

## Documentação

- `docs/API.md`: contrato da API pública usada hoje e recomendações para backend próprio.
- `docs/ARCHITECTURE.md`: estrutura atual, aliases e convenção de imports.
- `docs/BACKEND_API_PLAN.md`: decisão e plano para criar a API própria em outro repositório.
- `docs/PROJECT_STATUS.md`: estado atual da modernização.
- `docs/DEVELOPMENT.md`: guia para retomar desenvolvimento.
- `docs/DEPLOYMENT.md`: desenho da esteira de CI/CD e GitHub Pages.
- `docs/github-issues/README.md`: como publicar ou acompanhar issues pendentes.
- `docs/github-issues/PRIORITY.md`: ordem recomendada de trabalho.

## Histórico Da Modernização

Já foi feito:

- Migração de Create React App para Vite.
- Migração para TypeScript.
- Atualização para React 19.
- Atualização para React Router 6 estável.
- Centralização da API em `src/api.ts`.
- Configuração de `VITE_API_URL`.
- Remoção de dependências antigas não usadas.
- Uso de Yarn como package manager único.
- Feed real com dados da API.
- Formulários migrados para React Hook Form e Zod.
- Cobertura inicial de testes com Vitest, jsdom e Testing Library.
- Decisão de CSS-in-JS feita com Emotion.
- Button, Input, StatusMessage, Header e Footer migrados para Emotion e organizados com arquivos de estilo próprios.
- Base de tokens/themes criada com tema claro tipado e CSS variables globais.
- CSS Modules removidos; estilos de componentes migrados para arquivos `*.styles.ts` com Emotion.
- CI/CD com GitHub Actions.
- Documentação inicial de API, status e backlog.

## Observações

A API pública da Origamid é uma dependência externa. Para portfólio mais robusto, a decisão atual é criar uma API própria em outro repositório, sugerido como `dogs-api`, mantendo este repositório como frontend. O modo demo/mock continua como fallback de portfólio.
