import { useSensorData } from "../context/utils/sensorDataContext";

export function useModel3DLabel(keyId: string, svg: StatusSvgType) {
    const { sensorData } = useSensorData()

    const status = sensorData[keyId]?.status

    if (status === '2') {
        return svg.warning
    } else if (status === '1') {
        return svg.running
    } else {
        return svg.idle
    }
}