import { prisma } from "./prisma-client.js";

async function testConnection(): Promise<void> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;

    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void testConnection();