export interface MqttSensorType {
    tag_name: string
    value: string
    timestamp: string
    message_type: string
}

export interface PhotoelectricType {
    status: string
    created_at: string
}

export interface CameraType {
    value: string
    created_at: string
}

export interface ConveyorType {
    status: string
    speed: string
    created_at: string
}

export interface ProductTodayType {
    product_code: string
    name: string
    quantity: number
    created_at: string
    updated_at: string
}