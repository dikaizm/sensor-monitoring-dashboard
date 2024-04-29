'use strict';

import { Model, Sequelize } from 'sequelize';
import { mysqlConfig } from '../config/database';

import UserModel from './UserModel';

const sequelize: Sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  dialect: 'mysql',
});

const db: any = {
  User: UserModel(sequelize, Sequelize)
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db