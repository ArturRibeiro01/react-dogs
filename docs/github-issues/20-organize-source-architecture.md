## Contexto

A estrutura atual separa arquivos por tipo geral (`Components`, `Hooks`, `Assets`), o que e comum em projetos de aprendizado. Conforme o app cresce, uma organizacao por dominio/feature tende a deixar manutencao, testes e ownership mais claros.

## Objetivo

Reorganizar a arquitetura de pastas e imports para uma estrutura mais escalavel.

## Escopo

- Avaliar uma estrutura por dominio, por exemplo `features/auth`, `features/feed`, `features/user`, `shared/ui`, `shared/hooks`, `shared/api`.
- Definir convencao de nomes para arquivos e componentes.
- Configurar aliases de import, como `@/shared`, `@/features`, `@/assets`.
- Mover componentes compartilhados para uma area comum.
- Evitar ciclos de dependencia.
- Documentar a nova estrutura no README ou em `docs/architecture.md`.

## Criterios De Aceite

- Imports relativos longos sao reduzidos.
- Componentes de dominio ficam agrupados por feature.
- Componentes compartilhados ficam separados de componentes especificos.
- A estrutura nova esta documentada.

