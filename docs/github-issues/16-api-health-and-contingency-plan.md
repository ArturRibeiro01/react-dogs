## Contexto

Status local: concluida em 2026-05-30.

O projeto depende da API externa `https://dogsapi.origamid.dev/json`. Em 30 de maio de 2026, o endpoint publico `GET /api/photo/?_page=1&_total=1&_user=0` respondeu `200 application/json` e retornou dados reais. A raiz `/json` respondeu `404`, o que nao invalida os endpoints especificos.

Mesmo assim, por ser uma API de terceiro, o projeto precisa de um plano caso ela saia do ar.

## Objetivo

Criar uma estrategia para manter o portfolio demonstravel mesmo se a API externa ficar indisponivel.

## Escopo

- [x] Documentar endpoints usados pelo app.
- [x] Criar uma pagina/check simples de status da API ou script de smoke test.
- [x] Centralizar configuracao da base URL por variavel de ambiente.
- [x] Adicionar fallback de dados mockados para ambiente demo, se fizer sentido.
- [x] Avaliar criar backend proprio ou mock server para portfolio.
- [x] Definir mensagem de erro clara quando a API estiver fora.

## Criterios De Aceite

- [x] Existe comando ou teste para verificar saude da API.
- [x] Base URL nao fica hardcoded sem possibilidade de override.
- [x] App falha de forma amigavel quando a API nao responde.
- [x] README explica dependencia da API e plano de fallback.

## Resultado

- `yarn check:api` valida a saude do endpoint publico de fotos.
- `VITE_API_URL` permite trocar a API sem alterar codigo fonte.
- `docs/API.md` documenta os endpoints usados atualmente e o contrato esperado para uma API propria futura.
- `apiRequest` exibe mensagem amigavel em falha de rede/API indisponivel.

## Decisao

Fallback mockado nao foi implementado agora. A decisao registrada e criar API propria no futuro ou adicionar modo demo quando houver necessidade real de apresentacao offline.
