'use strict';

import { Model, Sequelize } from 'sequelize'

export default function(sequelize: Sequelize, DataTypes: any) {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  UserRole.init({
    role_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_roles',
  });
  return UserRole;
};