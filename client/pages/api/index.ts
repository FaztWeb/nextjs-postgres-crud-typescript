import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { info, description, user } = req.body;
  console.log(req.body);
  const name = (req.body.name = 'Biserica Romano-Catolică din Elisabetin');
  prisma.churchInfo.create({
    data: {
      churchName: name,
      churchDescription: description,
      churchType: info,
      editedBy: user,
    },
  });
  res.status(200).send('SUCCESS');
};
