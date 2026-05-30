## Contexto

O app tem alguns bugs simples que impedem fluxos centrais de funcionar corretamente: imports usando `Api` com maiuscula enquanto o arquivo real e `src/api.js`, header `Authorization` sem espaco depois de `Bearer`, URL de fotos com espaco inicial e parse de JSON sem `await` no hook de fetch.

## Objetivo

Corrigir os problemas de runtime mais provaveis antes de qualquer modernizacao maior.

## Escopo

- Ajustar imports de `../../Api` e `./Api` para o caminho real correto.
- Corrigir `Authorization: 'Bearer ' + token` em todos os endpoints autenticados.
- Remover espaco inicial da URL em `PHOTOS_GET`.
- Corrigir `json = await response.json()` em `useFetch`.
- Remover `console.log` de usuario em `UserContext`.

## Criterios De Aceite

- O app compila sem erro de import em ambiente case-sensitive.
- Login, validacao de token e chamadas autenticadas enviam header correto.
- `PHOTOS_GET` monta uma URL valida.
- `useFetch` retorna o JSON resolvido, nao uma Promise.

