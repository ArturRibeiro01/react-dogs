## Contexto

O frontend ainda depende da API publica do projeto Dogs da Origamid. Isso limita evolucao de produto, controle de dados, disponibilidade, autenticacao, storage de imagens e features futuras.

Para transformar o Dogs em um projeto de portfolio mais forte, vale planejar uma API propria em um repositorio separado, mantendo compatibilidade inicial com o contrato atual e abrindo caminho para evolucoes.

## Objetivo

Planejar a criacao de uma API propria para substituir gradualmente a API externa.

## Escopo

- Definir se o backend sera criado em repositorio separado, por exemplo `dogs-api`.
- Escolher stack inicial.
- Definir contrato minimo compativel com o frontend atual.
- Planejar autenticacao, recuperacao de senha e autorizacao.
- Planejar upload e storage de imagens.
- Planejar banco de dados e modelagem inicial.
- Planejar ambientes dev/prod.
- Planejar CI/CD do backend.
- Documentar estrategia de migracao do frontend via `VITE_API_URL`.

## Sugestao De Stack

Opcao enxuta:

- Node.js
- Fastify
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT
- Docker Compose para dev local

Opcao mais estruturada:

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Zod ou class-validator
- JWT
- Docker Compose para dev local

## Contrato Inicial Sugerido

Auth:

- `POST /auth/login`
- `POST /auth/validate`

Users:

- `POST /users`
- `GET /users/me`

Password:

- `POST /password/lost`
- `POST /password/reset`

Photos:

- `GET /photos`
- `POST /photos`
- `GET /photos/:id`
- `DELETE /photos/:id`

Health:

- `GET /health`

## Criterios De Aceite

- Existe uma decisao documentada sobre stack e repositorio.
- Existe um contrato inicial de endpoints.
- Existe uma proposta de modelagem inicial de banco.
- Existe estrategia para storage de imagens.
- Existe plano de migracao sem quebrar o frontend atual.
- `docs/API.md` e `docs/PROJECT_STATUS.md` sao atualizados com a decisao.

## Observacoes

- Esta issue e de planejamento. A implementacao do backend deve acontecer em um repositorio proprio.
- O frontend deve continuar funcionando com a API atual ate a nova API ter paridade minima.
- A troca deve ser feita por ambiente usando `VITE_API_URL`.
