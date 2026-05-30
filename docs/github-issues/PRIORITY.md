# Ordem Recomendada Das Issues

Esta ordem prioriza primeiro as issues `priority-high`. Dentro desse grupo, a ordem favorece fazer o app funcionar, reduzir risco tecnico e so depois partir para modernizacoes maiores.

## Status Atual

Ja cobertas localmente:

- `01` Corrigir imports e bugs que quebram chamadas da API
- `02` Corrigir validacao dos formularios
- `03` Padronizar rotas para React Router v6
- `08` Modernizar dependencias e tooling
- `16` Criar plano de saude e contingencia para API externa
- `21` Criar API client e configuracao por ambiente

Parcialmente cobertas localmente:

- Nenhuma `priority-high` de produto neste momento.

Se as issues forem publicadas no GitHub depois dessas mudancas, vale criar as concluidas ja com uma nota de fechamento ou simplesmente omiti-las do script de criacao.

## Priority High

1. [x] `01` Corrigir imports e bugs que quebram chamadas da API
2. [x] `02` Corrigir validacao dos formularios
3. [x] `03` Padronizar rotas para React Router v6
4. [x] `21` Criar API client e configuracao por ambiente
5. [x] `08` Modernizar dependencias e tooling
6. [x] `04` Renderizar feed com dados reais da API
7. [ ] `13` Migrar projeto para TypeScript

## Proxima Issue Recomendada

`13` Migrar projeto para TypeScript.

Motivo: e a ultima issue `priority-high` pendente. As issues high de estabilizacao e produto ja foram cobertas localmente.

## Priority Medium

1. [x] `16` Criar plano de saude e contingencia para API externa
2. [ ] `05` Implementar modal de detalhes da foto
3. [ ] `06` Completar fluxo de recuperacao de senha
4. [ ] `07` Implementar tela de estatisticas do usuario
5. [ ] `22` Adicionar Error Boundary e feedback global
6. [ ] `20` Organizar arquitetura de pastas e aliases
7. [ ] `18` Migrar estado global de Context API para Zustand
8. [ ] `19` Padronizar formularios com React Hook Form e Zod
9. [ ] `14` Escolher e migrar para CSS-in-JS
10. [ ] `17` Adicionar themes de cores e tokens de design
11. [ ] `09` Adicionar cobertura inicial de testes
12. [ ] `15` Adicionar scripts de qualidade com Husky e lint-staged
13. [ ] `10` Adicionar CI com GitHub Actions
14. [ ] `11` Melhorar README para portfolio

## Priority Low

1. [ ] `12` Polir UI, responsividade e acessibilidade

## Ordem Funcional Apos Priority High

Depois das issues `priority-high`, a ordem funcional recomendada continua sendo:

1. Completar produto: modal, senha, estatisticas, feedback global e acessibilidade.
2. Modernizar base tecnica: arquitetura, Zustand, formularios, CSS-in-JS e themes.
3. Fechar qualidade/portfolio: testes, Husky/lint-staged, CI e README.

## Historico Ja Executado

- `01` Corrigir imports e bugs que quebram chamadas da API
- `02` Corrigir validacao dos formularios
- `03` Padronizar rotas para React Router v6
- `04` Renderizar feed com dados reais da API
- `08` Modernizar dependencias e tooling
- `16` Criar plano de saude e contingencia para API externa
- `21` Criar API client e configuracao por ambiente
