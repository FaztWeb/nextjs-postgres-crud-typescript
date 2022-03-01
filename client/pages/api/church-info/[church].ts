import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export interface ChurchInfo {
  name: string;
  editedBy: string;
  info: string;
}

const infoForChurch = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const church = req.body as ChurchInfo;
    console.log(church);
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
    const churchName = req.query.church as string;
    console.log(churchName);
    try {
      const churchInfo = await prisma.churchInfo.findFirst({
        where: {
          churchName,
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
