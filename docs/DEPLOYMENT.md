# Deployment

Este projeto usa GitHub Actions para CI/CD e GitHub Pages para publicação.

## Ambientes

```txt
prod: https://arturribeiro01.github.io/react-dogs/
dev:  https://arturribeiro01.github.io/react-dogs/dev/
```

Mapeamento:

- `develop` publica o ambiente de dev em `/react-dogs/dev/`.
- `main` publica produção em `/react-dogs/`.

Enquanto `main` ainda não existir no remote, o workflow usa `master` como fallback para montar a raiz de produção. O objetivo final continua sendo `main = prod`.

## Workflow

Arquivo:

```txt
.github/workflows/ci.yml
```

Eventos:

- `pull_request` para `develop` e `main`
- `push` para `develop` e `main`
- `workflow_dispatch`

Jobs:

- `ci`: instala dependências, roda typecheck, testes automatizados e build.
- `deploy-pages`: em push para `develop` ou `main`, monta o artifact do GitHub Pages e publica.

## Como O Deploy Mantém Dois Ambientes

GitHub Pages publica um único site por repositório. Para manter dev e produção em links diferentes, o workflow monta um artifact único com duas saídas:

```txt
site/
  index.html        # produção
  assets/
  dev/
    index.html      # dev
    assets/
```

Quando o push acontece em `main`:

- a branch atual é buildada com base `/react-dogs/`
- a branch `develop` é buildada com base `/react-dogs/dev/`

Quando o push acontece em `develop`:

- a branch atual é buildada com base `/react-dogs/dev/`
- a branch `main` é buildada com base `/react-dogs/`
- se `main` ainda não existir, `master` é usada como fallback para a raiz

Assim, cada publicação mantém os dois caminhos no mesmo site do Pages.

## Configuração Necessária No GitHub

No repositório:

1. Abra `Settings`.
2. Entre em `Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions` como source.
4. Garanta que Actions estejam habilitadas em `Settings > Actions`.

No environment `github-pages`:

1. Abra `Settings`.
2. Entre em `Environments`.
3. Abra `github-pages`.
4. Em `Deployment branches and tags`, permita as branches que podem publicar.
5. Para este fluxo, permita `develop` e `main`.

Se `main` ainda não existir e `master` for usada temporariamente como produção, permita também `master`. Quando `main` virar a branch de produção definitiva, remova `master` dessa regra.

No repositório, em `Settings > Secrets and variables > Actions > Variables`, configure as repository variables usadas pelo build do Vite:

```txt
VITE_API_URL=https://dogsapi.origamid.dev/json
VITE_DOGS_API_URL=http://localhost:3333
VITE_SUPABASE_URL=https://xvmhejphdmvanbqpdrxf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
VITE_DEMO_MODE=false
```

`VITE_SUPABASE_ANON_KEY` é pública no bundle do frontend. Não configure service role key no GitHub Actions do frontend.

## Proteção De Branches

Fluxo esperado:

```txt
feature/* -> develop -> main
```

Regras recomendadas para `develop`:

- bloquear deleção da branch
- bloquear force push
- exigir Pull Request antes de mergear
- exigir o check `Typecheck, test and build` passando antes do merge

Regras recomendadas para `main`:

- bloquear deleção da branch
- bloquear force push
- exigir Pull Request antes de mergear
- exigir o check `Typecheck, test and build` passando antes do merge

O workflow também valida a origem de PRs para produção: se um Pull Request tiver destino `main`, ele só passa no CI quando a branch de origem for `develop`.

Na prática:

- branches de feature entram em `develop` via PR
- `develop` entra em `main` via PR
- push direto para `develop` ou `main` deve ser bloqueado pelas regras do GitHub
- PR direto de feature para `main` falha no CI

## Vite Base E React Router

O deploy usa `vite build --base` para gerar assets com o subpath correto:

```bash
yarn build --base=/react-dogs/
yarn build --base=/react-dogs/dev/
```

O `BrowserRouter` usa `import.meta.env.BASE_URL` como `basename`, permitindo que as rotas funcionem nos subpaths do GitHub Pages.

## SPA Fallback

O workflow copia:

```txt
site/index.html -> site/404.html
site/dev/index.html -> site/dev/404.html
```

Isso ajuda o GitHub Pages a servir o app em rotas internas como:

```txt
/react-dogs/login
/react-dogs/dev/login
```

## Limitações

- GitHub Pages oferece um site por repositório; os dois ambientes usam subpaths no mesmo site.
- O ambiente publicado depende da branch pareada existir e conseguir buildar.
- Enquanto a branch `main` não existir, pushes diretos em `master` não disparam o workflow; `master` é apenas fallback quando `develop` publica o site completo.
- `yarn test` roda a suíte automatizada com Vitest; o CI falha em caso de regressão coberta.
- A API externa continua sendo dependência do app em runtime, mas o CI não roda health check para evitar falha por indisponibilidade externa.
- O workflow usa Node 20 porque `@supabase/supabase-js` exige Node 20+ nas versões atuais.
- O workflow força JavaScript Actions para Node 24 com `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` para antecipar a migração do GitHub Actions. Alguns avisos podem continuar aparecendo enquanto actions oficiais ainda declararem runtime Node 20 internamente.
