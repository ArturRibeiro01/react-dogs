# Integrar catálogo de raças e CRUD de cachorros

## Contexto

A Dogs API separa cachorros de posts. O frontend atual trata o cadastro de foto como cadastro de cachorro/foto da API antiga, então o fluxo precisa ser adaptado gradualmente.

## Objetivo

Consumir o catálogo de raças e migrar criação/listagem/edição de cachorros para `/v1/dogs`.

## Tarefas

- Consumir `GET /v1/breeds` para selects e filtros.
- Usar `breed.id` ao criar ou editar cachorro.
- Usar `breed.slug` em filtros públicos quando aplicável.
- Adaptar criação de cachorro para `POST /v1/dogs`.
- Adaptar edição e remoção para `PATCH /v1/dogs/:dogId` e `DELETE /v1/dogs/:dogId`.
- Adaptar listagem pública para `GET /v1/dogs` com filtros `breed`, `city`, `state`, `interest`, `page` e `perPage`.
- Respeitar regras de permissão: owner/editor edita; apenas owner remove.

## Critérios De Aceite

- Raças carregam da Dogs API.
- Cachorros públicos aparecem usando o contrato novo.
- Usuário autenticado consegue criar cachorro e vira owner.
- Estados de loading, erro e vazio seguem o padrão visual atual.
