# Project Status

Atualizado em 2026-06-04.

## Resumo

O projeto Dogs está em fase de modernização para portfólio. A base técnica já foi estabilizada: Vite, React 19, React Router 6, TypeScript, cliente centralizado de API, feed com dados reais, modal de detalhes, estatísticas do usuário, Error Boundary, feedback acessível, formulários com React Hook Form/Zod, polimento inicial de UI/acessibilidade e documentação inicial.

Todas as issues de produto planejadas para esta fase foram cobertas localmente. A API própria foi planejada para um repositório separado, aliases/imports foram organizados, o estado global de autenticação foi migrado para Zustand, os formulários foram padronizados com React Hook Form e Zod, a cobertura de testes foi ampliada, a estratégia de CSS-in-JS foi definida com Emotion, a base de tokens/themes foi centralizada, os CSS Modules foram removidos e os checks locais foram automatizados. A próxima etapa recomendada é melhorar o README final de portfólio.

## Stack Atual

- React `^19.2.6`
- React DOM `^19.2.6`
- React Router `6.30.2`
- TypeScript `^6.0.3`
- Vite `^6.4.2`
- Vite Plugin SVGR `^5.2.0`
- Zustand `^5.0.14`
- React Hook Form `^7.77.0`
- Zod `^4.4.3`
- Emotion `^11.14.x`
- Vitest `^2.1.9`
- jsdom `^24.1.3`
- Testing Library
- ESLint `8.57.x`
- Prettier `3.6.x`
- Husky `9.1.x`
- lint-staged `15.5.x`
- Yarn Classic

## Ambiente

- Node usado durante a modernização: `18.16.0`
- Node recomendado: `18+`
- Package manager: Yarn 1.x

Observação: React Router 7, Vite 8 e `@vitejs/plugin-react` 6 exigem Node 20+. Enquanto o ambiente estiver em Node 18, o projeto permanece nas versões modernas compatíveis com esse runtime.

## Concluído

- Migração de Create React App para Vite.
- Remoção de `react-scripts`.
- Entrada HTML movida para `index.html` na raiz.
- Migração para TypeScript.
- Componentes com JSX renomeados para `.tsx`.
- Hooks, helpers e API client renomeados para `.ts`.
- `tsconfig.json` configurado.
- Script `yarn typecheck` adicionado.
- `yarn build` agora executa typecheck antes do build.
- Imports SVG ajustados para uso como assets em URL.
- React atualizado para 19.
- Entry point atualizado para `createRoot`.
- React Router atualizado da versão beta para 6 estável.
- Rotas protegidas ajustadas.
- Validação automática do token preserva rotas internas da conta.
- `NavLink` atualizado para API do React Router 6.
- `history` e `web-vitals` removidos por não estarem em uso.
- Testing Library atualizada e movida para `devDependencies`.
- Yarn definido como package manager único.
- `package-lock.json` removido.
- Base URL da API configurável via `VITE_API_URL`.
- `.env.example` criado.
- API client criado em `src/api.ts`.
- Plano de API própria criado em `docs/BACKEND_API_PLAN.md`, com backend separado sugerido como `dogs-api`.
- Aliases de frontend configurados em Vite e TypeScript.
- Convenção de imports documentada em `docs/ARCHITECTURE.md`.
- Estado global de autenticação migrado de Context API para Zustand.
- `UserContext` removido.
- Formulários migrados para React Hook Form com validação por Zod.
- Hook próprio `useForm` removido.
- Schemas de formulário centralizados em `src/schemas/forms.ts`.
- Cobertura inicial de testes configurada com Vitest, jsdom e Testing Library.
- Testes adicionados para schemas de formulário, `useFetch`, rota protegida e fluxo básico de login.
- Cobertura de testes ampliada para Header, FeedPhotos, FeedPhotosItem, UserHeaderNav, recuperação/redefinição de senha e Error Boundary.
- CSS-in-JS escolhido: Emotion com `@emotion/styled`.
- `ThemeProvider` adicionado no app.
- Tema claro tipado adicionado em `src/styles/theme.ts`.
- Tokens expostos como CSS variables em `src/styles/GlobalStyles.tsx`.
- Button, Input, StatusMessage, Header e Footer migrados para Emotion.
- Feed, Login, User, Loading, ErrorBoundary e NotFound migrados para Emotion.
- CSS Modules removidos do projeto.
- Componentes migrados para Emotion usam arquivos `Component.styles.ts`.
- Modo demo/mock criado em `src/mockApi.ts`, ativado por `VITE_DEMO_MODE=true`.
- Tipos compartilhados criados em `src/types.ts`.
- Health check da API criado em `scripts/check-api-health.mjs`.
- CI/CD configurado em `.github/workflows/ci.yml`.
- GitHub Pages configurado via Actions para publicar `develop` em `/dev` e `main` na raiz.
- Deploy de dev confirmado em `https://arturribeiro01.github.io/react-dogs/dev/`.
- Deploy de produção confirmado em `https://arturribeiro01.github.io/react-dogs/`.
- Contrato atual da API documentado em `docs/API.md`.
- Erros de rede da API exibem mensagem amigável.
- Validação atual dos formulários concluída.
- Feed público com dados reais.
- Feed da conta filtrado por usuário logado.
- Grid responsivo do feed.
- Visualizações e estado vazio no feed.
- Modal de detalhes da foto com fechamento por clique fora, botão e Escape.
- Detalhe de foto integrado à API real e ao modo demo/mock.
- Tela de estatísticas do usuário com total, média e visualização por foto.
- Endpoint `/api/stats` integrado à API real e ao modo demo/mock.
- Error Boundary captura erros inesperados de renderização.
- Feedback de erro, sucesso e informação padronizado com semântica acessível.
- Menu mobile comunica estado aberto/fechado com `aria-expanded`.
- Rotas desconhecidas exibem fallback ou redirecionamento amigável.
- Upload de foto ganhou label acessível, responsividade e textos mais consistentes.
- Foco visível global e loading visual padronizado.
- Upload de foto autenticado.
- Endpoints de recuperação de senha verificados na API pública.
- Fluxo de recuperação e redefinição de senha implementado.
- Login, usuário, feed, upload, senha, estatísticas e health check possuem mocks para modo demo.
- ESLint configurado para React + TypeScript.
- Prettier configurado como formatador do projeto.
- Husky configurado com hook `pre-commit`.
- lint-staged configurado para arquivos alterados.
- Script `yarn validate` criado para rodar lint, format check, typecheck, testes e build.

## Issues Concluídas Localmente

- `01` Corrigir imports e bugs que quebram chamadas da API.
- `02` Corrigir validação dos formulários.
- `03` Padronizar rotas para React Router v6.
- `04` Renderizar feed com dados reais da API.
- `08` Modernizar dependências e tooling.
- `13` Migrar projeto para TypeScript.
- `16` Criar plano de saúde e contingência para API externa.
- `21` Criar API client e configuração por ambiente.
- `06` Completar fluxo de recuperação de senha.
- `24` Adicionar modo demo/mock para reduzir dependência da API externa.
- `05` Implementar modal de detalhes da foto.
- `07` Implementar tela de estatísticas do usuário.
- `22` Adicionar Error Boundary e feedback global.
- `12` Polir UI, responsividade e acessibilidade.
- `23` Planejar API própria para substituir API externa.
- `20` Organizar arquitetura de pastas e aliases.
- `18` Migrar estado global de Context API para Zustand.
- `19` Padronizar formulários com React Hook Form e Zod.
- `09` Adicionar cobertura inicial de testes.
- `14` Escolher e migrar para CSS-in-JS.
- `17` Adicionar themes de cores e tokens de design.
- `25` Migrar CSS Modules restantes para Emotion.
- `26` Ampliar cobertura de testes unitários e integração.
- `15` Adicionar scripts de qualidade com Husky e lint-staged.

Os arquivos dessas issues foram removidos de `docs/github-issues/` para manter o diretório focado no trabalho pendente.

## Próxima Frente

Próxima issue recomendada:

```txt
11 - Melhorar README para portfólio
```

Motivo: a base técnica, testes, qualidade local e deploy já estão montados. Agora faz sentido fechar a apresentação do projeto como portfólio.

## Ainda Pendente

Qualidade:

- Melhorar README final de portfólio com screenshots.

## Validações Recentes

Comandos que devem continuar passando:

```bash
yarn typecheck
yarn lint
yarn format:check
yarn test
yarn build
yarn check:api
```

Últimas validações feitas durante a modernização:

- `yarn typecheck`: passou.
- `yarn lint`: passou.
- `yarn format:check`: passou.
- `yarn test`: passou com 10 arquivos e 31 testes.
- `yarn build`: passou.
- `yarn validate`: passou.
- `yarn check:api`: endpoint público de fotos funcional em 2026-05-30.
- Endpoints de senha `/api/password/lost` e `/api/password/reset`: confirmados em 2026-05-31.
- Build local com base `/react-dogs/`: passou.
- Build local com base `/react-dogs/dev/`: passou.

## API

Base atual:

```txt
https://dogsapi.origamid.dev/json
```

Documentação:

```txt
docs/API.md
```

Risco conhecido: a API é externa e pode mudar ou ficar indisponível. Para portfólio mais robusto, a decisão registrada é criar uma API própria em outro repositório e manter o modo demo/mock como fallback.

Plano:

```txt
docs/BACKEND_API_PLAN.md
```

## Branches

Fluxo pretendido:

```txt
feature/* -> develop -> main
```

- `develop`: integração/homologação e deploy em `/react-dogs/dev/`.
- `main`: produção e deploy em `/react-dogs/`.
- `master`: fallback temporário de produção enquanto `main` ainda não existir no remote.

O workflow de Pages monta um artifact único contendo produção na raiz e dev em `/dev`, porque GitHub Pages publica um site por repositório.

## Referências

- Backlog pendente: `docs/github-issues/`
- Ordem de prioridade: `docs/github-issues/PRIORITY.md`
- Contrato da API: `docs/API.md`
- Deploy: `docs/DEPLOYMENT.md`
- README principal: `README.md`
