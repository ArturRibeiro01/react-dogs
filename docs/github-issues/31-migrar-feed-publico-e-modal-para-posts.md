# Migrar feed público e modal para posts

## Contexto

Na Dogs API, o feed público vem de `/v1/posts`, não de fotos da API antiga. Posts podem ter mídia, cachorro relacionado e dados de tutor.

## Objetivo

Migrar o feed público e o modal de detalhes para consumir posts da Dogs API.

## Tarefas

- Trocar `photoApi.list` por `GET /v1/posts`.
- Trocar `photoApi.get` por `GET /v1/posts/:postId`.
- Mapear imagem principal a partir da mídia retornada pelo post.
- Mapear título, tutor, cachorro, visualizações ou metadados disponíveis mantendo o layout atual.
- Implementar filtros suportados: `dog`, `breed`, `city`, `state`, `page` e `perPage`.
- Adaptar estados vazios e mensagens para posts.
- Atualizar mocks e testes do feed/modal.

## Critérios De Aceite

- Feed público lista apenas posts públicos retornados pela Dogs API.
- Modal abre detalhes de um post usando o contrato novo.
- Paginação/filtros ficam preparados para evolução sem quebrar o layout atual.
- Testes de feed e item do feed refletem posts em vez de fotos antigas.
