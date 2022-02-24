import { NextApiRequest, NextApiResponse } from 'next';
import { rename } from 'fs/promises';
import { pathToFile } from 'components/Widgets/Modals/Pictures/Change/ChangeName';
import slugify from 'slugify';
import path from 'path';
import { FileUploadError, FileUploadSuccess } from '../images';

const createDestinationFolderFrom = (fromChurch: string) =>
  path.join(
    process.cwd(),
    'uploads',
    slugify(fromChurch, {
      lower: true,
      replacement: '_',
    })
  );

async function changeName(req: NextApiRequest, res: NextApiResponse) {
  const { name: filename } = req.query as { [key: string]: string };
  const { oldFilename, church, newFilename } = JSON.parse(
    req.body
  ) as pathToFile;

  const directory = createDestinationFolderFrom(church);
  console.log(oldFilename, directory, newFilename);
  const oldPath = path.join(directory, oldFilename);
  const newPath = path.join(directory, newFilename);
  try {
    await rename(oldPath, newPath);
  } catch (e) {
    res.send({
      file: newFilename,
      error: `Nu am putut schimba numele fisierului ${oldFilename}`,
      ok: false,
    } as FileUploadError);
  }
  res.send({
    ok: true,
  } as FileUploadSuccess);
}

export default changeName;
