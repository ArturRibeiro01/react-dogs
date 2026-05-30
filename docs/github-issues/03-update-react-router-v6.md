## Contexto

Status local: concluida em 2026-05-30.

O projeto usa `react-router-dom` `^6.0.0-beta.0`, mas ainda possui padroes antigos ou inconsistentes, como `activeClassName` em `NavLink` e um `ProtectedRoute` que renderiza `<Route>` internamente.

## Objetivo

Padronizar roteamento para API atual do React Router v6.

## Escopo

- [x] Atualizar uso de `NavLink` para `className={({ isActive }) => ...}`.
- [x] Reestruturar `ProtectedRoute` para receber children ou `Outlet`.
- [x] Ajustar rotas aninhadas de `/conta/*` e `/login/*`.
- [x] Conferir paths relativos dentro de `User` e `Login`.
- [x] Remover padroes da versao beta.

## Criterios De Aceite

- [x] Navegacao funciona em home, login, cadastro, conta, postar e estatisticas.
- [x] Links ativos recebem estilo correto.
- [x] Usuario deslogado nao acessa area protegida.
- [x] Usuario logado e redirecionado corretamente.
