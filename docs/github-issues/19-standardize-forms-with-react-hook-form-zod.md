## Contexto

O projeto tem um hook proprio `useForm`, mas a validacao ainda e limitada e tem bugs conhecidos. Para uma base mais profissional, React Hook Form com Zod pode padronizar formularios, schemas e mensagens.

## Objetivo

Padronizar formularios e validacoes usando uma solucao moderna e tipada.

## Escopo

- Avaliar React Hook Form + Zod como solucao principal.
- Criar schemas para login, cadastro, recuperacao de senha e postagem de foto.
- Substituir `useForm` gradualmente.
- Padronizar mensagens de erro.
- Integrar tipos inferidos do Zod com TypeScript.
- Garantir boa acessibilidade nos erros de formulario.

## Criterios De Aceite

- Formularios principais usam schemas de validacao.
- Erros aparecem de forma consistente.
- Submit invalido nao dispara request.
- Tipos dos formularios sao inferidos ou declarados de forma segura.
- `useForm` antigo e removido ou mantido apenas enquanto houver migracao pendente.

