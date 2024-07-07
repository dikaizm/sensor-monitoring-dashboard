import { InitialWindowOpen } from "@/types/constant";
import { ReactNode, createContext, useContext, useState } from "react";

type WindowStateContextProps = {
  windowState: WindowOpenType;
  toggleWindowState: (key: string) => void;
  currentWindowState: string;
}

type WindowStateProviderProps = {
  children: ReactNode
}

const WindowStateContext = createContext<WindowStateContextProps>({} as WindowStateContextProps)

const WindowStateProvider = ({ children }: WindowStateProviderProps) => {
  const [windowState, setWindowState] = useState<WindowOpenType>(InitialWindowOpen)
  const [currentWindowState, setCurrentWindowState] = useState<string>('')

  const toggleWindowState = (key: string) => {
    let value: boolean = false;
    setWindowState((prev) => {
      value = !prev[key]
      const state = { ...prev, [key]: value }

      Object.keys(state).forEach((k) => {
        if (k !== key) state[k] = false
      })

      return state
    })

    setCurrentWindowState(value ? key : '')
  }

  return (
    <WindowStateContext.Provider value={{ windowState, toggleWindowState, currentWindowState }}>
      {children}
    </WindowStateContext.Provider>
  )
}

const useWindowState = () => {
  const context = useContext(WindowStateContext)
  if (!context) {
    throw new Error('useWindowState must be used within a WindowStateProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { WindowStateProvider, useWindowState }