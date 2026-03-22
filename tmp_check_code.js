const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const code = await prisma.code.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  console.log(JSON.stringify(code, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
