# pass.in

O pass.in é um aplicação de **gestão de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma página de pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan de credencial do participante para permitir a entrada no evento.

## Requsitos

### Requisitos funcionais

- [x] O organizador deve poder cadastrar um novo evento;
- [x] O organizador deve poder visualizar dados de um evento;
- [x] O organizador deve poser visualizar a lista de participantes;
- [x] O participante deve poder se inscrever em um evento;
- [x] O participante deve poder visualizar seu crachá de inscrição;
- [x] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x] O participante só pode se inscrever em um evento uma única vez;
- [x] O participante só pode se inscrever em eventos com vagas disponíveis;
- [x] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [x] check-in no evento será realizado através de um QRCode;

## Comandos de Execução

## Executar em modo de produção
- 01 - npm run build (Para gerar a aplicação e converte para JavaScript);
- 02 - npm start (Para rodar a aplicação gerada)

## Seed
- npx prisma db seed

## Executar migrations
- npx prisma migrate dev

## Executar o Prisma Studio
- npm prisma studio