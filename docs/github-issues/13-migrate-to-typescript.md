## Contexto

O projeto foi escrito em JavaScript durante uma fase inicial de aprendizado. Migrar para TypeScript ajuda a demonstrar maturidade tecnica, melhora manutencao e reduz regressao durante a modernizacao.

## Objetivo

Migrar o app React para TypeScript de forma incremental.

## Escopo

- Adicionar TypeScript e tipos necessarios.
- Renomear arquivos de componentes para `.tsx`.
- Renomear hooks e helpers sem JSX para `.ts` quando aplicavel.
- Tipar respostas da API, usuario, fotos e contexto de autenticacao.
- Tipar props de componentes compartilhados.
- Configurar `tsconfig.json` com regras consistentes.
- Corrigir erros de tipo sem mudar comportamento desnecessariamente.

## Criterios De Aceite

- O projeto compila com TypeScript.
- `UserContext`, `api`, hooks e componentes principais possuem tipos explicitos.
- Nao ha uso de `any` sem justificativa.
- Build passa apos a migracao.

