'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class SensorActiveTime extends sequelize_1.Model {
        static associate(models) {
            SensorActiveTime.belongsTo(models.Sensor, { foreignKey: 'sensor_id' });
        }
    }
    SensorActiveTime.init({
        sensor_id: DataTypes.INTEGER,
        client_id: DataTypes.TEXT,
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        running_sec: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'sensor_active_times',
    });
    return SensorActiveTime;
};
