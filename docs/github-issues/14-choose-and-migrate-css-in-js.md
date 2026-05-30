## Contexto

O projeto usa CSS global e CSS Modules. A ideia agora e avaliar uma abordagem CSS-in-JS moderna para reforcar organizacao, tokens e componentizacao visual.

## Objetivo

Escolher uma biblioteca de CSS-in-JS e migrar a camada de estilos com criterio.

## Escopo

- Comparar opcoes como Styled Components, Emotion, Stitches, Panda CSS ou vanilla-extract.
- Considerar compatibilidade com React moderno, TypeScript, SSR/build e manutencao.
- Definir tokens de tema: cores, fontes, espacamentos, raios, sombras e breakpoints.
- Migrar componentes compartilhados primeiro: Button, Input, Header, Footer.
- Migrar telas principais depois: Login, Feed, User.
- Remover CSS antigo quando nao for mais usado.

## Criterios De Aceite

- Ha uma decisao documentada sobre a biblioteca escolhida.
- Componentes principais usam a estrategia nova.
- Estilos globais ficam restritos a reset/base/tokens quando necessario.
- Layout continua responsivo.

