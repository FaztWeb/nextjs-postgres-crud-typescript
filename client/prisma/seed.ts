import prisma from '../utils/prisma';

const run = async () => {
  await prisma.user.deleteMany({});
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
