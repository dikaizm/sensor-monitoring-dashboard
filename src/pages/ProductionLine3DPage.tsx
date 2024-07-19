import { Suspense, useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
// import { useSensorData } from "../context/utils/sensorDataContext";
import { Canvas } from "@react-three/fiber";
import ModelGroup from "@/components/3d/ModelGroup";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ground from "@/components/3d/scenes/Ground";
import { Environment } from "@/components/3d/scenes/Environment";
import Lights from "@/components/3d/scenes/Lights";
import ModalWindow from "@/components/ModalWindow";
import { useToggleWindow } from "@/context/utils/windowContext";
import appConfig from "@/config/env";
import Cookies from "js-cookie";
import { checkAuthStatus } from "@/util/checkAuth";

export default function ProductionLine3DPage() {

  // const { sensorData } = useSensorData()

  return (
    <AuthenticatedLayout className="h-screen overflow-x-auto">
      <div className="relative h-full place-item-center place-content-center">

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

            <axesHelper args={[150]} />

          </Canvas>

          <SensorWindows />

        </Suspense>
      </div>
    </AuthenticatedLayout>
  )
}

function SensorWindows() {
  const { windowState, windowDispatch } = useToggleWindow()
  const [conveyorStatus, setConveyorStatus] = useState<boolean>(false)
  const [conveyorCooldown, setConveyorCooldown] = useState<boolean>(false)

  async function getConveyorStatus() {
    const response = await fetch(`${appConfig.apiUrl}/api/sensor/conveyor/status`)
    const data = await response.json()

    setConveyorStatus(data.data.status)
  }

  async function toggleConveyorStatus() {
    if (conveyorCooldown) return;

    const response = await fetch(`${appConfig.apiUrl}/api/sensor/conveyor/toggle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("auth")}`
      }
    })
    // Handle response if unauthorized
    checkAuthStatus(response);
    const data = await response.json()
    console.log(data);

    setConveyorCooldown(true)
    setTimeout(() => {
      setConveyorCooldown(false)
    }, 3000)

    setConveyorStatus(data.data.status)
  }

  useEffect(() => {
    getConveyorStatus()
  }, [])

  return (
    <>
      {
        windowState.conveyor && (
          <ModalWindow title="Conveyor" onClose={() => {
            windowDispatch({ type: "conveyor" })
          }}>
            {/* Status and toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Status</p>
              {/* Toggle input */}
              <label className={"relative inline-flex items-center " + (!conveyorCooldown ? "cursor-pointer" : "cursor-progress")}>
                <input type="checkbox" className="sr-only peer"
                  checked={conveyorStatus}
                  onChange={toggleConveyorStatus}
                  disabled={conveyorCooldown}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Motor speed */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Motor speed</p>
              <p className="text-sm font-semibold text-slate-700">100%</p>
            </div>
          </ModalWindow>
        )
      }

      {
        windowState.camera && (
          <ModalWindow title="Camera Inspection" onClose={() => {
            windowDispatch({ type: "camera" })
          }}>
            {/* Camera feed */}
            <div className="flex items-center justify-center">
            </div>
          </ModalWindow>
        )
      }

      {
        windowState.photoelectric && (
          <ModalWindow title="Photoelectric Sensor" onClose={() => {
            windowDispatch({ type: "photoelectric" })
          }}>
            {/* Sensor status */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Status</p>
              <p className="text-sm font-semibold text-slate-700">Normal</p>
            </div>
          </ModalWindow>
        )
      }

    </>
  )
}