import { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { stat, mkdir } from 'fs/promises';
import { createWriteStream } from 'fs';
import busboy from 'busboy';
import path from 'path/posix';

export interface FileUploadError {
  ok: false;
  error: string;
  file: string;
}

export interface FileUploadSuccess {
  ok: true;
  message: string;
  file: undefined;
}

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
  const busBoyParser = busboy({
    headers: req.headers,
  });

  busBoyParser.on('file', async (name, stream, info) => {
    const folderName = folderDistrict(
      Buffer.from(name, 'latin1').toString('utf8')
    );

    console.log(folderName);
    const pathToFolder = path.join(process.cwd(), 'uploads', folderName);
    const pathToFile = path.join(pathToFolder, info.filename);

    try {
      await mkdir(pathToFolder, {
        recursive: true,
      });
    } catch (e) {
      // ignore if the folder was already there
      console.log(e);
    } finally {
      if (await fileExists(pathToFile)) {
        console.log('File is already there');
        res.send({
          ok: false,
          error: `Fisierul a mai fost incarcat. Va rugam schimbati numele fisierului ${info.filename}`,
          file: info.filename,
        } as FileUploadError);
        res.end();
      } else {
        console.log('Uploading file');
        stream.pipe(createWriteStream(pathToFile));
        res.send({
          ok: true,
          message: 'Fisierul a fost procesat cu success',
        } as FileUploadSuccess);
      }
    }
  });
  busBoyParser.on('error', () => {
    res.send({
      ok: false,
      error:
        'O eroare a aparut in sistem, va rugam incercati din nou mai tarziu',
    } as FileUploadError);
    res.end();
  });
  req.pipe(busBoyParser);
}

export default imagesHandler;
