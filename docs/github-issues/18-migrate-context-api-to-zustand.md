## Contexto

O projeto usa Context API em `src/UserContext.js` para estado de usuario/autenticacao. Para um app maior e mais moderno, Zustand pode simplificar estado global, reduzir rerenders e deixar actions mais testaveis.

## Objetivo

Migrar estado global de autenticacao/usuario da Context API para Zustand.

## Escopo

- Criar store de autenticacao com Zustand.
- Migrar estados `data`, `login`, `loading` e `error`.
- Migrar actions `userLogin`, `userLogout` e auto login.
- Centralizar persistencia do token.
- Remover `UserStorage` quando nao for mais necessario.
- Ajustar componentes que consomem `UserContext`.
- Adicionar testes para actions principais da store.

## Criterios De Aceite

- Login, logout e auto login continuam funcionando.
- Componentes nao dependem mais de `UserContext`.
- Store tem tipos claros apos a migracao para TypeScript.
- Estado de usuario e token tem comportamento previsivel em refresh.

