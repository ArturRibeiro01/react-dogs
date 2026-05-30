## Contexto

O hook `useForm` tem um typo em `value.lenght`, o que faz a validacao de campo vazio falhar. Alguns formularios usam `useForm()` sem tipo, o que precisa continuar funcionando.

## Objetivo

Deixar validacao de formularios previsivel, simples e reutilizavel.

## Escopo

- Corrigir `lenght` para `length`.
- Garantir que campos vazios exibam erro.
- Revisar validacoes de email, senha e numero.
- Validar formulario de cadastro antes de enviar request.
- Validar formulario de postagem antes de enviar foto.

## Criterios De Aceite

- Campos obrigatorios nao sao enviados vazios.
- Mensagens de erro aparecem no blur e no submit.
- Cadastro e postagem bloqueiam envio invalido.

