# Backend API Plan

Este documento registra a decisão arquitetural para substituir gradualmente a API pública da Origamid por uma API própria do Dogs.

## Decisão

O backend deve ser criado em outro repositório, separado deste frontend.

Nome sugerido:

```txt
dogs-api
```

Este repositório continua sendo apenas o frontend:

```txt
react-dogs
```

Motivos:

- ciclos de deploy independentes
- CI/CD mais simples por projeto
- backend pode ter stack, banco e infraestrutura próprios
- frontend continua leve e focado em Vite/React
- backend vira um segundo projeto de portfólio com autenticação, banco, upload e documentação de API

## Stack Recomendada

Stack inicial recomendada:

- Node.js
- Fastify
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT
- Docker Compose para desenvolvimento local

Motivo da escolha:

- Fastify é leve e direto para uma API pequena/média.
- Prisma acelera modelagem e migrações.
- PostgreSQL é uma escolha robusta e comum em produção.
- Zod ajuda a manter validação e tipos próximos do contrato.
- Docker Compose simplifica onboarding local.

Alternativa futura:

- NestJS pode ser considerado se a API crescer muito em módulos, filas, integrações ou regras de domínio.

## Objetivo Da Primeira Versão

A primeira versão da API própria deve buscar paridade mínima com o frontend atual, sem tentar redesenhar o produto inteiro.

Escopo da v1:

- cadastro de usuário
- login com JWT
- validação de token
- recuperação e redefinição de senha
- usuário logado
- listagem pública de fotos
- listagem de fotos por usuário
- detalhe de foto
- upload de foto
- estatísticas do usuário
- health check

Fora da v1:

- comentários persistentes, se não forem necessários para paridade inicial
- curtidas
- seguidores
- notificações
- moderação
- painel administrativo

## Contrato Inicial

Para reduzir mudanças no frontend, a API própria deve aceitar uma camada de compatibilidade com o contrato atual.

### Auth

```txt
POST /jwt-auth/v1/token
POST /jwt-auth/v1/token/validate
```

Também pode existir um contrato novo e mais limpo:

```txt
POST /auth/login
POST /auth/validate
```

Na primeira migração, priorizar compatibilidade com o frontend atual.

### User

```txt
GET /api/user
POST /api/user
```

Contrato futuro equivalente:

```txt
GET /users/me
POST /users
```

### Password

```txt
POST /api/password/lost
POST /api/password/reset
```

Contrato futuro equivalente:

```txt
POST /password/lost
POST /password/reset
```

### Photos

```txt
GET /api/photo/?_page=1&_total=6&_user=0
POST /api/photo
GET /api/photo/:id
```

Contrato futuro equivalente:

```txt
GET /photos?page=1&total=6&user=0
POST /photos
GET /photos/:id
DELETE /photos/:id
```

### Stats

```txt
GET /api/stats
```

Contrato futuro equivalente:

```txt
GET /stats/me
```

### Health

```txt
GET /health
```

## Formato De Erro

Manter um formato estável para o frontend exibir mensagens:

```json
{
  "code": "error",
  "message": "Mensagem de erro.",
  "data": {
    "status": 400
  }
}
```

O campo `message` deve ser sempre uma string amigável para o usuário quando possível.

## Modelagem Inicial

### User

Campos sugeridos:

- `id`
- `username`
- `name`
- `email`
- `passwordHash`
- `createdAt`
- `updatedAt`

Regras:

- `username` único
- `email` único
- senha armazenada apenas como hash

### Photo

Campos sugeridos:

- `id`
- `userId`
- `title`
- `weight`
- `age`
- `imageUrl`
- `imageKey`
- `views`
- `createdAt`
- `updatedAt`

Regras:

- foto pertence a um usuário
- `views` começa em `0`
- detalhe de foto pode incrementar visualização, se essa regra for desejada

### PasswordResetToken

Campos sugeridos:

- `id`
- `userId`
- `tokenHash`
- `expiresAt`
- `usedAt`
- `createdAt`

Regras:

- token deve expirar
- token deve ser salvo como hash
- token usado não pode ser reutilizado

## Storage De Imagens

Opções recomendadas:

1. Cloudinary
2. S3 compatível, como AWS S3, Cloudflare R2 ou Supabase Storage

Recomendação inicial:

- usar Cloudinary para acelerar o MVP
- guardar no banco apenas `imageUrl` e `imageKey`
- remover imagem do storage quando a foto for excluída

## Ambientes

Ambientes sugeridos:

```txt
local
staging
production
```

Variáveis esperadas no backend:

```txt
DATABASE_URL=
JWT_SECRET=
APP_WEB_URL=
MAIL_FROM=
MAIL_PROVIDER_API_KEY=
STORAGE_PROVIDER=
STORAGE_BUCKET=
STORAGE_API_KEY=
```

No frontend, a troca continua por ambiente:

```txt
VITE_API_URL=https://api.example.com
```

O modo demo continua independente:

```txt
VITE_DEMO_MODE=true
```

## CI/CD Do Backend

Pipeline mínimo sugerido:

- install
- typecheck
- lint
- test
- prisma migrate check
- build
- deploy

Branches:

```txt
feature/* -> develop -> main
```

Ambientes:

- `develop` publica staging
- `main` publica production

## Estratégia De Migração

1. Criar repositório `dogs-api`.
2. Implementar `/health`.
3. Implementar autenticação e usuário.
4. Implementar fotos com listagem e upload.
5. Implementar estatísticas.
6. Implementar recuperação de senha.
7. Publicar staging.
8. Apontar frontend dev para staging via `VITE_API_URL`.
9. Validar fluxos principais no frontend.
10. Publicar production.
11. Apontar frontend production para API própria.
12. Manter modo demo/mock como fallback de portfólio.

## Impacto No Frontend

Este frontend não deve migrar para monorepo.

Mudanças esperadas aqui no futuro:

- atualizar `.env.example` com URL da API própria quando existir
- ajustar `src/api.ts` apenas se a API nova não expuser camada compatível
- revisar `scripts/check-api-health.mjs` para usar `/health`
- manter `VITE_DEMO_MODE=true` para demo independente do backend

## Critério Para Começar A Implementação

Antes de implementar o backend, decidir:

- nome final do repositório
- provedor de deploy
- provedor de banco
- provedor de storage
- provedor de e-mail
- se a v1 será compatível com rotas atuais ou se o frontend será ajustado junto
