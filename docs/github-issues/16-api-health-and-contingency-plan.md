## Contexto

O projeto depende da API externa `https://dogsapi.origamid.dev/json`. Em 30 de maio de 2026, o endpoint publico `GET /api/photo/?_page=1&_total=1&_user=0` respondeu `200 application/json` e retornou dados reais. A raiz `/json` respondeu `404`, o que nao invalida os endpoints especificos.

Mesmo assim, por ser uma API de terceiro, o projeto precisa de um plano caso ela saia do ar.

## Objetivo

Criar uma estrategia para manter o portfolio demonstravel mesmo se a API externa ficar indisponivel.

## Escopo

- Documentar endpoints usados pelo app.
- Criar uma pagina/check simples de status da API ou script de smoke test.
- Centralizar configuracao da base URL por variavel de ambiente.
- Adicionar fallback de dados mockados para ambiente demo, se fizer sentido.
- Avaliar criar backend proprio ou mock server para portfolio.
- Definir mensagem de erro clara quando a API estiver fora.

## Criterios De Aceite

- Existe comando ou teste para verificar saude da API.
- Base URL nao fica hardcoded sem possibilidade de override.
- App falha de forma amigavel quando a API nao responde.
- README explica dependencia da API e plano de fallback.

