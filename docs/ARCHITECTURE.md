# Frontend Architecture

Este documento registra a organização atual do frontend Dogs e a convenção de imports para as próximas refatorações.

## Estrutura Atual

```txt
src/
  api.ts
  mockApi.ts
  schemas/
  styles/
  types.ts
  stores/
    authStore.ts
  Assets/
  Components/
    Feed/
    Forms/
      Button/
      Input/
    Header/
    Footer/
    Helper/
      StatusMessage/
    Login/
    User/
  Hooks/
```

O projeto ainda mantém a estrutura histórica por grupos principais. Para evitar uma refatoração grande demais de uma vez, a primeira etapa de arquitetura configurou aliases e padronizou imports sem mover componentes de domínio.

## Aliases

Aliases configurados em `vite.config.ts` e `tsconfig.json`:

```txt
@           -> src
@assets     -> src/Assets
@components -> src/Components
@hooks      -> src/Hooks
```

Exemplos:

```ts
import { photoApi } from '@/api';
import type { Photo } from '@/types';
import Button from '@components/Forms/Button';
import useFetch from '@hooks/useFetch';
import dogsLogoUrl from '@assets/dogs.svg';
```

## Convenção De Imports

Ordem recomendada:

1. Bibliotecas externas.
2. Imports internos por alias.
3. Tipos internos.
4. Imports relativos próximos, quando forem arquivos irmãos da mesma pasta.

Exemplo:

```ts
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { theme } from '@/styles/theme';
import type { User } from '@/types';
import Button from '@components/Forms/Button';

import { ExampleShell } from './Example.styles';
import LocalComponent from './LocalComponent';
```

## Regra Prática

- Use alias para atravessar domínios ou pastas distantes.
- Use Emotion com `styled` para estilos de componentes.
- Organize componentes compartilhados em pasta própria: `Component.tsx`, `Component.styles.ts` e `index.ts`.
- Use import relativo para arquivos irmãos dentro da mesma pasta.
- Evite `../../..` em código novo.
- Remova imports não usados.
- Importe hooks e APIs do React de forma nomeada, como `useEffect` e `useState`, em vez de usar `React.useEffect`.

## Estilos

A biblioteca escolhida para CSS-in-JS é Emotion, usando principalmente `@emotion/styled`.

Decisão:

- Emotion foi escolhido por ter boa integração com TypeScript, API familiar para quem já usa styled-components e migração incremental simples.
- Stitches foi evitado por não estar mais mantido.
- Inline styles ficam restritos a valores pontuais e realmente dinâmicos.
- `ThemeProvider` é aplicado no `App` e usa tokens de `src/styles/theme.ts`.
- `GlobalStyles` expõe os tokens como CSS variables para CSS global.
- Todos os CSS Modules foram removidos; estilos de componentes ficam em arquivos próprios `*.styles.ts`.
- O tema claro inicial centraliza cores, tipografia, espaçamentos, raios, sombras, z-index, breakpoints e transições.
- Use `rem` para medidas fixas em estilos. Evite `px` em arquivos `.styles.ts`, tokens de tema e CSS global.

`App.css` permanece apenas para reset/base global e classes utilitárias históricas, como `.container`, `.title` e `.animeLeft`.

Cores visuais da aplicação devem ser consumidas por tokens de `src/styles/theme.ts`. Componentes e arquivos de estilo não devem declarar valores hexadecimais, RGB ou HSL diretamente; novos temas devem substituir os tokens sem exigir alterações nos componentes.

## Próxima Evolução Possível

Quando a base crescer, a estrutura pode migrar para organização por domínio:

```txt
src/
  features/
    auth/
    feed/
    user/
  shared/
    api/
    assets/
    hooks/
    ui/
```

Essa migração deve ser feita em etapas para evitar churn grande e regressões.
