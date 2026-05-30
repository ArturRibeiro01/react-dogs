## Contexto

O app possui componentes simples de erro/loading, mas nao tem uma estrategia global para excecoes inesperadas, falhas de rota ou feedbacks consistentes ao usuario.

## Objetivo

Adicionar uma camada de resiliencia e feedback global.

## Escopo

- Implementar Error Boundary para capturar erros de renderizacao.
- Criar tela ou fallback amigavel para erro inesperado.
- Padronizar estados de loading, erro e sucesso.
- Avaliar toasts ou alerts acessiveis para acoes como login, upload e logout.
- Garantir que erros criticos nao deixem a tela em branco.
- Adicionar teste basico para Error Boundary.

## Criterios De Aceite

- Erros inesperados exibem fallback amigavel.
- Usuario recebe feedback consistente em acoes principais.
- Estados de erro sao acessiveis.
- O app nao fica em tela branca em falhas comuns.

