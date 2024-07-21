import { Dispatch, createContext, useContext } from "react"

interface WindowContextType {
    windowState: {
        [key: string]: boolean
        ultrasonic: boolean
        camera: boolean
        conveyor: boolean
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    windowDispatch: Dispatch<any>
}

export const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function useToggleWindow() {
    const context = useContext(WindowContext)
    if (!context) {
        throw new Error('useToggleWindow must be used within WindowProvider')
    }
    return context
}