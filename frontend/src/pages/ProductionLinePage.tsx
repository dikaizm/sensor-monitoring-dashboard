import AuthenticatedLayout from "../components/AuthenticatedLayout";

export default function ProductionLinePage() {
  return (
    <AuthenticatedLayout className="h-screen overflow-x-auto">
      <div className="relative grid h-full place-item-center place-content-center">

        <div className="relative grid">
          {/* <!-- Group 1 --> */}
          <div className="flex items-end">
            <div className="flex w-40 h-40 text-center border-l-2 map-flex border-y-2"></div>

            <div className="relative flex items-center justify-center flex-none h-[17rem] font-bold text-center text-gray-600 border-2 w-36">
              <div className="relative z-10 grid items-center justify-center w-full h-full text-2xs">
                <div className="absolute bottom-0 left-0 right-0 px-4 mb-16"></div>
              </div>
            </div>

            {/* <!-- Row 1 --> */}
            <div className="flex flex-col gap-y-4">
              <div className="flex">
                <div className="h-24 border-r-2 map-flex border-y-2 w-44"></div>
                <div className="w-24 h-20 map-flex border-y-2"></div>
                <div className="h-24 border-x-2 map-flex border-y-2 w-44"></div>
                <div className="w-24 h-20 map-flex border-y-2"></div>
                <div className="h-24 border-2 w-44 map-flex"></div>
              </div>

              {/* <!-- Row 2 --> */}
              <div className="flex">
                <div className="relative h-40 text-center border-r-2 w-44 map-flex border-y-2"></div>
                <div className="relative grid items-center justify-center h-40 font-bold text-center text-gray-600 text-2xs">

                  <div className="relative h-full row-span-4 bg-gray-200 border-t-2 border-b-2 border-gray-500 w-[17rem] border-x-2">
                    <div className="absolute top-0 left-0 grid items-center justify-center px-1 py-1 text-white bg-green-400 border-2 border-green-500 w-fit text-3xs">Kualitas 1</div>
                    <div className="absolute top-0 right-0 grid items-center justify-center px-1 py-1 text-white bg-yellow-400 border-2 border-yellow-500 w-fit text-3xs">Kualitas 2</div>
                    <div className="absolute top-0 right-0 grid items-center justify-center px-1 py-1 mt-8 text-white bg-red-400 border-2 border-red-500 w-fit text-3xs">Kualitas 3</div>

                    <button type="button" id="inspeksi-btn" data-template="inspeksi-card" className="absolute bottom-0 left-0 grid items-center justify-center w-24 h-10 text-white transition-all bg-red-500 border-2 border-red-600 hover:bg-red-600">Area Inspeksi & Pengecatan</button>
                  </div>

                  <button type="button" id="pembakaran-btn" data-template="pembakaran-card" className="relative grid items-center justify-center w-full h-full row-span-4 text-white transition-all bg-red-500 border-2 border-red-600 hover:bg-red-600">
                    Proses Pembakaran
                  </button>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  )
}