import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req.body);
  res.status(200).json({ result: "BESERK" })
};
