import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { generateSlug } from "../utils/generate-slug";
import { BadRequest } from "./_errors/bad-request";

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events",
    {
      schema: {
        summary: 'Create an event',
        tags: ['events'],
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body;

      const slug = generateSlug(title);

      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug,
        },
      });

      if (eventWithSameSlug !== null) {
        throw new BadRequest("Another event with same title already exists.");
      }

      console.log('Creating new event:', { title, slug });

      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug,
        },
      });

      // return {eventId: event.id}
      return reply.status(201).send({ eventId: event.id });
    }
  );
}