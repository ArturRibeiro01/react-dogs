# Migrar publicação com upload multipart

## Contexto

A Dogs API cria post e mídia em etapas separadas: primeiro `POST /v1/posts`, depois `POST /v1/media` com multipart form-data.

## Objetivo

Adaptar o fluxo atual de publicação para criar post e enviar imagem para Supabase Storage via Dogs API.

## Tarefas

- Adaptar a tela atual de postagem para selecionar um cachorro existente ou criar um fluxo equivalente.
- Criar post com `POST /v1/posts`.
- Enviar imagem com `POST /v1/media` usando `postId` e `file`.
- Validar no frontend:
  - arquivo obrigatório;
  - MIME `image/jpeg`, `image/png` ou `image/webp`;
  - tamanho máximo de 5 MB.
- Tratar falha na criação do post ou no upload com feedback claro.
- Atualizar preview, loading, erro e navegação pós-sucesso.
- Atualizar testes e mocks do fluxo.

## Critérios De Aceite

- Usuário autenticado consegue publicar um post com imagem.
- Upload usa multipart com os campos esperados pela Dogs API.
- Arquivos inválidos são bloqueados antes da requisição.
- Falhas parciais não deixam o usuário sem feedback.
