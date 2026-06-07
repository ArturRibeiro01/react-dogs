# Ajustar ambientes, CI/CD e documentação da integração

## Contexto

Quando a `dogs-api` tiver ambientes de homologação e produção, o frontend precisa buildar cada branch com a URL correta da API e as envs públicas do Supabase.

## Objetivo

Atualizar configuração, documentação e esteira para suportar Dogs API em dev/hml e produção.

## Tarefas

- Atualizar `.env.example` com:
  - `VITE_DOGS_API_URL`;
  - `VITE_SUPABASE_URL`;
  - `VITE_SUPABASE_ANON_KEY`;
  - `VITE_DEMO_MODE`.
- Atualizar README, `docs/DEPLOYMENT.md` e guias relacionados.
- Ajustar GitHub Actions para injetar envs diferentes no build de `develop` e `main`.
- Definir `develop` como ambiente hml/dev do front e `main` como produção.
- Atualizar `scripts/check-api-health.mjs` para a Dogs API.
- Documentar que service role key nunca entra no frontend.

## Critérios De Aceite

- Build local continua funcionando com `.env.local`.
- Build de `develop` usa URL/envs de hml/dev.
- Build de `main` usa URL/envs de produção.
- Documentação explica quais envs configurar no GitHub e no provedor da API.
