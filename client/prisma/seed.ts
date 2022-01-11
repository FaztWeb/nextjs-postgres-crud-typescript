import bcrypt from 'bcrypt';
import { artistsData } from './data';
import prisma from '../utils/prisma';

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: {
          name: artist.name,
        },
        update: {},
        create: {
          MangekyoSharingan: artist.name === 'Itachi Uchiha' ? true : false,
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = await bcrypt.genSalt();
  const user = await prisma.user.upsert({
    where: { email: 'ItachiUchiha@test.com' },
    update: {},
    create: {
      createdAt: new Date().toLocaleDateString(),
      MangekyoSharingan: true,
      email: 'ItachiUchiha@test.com',
      password: await bcrypt.hash('password', salt),
    },
  });
  const songs = await prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, index) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist ${index}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
