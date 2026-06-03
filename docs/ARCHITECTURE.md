# Frontend Architecture

Este documento registra a organização atual do frontend Dogs e a convenção de imports para as próximas refatorações.

## Estrutura Atual

```txt
src/
  api.ts
  mockApi.ts
  schemas/
  types.ts
  stores/
    authStore.ts
  Assets/
  Components/
    Feed/
    Forms/
    Helper/
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
4. CSS Modules relativos.
5. Imports relativos próximos, quando forem arquivos irmãos da mesma pasta.

Exemplo:

```ts
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import Button from '@components/Forms/Button';
import type { User } from '@/types';

import styles from './Example.module.css';
import LocalComponent from './LocalComponent';
```

## Regra Prática

- Use alias para atravessar domínios ou pastas distantes.
- Use import relativo para CSS Module do próprio componente.
- Use import relativo para arquivos irmãos dentro da mesma pasta.
- Evite `../../..` em código novo.
- Remova imports não usados.

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
