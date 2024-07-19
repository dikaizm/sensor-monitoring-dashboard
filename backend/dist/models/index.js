'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const UserModel_1 = __importDefault(require("./UserModel"));
const UserRoleModel_1 = __importDefault(require("./UserRoleModel"));
const RegisterRequestModel_1 = __importDefault(require("./RegisterRequestModel"));
const SensorModel_1 = __importDefault(require("./SensorModel"));
const sequelize = new sequelize_1.Sequelize(database_1.mysqlConfig.database, database_1.mysqlConfig.user, database_1.mysqlConfig.password, {
    host: database_1.mysqlConfig.host,
    port: database_1.mysqlConfig.port,
    dialect: 'mysql',
});
const db = {
    User: (0, UserModel_1.default)(sequelize, sequelize_1.Sequelize),
    UserRole: (0, UserRoleModel_1.default)(sequelize, sequelize_1.Sequelize),
    RegisterRequest: (0, RegisterRequestModel_1.default)(sequelize, sequelize_1.Sequelize),
    Sensor: (0, SensorModel_1.default)(sequelize, sequelize_1.Sequelize),
};
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
