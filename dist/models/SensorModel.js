'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Sensor extends sequelize_1.Model {
    }
    Sensor.init({
        name: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'sensors',
    });
    return Sensor;
};
