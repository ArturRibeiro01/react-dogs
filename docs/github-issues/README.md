# Backlog Para GitHub Issues

Este diretório contém apenas issues pendentes. As issues já concluídas localmente foram removidas para manter o backlog menor e mais fácil de executar.

Para histórico do que já foi feito, consulte:

```txt
docs/PROJECT_STATUS.md
docs/github-issues/PRIORITY.md
```

## Issues Concluídas E Removidas

- `01` Corrigir imports e bugs que quebram chamadas da API.
- `02` Corrigir validação dos formulários.
- `03` Padronizar rotas para React Router v6.
- `04` Renderizar feed com dados reais da API.
- `08` Modernizar dependências e tooling.
- `13` Migrar projeto para TypeScript.
- `16` Criar plano de saúde e contingência para API externa.
- `21` Criar API client e configuração por ambiente.

## Issues Pendentes

Produto:

- `05` Implementar modal de detalhes da foto.
- `06` Completar fluxo de recuperação de senha.
- `07` Implementar tela de estatísticas do usuário.
- `22` Adicionar Error Boundary e feedback global.
- `12` Polir UI, responsividade e acessibilidade.

Arquitetura:

- `20` Organizar arquitetura de pastas e aliases.
- `18` Migrar estado global de Context API para Zustand.
- `19` Padronizar formulários com React Hook Form e Zod.
- `14` Escolher e migrar para CSS-in-JS.
- `17` Adicionar themes de cores e tokens de design.

Qualidade e portfólio:

- `09` Adicionar cobertura inicial de testes.
- `15` Adicionar scripts de qualidade com Husky e lint-staged.
- `10` Adicionar CI com GitHub Actions.
- `11` Melhorar README para portfólio.

## Próxima Issue Recomendada

```txt
05 - Implementar modal de detalhes da foto
```

Motivo: o feed com dados reais já está pronto. O modal completa o fluxo principal de exploração das fotos.

## Como Publicar No GitHub

O projeto tem remote configurado para:

```txt
https://github.com/ArturRibeiro01/react-dogs.git
```

Com GitHub CLI autenticado, rode:

```bash
bash docs/github-issues/create-issues.sh
```

Também dá para criar uma issue individualmente:

```bash
gh issue create --title "Implementar modal de detalhes da foto" --body-file docs/github-issues/05-implement-photo-modal.md --label feature --label priority-medium
```

## Labels Usadas

Tipo:

- `bug`
- `feature`
- `tech-debt`
- `testing`
- `ci`
- `documentation`
- `ux`

Prioridade:

- `priority-high`
- `priority-medium`
- `priority-low`

## Ordem De Trabalho

A ordem completa está em:

```txt
docs/github-issues/PRIORITY.md
```

Resumo:

1. Completar produto: modal, senha, estatísticas, feedback global e acessibilidade.
2. Modernizar base técnica: arquitetura, Zustand, formulários, CSS-in-JS e themes.
3. Fechar qualidade/portfólio: testes, Husky/lint-staged, CI e README.

## Observações

- O script `create-issues.sh` deve referenciar apenas arquivos existentes neste diretório.
- Quando uma issue for concluída, ela pode ser removida deste diretório e registrada no histórico do `PROJECT_STATUS.md`.
- Antes de iniciar uma issue, confira se ela ainda faz sentido com o estado atual do código.
