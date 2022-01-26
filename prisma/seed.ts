import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const root = await db.user.create({
    data: {
      username: "root",
      // A very secure hash. Definitely not "password". Nope.
      passwordHash:
        "$2y$10$1hfom95xp8CEoCJGwrOWNuaPxK3eEBSbNDqq/bMQFW9ytrqdqXJMK",
    },
  });
  await Promise.all(
    getContacts().map((contact) => {
      const data = { userId: root.id, ...contact };
      return db.contact.create({ data });
    })
  );
}

seed();

function getContacts() {
  return [
    {
      name: "Emergency Services",
      phone: "0118 999 88199 9119 725 3",
    },
    {
      name: "Ed Ruin",
      phone: "+358 12 345 6789",
    },
    {
      name: "Charlie Smith",
      phone: "+44 98 765 4321",
    },
  ];
}
