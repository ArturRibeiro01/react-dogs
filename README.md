# Dogs

[![CI/CD](https://github.com/ArturRibeiro01/react-dogs/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/ArturRibeiro01/react-dogs/actions/workflows/ci.yml)

Rede social para cachorros baseada no projeto Dogs da Origamid.

Este repositório começou como um projeto de estudo em React e está sendo modernizado como projeto de portfólio. O foco atual é estabilizar o produto, atualizar a stack, documentar decisões técnicas e evoluir a arquitetura sem perder o comportamento já funcional.

## Status

O app já foi migrado de Create React App para Vite, atualizado para React 19, React Router 6 estável e TypeScript. O feed público, o feed da conta, o modal de detalhes e a tela de estatísticas já usam dados reais da API externa da Origamid, com validação básica de formulários, tratamento de erro de rede, modo demo/mock e configuração de API por ambiente.

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
22 - Adicionar Error Boundary e feedback global
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

Placeholder por enquanto. A configuração real de testes será adicionada em issue própria.

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
- Validação básica de formulários.
- Estado de loading, erro e lista vazia no feed.
- Tratamento amigável para falha de rede da API.
- Health check da API externa.
- CI/CD com GitHub Actions.
- Deploy no GitHub Pages para dev e produção.

## Funcionalidades Pendentes

- Error Boundary e feedback global.
- Testes automatizados.
- Melhorias de acessibilidade e responsividade.
- Organização de arquitetura e aliases.
- Zustand.
- React Hook Form + Zod.
- CSS-in-JS e tokens/themes.

## Estrutura

```txt
index.html
vite.config.ts
tsconfig.json
src/
  App.tsx
  index.tsx
  api.ts
  types.ts
  UserContext.tsx
  App.css
  Assets/
  Components/
    Feed/
    Forms/
    Header.tsx
    Helper/
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
- CSS ainda usa CSS global e CSS Modules.
- SVGs usados como componentes React são importados com `?react`.
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
- Validação básica dos formulários.
- CI/CD com GitHub Actions.
- Documentação inicial de API, status e backlog.

## Observações

A API pública da Origamid é uma dependência externa. Para portfólio mais robusto, o plano futuro é criar ou acoplar um backend próprio, ou pelo menos oferecer modo demo/mock para reduzir risco de indisponibilidade externa.
