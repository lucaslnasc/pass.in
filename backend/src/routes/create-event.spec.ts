import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '../lib/prisma'
import { app } from '../server'

describe('Create Event (E2E)', () => {
  // Prepara o servidor antes de todos os testes
  beforeAll(async () => {
    await app.ready()
  })

  // Fecha o servidor após todos os testes
  afterAll(async () => {
    await app.close()
  })

  // Limpa o banco de dados antes de cada teste
  // Isso garante que cada teste comece com um banco limpo
  beforeEach(async () => {
    await prisma.checkIn.deleteMany() // Remove todos os check-ins
    await prisma.attendee.deleteMany() // Remove todos os participantes
    await prisma.event.deleteMany() // Remove todos os eventos
  })

  // Teste 1: Deve permitir criar um novo evento
  it('should be able to create a new event', async () => {
    // Tenta criar um novo evento
    const response = await request(app.server)
      .post('/events')
      .send({
        title: 'Test Event',
        details: 'Test Details',
        maximumAttendees: 100 // Limite de 100 participantes
      })    // Verifica se a resposta foi bem sucedida (201 Created)
    expect(response.statusCode).toEqual(201)
    // Verifica se retornou um ID de evento válido
    expect(response.body).toEqual({
      eventId: expect.any(String)
    })
  })

  // Teste 2: Não deve permitir criar eventos com títulos duplicados
  it('should not create event with duplicate title', async () => {
    // Primeiro, cria um evento com um título
    await request(app.server)
      .post('/events')
      .send({
        title: 'Test Event',
        details: 'Test Details',
        maximumAttendees: 100
      })

    const response = await request(app.server)
      .post('/events')
      .send({
        title: 'Test Event',
        details: 'Test Details',
        maximumAttendees: 100
      })

    expect(response.statusCode).toEqual(400)
  })
})