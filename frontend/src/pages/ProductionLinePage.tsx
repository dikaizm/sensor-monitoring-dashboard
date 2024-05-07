import { useReducer } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import TooltipWindow from "../components/TooltipWindow";
import ModalWindow from "../components/ModalWindow";
import { useToggleTooltip } from "../context/utils/tooltipContext";
import TooltipLabel from "../components/TooltipLabel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mouseHoverReducer(state: any, action: any) {
  switch (action.type) {
    case "IN_photoelectric":
      return { ...state, photoelectric: true };
    case "OUT_photoelectric":
      return { ...state, photoelectric: false };
    case "IN_camera":
      return { ...state, camera: true };
    case "OUT_camera":
      return { ...state, camera: false };
    case "IN_conveyor":
      return { ...state, conveyor: true };
    case "OUT_conveyor":
      return { ...state, conveyor: false };
    default:
      return state;
  }
}

export default function ProductionLinePage() {
  const [mouseHoverState, mouseHoverDispatch] = useReducer(mouseHoverReducer, { photoelectric: false, camera: false, conveyor: false })
  const { tooltipState, tooltipDispatch } = useToggleTooltip()

  return (
    <AuthenticatedLayout className="h-screen overflow-x-auto">
      <div className="relative grid h-full place-item-center place-content-center">

        <ModalWindow />

        <div className="relative grid">
          {/* <!-- Group 1 --> */}
          <div className="flex items-end gap-1">
            <div className="flex w-40 h-40 text-center border-l-2 map-line border-y-2"></div>

            <div className="relative flex items-center justify-center flex-none w-40 font-bold text-center text-gray-600 border-2 map-line h-80">
              <div className="relative z-10 grid items-center justify-center w-full h-full text-2xs">
                <div className="absolute bottom-0 left-0 right-0 px-4 mb-16"></div>
              </div>
            </div>

            {/* <!-- Row 1 --> */}
            <div className="flex flex-col gap-y-16">
              <div className="flex gap-x-1">
                <div className="h-24 border-r-2 map-line border-y-2 w-36"></div>
                <div className="w-24 h-20 map-line border-y-2"></div>
                <div className="h-24 border-x-2 map-line border-y-2 w-36"></div>
                <div className="w-24 h-20 map-line border-y-2"></div>
                <div className="h-24 border-2 w-36 map-line"></div>
              </div>

              {/* <!-- Row 2 --> */}
              <div className="flex gap-x-1">
                <div className="relative h-40 border-r-2 w-36 map-line border-y-2"></div>

                <div className="relative flex items-end justify-center h-40 p-2 text-gray-600 w-[22rem] map-line">

                  <div className="relative flex items-center mb-4">
                    <div className="w-16 h-16 map-line"></div>

                    <div
                      onClick={() => {
                        tooltipDispatch({ type: "CLICK_conveyor" })
                      }}
                      onMouseEnter={() => {
                        mouseHoverDispatch({ type: "IN_conveyor" })
                      }}
                      onMouseLeave={() => {
                        mouseHoverDispatch({ type: "OUT_conveyor" })
                      }}

                      className={"relative w-56 h-8 border-[3px] hover:bg-purple-300 border-purple-400 border-l-0 rounded-r-lg " + (tooltipState.conveyor ? 'bg-purple-300' : '')}>
                      {(tooltipState.conveyor) && (
                        <TooltipWindow onClose={() => {
                          tooltipDispatch({ type: "CLICK_conveyor" })
                        }} color="purple" label="Conveyor">
                          <div className="grid grid-cols-2 p-3 text-sm font-medium">
                            <div className="flex flex-col gap-2">
                              <p>Status</p>
                              <p>Kecepatan</p>
                            </div>

                            <div className="flex flex-col gap-2">
                              <p>ON</p>
                              <p>100%</p>
                            </div>
                          </div>
                        </TooltipWindow>
                      )}
                      {(mouseHoverState.conveyor && !tooltipState.conveyor) && (
                        <TooltipLabel>Conveyor</TooltipLabel>
                      )}
                    </div>

                    <div
                      onClick={() => {
                        tooltipDispatch({ type: "CLICK_photoelectric" })
                      }}
                      onMouseEnter={() => {
                        mouseHoverDispatch({ type: "IN_photoelectric" })
                      }}
                      onMouseLeave={() => {
                        mouseHoverDispatch({ type: "OUT_photoelectric" })
                      }}
                      className={"absolute w-8 h-24 top-1/2 -translate-y-1/2 left-32 bg-slate-50 border-[3px] border-blue-400 hover:bg-blue-300 rounded-lg z-0 " + (tooltipState.photoelectric ? 'bg-blue-400' : '')}>
                      {(tooltipState.photoelectric) &&
                        (<TooltipWindow color="blue" label="Photoelectric Sensor">
                          <div className="grid grid-cols-2 gap-2 p-3 text-sm font-medium">
                            <div className="flex flex-col gap-2">
                              <p>Jumlah Produksi</p>
                            </div>

                            <div className="flex flex-col gap-2">
                              <p>14</p>
                            </div>
                          </div>
                        </TooltipWindow>)}

                      {(mouseHoverState.photoelectric && !tooltipState.photoelectric) && (
                        <TooltipLabel>Photoelectric Sensor</TooltipLabel>
                      )}
                    </div>

                    <div
                      onClick={() => {
                        tooltipDispatch({ type: "CLICK_camera" })
                      }}
                      onMouseEnter={() => {
                        mouseHoverDispatch({ type: "IN_camera" })
                      }}
                      onMouseLeave={() => {
                        mouseHoverDispatch({ type: "OUT_camera" })
                      }}
                      className={"absolute w-8 h-8 -top-4 right-6 border-[3px] hover:bg-orange-300 border-orange-400 rounded-lg z-0 " + (tooltipState.camera ? 'bg-orange-300' : '')}>

                      {(tooltipState.camera) && (<TooltipWindow color="orange" label="Camera Inspection">
                        <div className="grid grid-cols-2 p-3 text-sm font-medium">
                          <div className="flex flex-col gap-2">
                            <p>Periksa</p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <p>OK</p>
                          </div>
                        </div>
                      </TooltipWindow>)}

                      {(mouseHoverState.camera && !tooltipState.camera) && (
                        <TooltipLabel>Camera Inspection</TooltipLabel>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  )
}