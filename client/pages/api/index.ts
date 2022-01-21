import type { NextApiRequest, NextApiResponse } from 'next';

interface Church {
  info: string;
  name: string;
  description: string;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  res.status(200).send("SUCCESS");
};
