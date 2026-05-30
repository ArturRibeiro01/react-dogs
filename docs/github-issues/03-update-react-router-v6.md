## Contexto

O projeto usa `react-router-dom` `^6.0.0-beta.0`, mas ainda possui padroes antigos ou inconsistentes, como `activeClassName` em `NavLink` e um `ProtectedRoute` que renderiza `<Route>` internamente.

## Objetivo

Padronizar roteamento para API atual do React Router v6.

## Escopo

- Atualizar uso de `NavLink` para `className={({ isActive }) => ...}`.
- Reestruturar `ProtectedRoute` para receber children ou `Outlet`.
- Ajustar rotas aninhadas de `/conta/*` e `/login/*`.
- Conferir paths relativos dentro de `User` e `Login`.
- Remover padroes da versao beta.

## Criterios De Aceite

- Navegacao funciona em home, login, cadastro, conta, postar e estatisticas.
- Links ativos recebem estilo correto.
- Usuario deslogado nao acessa area protegida.
- Usuario logado e redirecionado corretamente.

