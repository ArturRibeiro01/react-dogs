# Backlog Para GitHub Issues

Este diretorio contem issues prontas para publicar no GitHub.

## Como publicar

O projeto ja tem remote configurado para:

`https://github.com/ArturRibeiro01/react-dogs.git`

Com GitHub CLI autenticado, rode:

```bash
bash docs/github-issues/create-issues.sh
```

Tambem da para criar uma por uma:

```bash
gh issue create --title "Corrigir imports e bugs que quebram chamadas da API" --body-file docs/github-issues/01-fix-api-runtime-bugs.md --label bug --label priority-high
```

## Ordem Sugerida

A ordem completa esta em `docs/github-issues/PRIORITY.md`.

Resumo:

1. Estabilizar app, API, validacoes, rotas e feed.
2. Completar produto: modal, senha, estatisticas, feedback global e acessibilidade.
3. Modernizar base tecnica: dependencias, TypeScript, arquitetura, Zustand, formularios, CSS-in-JS e themes.
4. Fechar qualidade/portfolio: testes, Husky/lint-staged, CI e README.
