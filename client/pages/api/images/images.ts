import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import formidable from 'formidable-serverless';
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
    .then(() => {
      return 'Fisierul exista deja' as const;
    })
    .catch((_) => 'Fisierul nu exista' as const);

async function imagesHandler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), 'uploads'),
    keepExtensions: true,
    multiples: true,
  });
  if (req.method === 'POST') {
    form.on('fileBegin', async (formName, file) => {
      const destination = folderDistrict(formName);
      fs.mkdir(path.join(process.cwd(), 'uploads', destination));
      if (
        (await fileExists(
          path.join(process.cwd(), 'uploads', destination, file.name)
        )) === 'Fisierul nu exista'
      ) {
        file.path = path.join(process.cwd(), 'uploads', destination, file.name);
      } else {
        console.log('FISIERUL EXISTAA');
        res.send({
          ok: false,
          error: 'Exista deja un fisier cu acest nume',
        });
      }
    });
    form.parse(req, (err, field, files) => {
      console.log(err);
    });
  }
}

export default imagesHandler;
