'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class UserRole extends Model {
    // static associate(models: ModelType) {
    //   UserRole.hasMany(models.User)
    // }
  }
  UserRole.init({
    name: DataTypes.STRING,
    view_access: DataTypes.BOOLEAN,
    modify_access: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
}