## Contexto

Para deixar o GitHub mais profissional, o repo deve validar pull requests e commits principais automaticamente.

## Objetivo

Adicionar GitHub Actions para instalar dependencias, rodar testes e build.

## Escopo

- Criar workflow em `.github/workflows/ci.yml`.
- Usar versao de Node adequada ao projeto.
- Instalar dependencias com o gerenciador escolhido.
- Rodar lint/test/build conforme scripts disponiveis.
- Exibir badge no README depois que estiver verde.

## Criterios De Aceite

- Workflow roda em push e pull request.
- Build falha se houver erro de compilacao.
- README mostra status do CI.

