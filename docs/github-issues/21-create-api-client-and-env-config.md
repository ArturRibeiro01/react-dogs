## Contexto

Status local: concluida em 2026-05-30.

`src/api.ts` hoje centraliza factories de requests, mas chamadas `fetch`, tratamento de erro, token e base URL ficam espalhados. A base URL tambem esta hardcoded.

## Objetivo

Criar uma camada de API mais robusta, tipada e configuravel por ambiente.

## Escopo

- [x] Criar um `apiClient` ou modulo equivalente para encapsular `fetch`.
- [x] Centralizar base URL via variavel de ambiente.
- [x] Centralizar montagem de headers, incluindo `Authorization`.
- [x] Padronizar tratamento de erro da API.
- [ ] Definir tipos de resposta quando TypeScript estiver ativo.
- [x] Separar endpoints por dominio: auth, user, photo.
- [x] Adicionar smoke test ou teste unitario para montagem de requests.

## Criterios De Aceite

- [x] Nenhum componente monta request manualmente sem necessidade.
- [x] Base URL pode ser trocada sem editar codigo fonte.
- [x] Erros da API seguem formato consistente.
- [x] Token e headers ficam centralizados.

## Observacoes

- `stats` ainda nao foi separado porque a tela de estatisticas ainda nao consome endpoint real.
- Tipos de resposta ficam para a migracao TypeScript.
