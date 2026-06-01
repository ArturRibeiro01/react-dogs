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

Pendentes:

- Produto: `05`, `07`, `22`, `12`.
- Arquitetura/back-end: `23`, `20`, `18`, `19`, `14`, `17`.
- Qualidade/portfólio: `09`, `15`, `11`.

## Próxima Issue Recomendada

```txt
05 - Implementar modal de detalhes da foto
```

Motivo: o feed já está funcional com dados reais. O modal é o próximo passo natural para completar a experiência principal de navegação por fotos.

## Priority Medium

1. [ ] `05` Implementar modal de detalhes da foto.
2. [ ] `07` Implementar tela de estatísticas do usuário.
3. [ ] `23` Planejar API própria para substituir API externa.
4. [ ] `22` Adicionar Error Boundary e feedback global.
5. [ ] `20` Organizar arquitetura de pastas e aliases.
6. [ ] `18` Migrar estado global de Context API para Zustand.
7. [ ] `19` Padronizar formulários com React Hook Form e Zod.
8. [ ] `14` Escolher e migrar para CSS-in-JS.
9. [ ] `17` Adicionar themes de cores e tokens de design.
10. [ ] `09` Adicionar cobertura inicial de testes.
11. [ ] `15` Adicionar scripts de qualidade com Husky e lint-staged.
12. [ ] `11` Melhorar README para portfólio.

## Priority Low

1. [ ] `12` Polir UI, responsividade e acessibilidade.

## Ordem Funcional Recomendada

Produto:

1. `05` Modal de detalhes da foto.
2. `07` Estatísticas do usuário.
3. `22` Error Boundary e feedback global.
4. `12` Polimento de UI, responsividade e acessibilidade.

Arquitetura:

1. `23` Planejamento de API propria.
2. `20` Organização de pastas e aliases.
3. `18` Zustand.
4. `19` React Hook Form e Zod.
5. `14` CSS-in-JS.
6. `17` Themes e tokens.

Qualidade:

1. `09` Testes.
2. `15` Husky e lint-staged.
3. `11` README final de portfólio.

## Critério Para Reordenar

Reordene a fila se uma issue desbloquear claramente outra. Exemplos:

- Se o modal exigir uma reorganização pesada, considerar `20` antes de continuar produto.
- Se a esteira precisar de deploy externo alem de GitHub Pages, criar uma nova issue especifica de CD.

## Histórico

As issues concluídas foram removidas de `docs/github-issues/`, mas permanecem documentadas em `docs/PROJECT_STATUS.md`.
