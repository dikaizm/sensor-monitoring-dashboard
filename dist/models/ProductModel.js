'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Product extends sequelize_1.Model {
    }
    Product.init({
        product_code: DataTypes.STRING,
        product_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'products',
    });
    return Product;
};
