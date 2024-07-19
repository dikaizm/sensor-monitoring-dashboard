'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class RegisterRequest extends Model {
    // static associate(models: ModelType) {
    // }
  }
  RegisterRequest.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'register_requests',
  });
  return RegisterRequest;
}