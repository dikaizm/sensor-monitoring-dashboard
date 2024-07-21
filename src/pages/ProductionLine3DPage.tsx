import { Suspense, useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { useSensorData } from "../context/utils/sensorDataContext";
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
import toast from "react-hot-toast";
import { MdRefresh } from "react-icons/md";
import { useUser } from "@/context/utils/userContext";
import { UserRole } from "@/types/constant";

export default function ProductionLine3DPage() {

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

            {/* <axesHelper args={[150]} /> */}

          </Canvas>

          <SensorWindows />
          <ReloadBtn />

        </Suspense>
      </div>

    </AuthenticatedLayout>
  )
}

function ReloadBtn() {
  function handleReload() {
    window.location.reload()
  }

  return (
    <div className="absolute top-6 right-6">
      <button onClick={handleReload} type="button" className="flex items-center gap-2 px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
        <MdRefresh className="w-5 h-5" />
        <span className="text-sm font-semibold">Reload</span>
      </button>
    </div>
  )
}

function SensorWindows() {
  const { windowState, windowDispatch } = useToggleWindow()
  const [conveyorStatus, setConveyorStatus] = useState<boolean>(false)
  const [conveyorCooldown, setConveyorCooldown] = useState<boolean>(false)
  const [cameraCondition, setCameraCondition] = useState<string>("-")
  const { user } = useUser()

  const { sensorData, setSensorData } = useSensorData()

  async function getConveyorStatus() {
    const response = await fetch(`${appConfig.apiUrl}/api/sensor/conveyor/status?type=plc`)
    const data = await response.json()

    setConveyorStatus(data.data.status)
  }

  async function toggleConveyorStatus() {
    if (conveyorCooldown) return;

    setConveyorCooldown(true)
    setTimeout(() => {
      setConveyorCooldown(false)
    }, 2000)

    const response = await fetch(`${appConfig.apiUrl}/api/sensor/conveyor/toggle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("auth")}`
      }
    })
    // Handle response if unauthorized
    checkAuthStatus(response);
    if (!response.ok) {
      toast.error("Failed to toggle conveyor status")
      return
    }

    const data = await response.json()

    setConveyorStatus(data.data.status)
  }

  useEffect(() => {
    getConveyorStatus()
  }, [])

  useEffect(() => {
    setCameraCondition(sensorData.camera.value ? "Reject" : "OK")
  }, [sensorData.camera.value])

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
              <label className={"relative inline-flex items-center " + (!conveyorCooldown ? "cursor-pointer " : "cursor-progress ") + (user?.role === UserRole.MARKETING ? "cursor-not-allowed" : "")}>
                <input type="checkbox" className="sr-only peer"
                  checked={conveyorStatus}
                  onChange={toggleConveyorStatus}
                  disabled={conveyorCooldown || (user?.role === UserRole.MARKETING)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Motor speed */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Motor speed</p>
              <p className="text-sm font-semibold text-slate-700">{sensorData.conveyor_speed.value}</p>
            </div>
          </ModalWindow>
        )
      }

      {
        windowState.camera && (
          <ModalWindow title="Camera Inspection" onClose={() => {
            windowDispatch({ type: "camera" })
          }}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Condition</p>
              <p className="text-sm font-semibold text-slate-700">{cameraCondition}</p>
            </div>
          </ModalWindow>
        )
      }

      {
        windowState.ultrasonic && (
          <ModalWindow title="Ultrasonic Sensor" onClose={() => {
            windowDispatch({ type: "ultrasonic" })
          }}>
            {/* Sensor status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" className="p-1 text-white bg-blue-500 rounded-full hover:bg-blue-600" onClick={async () => {
                  try {
                    const response = await fetch(`${appConfig.apiUrl}/api/production/refresh`, {
                      method: "GET",
                      headers: {
                        "Authorization": `Bearer ${Cookies.get("auth")}`
                      }
                    })
                    if (!response.ok) {
                      throw new Error("Failed to refresh count")
                    }
                    const data = await response.json()
                    setSensorData({ ...sensorData, ultrasonic: { value: data.data } })

                    toast.success("Count refreshed")
                  } catch (error) {
                    toast.error("Failed to refresh count")
                  }
                }}>
                  <MdRefresh className="w-5 h-5" />
                </button>
                <p className="text-sm font-semibold text-slate-700">Count</p>
              </div>
              <p className="text-sm font-semibold text-slate-700">{sensorData.ultrasonic.value}</p>
            </div>
          </ModalWindow>
        )
      }

    </>
  )
}