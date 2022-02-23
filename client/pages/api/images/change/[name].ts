import { NextApiRequest, NextApiResponse } from 'next';

async function changeName(req: NextApiRequest, res: NextApiResponse) {
  const { name: filename } = req.query as { [key: string]: string };
  const newFilename = req.body;
  console.log(filename, newFilename);
  res.send({
    ok: true,
  });
}

export default changeName;
