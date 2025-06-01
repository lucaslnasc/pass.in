import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '../lib/prisma'
import { app } from '../server'

describe('Register for Events (E2E)', () => {
  let testEventId: string

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    // Limpa o banco de dados
    await prisma.checkIn.deleteMany()
    await prisma.attendee.deleteMany()
    await prisma.event.deleteMany()

    // Cria um evento para ser usado em todos os testes
    const createEventResponse = await request(app.server)
      .post('/events')
      .send({
        title: 'Test Event',
        details: 'Test Details',
        maximumAttendees: 100
      })

    expect(createEventResponse.statusCode).toEqual(201)
    testEventId = createEventResponse.body.eventId
  })

  it('should be able to register for an event', async () => {
    const response = await request(app.server)
      .post(`/events/${testEventId}/attendees`)
      .send({
        name: 'John Doe Test',
        email: 'john.test@example.com'
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      attendeeId: expect.any(Number)
    })
  })

  it('should not register same email twice', async () => {
    // Primeiro registro do email (deve funcionar)
    await request(app.server)
      .post(`/events/${testEventId}/attendees`)
      .send({
        name: 'John Doe Test',
        email: 'duplicate@example.com'
      })

    // Tenta registrar o mesmo email novamente (deve falhar)
    const response = await request(app.server)
      .post(`/events/${testEventId}/attendees`)
      .send({
        name: 'John Doe Test',
        email: 'duplicate@example.com'
      })

    expect(response.statusCode).toEqual(400)
  })
})