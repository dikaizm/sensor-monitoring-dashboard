import { createContext, useContext } from "react";

type SensorContextType = {
    sensorData: SensorType;
}

export const SensorContext = createContext<SensorContextType | undefined>(undefined);

export function useSensorData() {
    const context = useContext(SensorContext);
    if (!context) {
        throw new Error('useSensorData must be used within a SensorDataProvider');
    }
    return context;
}