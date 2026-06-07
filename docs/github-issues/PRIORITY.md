# Ordem Recomendada Das Issues

Fila atual para integrar o frontend `react-dogs` com a nova `dogs-api`.

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
- `27` Configurar Supabase Auth no frontend.
- `05` Implementar modal de detalhes da foto.
- `07` Implementar tela de estatísticas do usuário.
- `22` Adicionar Error Boundary e feedback global.
- `12` Polir UI, responsividade e acessibilidade.
- `23` Planejar API própria para substituir API externa.
- `20` Organizar arquitetura de pastas e aliases.
- `18` Migrar estado global de Context API para Zustand.
- `19` Padronizar formulários com React Hook Form e Zod.
- `09` Adicionar cobertura inicial de testes.
- `14` Escolher e migrar para CSS-in-JS.
- `17` Adicionar themes de cores e tokens de design.
- `25` Migrar CSS Modules restantes para Emotion.
- `26` Ampliar cobertura de testes unitários e integração.
- `15` Adicionar scripts de qualidade com Husky e lint-staged.
- `11` Melhorar README para portfólio.

Pendentes:

- `28` Criar client da Dogs API com contrato novo.
- `29` Migrar perfil do usuário para Dogs API.
- `30` Integrar catálogo de raças e CRUD de cachorros.
- `31` Migrar feed público e modal para posts.
- `32` Migrar publicação com upload multipart.
- `33` Ajustar ambientes, CI/CD e documentação da integração.

## Próxima Issue Recomendada

```txt
28 Criar client da Dogs API com contrato novo
```

Motivo: a autenticação via Supabase já foi implementada. O próximo passo é trocar o client HTTP para o contrato da Dogs API e usar o `access_token` nas chamadas autenticadas.

## Priority High

- `28` Criar client da Dogs API com contrato novo.
- `29` Migrar perfil do usuário para Dogs API.
- `33` Ajustar ambientes, CI/CD e documentação da integração.

## Priority Medium

- `30` Integrar catálogo de raças e CRUD de cachorros.
- `31` Migrar feed público e modal para posts.
- `32` Migrar publicação com upload multipart.

## Ordem Funcional Recomendada

1. `28` Criar client da Dogs API com contrato novo.
2. `29` Migrar perfil do usuário para Dogs API.
3. `30` Integrar catálogo de raças e CRUD de cachorros.
4. `31` Migrar feed público e modal para posts.
5. `32` Migrar publicação com upload multipart.
6. `33` Ajustar ambientes, CI/CD e documentação da integração.

## Critério Para Reordenar

Reordene a fila se uma issue desbloquear claramente outra. Exemplos:

- Se `33` bloquear validação em ambiente publicado, antecipar antes dos fluxos de produto.
- Se o backend adicionar endpoint de estatísticas, criar uma nova issue específica para substituir `/api/stats`.
- Se o fluxo de publicação exigir nova tela de gestão de cachorros, dividir `30` antes de iniciar `32`.

## Histórico

As issues concluídas foram removidas de `docs/github-issues/`, mas permanecem documentadas em `docs/PROJECT_STATUS.md`.
