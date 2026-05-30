## Contexto

Status local: concluida em 2026-05-30.

O app tem alguns bugs simples que impedem fluxos centrais de funcionar corretamente: imports usando `Api` com maiuscula enquanto o arquivo real e `src/api.js`, header `Authorization` sem espaco depois de `Bearer`, URL de fotos com espaco inicial e parse de JSON sem `await` no hook de fetch.

## Objetivo

Corrigir os problemas de runtime mais provaveis antes de qualquer modernizacao maior.

## Escopo

- [x] Ajustar imports de `../../Api` e `./Api` para o caminho real correto.
- [x] Corrigir `Authorization: 'Bearer ' + token` em todos os endpoints autenticados.
- [x] Remover espaco inicial da URL em `PHOTOS_GET`.
- [x] Corrigir `json = await response.json()` em `useFetch`.
- [x] Remover `console.log` de usuario em `UserContext`.

## Criterios De Aceite

- [x] O app compila sem erro de import em ambiente case-sensitive.
- [x] Login, validacao de token e chamadas autenticadas enviam header correto.
- [x] `PHOTOS_GET` monta uma URL valida.
- [x] `useFetch` retorna o JSON resolvido, nao uma Promise.
