## Contexto

`UserStats` ainda renderiza somente texto. A navegacao possui rota e icone de estatisticas, mas a tela nao entrega valor para o portfolio.

## Objetivo

Implementar tela de estatisticas das fotos do usuario.

## Escopo

- Verificar endpoint de estatisticas da API Dogs.
- Buscar dados autenticados do usuario.
- Renderizar total de acessos e lista/grafico por foto.
- Considerar uma biblioteca de grafico leve ou uma visualizacao simples em CSS.
- Tratar loading, erro e ausencia de dados.

## Criterios De Aceite

- Tela `/conta/estatisticas` mostra dados reais.
- Usuario sem fotos recebe estado vazio amigavel.
- UI fica responsiva.

