## Contexto

Status local: parcialmente coberta em 2026-05-30.

O hook `useForm` tem um typo em `value.lenght`, o que faz a validacao de campo vazio falhar. Alguns formularios usam `useForm()` sem tipo, o que precisa continuar funcionando.

## Objetivo

Deixar validacao de formularios previsivel, simples e reutilizavel.

## Escopo

- [x] Corrigir `lenght` para `length`.
- [x] Garantir que campos vazios exibam erro.
- Revisar validacoes de email, senha e numero.
- [x] Validar formulario de cadastro antes de enviar request.
- [x] Validar formulario de postagem antes de enviar foto.

## Criterios De Aceite

- [x] Campos obrigatorios nao sao enviados vazios.
- [ ] Mensagens de erro aparecem no blur e no submit.
- [x] Cadastro e postagem bloqueiam envio invalido.

## Observacoes

- Esta issue pode ser fechada junto da futura padronizacao com React Hook Form e Zod, caso o escopo evolua para schemas tipados.
