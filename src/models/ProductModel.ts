'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class Product extends Model {
    // static associate(models: ModelType) {
    // }
  }
  Product.init({
    product_code: DataTypes.STRING,
    product_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return Product;
}