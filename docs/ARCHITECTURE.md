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
import Dogs from '@assets/dogs.svg?react';
```

## Convenção De Imports

Ordem recomendada:

1. Bibliotecas externas.
2. Imports internos por alias.
3. Tipos internos.
4. CSS Modules relativos, quando o componente ainda não tiver sido migrado.
5. Imports relativos próximos, quando forem arquivos irmãos da mesma pasta.

Exemplo:

```ts
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { theme } from '@/styles/theme';
import Button from '@components/Forms/Button';
import type { User } from '@/types';

import styles from './Example.module.css';
import LocalComponent from './LocalComponent';
```

## Regra Prática

- Use alias para atravessar domínios ou pastas distantes.
- Prefira Emotion com `styled` em componentes novos ou migrados.
- Organize componentes migrados para Emotion em pasta própria: `Component.tsx`, `Component.styles.ts` e `index.ts`.
- Use import relativo para CSS Module do próprio componente enquanto ele ainda não tiver sido migrado.
- Use import relativo para arquivos irmãos dentro da mesma pasta.
- Evite `../../..` em código novo.
- Remova imports não usados.

## Estilos

A biblioteca escolhida para CSS-in-JS é Emotion, usando principalmente `@emotion/styled`.

Decisão:

- Emotion foi escolhido por ter boa integração com TypeScript, API familiar para quem já usa styled-components e migração incremental simples.
- Stitches foi evitado por não estar mais mantido.
- Inline styles ficam restritos a valores pontuais e realmente dinâmicos.
- `ThemeProvider` é aplicado no `App` e usa tokens de `src/styles/theme.ts`.
- `Button`, `Input`, `StatusMessage`, `Header` e `Footer` já usam Emotion.
- Os estilos Emotion desses componentes ficam em arquivos próprios `*.styles.ts`.

CSS global e CSS Modules permanecem enquanto a migração acontece em etapas.

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
