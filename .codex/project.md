# React Dogs - Codex Notes

## Projeto

- App React chamado `dogs`, baseado em Create React App.
- Usa React 17 e `react-router-dom` `^6.0.0-beta.0`.
- API base em `src/api.js`: `https://dogsapi.origamid.dev/json`.
- O app parece seguir o projeto Dogs da Origamid, com login, conta do usuario, feed, postagem de foto e estatisticas.

## Comandos

- `npm start`: inicia o servidor de desenvolvimento via `react-scripts start`.
- `npm test`: roda testes em modo watch via `react-scripts test`.
- `npm run build`: gera build de producao.
- `npm run eject`: eject do Create React App. Evitar salvo se o usuario pedir explicitamente.

## Estrutura Relevante

- `src/App.js`: configura `BrowserRouter`, `UserStorage`, `Header`, `Footer` e rotas principais.
- `src/api.js`: centraliza factories de requests para token, usuario e fotos.
- `src/UserContext.js`: estado global de usuario/autenticacao.
- `src/Hooks/useFetch.js`: hook de fetch reutilizavel.
- `src/Hooks/useForm.js`: hook de formularios e validacao.
- `src/Components/Feed`: componentes do feed e modal de fotos.
- `src/Components/Login`: fluxo de login, cadastro e recuperacao de senha.
- `src/Components/User`: area logada, header da conta, postar foto e estatisticas.
- `src/Components/Forms`: componentes reutilizaveis de formulario.
- `src/Assets`: imagens e icones usados pela UI.

## Observacoes Locais

- Existe `.vscode/settings.json` com `files.exclude`; ele pode esconder arquivos no Explorer do VS Code.
- Atualmente `package-lock.json`, `yarn.lock` e `.gitignore` estao configurados como ocultos no Explorer.
- `package.json`, `README.md`, `public`, `.vscode` e `node_modules` estao configurados como visiveis.
- Ha `package-lock.json` e `yarn.lock` ao mesmo tempo. Antes de instalar dependencias, escolher com o usuario se o projeto vai usar npm ou yarn.

## Preferencias De Trabalho

- Conversar em portugues com o usuario.
- Fazer mudancas pequenas e alinhadas ao estilo existente.
- Nao fazer refactors grandes sem necessidade clara.
- Consultar este arquivo no inicio de tarefas futuras para recuperar contexto rapido do projeto.

## Possiveis Pontos De Atencao

- Em `src/api.js`, headers de Authorization aparecem como `'Bearer' + token`; APIs geralmente esperam um espaco: `'Bearer ' + token`.
- Em `PHOTOS_GET`, a URL template comeca com um espaco antes de `${API_URL}`. Isso pode quebrar chamadas de fetch.
- `ProtectedRoute` esta sendo usado como elemento de rota em `App.js`; vale conferir compatibilidade com a versao beta do React Router v6 usada no projeto antes de alterar rotas.

## Backlog E Portfolio

- Issues planejadas ficam em `docs/github-issues`.
- A ordem recomendada de execucao fica em `docs/github-issues/PRIORITY.md`.
- Existe script `docs/github-issues/create-issues.sh` para publicar o backlog no GitHub usando `gh issue create`.
- Em 2026-05-30, `gh` estava instalado, mas a autenticacao local estava invalida. Reautenticar com `gh auth login -h github.com` antes de publicar issues.
- O usuario quer evoluir o projeto com criterio senior: TypeScript, CSS-in-JS, scripts de qualidade com Husky/lint-staged ou alternativa moderna, atualizacao forte de dependencias, testes, CI e README de portfolio.
- Tambem fazem parte da direcao desejada: themes de cores/tokens de design, migracao de Context API para Zustand e padronizacao de formularios com React Hook Form e/ou Zod.
- Segunda passada de arquitetura adicionou: reorganizacao por feature/aliases, API client com configuracao por ambiente e Error Boundary/feedback global.
- Em 2026-05-30, a API `https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=1&_user=0` respondeu `200 application/json` com dados reais. A raiz `/json` respondeu `404`, mas isso nao invalida os endpoints especificos.
- `npm outdated` indicou dependencias muito antigas: React 17 atual contra React 19 latest, React Router beta contra versoes modernas, Testing Library antiga e `react-scripts` 4.
- `npm audit --production` reportou 210 vulnerabilidades, incluindo 20 criticas, principalmente via dependencias transientes antigas da stack CRA/react-scripts.
