/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { Sequelize } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { dbConfig, url } from '../config/sequelize';

const basename = path.basename(__filename);

const sequelize = new Sequelize(url, dbConfig);

const database: any = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (/\.[jt]s/.test(file.slice(-3))))
  .forEach((file) => {
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    const model = require(path.join(__dirname, file)).default.__init__(sequelize);

    database[model.name] = model;
  });

Object.keys(database).forEach((model) => {
  database[model].models = database;
  if (database[model].associate) {
    database[model].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export default database;
