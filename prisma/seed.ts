import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import data from "./mock-data.json";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const clerkId = "user_3DtpkjuTeGymfmd7i72t7rdzXqf";
  const jobs = data.map((job: any) => {
    return {
      ...job,
      clerkId,
      createdAt: job.createdAt ? new Date(job.createdAt) : undefined,
    };
  });
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
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
