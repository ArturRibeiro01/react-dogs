# React Dogs - Codex Notes

## Projeto

- App React chamado `dogs`, migrado de Create React App para Vite.
- Usa React `^19.2.6`, React DOM `^19.2.6`, React Router `6.30.2` e Vite `^6.4.2`.
- API base em `src/api.js`: `https://dogsapi.origamid.dev/json`.
- O app parece seguir o projeto Dogs da Origamid, com login, conta do usuario, feed, postagem de foto e estatisticas.

## Comandos

- `yarn start` ou `yarn dev`: inicia o servidor de desenvolvimento via Vite.
- `yarn build`: gera build de producao em `dist`.
- `yarn preview`: serve o build localmente.
- `yarn check:api`: valida o endpoint publico de fotos da API configurada.
- `yarn test`: placeholder atual, pois ainda nao ha framework de testes configurado apos a migracao para Vite.

## Estrutura Relevante

- `index.html`: entrada HTML do Vite.
- `vite.config.mjs`: configuracao do Vite, React plugin e SVGR.
- `src/index.jsx`: entrypoint React.
- `src/App.jsx`: configura `BrowserRouter`, `UserStorage`, `Header`, `Footer` e rotas principais.
- `src/api.js`: centraliza `apiRequest`, base URL por `VITE_API_URL`, token storage e endpoints por dominio.
- `src/UserContext.jsx`: estado global de usuario/autenticacao.
- `src/Hooks/useFetch.js`: hook de fetch reutilizavel.
- `src/Hooks/useForm.js`: hook de formularios e validacao.
- `src/Components/Feed`: componentes do feed e modal de fotos.
- `src/Components/Login`: fluxo de login, cadastro e recuperacao de senha.
- `src/Components/User`: area logada, header da conta, postar foto e estatisticas.
- `src/Components/Forms`: componentes reutilizaveis de formulario.
- `src/Assets`: imagens e icones usados pela UI.

## Observacoes Locais

- Existe `.vscode/settings.json` com `files.exclude`; ele pode esconder arquivos no Explorer do VS Code.
- Atualmente `yarn.lock` e `.gitignore` estao configurados como ocultos no Explorer.
- `package.json`, `README.md`, `public`, `.vscode` e `node_modules` estao configurados como visiveis.
- O usuario escolheu Yarn. Nao reintroduzir `package-lock.json`.
- Apenas `yarn.lock` deve existir como lockfile.

## Preferencias De Trabalho

- Conversar em portugues com o usuario.
- Fazer mudancas pequenas e alinhadas ao estilo existente.
- Nao fazer refactors grandes sem necessidade clara.
- Consultar este arquivo no inicio de tarefas futuras para recuperar contexto rapido do projeto.

## Possiveis Pontos De Atencao

- Bugs iniciais de runtime ja corrigidos: imports `api`, headers Bearer, `PHOTOS_GET`, `useFetch`, `useForm`, `ProtectedRoute`, `NavLink` e feed basico com dados reais.
- Vite exige JSX em arquivos `.jsx`; componentes, `App`, `UserContext` e entrypoint foram renomeados de `.js` para `.jsx`.
- React foi atualizado para 19.2.6; entrypoint usa `createRoot` de `react-dom/client`.
- React Router foi atualizado para 6.30.2. A linha 7 exigia Node >=20, mas a maquina atual estava em Node 18.16.0.
- Vite foi atualizado para 6.4.2, que ainda suporta Node 18. Vite 8 e `@vitejs/plugin-react` 6 exigem Node 20+.
- Dependencias nao usadas `history` e `web-vitals` foram removidas.
- Testing Library foi atualizada e movida para `devDependencies`, mas `yarn test` ainda e placeholder ate a issue de testes.
- README atual documenta a stack e comandos atuais, mas a versao final de portfolio com screenshots ainda fica para issue propria.
- API client foi criado em `src/api.js`; consumidores devem preferir `authApi`, `userApi`, `photoApi`, `healthApi` e `tokenStorage`.
- `.env.example` documenta `VITE_API_URL` para troca futura por API propria.

## Backlog E Portfolio

- Issues planejadas ficam em `docs/github-issues`.
- A ordem recomendada de execucao fica em `docs/github-issues/PRIORITY.md`.
- Status consolidado da modernizacao fica em `docs/PROJECT_STATUS.md`.
- Existe script `docs/github-issues/create-issues.sh` para publicar o backlog no GitHub usando `gh issue create`.
- Em 2026-05-30, `gh` estava instalado, mas a autenticacao local estava invalida. Reautenticar com `gh auth login -h github.com` antes de publicar issues.
- O usuario quer evoluir o projeto com criterio senior: TypeScript, CSS-in-JS, scripts de qualidade com Husky/lint-staged ou alternativa moderna, atualizacao forte de dependencias, testes, CI e README de portfolio.
- Tambem fazem parte da direcao desejada: themes de cores/tokens de design, migracao de Context API para Zustand e padronizacao de formularios com React Hook Form e/ou Zod.
- Segunda passada de arquitetura adicionou: reorganizacao por feature/aliases, API client com configuracao por ambiente e Error Boundary/feedback global.
- Em 2026-05-30, a API `https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=1&_user=0` respondeu `200 application/json` com dados reais. A raiz `/json` respondeu `404`, mas isso nao invalida os endpoints especificos.
- Diagnostico antigo: `npm audit --production` reportou 210 vulnerabilidades quando o projeto ainda estava em CRA/react-scripts. Depois da migracao para Vite e remocao de dependencias antigas, esse numero deve ser reavaliado com Yarn em uma rodada futura.
- O projeto saiu de `react-scripts` para Vite em 2026-05-30. `yarn build` passa e `yarn dev --host 127.0.0.1` sobe localmente; a porta pode variar se `5173` estiver ocupada.
