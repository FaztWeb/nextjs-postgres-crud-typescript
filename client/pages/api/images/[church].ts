import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import slugify from 'slugify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { church } = req.query as { [key: string]: string };
  const destinationFolder = path.join(
    process.cwd(),
    'uploads',
    slugify(church, {
      lower: true,
      replacement: '_',
    })
  );
  try {
    console.log(destinationFolder);
    const fileNames = await fs.readdir(destinationFolder);
    const files = await Promise.all(
      fileNames.map(
        async (filename) =>
          await fs.readFile(path.join(destinationFolder, filename), 'base64')
      )
    );
    console.log(files);
    res.json(files);
  } catch (e) {
    res.json({
      error: true,
      Error: `${e}`,
    });
  }
}
