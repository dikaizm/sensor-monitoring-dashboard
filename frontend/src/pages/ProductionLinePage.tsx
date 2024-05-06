import AuthenticatedLayout from "../components/AuthenticatedLayout";

export default function ProductionLinePage() {
  return (
    <AuthenticatedLayout className="h-screen overflow-x-auto">
      <div className="relative grid h-full place-item-center place-content-center">

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
                <div className="relative h-40 text-center border-r-2 w-36 map-line border-y-2"></div>

                <div className="relative flex items-end justify-center h-40 p-2 font-bold text-center text-gray-600 w-[22rem] map-line">

                  <div className="relative flex items-center mb-4">
                    <div className="w-16 h-16 map-line"></div>

                    <button className="relative w-56 h-8 border-[3px] hover:bg-purple-300 border-purple-400 border-l-0 rounded-r-lg"></button>

                    <button className="absolute w-8 h-24 top-1/2 -translate-y-1/2 left-32 bg-slate-50 border-[3px] border-blue-400 hover:bg-blue-300 rounded-lg"></button>

                    <button className="absolute w-8 h-8 -top-4 right-6 border-[3px] hover:bg-orange-300 border-orange-400 rounded-lg"></button>

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