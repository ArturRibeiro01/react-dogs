# API Contract

Este app consome a API pública do projeto Dogs da Origamid.

```txt
https://dogsapi.origamid.dev/json
```

A base URL pode ser trocada por ambiente:

```bash
VITE_API_URL=https://sua-api.example.com
```

O cliente HTTP do app fica em:

```txt
src/api.ts
```

Os tipos compartilhados ficam em:

```txt
src/types.ts
```

## Modo Demo/Mock

O frontend possui um modo demo opcional para reduzir dependencia da API externa.

Ativacao:

```bash
VITE_DEMO_MODE=true
```

Comportamento padrao:

```bash
VITE_DEMO_MODE=false
```

Credenciais demo:

```txt
usuario: demo
senha: Demo1234
```

No modo demo, `src/api.ts` troca os clientes reais por mocks definidos em:

```txt
src/mockApi.ts
```

Fluxos cobertos pelo mock:

- login
- validacao de token
- usuario logado
- cadastro
- recuperacao de senha
- redefinicao de senha
- listagem de fotos
- upload de foto
- health check de fotos

O modo demo nao substitui a futura API propria. Ele existe para manter o app navegavel em portfolio, dev e homologacao mesmo se a API externa estiver indisponivel.

## Estado Da API

Validações feitas recentemente:

- `GET /api/photo/?_page=1&_total=1&_user=0` respondia com array em 2026-05-30.
- `POST /api/password/lost` e `POST /api/password/reset` existem e processam requisições em 2026-05-31.

## Health Check

Comando:

```bash
yarn check:api
```

Endpoint usado:

```txt
GET /api/photo/?_page=1&_total=1&_user=0
```

O comando espera:

- status HTTP `2xx`
- resposta JSON em formato de array

## Erros

A API costuma responder erros em JSON com este formato:

```json
{
  "code": "error",
  "message": "Mensagem de erro.",
  "data": {
    "status": 401
  }
}
```

O cliente `apiRequest` tenta extrair `message` e transforma falhas de rede em uma mensagem amigável:

```txt
Nao foi possivel conectar com a API. Tente novamente em instantes.
```

## Auth

### Login

```txt
POST /jwt-auth/v1/token
```

Body:

```json
{
  "username": "usuario",
  "password": "senha"
}
```

Resposta esperada:

```json
{
  "token": "jwt-token",
  "user_email": "email@example.com",
  "user_nicename": "usuario",
  "user_display_name": "usuario"
}
```

### Validar Token

```txt
POST /jwt-auth/v1/token/validate
```

Headers:

```txt
Authorization: Bearer <token>
```

## User

### Buscar Usuário Logado

```txt
GET /api/user
```

Headers:

```txt
Authorization: Bearer <token>
```

Resposta esperada:

```json
{
  "id": 1,
  "username": "usuario",
  "nome": "Nome",
  "email": "email@example.com"
}
```

### Criar Usuário

```txt
POST /api/user
```

Body:

```json
{
  "username": "usuario",
  "email": "email@example.com",
  "password": "Senha123"
}
```

## Password

### Solicitar Recuperação

```txt
POST /api/password/lost
```

Body:

```json
{
  "login": "usuario-ou-email",
  "url": "http://localhost:5173/login/resetar"
}
```

Observações:

- `login` pode ser usuário ou email.
- `url` é a rota para onde o usuário será enviado pelo link de recuperação.
- A API envia a key/token por email quando o usuário existe.

Erro confirmado com usuário inexistente:

```json
{
  "code": "error",
  "message": "Usuário não existe.",
  "data": {
    "status": 401
  }
}
```

### Redefinir Senha

```txt
POST /api/password/reset
```

Body:

```json
{
  "login": "usuario-ou-email",
  "key": "token-da-url",
  "password": "NovaSenha123"
}
```

Esse endpoint é usado pelo frontend na rota `/login/resetar`.

## Photos

### Listar Fotos

```txt
GET /api/photo/?_page=1&_total=6&_user=0
```

Query params:

- `_page`: página atual.
- `_total`: quantidade por página.
- `_user`: `0` para feed público ou identificador do usuário.

Resposta esperada:

```json
[
  {
    "id": 239,
    "author": "cat",
    "title": "Joel",
    "date": "2020-07-20 21:24:23",
    "src": "https://example.com/photo.jpg",
    "peso": "10",
    "idade": "12",
    "acessos": 261541
  }
]
```

### Criar Foto

```txt
POST /api/photo
```

Headers:

```txt
Authorization: Bearer <token>
```

Body:

```txt
multipart/form-data
```

Campos:

- `img`
- `nome`
- `peso`
- `idade`

## Futuro Backend Próprio

Quando este app passar a consumir uma API própria, o backend deve preservar ou adaptar os contratos acima.

O planejamento dessa frente está registrado na issue local:

```txt
docs/github-issues/23-plan-own-backend-api.md
```

Recomendações:

- manter compatibilidade inicial com os nomes de campos atuais
- criar endpoints equivalentes de auth, usuário, fotos e recuperação de senha
- documentar autenticação e formato de erro
- expor um endpoint dedicado de health check, como `GET /health`
- oferecer ambiente de staging/homologação
- definir política para storage das imagens

## Fallback E Demo

O modo demo/mock já existe no frontend e pode ser ativado com `VITE_DEMO_MODE=true`.

Opções futuras:

- mock server local mais completo para portfólio
- backend próprio hospedado com banco e storage de imagens
- mensagens de erro mais ricas por tela quando a API externa estiver fora
