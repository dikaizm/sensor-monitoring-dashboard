'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class RegisterRequest extends sequelize_1.Model {
    }
    RegisterRequest.init({
        user_id: DataTypes.INTEGER,
        role_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'register_requests',
    });
    return RegisterRequest;
};
