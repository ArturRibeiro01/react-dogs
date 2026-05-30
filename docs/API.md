# API Contract

Este app ainda consome a API publica do projeto Dogs da Origamid:

```txt
https://dogsapi.origamid.dev/json
```

A base URL pode ser trocada por ambiente usando:

```bash
VITE_API_URL=https://sua-api.example.com
```

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

## Endpoints Usados Atualmente

### Auth

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
  "token": "jwt-token"
}
```

```txt
POST /jwt-auth/v1/token/validate
```

Headers:

```txt
Authorization: Bearer <token>
```

### User

```txt
GET /api/user
```

Headers:

```txt
Authorization: Bearer <token>
```

```txt
POST /api/user
```

Body:

```json
{
  "username": "usuario",
  "email": "email@example.com",
  "password": "senha"
}
```

### Photos

```txt
GET /api/photo/?_page=1&_total=6&_user=0
```

Query params:

- `_page`: pagina atual
- `_total`: quantidade por pagina
- `_user`: `0` para publico ou identificador do usuario

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

## Futuro Backend Proprio

Quando este app passar a consumir uma API propria, o backend deve preservar ou adaptar os contratos acima.

Recomendacao:

- manter compatibilidade inicial com os nomes de campos atuais para reduzir mudancas no frontend
- criar endpoints equivalentes de auth, usuario e fotos
- documentar autenticacao e formato de erro
- expor um endpoint de health check dedicado, como `GET /health`

## Fallback E Demo

Ainda nao existe fallback com dados mockados.

Opcoes futuras:

- mock server local para portfolio
- modo demo via `VITE_DEMO_MODE=true`
- backend proprio hospedado com banco e storage de imagens
- mensagens de erro mais ricas por tela quando a API externa estiver fora
