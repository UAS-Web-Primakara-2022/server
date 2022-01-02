import { PrismaClient, Prisma } from "@prisma/client";
import { generateHash } from "../helpers/bycrpt";

const prisma = new PrismaClient();

const adminSeed: Prisma.AdminCreateInput = {
  nidn: 0,
  name: "master",
  email: "master@mail.com",
  password: generateHash("master"),
};

async function main() {
  console.log(`Start seeding ...`);
  await prisma.admin.create({
    data: adminSeed,
  });
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
