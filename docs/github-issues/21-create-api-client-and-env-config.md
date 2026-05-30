## Contexto

`src/api.js` hoje centraliza factories de requests, mas chamadas `fetch`, tratamento de erro, token e base URL ficam espalhados. A base URL tambem esta hardcoded.

## Objetivo

Criar uma camada de API mais robusta, tipada e configuravel por ambiente.

## Escopo

- Criar um `apiClient` ou modulo equivalente para encapsular `fetch`.
- Centralizar base URL via variavel de ambiente.
- Centralizar montagem de headers, incluindo `Authorization`.
- Padronizar tratamento de erro da API.
- Definir tipos de resposta quando TypeScript estiver ativo.
- Separar endpoints por dominio: auth, user, photo, stats.
- Adicionar smoke test ou teste unitario para montagem de requests.

## Criterios De Aceite

- Nenhum componente monta request manualmente sem necessidade.
- Base URL pode ser trocada sem editar codigo fonte.
- Erros da API seguem formato consistente.
- Token e headers ficam centralizados.

