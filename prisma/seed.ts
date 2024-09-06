import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../server/services/auth";

const prisma = new PrismaClient();
async function main() {
  await prisma.users.deleteMany();
  for (let i = 0; i < 40; i++) {
    await prisma.users.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        displayName: faker.person.fullName(),
        password: await hashPassword("P@$$w0rd123"),
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
