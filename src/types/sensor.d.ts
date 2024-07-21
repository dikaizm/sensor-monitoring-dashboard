export interface MqttSensorType {
    tag_name: string
    value: string
    timestamp: any
    message_type: string
}

export interface UltrasonicType {
    value: boolean
    created_at: any
}

export interface CameraType {
    value: string
    created_at: any
}

export interface ConveyorType {
    status: string
    speed: string
    created_at: any
}