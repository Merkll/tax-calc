import path from 'path';
import { folderImport } from '@utils/folderImport';

declare const debug;

const fileCompare = (file) => file !== __filename
const files = folderImport(__dirname, ['index.ts'], fileCompare);

const getMiddleares = (rootPath: string, middlewares: {mid: any, exclude: string}[]) => {
  return middlewares.filter((middleware) => middleware.exclude !== rootPath).map((middleware) => middleware.mid);
}

export default (Router, middlewares = []) => {
  const router = new Router({
    prefix: '/api'
  });


  for (const f of files) {
    const rootPath = path.relative(__dirname, f);
    const parsedPath = path.parse(rootPath);
    const rootDir = path.dirname(rootPath) === '.' ? '/' : parsedPath.base !== 'index.ts' ? `/${parsedPath.dir}/${parsedPath.name}` : `/${parsedPath.dir}`;
    
    debug("loading route: ", rootDir, parsedPath, middlewares)
    
    const returnedRouter = require(f).default(new Router());

    router.use(rootDir, ...getMiddleares(rootDir, middlewares), returnedRouter);
  }
  
  return router;
};