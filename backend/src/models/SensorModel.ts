'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class Sensor extends Model {
    // static associate(models: ModelType) {
    // }
  }
  Sensor.init({
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'sensors',
  });
  return Sensor;
}