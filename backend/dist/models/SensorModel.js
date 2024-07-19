'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Product extends sequelize_1.Model {
    }
    Product.init({
        name: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'sensors',
    });
    return Product;
};
