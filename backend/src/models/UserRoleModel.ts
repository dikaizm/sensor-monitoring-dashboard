'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default function(sequelize: Sequelize, DataTypes: any) {
  class UserRole extends Model {
    // code
  }
  UserRole.init({
    role_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_roles',
  });
  return UserRole;
};