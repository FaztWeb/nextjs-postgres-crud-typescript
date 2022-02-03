import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import formidable from 'formidable-serverless';
import slugify from 'slugify';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const folderDistrict = (name: string) =>
  slugify(name, {
    lower: true,
    replacement: '_',
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), 'uploads'),
    keepExtensions: true,
    multiples: true,
  });
  if (req.method === 'POST') {
    form.on('fileBegin', async (formName, file) => {
      const destination = folderDistrict(formName);
      fs.mkdir(path.join(process.cwd(), 'uploads', destination));

      file.path = path.join(process.cwd(), 'uploads', destination, file.name);
    });
    form.parse(req, (err, _, __) => {
      console.log(err);
      if (err) {
        res.send('Could not parse the file, please try again in a bit');
        return;
      }
      res.send('OK');
    });
  }
};
