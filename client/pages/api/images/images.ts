import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import formidable from 'formidable-serverless';
import slugify from 'slugify';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), 'uploads'),
    keepExtensions: true,
    multiples: true,
    filename: (name, extension, part, form) => {
      console.log(name, extension, part, form);
      return 'ChurchImage';
    },
  });
  if (req.method === 'POST') {
    form.on('fileBegin', async (formName, file) => {
      const fileName = slugify(formName + ' ' + file.name, {
        lower: true,
        replacement: '_',
      });

      file.path = path.join(process.cwd(), 'uploads', fileName);
    });
    form.parse(req, (err, _, __) => {
      if (err) {
        res.send('Could not parse the file, please try again in a bit');
      }
    });
    res.send('OK');
  } else {
    form.parse(req, (err, fields, files) => {
      res.json({ files });
    });
  }
};
