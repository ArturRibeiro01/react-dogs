# Backlog Para GitHub Issues

Este diretorio contem issues pendentes prontas para publicar no GitHub.

Issues ja concluidas localmente foram removidas deste diretorio. Consulte `docs/PROJECT_STATUS.md` e `docs/github-issues/PRIORITY.md` para o historico e a proxima ordem de trabalho.

## Como publicar

O projeto ja tem remote configurado para:

`https://github.com/ArturRibeiro01/react-dogs.git`

Com GitHub CLI autenticado, rode:

```bash
bash docs/github-issues/create-issues.sh
```

Tambem da para criar uma por uma:

```bash
gh issue create --title "Implementar modal de detalhes da foto" --body-file docs/github-issues/05-implement-photo-modal.md --label feature --label priority-medium
```

## Ordem Sugerida

A ordem completa esta em `docs/github-issues/PRIORITY.md`.

Resumo:

1. Completar produto: modal, senha, estatisticas, feedback global e acessibilidade.
2. Modernizar base tecnica: arquitetura, Zustand, formularios, CSS-in-JS e themes.
3. Fechar qualidade/portfolio: testes, Husky/lint-staged, CI e README.

## Status Local

Issues concluidas removidas deste diretorio:

- `01` Corrigir imports e bugs que quebram chamadas da API.
- `02` Validacao dos formularios.
- `03` Padronizar rotas para React Router v6.
- `04` Feed com dados reais.
- `08` Modernizar dependencias e tooling.
- `13` Migracao para TypeScript.
- `16` Saude e contingencia da API.
- `21` Criar API client e configuracao por ambiente.

Parcialmente cobertas localmente:

- Nenhuma no momento.
