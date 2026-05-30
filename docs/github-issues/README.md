# Backlog Para GitHub Issues

Este diretorio contem issues prontas para publicar no GitHub.

Algumas melhorias ja foram executadas localmente antes da publicacao das issues. Consulte `docs/PROJECT_STATUS.md` e `docs/github-issues/PRIORITY.md` antes de criar ou executar novas issues.

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

## Status Local

Concluidas ou majoritariamente cobertas localmente:

- `01` Corrigir imports e bugs que quebram chamadas da API.
- `03` Padronizar rotas para React Router v6.
- `08` Modernizar dependencias e tooling.

Parcialmente cobertas localmente:

- `02` Validacao dos formularios: typo e guardas basicas corrigidos, mas ainda falta padronizacao futura com React Hook Form/Zod.
- `04` Feed com dados reais: feed basico renderiza fotos da API, mas ainda falta acabamento de UX/modal/paginacao conforme evolucao do produto.
