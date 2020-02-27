import Debug from 'debug';

import { config } from 'dotenv';

config();

declare global {
  namespace NodeJS {
    interface Global {
       debug: Debug
    } 
  }
}

export const getDebug = (key) => Debug(key);

const debug = getDebug('dev');

global.debug = debug;

export default debug;
