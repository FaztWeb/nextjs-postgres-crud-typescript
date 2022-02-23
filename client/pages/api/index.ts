import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = JSON.parse(req.body);
  const { user: username, info, name, description } = response;
  await prisma.churchInfo.create({
    data: {
      churchName: name,
      churchDescription: description,
      churchType: info,
      editedBy: username,
    },
  });
  res.status(200).send('SUCCESS');
}
