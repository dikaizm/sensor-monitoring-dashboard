'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize, DataTypes) {
    class UserRole extends sequelize_1.Model {
    }
    UserRole.init({
        role_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'user_roles',
    });
    return UserRole;
}
exports.default = default_1;
;
