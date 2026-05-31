## Contexto

`LoginPasswordLost.tsx` e `LoginPasswordReset.tsx` estao vazios. As rotas existem, mas a funcionalidade nao foi implementada.

## Objetivo

Implementar recuperacao e redefinicao de senha.

## Escopo

- Adicionar endpoints necessarios em `src/api.ts`.
- Criar formulario para pedir recuperacao de senha.
- Criar formulario para redefinir senha com token/key da URL.
- Exibir loading, sucesso e erro.
- Revisar texto e navegacao do fluxo.

## Criterios De Aceite

- `/login/perdeu` permite solicitar recuperacao.
- `/login/resetar` permite redefinir senha quando a URL tem dados validos.
- Erros da API aparecem para o usuario.
