'use strict';

import { Model, Sequelize } from 'sequelize'
import { ModelType } from '../types/model';

export default (sequelize: Sequelize, DataTypes: any) => {
    class SensorActiveTime extends Model {
        static associate(models: ModelType) {
            SensorActiveTime.belongsTo(models.Sensor, { foreignKey: 'sensor_id' })
        }
    }
    SensorActiveTime.init({
        sensor_id: DataTypes.INTEGER,
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        running_sec: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'sensor_active_times',
    });
    return SensorActiveTime;
}