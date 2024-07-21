import { ReactNode, useReducer } from "react";
import { WindowContext } from "./utils/windowContext";

interface WindowContextProviderStateType {
  [key: string]: boolean;
  ultrasonic: boolean;
  camera: boolean;
  conveyor: boolean;
}

export function WindowContextProvider({ children }: { children: ReactNode }) {

  const initialState: WindowContextProviderStateType = {
    ultrasonic: false,
    camera: false,
    conveyor: false
  };

  const [windowState, windowDispatch] = useReducer(sensorClickReducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function sensorClickReducer(state: WindowContextProviderStateType, action: any) {
    switch (action.type) {
      case "conveyor":
        return { conveyor: !state.conveyor, ultrasonic: false, camera: false };
      case "ultrasonic":
        return { ultrasonic: !state.ultrasonic, conveyor: false, camera: false };
      case "camera":
        return { camera: !state.camera, conveyor: false, ultrasonic: false };
      default:
        return state;
    }
  }

  return (
    <WindowContext.Provider value={{ windowState, windowDispatch }} >
      {children}
    </WindowContext.Provider>
  );
}
