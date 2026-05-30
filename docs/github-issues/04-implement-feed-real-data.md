## Contexto

`FeedPhotos` ainda renderiza `teste 2`, e `FeedPhotosItem` e placeholder. O feed e parte central do app e precisa mostrar as fotos vindas da API.

## Objetivo

Renderizar o feed usando dados reais da API.

## Escopo

- Usar `PHOTOS_GET` para buscar fotos.
- Renderizar lista com `FeedPhotosItem`.
- Exibir imagem, titulo/nome e visualizacoes quando disponiveis.
- Tratar loading, erro e lista vazia.
- Adicionar CSS module do feed se necessario.

## Criterios De Aceite

- Home e conta mostram fotos reais.
- Cada item tem key estavel.
- Estado vazio nao quebra layout.
- Loading e erro continuam funcionando.

