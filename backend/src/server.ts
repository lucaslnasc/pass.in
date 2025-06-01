import fastify from "fastify";

import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { checkIn } from "./routes/check-in";
import { createEvent } from "./routes/create-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { registerForEvents } from "./routes/register-for-events";

export function buildApp() {
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.register(fastifyCors, {
    origin: '*',
  })

  app.register(fastifySwagger, {
    swagger: {
      consumes: ["application/json"],
      produces: ["application/json"],
      info: {
        title: "pass.in",
        description: "Especificação da API para o back-end da aplicação pass.in",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUI, {
    routePrefix: '/docs'
  })

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(createEvent);
  app.register(registerForEvents);
  app.register(getEvent);
  app.register(getAttendeeBadge);
  app.register(checkIn);
  app.register(getEventAttendees);

  app.setErrorHandler(errorHandler);

  return app;
}

export const app = buildApp();

if (require.main === module) {
  app.listen({ 
    port: 3333, 
    host: '0.0.0.0' 
  }).then(() => {
    console.log('HTTP server running!')
  })
}