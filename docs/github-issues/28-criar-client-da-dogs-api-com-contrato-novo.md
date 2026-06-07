# Criar client da Dogs API com contrato novo

## Contexto

A API antiga usa endpoints e formatos diferentes da nova `dogs-api`. A nova API retorna itens em `{ "data": {} }`, listas em `{ "data": [], "pagination": {} }` e erros em `{ "error": { ... } }`.

## Objetivo

Criar/adaptar o client HTTP do frontend para consumir a Dogs API com tipagem, URL própria e autenticação via Bearer token do Supabase.

## Tarefas

- Introduzir `VITE_DOGS_API_URL`, com fallback local para `http://localhost:3333`.
- Adaptar `apiRequest` para parsear respostas `{ data, pagination }` e erros `{ error }`.
- Enviar `Authorization: Bearer <supabase_access_token>` em chamadas autenticadas.
- Criar APIs tipadas para:
  - `auth/me` e `auth/sync`;
  - `users/me`;
  - `breeds`;
  - `dogs`;
  - `posts`;
  - `media`.
- Manter compatibilidade temporária com mocks quando necessário.
- Atualizar tipos compartilhados para refletir entidades da Dogs API.

## Critérios De Aceite

- Chamadas públicas funcionam sem token.
- Chamadas autenticadas usam o token atual do Supabase.
- Erros da Dogs API aparecem com mensagem amigável no app.
- `VITE_API_URL` deixa de ser a env principal da integração nova.
- O client fica preparado para paginação em listas.
