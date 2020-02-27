import { Options } from 'sequelize';
import { config  } from 'dotenv';

import Debug from 'debug';

config();

declare const debug;

declare global {
  namespace NodeJS {
    interface Global {
       debug: any
    } 
  }
}

global.debug = Debug('db');

const environment = process.env.NODE_ENV || 'development';
const { POSTGRESQL_DATABASE_URL, POSTGRESQL_DATABASE_TEST_URL } = process.env;

const databaseUrls = {
  development: POSTGRESQL_DATABASE_URL,
  staging: POSTGRESQL_DATABASE_URL,
  test: POSTGRESQL_DATABASE_TEST_URL,
  production: POSTGRESQL_DATABASE_URL
};

export const url = databaseUrls[environment];

export const dbConfig: Options = {
  dialect:  'postgres'
};

