interface SensorValueType {
    [key: string]: string | number | boolean
    value: string | number | boolean
}

interface SensorType {
    [key: string]: SensorValueType
    conveyor_status: SensorValueType
    conveyor_speed: SensorValueType
    ultrasonic: SensorValueType
    camera: SensorValueType
}

interface Model3DType {
    keyId?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    clickable?: boolean;
    setObjState?: React.Dispatch<React.SetStateAction<Model3DStateType>>;
    setLastClick?: React.Dispatch<React.SetStateAction<string>>;
}

interface IconType {
    active?: boolean;
    className?: string;
}

interface WindowOpenType {
    [key: string]: boolean;
    camera: boolean;
    ultrasonic: boolean;
    conveyor: boolean;
}

interface StatusSvgType {
    idle: string;
    running: string;
    warning: string;
}

interface UserType {
    email: string;
    name: string;
    role: string;
}