import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "389f9e44-6d88-455d-b50b-18a8a7854660",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "evento para nerds vulgos programadores de plantão",
      maximumAttendees: 150,
    },
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
