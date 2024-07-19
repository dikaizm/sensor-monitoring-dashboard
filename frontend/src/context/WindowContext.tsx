import { ReactNode, useReducer } from "react";
import { WindowContext } from "./utils/windowContext";

interface WindowContextProviderStateType {
  [key: string]: boolean;
  photoelectric: boolean;
  camera: boolean;
  conveyor: boolean;
}

export function WindowContextProvider({ children }: { children: ReactNode }) {

  const initialState: WindowContextProviderStateType = {
    photoelectric: false,
    camera: false,
    conveyor: false
  };

  const [windowState, windowDispatch] = useReducer(sensorClickReducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function sensorClickReducer(state: WindowContextProviderStateType, action: any) {
    switch (action.type) {
      case "conveyor":
        return { conveyor: !state.conveyor, photoelectric: false, camera: false };
      case "photoelectric":
        return { photoelectric: !state.photoelectric, conveyor: false, camera: false };
      case "camera":
        return { camera: !state.camera, conveyor: false, photoelectric: false };
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
