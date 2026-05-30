# Ordem Recomendada Das Issues

Esta ordem prioriza primeiro fazer o app funcionar, depois reduzir risco tecnico, depois modernizar arquitetura e, por fim, polir portfolio.

## Status Atual

Ja cobertas localmente:

- `01` Corrigir imports e bugs que quebram chamadas da API
- `03` Padronizar rotas para React Router v6
- `08` Modernizar dependencias e tooling

Parcialmente cobertas localmente:

- `02` Corrigir validacao dos formularios
- `04` Renderizar feed com dados reais da API

Se as issues forem publicadas no GitHub depois dessas mudancas, vale criar as concluidas ja com uma nota de fechamento ou simplesmente omiti-las do script de criacao.

## Fase 1 - Estabilizar O App

1. `16` Criar plano de saude e contingencia para API externa
2. `21` Criar API client e configuracao por ambiente
3. `02` Finalizar validacao dos formularios
4. `04` Evoluir feed com estados e acabamento

## Fase 2 - Completar Produto

5. `05` Implementar modal de detalhes da foto
6. `06` Completar fluxo de recuperacao de senha
7. `07` Implementar tela de estatisticas do usuario
8. `22` Adicionar Error Boundary e feedback global
9. `12` Polir UI, responsividade e acessibilidade

## Fase 3 - Modernizar Base Tecnica

10. `13` Migrar projeto para TypeScript
11. `20` Organizar arquitetura de pastas e aliases
12. `18` Migrar estado global de Context API para Zustand
13. `19` Padronizar formularios com React Hook Form e Zod
14. `14` Escolher e migrar para CSS-in-JS
15. `17` Adicionar themes de cores e tokens de design

## Fase 4 - Qualidade E Portfolio

16. `09` Adicionar cobertura inicial de testes
17. `15` Adicionar scripts de qualidade com Husky e lint-staged
18. `10` Adicionar CI com GitHub Actions
19. `11` Melhorar README para portfolio

## Historico Ja Executado

- `01` Corrigir imports e bugs que quebram chamadas da API
- `03` Padronizar rotas para React Router v6
- `08` Modernizar dependencias e tooling
