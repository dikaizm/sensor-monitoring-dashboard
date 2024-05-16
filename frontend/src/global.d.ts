interface SensorValueType {
    [key: string]: string
    value: string
}

interface SensorType {
    [key: string]: SensorValueType
    conveyor_status: SensorValueType
    conveyor_speed: SensorValueType
    photoelectric: SensorValueType
    camera: SensorValueType
}