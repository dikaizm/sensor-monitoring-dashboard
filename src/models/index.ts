'use strict';

import { Sequelize } from 'sequelize';
import { mysqlConfig } from '../config/database';

import UserModel from './UserModel';
import UserRoleModel from './UserRoleModel';
import RegisterRequestModel from './RegisterRequestModel';
import SensorModel from './SensorModel';
import SensorActiveTimeModel from './SensorActiveTimeModel';
import ProductionModel from './ProductionModel';
import ProductModel from './ProductModel';

const sequelize: Sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  dialect: 'mysql',
});

const db: any = {
  User: UserModel(sequelize, Sequelize),
  UserRole: UserRoleModel(sequelize, Sequelize),
  RegisterRequest: RegisterRequestModel(sequelize, Sequelize),
  Sensor: SensorModel(sequelize, Sequelize),
  SensorActiveTime: SensorActiveTimeModel(sequelize, Sequelize),
  Production: ProductionModel(sequelize, Sequelize),
  Product: ProductModel(sequelize, Sequelize),
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db