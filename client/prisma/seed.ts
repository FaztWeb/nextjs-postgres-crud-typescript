import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';

const run = async () => {
  const user = await prisma.user.create({
    data: {
      firstName: 'Sorin',
      lastName: 'Rata',
      username: 'sorinACHO',
      email: 'ratasorin0@gmail.com',
      ProvidedInfoFor: {
        create: [],
      },
    },
  });
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
