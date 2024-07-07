'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            User.belongsTo(models.UserRole, { foreignKey: 'role_id' });
        }
    }
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role_id: DataTypes.INTEGER,
        granted: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'users',
    });
    return User;
};
