'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Production extends sequelize_1.Model {
        static associate(models) {
            Production.belongsTo(models.Product, { foreignKey: 'product_id' });
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
};
