# Configurar Supabase Auth no frontend

## Contexto

A nova `dogs-api` usa Supabase Auth como provedor de identidade. O frontend deve autenticar diretamente no Supabase e enviar o `access_token` para a Dogs API no header `Authorization`.

## Objetivo

Trocar o fluxo de autenticação atual baseado nos endpoints JWT da API antiga por Supabase Auth no frontend.

## Tarefas

- Instalar e configurar `@supabase/supabase-js`.
- Adicionar suporte a `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
- Criar um client Supabase centralizado para o app.
- Migrar login, logout, cadastro, recuperação de senha, reset de senha e listener de sessão para Supabase Auth.
- Remover a dependência dos endpoints antigos `/jwt-auth/v1/token` e `/jwt-auth/v1/token/validate`.
- Preservar modo demo/mock quando `VITE_DEMO_MODE=true`.

## Critérios De Aceite

- Usuário consegue entrar, sair e manter sessão via Supabase Auth.
- O estado global de autenticação reflete a sessão Supabase.
- Nenhuma service role key é usada ou documentada no frontend.
- Fluxos de auth existentes continuam com feedback de erro e loading.
- Testes relevantes de auth continuam passando ou são atualizados.
