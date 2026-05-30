## Contexto

O projeto ainda nao tem uma estrategia explicita de temas. Para uma evolucao de portfolio, vale introduzir tokens de design e suporte a temas de cores, especialmente se a migracao para CSS-in-JS acontecer.

## Objetivo

Criar uma base de theming para cores e tokens visuais do app.

## Escopo

- Mapear cores atuais usadas no CSS.
- Definir tokens semanticos: background, foreground, primary, accent, border, muted, danger, success.
- Definir tokens de tipografia, espacamento, raios, sombras e breakpoints.
- Implementar pelo menos tema claro.
- Avaliar tema escuro ou tema alternativo como melhoria incremental.
- Persistir preferencia de tema se houver seletor.
- Integrar tema com a biblioteca CSS-in-JS escolhida.

## Criterios De Aceite

- Cores principais nao ficam espalhadas como valores soltos nos componentes.
- Existe uma fonte central de tokens.
- Componentes principais consomem tokens do tema.
- A estrategia escolhida funciona bem com TypeScript.

