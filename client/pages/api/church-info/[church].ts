import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export interface ChurchInfo {
  name: string;
  editedBy: string;
  info: string;
}

const infoForChurch = async (req: NextApiRequest, res: NextApiResponse) => {
  const church = req.body as ChurchInfo;
  if (req.method === 'POST') {
    try {
      await prisma.churchInfo.upsert({
        where: {
          churchName: church.name,
        },
        create: {
          churchName: church.name,
          churchDescription: church.info,
          editedBy: church.editedBy,
        },
        update: {
          churchDescription: church.info,
          editedBy: church.editedBy,
        },
      });
    } catch (e) {
      res.send({
        error: true,
        message: 'Ups! Ceva nu a mers, incercati din nou mai tarziu',
      });
    }
  } else {
    console.log('GET' + church);
    try {
      const churchInfo = await prisma.churchInfo.findFirst({
        where: {
          churchName: church.name,
        },
      });
      res.send({
        error: false,
        churchInfo,
      });
    } catch (e) {
      res.send({
        error: true,
        message: 'Ups! Ceva nu a mers, incercati din nou mai tarziu',
      });
    }
  }
};

export default infoForChurch;
