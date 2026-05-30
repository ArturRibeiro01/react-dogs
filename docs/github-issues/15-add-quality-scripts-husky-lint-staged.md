## Contexto

O projeto ainda nao tem uma esteira local de qualidade. Para portfolio senior, vale ter scripts previsiveis e hooks locais impedindo commits quebrados.

## Objetivo

Adicionar scripts de qualidade com Husky, lint-staged e ferramentas modernas equivalentes quando fizer sentido.

## Escopo

- Definir scripts: `lint`, `format`, `typecheck`, `test`, `build` e `validate`.
- Configurar ESLint para React + TypeScript.
- Configurar Prettier.
- Configurar Husky com pre-commit.
- Configurar lint-staged para rodar checks apenas nos arquivos alterados.
- Avaliar Commitlint/Conventional Commits para padronizar historico.

## Criterios De Aceite

- `npm run validate` executa verificacoes principais.
- Pre-commit roda lint/format/typecheck conforme estrategia definida.
- Commits com erro de lint ou formatacao sao bloqueados localmente.
- README documenta os scripts.

