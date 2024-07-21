'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
  class Production extends Model {
    static associate(models: ModelType) {
      Production.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
  }
  Production.init({
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'productions',
  });
  return Production;
}