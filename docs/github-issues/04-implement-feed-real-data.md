## Contexto

Status local: concluida em 2026-05-30.

`FeedPhotos` ainda renderiza `teste 2`, e `FeedPhotosItem` e placeholder. O feed e parte central do app e precisa mostrar as fotos vindas da API.

## Objetivo

Renderizar o feed usando dados reais da API.

## Escopo

- [x] Usar `PHOTOS_GET` para buscar fotos.
- [x] Renderizar lista com `FeedPhotosItem`.
- [x] Exibir imagem, titulo/nome e visualizacoes quando disponiveis.
- [x] Tratar loading, erro e lista vazia.
- [x] Adicionar CSS module do feed se necessario.

## Criterios De Aceite

- [x] Home e conta mostram fotos reais.
- [x] Cada item tem key estavel.
- [x] Estado vazio nao quebra layout.
- [x] Loading e erro continuam funcionando.

## Observacoes

- O feed renderiza dados reais, visualizacoes e estado vazio. Modal, paginacao/infinite scroll e detalhes da foto seguem em issues proprias.
