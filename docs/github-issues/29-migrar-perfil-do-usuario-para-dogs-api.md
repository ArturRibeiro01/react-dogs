# Migrar perfil do usuário para Dogs API

## Contexto

Depois do login pelo Supabase, a Dogs API cria ou sincroniza um perfil local de usuário. O frontend deve guardar esse perfil local no estado do app.

## Objetivo

Migrar o fluxo de usuário atual para os endpoints `/v1/auth/sync`, `/v1/auth/me`, `/v1/users/me` e `PATCH /v1/users/me`.

## Tarefas

- Após login ou restauração de sessão Supabase, chamar `POST /v1/auth/sync` ou `GET /v1/auth/me`.
- Guardar o perfil local retornado pela Dogs API no Zustand.
- Trocar o carregamento de usuário atual por `GET /v1/users/me`.
- Implementar atualização do perfil do tutor com `PATCH /v1/users/me`, quando houver tela/campo disponível.
- Ajustar tipos, mocks e testes ligados ao usuário autenticado.

## Critérios De Aceite

- Sessão Supabase válida carrega perfil local da Dogs API.
- Logout limpa sessão Supabase, token derivado e perfil local.
- Rotas protegidas continuam funcionando.
- Falha de sincronização mostra feedback claro e não deixa estado inconsistente.
