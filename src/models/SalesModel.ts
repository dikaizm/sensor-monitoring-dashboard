'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class Sales extends Model {
    static associate(models: ModelType) {
      Sales.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
  }
  Sales.init({
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sales',
  });
  return Sales;
}