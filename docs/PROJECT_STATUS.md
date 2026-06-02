# Project Status

Atualizado em 2026-06-02.

## Resumo

O projeto Dogs está em fase de modernização para portfólio. A base técnica já foi estabilizada: Vite, React 19, React Router 6, TypeScript, cliente centralizado de API, feed com dados reais, modal de detalhes, estatísticas do usuário, Error Boundary, feedback acessível, polimento inicial de UI/acessibilidade e documentação inicial.

Todas as issues de produto planejadas para esta fase foram cobertas localmente. A API própria foi planejada para um repositório separado. A próxima etapa recomendada é organizar a arquitetura do frontend.

## Stack Atual

- React `^19.2.6`
- React DOM `^19.2.6`
- React Router `6.30.2`
- TypeScript `^6.0.3`
- Vite `^6.4.2`
- Vite Plugin SVGR `^5.2.0`
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
- Imports SVG ajustados para `*.svg?react`.
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

Os arquivos dessas issues foram removidos de `docs/github-issues/` para manter o diretório focado no trabalho pendente.

## Próxima Frente

Próxima issue recomendada:

```txt
20 - Organizar arquitetura de pastas e aliases
```

Motivo: produto e planejamento de backend já estão cobertos. Organizar pastas e aliases prepara o frontend para as próximas refatorações sem aumentar bagunça estrutural.

## Ainda Pendente

Arquitetura:

- Organizar pastas e aliases.
- Migrar estado global de Context API para Zustand.
- Padronizar formulários com React Hook Form e Zod.
- Avaliar CSS-in-JS.
- Adicionar tokens/themes.

Qualidade:

- Configurar testes reais.
- Adicionar scripts de qualidade com Husky e lint-staged.
- Melhorar README final de portfólio com screenshots.

## Validações Recentes

Comandos que devem continuar passando:

```bash
yarn typecheck
yarn build
yarn check:api
```

Últimas validações feitas durante a modernização:

- `yarn typecheck`: passou.
- `yarn build`: passou.
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
