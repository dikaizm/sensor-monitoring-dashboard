'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {
    // static associate(models: ModelType) {
    //   User.belongsTo(models.UserRole, { foreignKey: 'role_id' })
    // }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    granted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return User;
}