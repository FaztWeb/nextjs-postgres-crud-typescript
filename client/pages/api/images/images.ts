import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import formidable from 'formidable';
import slugify from 'slugify';
import fs, { stat } from 'fs/promises';

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

const fileExists = async (path: string) =>
  await stat(path)
    .then(() => true)
    .catch(() => false);

async function imagesHandler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    uploadDir: path.join(process.cwd(), 'uploads'),
    keepExtensions: true,
    multiples: true,
  });
  if (req.method === 'POST') {
    form.on('fileBegin', (formName, file) => {
      const destination = folderDistrict(formName);
      console.log(file);
      const pathToFile = path.join(
        process.cwd(),
        'uploads',
        destination,
        file.originalFilename as string
      );
      file.filepath = pathToFile;
    });
    form.parse(req, (err, field, files) => {
      console.log(err, field, files);
    });
  }
}

export default imagesHandler;
