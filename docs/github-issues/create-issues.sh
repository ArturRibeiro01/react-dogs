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

create_issue_if_missing() {
  local title="$1"
  local body_file="$2"
  shift 2
  local labels=("$@")

  if gh issue list --state all --limit 1000 --json title --jq '.[].title' | grep -Fxq "$title"; then
    echo "Issue ja existe, pulando: $title"
    return
  fi

  local args=(issue create --title "$title" --body-file "$body_file")
  local label

  for label in "${labels[@]}"; do
    args+=(--label "$label")
  done

  gh "${args[@]}"
}

create_issue_if_missing \
  "29 Migrar perfil do usuário para Dogs API" \
  "docs/github-issues/29-migrar-perfil-do-usuario-para-dogs-api.md" \
  feature priority-high

create_issue_if_missing \
  "30 Integrar catálogo de raças e CRUD de cachorros" \
  "docs/github-issues/30-integrar-catalogo-de-racas-e-crud-de-cachorros.md" \
  feature priority-medium

create_issue_if_missing \
  "31 Migrar feed público e modal para posts" \
  "docs/github-issues/31-migrar-feed-publico-e-modal-para-posts.md" \
  feature priority-medium

create_issue_if_missing \
  "32 Migrar publicação com upload multipart" \
  "docs/github-issues/32-migrar-publicacao-com-upload-multipart.md" \
  feature priority-medium

create_issue_if_missing \
  "33 Ajustar ambientes, CI/CD e documentação da integração" \
  "docs/github-issues/33-ajustar-ambientes-ci-cd-e-documentacao-da-integracao.md" \
  ci documentation priority-high

echo "Backlog da integracao Dogs API sincronizado."
