# Backlog Para GitHub Issues

Este diretório contém apenas issues pendentes. As issues já concluídas localmente foram removidas para manter o backlog menor e mais fácil de executar.

A fila atual é focada na integração do frontend `react-dogs` com a nova `dogs-api`, conforme o handoff em:

```txt
docs/FRONTEND_INTEGRATION_HANDOFF.md
```

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
- `10` Adicionar CI/CD com GitHub Actions e GitHub Pages.
- `06` Completar fluxo de recuperação de senha.
- `24` Adicionar modo demo/mock para reduzir dependência da API externa.
- `27` Configurar Supabase Auth no frontend.
- `28` Criar client da Dogs API com contrato novo.
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

## Issues Pendentes

- `29` Migrar perfil do usuário para Dogs API.
- `30` Integrar catálogo de raças e CRUD de cachorros.
- `31` Migrar feed público e modal para posts.
- `32` Migrar publicação com upload multipart.
- `33` Ajustar ambientes, CI/CD e documentação da integração.

## Próxima Issue Recomendada

```txt
29 Migrar perfil do usuário para Dogs API
```

Motivo: o client HTTP da Dogs API já existe. O próximo passo é sincronizar/carregar o perfil local do usuário autenticado via `/v1/auth/sync`, `/v1/auth/me` e `/v1/users/me`.

## Como Publicar No GitHub

O projeto tem remote configurado para:

```txt
https://github.com/ArturRibeiro01/react-dogs.git
```

Com GitHub CLI autenticado, rode:

```bash
bash docs/github-issues/create-issues.sh
```

Também dá para criar issues individualmente com `gh issue create` usando um arquivo markdown como corpo.

O script é idempotente: ele consulta issues abertas e fechadas por título exato e pula qualquer card que já exista.

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

Comece pelo perfil local, depois cachorros, posts/feed, upload e, por fim, envs/CI/docs.

## Ambientes Da Nova API

Quando a `dogs-api` tiver ambientes publicados:

- `develop` do front deve apontar para hml/dev da API e publicar em `/react-dogs/dev/`.
- `main` do front deve apontar para produção da API e publicar em `/react-dogs/`.
- O build do front deve receber `VITE_DOGS_API_URL`, `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` por ambiente.
- Nunca use service role key do Supabase no frontend.

## Observações

- O script `create-issues.sh` deve referenciar apenas arquivos existentes neste diretório.
- Quando uma issue for concluída, ela pode ser removida deste diretório e registrada no histórico do `PROJECT_STATUS.md`.
- Antes de iniciar uma issue, confira se ela ainda faz sentido com o estado atual do código.
