'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class Product extends Model {
    // static associate(models: ModelType) {
    // }
  }
  Product.init({
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'sensors',
  });
  return Product;
}