import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export interface ChurchInfo {
  editedBy: string;
  churchDescription: string;
  churchName: string;
}

export interface ChurchInfoSuccessResponse {
  error: false;
  churchInfo: ChurchInfo | null;
}

const infoForChurch = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const church = JSON.parse(req.body) as ChurchInfo;
    console.log(church);
    try {
      await prisma.churchInfo.upsert({
        where: {
          churchName: church.churchName,
        },
        create: {
          churchName: church.churchName,
          churchDescription: church.churchDescription,
          editedBy: church.editedBy || 'ANONIM',
        },
        update: {
          churchDescription: church.churchDescription,
          editedBy: church.editedBy || 'ANONIM',
        },
      });
      console.log('P');
    } catch (e) {
      console.log(e);
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
      } as ChurchInfoSuccessResponse);
    } catch (e) {
      res.send({
        error: true,
        message: 'Ups! Ceva nu a mers, incercati din nou mai tarziu',
      });
    }
  }
};

export default infoForChurch;
