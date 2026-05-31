# Deployment

Este projeto usa GitHub Actions para CI/CD e GitHub Pages para publicação.

## Ambientes

```txt
dev:  https://arturribeiro01.github.io/react-dogs/dev/
prod: https://arturribeiro01.github.io/react-dogs/
```

Mapeamento:

- `develop` publica o ambiente de dev em `/react-dogs/dev/`.
- `main` publica produção em `/react-dogs/`.

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

- `ci`: instala dependências, roda typecheck, teste placeholder e build.
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

Assim, cada publicação mantém os dois caminhos no mesmo site do Pages.

## Configuração Necessária No GitHub

No repositório:

1. Abra `Settings`.
2. Entre em `Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions` como source.
4. Garanta que Actions estejam habilitadas em `Settings > Actions`.

Se houver branch protection, configure os checks do workflow `CI/CD` como obrigatórios antes de mergear em `develop` ou `main`.

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
- `yarn test` ainda é placeholder; quando testes reais forem adicionados, o CI já está preparado para falhar em caso de regressão.
- A API externa continua sendo dependência do app em runtime, mas o CI não roda health check para evitar falha por indisponibilidade externa.
