# Ordem Recomendada Das Issues

Todas as issues `priority-high` planejadas foram concluídas localmente. A fila atual começa em `priority-medium`, priorizando primeiro completar produto, depois modernizar arquitetura e por fim fechar qualidade/portfólio.

## Status Atual

Concluídas localmente:

- `01` Corrigir imports e bugs que quebram chamadas da API.
- `02` Corrigir validação dos formulários.
- `03` Padronizar rotas para React Router v6.
- `04` Renderizar feed com dados reais da API.
- `08` Modernizar dependências e tooling.
- `13` Migrar projeto para TypeScript.
- `16` Criar plano de saúde e contingência para API externa.
- `21` Criar API client e configuração por ambiente.
- `10` Adicionar CI/CD com GitHub Actions e GitHub Pages.
- `06` Completar fluxo de recuperação de senha.
- `24` Adicionar modo demo/mock para reduzir dependência da API externa.
- `05` Implementar modal de detalhes da foto.
- `07` Implementar tela de estatísticas do usuário.
- `22` Adicionar Error Boundary e feedback global.
- `12` Polir UI, responsividade e acessibilidade.
- `23` Planejar API própria para substituir API externa.
- `20` Organizar arquitetura de pastas e aliases.
- `18` Migrar estado global de Context API para Zustand.
- `19` Padronizar formulários com React Hook Form e Zod.
- `09` Adicionar cobertura inicial de testes.

Pendentes:

- Arquitetura/back-end: `14`, `17`.
- Qualidade/portfólio: `15`, `11`.

## Próxima Issue Recomendada

```txt
14 - Escolher e migrar para CSS-in-JS
```

Motivo: Zustand e formulários já foram padronizados. A próxima decisão arquitetural é escolher se a camada visual continua em CSS Modules ou migra para CSS-in-JS.

## Priority Medium

1. [ ] `14` Escolher e migrar para CSS-in-JS.
2. [ ] `17` Adicionar themes de cores e tokens de design.
3. [ ] `15` Adicionar scripts de qualidade com Husky e lint-staged.
4. [ ] `11` Melhorar README para portfólio.

## Ordem Funcional Recomendada

Arquitetura:

1. `14` CSS-in-JS.
2. `17` Themes e tokens.

Qualidade:

1. `15` Husky e lint-staged.
2. `11` README final de portfólio.

## Critério Para Reordenar

Reordene a fila se uma issue desbloquear claramente outra. Exemplos:

- Se o modal exigir uma reorganização pesada, considerar `20` antes de continuar produto.
- Se a esteira precisar de deploy externo alem de GitHub Pages, criar uma nova issue especifica de CD.

## Histórico

As issues concluídas foram removidas de `docs/github-issues/`, mas permanecem documentadas em `docs/PROJECT_STATUS.md`.
