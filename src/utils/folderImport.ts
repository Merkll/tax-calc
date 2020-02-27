import path from 'path';
import fs, { PathLike } from 'fs';
import _ from 'lodash';

const readSingleFile = (filePath) => {
  if (fs.statSync(filePath).isFile()) return filePath;

  return readdir(filePath)
}

const readdir = (dir) => {
  const filesInDir = fs.readdirSync(dir).map((file) => readSingleFile(path.join(dir, file)));

  return _.flatten(filesInDir);
}

export function *folderImport(dir: PathLike, excludedFiles:Array<String>, compare?: Function) {
 const filesInDir = readdir(dir);
 for (const file of  filesInDir) {
   const fileName = path.basename(file);
   const shouldYield = compare ? compare(file) : !(excludedFiles.includes(fileName))

   if (shouldYield) yield file;
 }
};
