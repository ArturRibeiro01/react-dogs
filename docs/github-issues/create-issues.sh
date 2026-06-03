#!/usr/bin/env bash
set -euo pipefail

ensure_label() {
  local name="$1"
  local color="$2"
  local description="$3"

  if ! gh label list --limit 200 --json name --jq '.[].name' | grep -qx "$name"; then
    gh label create "$name" --color "$color" --description "$description"
  fi
}

ensure_label "bug" "d73a4a" "Algo que esta quebrando ou produzindo comportamento incorreto"
ensure_label "feature" "0e8a16" "Nova funcionalidade ou complemento de produto"
ensure_label "tech-debt" "5319e7" "Melhoria tecnica ou modernizacao interna"
ensure_label "testing" "1d76db" "Testes automatizados e qualidade"
ensure_label "ci" "0052cc" "Integracao continua e automacao"
ensure_label "documentation" "0075ca" "Documentacao do projeto"
ensure_label "ux" "fbca04" "Experiencia, acessibilidade e interface"
ensure_label "priority-high" "b60205" "Alta prioridade"
ensure_label "priority-medium" "fbca04" "Media prioridade"
ensure_label "priority-low" "cfd3d7" "Baixa prioridade"

create_issue() {
  local title="$1"
  local body_file="$2"
  shift 2

  local args=(issue create --title "$title" --body-file "$body_file")
  for label in "$@"; do
    args+=(--label "$label")
  done

  gh "${args[@]}"
}

create_issue \
  "Padronizar formularios com React Hook Form e Zod" \
  "docs/github-issues/19-standardize-forms-with-react-hook-form-zod.md" \
  "tech-debt" \
  "feature" \
  "priority-medium"

create_issue \
  "Escolher e migrar para CSS-in-JS" \
  "docs/github-issues/14-choose-and-migrate-css-in-js.md" \
  "tech-debt" \
  "ux" \
  "priority-medium"

create_issue \
  "Adicionar themes de cores e tokens de design" \
  "docs/github-issues/17-add-color-themes-and-design-tokens.md" \
  "feature" \
  "ux" \
  "priority-medium"

create_issue \
  "Adicionar cobertura inicial de testes" \
  "docs/github-issues/09-add-tests.md" \
  "testing" \
  "priority-medium"

create_issue \
  "Adicionar scripts de qualidade com Husky e lint-staged" \
  "docs/github-issues/15-add-quality-scripts-husky-lint-staged.md" \
  "tech-debt" \
  "priority-medium"

create_issue \
  "Melhorar README para portfolio" \
  "docs/github-issues/11-improve-readme-portfolio.md" \
  "documentation" \
  "priority-medium"
