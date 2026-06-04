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

echo "Labels sincronizadas. Nao ha issues pendentes para criar neste diretorio."
