# Pass.in

O **Pass.in** é uma aplicação para **gestão de participantes em eventos presenciais**. Ele permite que organizadores criem eventos, gerenciem participantes e realizem check-ins no dia do evento.

## Funcionalidades

- Cadastro de eventos com título, descrição e limite de participantes.
- Inscrição de participantes em eventos.
- Visualização de lista de participantes de um evento.
- Emissão de crachás para participantes.
- Realização de check-in no evento.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS, Vite.
- **Backend**: Node.js, Fastify, Prisma ORM, SQLite.
- **Outras**: Zod para validação de dados.

---

## Rotas da API

### **Eventos**

#### Criar um evento

- **POST** `/events`
- **Descrição**: Cria um novo evento.
- **Body**:
  ```json
  {
    "title": "Nome do Evento",
    "details": "Descrição do evento",
    "maximumAttendees": 100
  },
  ```

### Resposta:

{
"eventId": "uuid-do-evento"
}

### Obter detalhes de um evento

- GET /events/:eventId
- Descrição: Retorna os detalhes de um evento específico.

### Resposta:

{
"event": {
"title": "Nome do Evento",
"slug": "nome-do-evento",
"details": "Descrição do evento",
"maximumAttendees": 100,
"attendeesAmount": 50
}
}

### Obter lista de participantes de um evento

- GET /events/:eventId/attendees
- Descrição: Retorna a lista de participantes de um evento.
- Query Params:
  - query (opcional): Filtra participantes pelo nome.
  - pageIndex (opcional): Índice da página (começa em 0).

### Resposta

{
"attendees": [
{
"id": 1,
"name": "João Silva",
"email": "joao@email.com",
"createdAt": "2025-04-24T10:00:00Z",
"checkedInAt": null
}
]
}

### **Participantes**

### Inscrever um participante em um evento

- POST /events/:eventId/attendees
- Descrição: Inscreve um participante em um evento.
- Body:
  ```json
  {
    "name": "João Silva",
    "email": "joao@email.com"
  }
  ```

# Resposta:
```json
{
  "attendeeId": 1
}
```

###