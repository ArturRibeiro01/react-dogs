## Contexto

Status local: concluida em 2026-05-31.

O projeto foi escrito em JavaScript durante uma fase inicial de aprendizado. Migrar para TypeScript ajuda a demonstrar maturidade tecnica, melhora manutencao e reduz regressao durante a modernizacao.

## Objetivo

Migrar o app React para TypeScript de forma incremental.

## Escopo

- [x] Adicionar TypeScript e tipos necessarios.
- [x] Renomear arquivos de componentes para `.tsx`.
- [x] Renomear hooks e helpers sem JSX para `.ts` quando aplicavel.
- [x] Tipar respostas da API, usuario, fotos e contexto de autenticacao.
- [x] Tipar props de componentes compartilhados.
- [x] Configurar `tsconfig.json` com regras consistentes.
- [x] Corrigir erros de tipo sem mudar comportamento desnecessariamente.

## Criterios De Aceite

- [x] O projeto compila com TypeScript.
- [x] `UserContext`, `api`, hooks e componentes principais possuem tipos explicitos.
- [x] Nao ha uso de `any` sem justificativa.
- [x] Build passa apos a migracao.
