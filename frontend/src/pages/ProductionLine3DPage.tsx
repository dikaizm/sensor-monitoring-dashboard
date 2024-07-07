import { Suspense } from "react";
// import { useReducer } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import ModalWindow from "../components/ModalWindow";
// import { useToggleTooltip } from "../context/utils/tooltipContext";
// import { useSensorData } from "../context/utils/sensorDataContext";
import { Canvas } from "@react-three/fiber";
import ModelGroup from "@/components/3d/ModelGroup";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ground from "@/components/3d/scenes/Ground";
import { Environment } from "@/components/3d/scenes/Environment";
import Lights from "@/components/3d/scenes/Lights";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function mouseHoverReducer(state: any, action: any) {
//   switch (action.type) {
//     case "IN_photoelectric":
//       return { ...state, photoelectric: true };
//     case "OUT_photoelectric":
//       return { ...state, photoelectric: false };
//     case "IN_camera":
//       return { ...state, camera: true };
//     case "OUT_camera":
//       return { ...state, camera: false };
//     case "IN_conveyor":
//       return { ...state, conveyor: true };
//     case "OUT_conveyor":
//       return { ...state, conveyor: false };
//     default:
//       return state;
//   }
// }

export default function ProductionLine3DPage() {
  // const [mouseHoverState, mouseHoverDispatch] = useReducer(mouseHoverReducer, { photoelectric: false, camera: false, conveyor: false })
  // const { tooltipState, tooltipDispatch } = useToggleTooltip()

  // const { sensorData } = useSensorData()

  return (
    <AuthenticatedLayout className="h-screen overflow-x-auto">
      <div className="relative h-full place-item-center place-content-center">

        <ModalWindow />

        <Suspense fallback={
          <div className="flex flex-col items-center justify-center h-full bg-scene">
            <div className="animateContainer">
              <div className="circleCell" />
              <div className="circleCell" />
              <div className="circleCell" />
            </div>

            <span>Sedang memuat model...</span>
          </div>
        }>
          <Canvas
            // frameloop="demand" 
            // shadows
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            dpr={window.devicePixelRatio}
          >

            <ModelGroup />

            <Ground position={[20, 0]} size={1000} />

            <Environment />
            <Lights />

            <OrbitControls
              target={[0, 0.4, 0]}
              maxDistance={600}
              maxPolarAngle={1.5}
            />
            <PerspectiveCamera makeDefault fov={60} position={[0, 200, -300]} />

            {/* <axesHelper args={[150]} /> */}

          </Canvas>

          {/* <Windows /> */}

        </Suspense>
      </div>
    </AuthenticatedLayout>
  )
}