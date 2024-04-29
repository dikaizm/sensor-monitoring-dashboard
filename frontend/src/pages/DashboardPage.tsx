export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] pt-40 sm:ml-20 overflow-x-auto">
      <div className="relative grid px-4 place-items-center">

        <div className="relative grid">
          {/* <!-- Group 1 --> */}
          <div className="flex items-end">
            <div className="flex w-40 h-40 text-center border-l-2 map-flex border-y-2">
              Proses Pembakaran
            </div>

            <div className="relative flex items-center justify-center flex-none font-bold text-center text-gray-600 border-2 border-gray-500 w-36 h-72">
              <div className="absolute right-0 z-20 grid items-center justify-center mb-16 bg-gray-200 border-l-2 border-gray-500 border-y-2 w-14 h-14 text-3xs">
                Proses Pencetakan
              </div>
              <div className="relative z-10 grid items-center justify-center w-full h-full bg-gray-200 text-2xs">
                <div className="absolute bottom-0 left-0 right-0 px-4 mb-16">Rak Penyimpanan Sementara</div>
              </div>
            </div>

            {/* <!-- Row 1 --> */}
            <div className="flex flex-col mt-4 gap-y-4">
              <div className="flex">
                <div className="w-56 h-20 text-center border-r-2 map-flex border-y-2">
                  Rak Penyimpanan Sementara
                </div>
                <div className="h-20 text-center border-r-2 map-grid border-y-2 w-14 text-3xs">
                  <div className="grid w-full h-full row-span-3 border-b-2 border-gray-500"></div>
                  <div className="w-full h-full row-span-5 map-grid-item">
                    Proses Pencetakan
                  </div>
                </div>
                <div className="w-40 h-20 text-center border-r-2 map-flex border-y-2">
                  Rak Penyimpanan Sementara
                </div>
                <div className="h-20 text-center border-r-2 map-grid border-y-2 w-14 text-3xs">
                  <div className="grid w-full h-full row-span-3 border-b-2 border-gray-500"></div>
                  <div className="w-full h-full row-span-5 map-grid-item">
                    Proses Pencetakan
                  </div>
                </div>
                <div className="h-20 text-center border-r-2 map-flex border-y-2 w-44">
                  Rak Penyimpanan Sementara
                </div>
                <div className="w-24 h-20 text-center map-flex border-y-2">
                  Proses Penggilingan
                </div>
                <div className="w-48 h-24 text-center border-2 map-flex">
                  Penyimpanan Bahan Baku
                </div>
                <div className="w-4"></div>
              </div>

              {/* <!-- Row 2 --> */}
              <div className="flex">
                <div className="relative h-40 text-center border-r-2 map-flex border-y-2 w-52">
                  Proses Penjemuran
                </div>
                <div className="relative grid items-center justify-center w-40 h-40 font-bold text-center text-gray-600 text-2xs">
                  <div className="relative w-40 h-full row-span-4 bg-gray-200 border-t-2 border-b-2 border-r-2 border-gray-500">
                    <div className="absolute top-0 left-0 grid items-center justify-center px-1 py-1 text-white bg-green-400 border-2 border-green-500 w-fit text-3xs">Kualitas 1</div>
                    <div className="absolute top-0 right-0 grid items-center justify-center px-1 py-1 text-white bg-yellow-400 border-2 border-yellow-500 w-fit text-3xs">Kualitas 2</div>
                    <div className="absolute top-0 right-0 grid items-center justify-center px-1 py-1 mt-8 text-white bg-red-400 border-2 border-red-500 w-fit text-3xs">Kualitas 3</div>

                    <button type="button" id="inspeksi-btn" data-template="inspeksi-card" className="absolute bottom-0 left-0 grid items-center justify-center w-24 h-10 text-white transition-all bg-red-500 bg-green-500 border-2 border-red-600 hover:bg-red-600">Area Inspeksi & Pengecatan</button>
                  </div>

                  <button type="button" id="pembakaran-btn" data-template="pembakaran-card" className="relative grid items-center justify-center w-full h-full row-span-4 text-white transition-all bg-red-500 border-2 border-red-600 hover:bg-red-600">
                    Proses Pembakaran
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* <!-- Popover --> */}
          {/* <div id="pembakaran-card">
                <div data-tippy-root>
                  <div className="popover">
                    <div className="tippy-content">
                      <h3 className="text-base font-bold">Proses Pembakaran</h3>
                      <div className="h-[1px] bg-gray-300 my-3"></div>
                      <div className="text-sm text-left">
                        <span className="hidden" id="id"></span>
                        <p>Tanggal: <span id="cekwaktu"></span></p>
                        <h4 className="py-2 font-bold">Suhu Pembakaran</h4>
                        <p>Celcius : <span id="ceksuhucel"></span> °C</p>
                        <p>Fahrenheit : <span id="ceksuhufah"></span> °F</p>
                      </div>
    
                      <button type="button" className="flex items-center justify-between w-full p-2 mt-4 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" id="download">
                          <path fill="#fff" d="M12 4a1 1 0 0 0-1 1v9.529l-4.218-4.223a1.043 1.043 0 0 0-1.476 0 1.046 1.046 0 0 0 0 1.478l5.904 5.91c.217.217.506.319.79.305.284.014.573-.088.79-.305l5.904-5.91a1.046 1.046 0 0 0 0-1.478 1.043 1.043 0 0 0-1.476 0L13 14.529V5a1 1 0 0 0-1-1zM5 21a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"></path>
                        </svg>
                        <span className="flex-grow px-3 text-center">Lihat semua data</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}

          {/* <div id="inspeksi-card" style="display: none;">
                <div data-tippy-root>
                  <div className="popover">
                    <div className="flex flex-col sm:flex-row">
                      <div className="tippy-content">
                        <div>
                          <h3 className="text-base font-bold">Proses Inspeksi</h3>
                          <div className="h-[1px] bg-gray-300 my-3"></div>
    
                          <div className="text-sm text-left">
                            <span className="hidden" id="genteng-id"></span>
                            <p>Tanggal Produksi: <span id="genteng-cekwaktu"></span></p>
                            <p>Status: <span id="genteng-status"></span></p>
                            <p className="font-bold">Total Produksi: <span id="genteng-total"></span></p>
                            <h4 className="py-2 font-bold">Hasil Produksi</h4>
                            <p>Kualitas 1 : <span id="genteng-bagus"></span></p>
                            <p>Kualitas 2 : <span id="genteng-batuputih"></span></p>
                            <p>Kualitas 3 : <span id="genteng-retak"></span></p>
                          </div>
    
                          <button type="button" className="flex items-center justify-between w-full p-2 mt-4 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" id="download">
                              <path fill="#fff" d="M12 4a1 1 0 0 0-1 1v9.529l-4.218-4.223a1.043 1.043 0 0 0-1.476 0 1.046 1.046 0 0 0 0 1.478l5.904 5.91c.217.217.506.319.79.305.284.014.573-.088.79-.305l5.904-5.91a1.046 1.046 0 0 0 0-1.478 1.043 1.043 0 0 0-1.476 0L13 14.529V5a1 1 0 0 0-1-1zM5 21a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"></path>
                            </svg>
                            <span className="flex-grow px-3 text-center">Lihat semua data</span>
                          </button>
                        </div>
                      </div>
    
                      <div className="w-[1px] bg-gray-300 mx-3 hidden sm:inline my-2"></div>
                      <div className="h-[1px] bg-gray-300 my-4 inline sm:hidden mx-2"></div>
    
                      <div className="w-full sm:w-[420px] p-1">
                        <h4 className="mb-1 font-bold">Grafik Hasil Produksi</h4>
                        <canvas className="h-44 sm:h-48" data-rendered="false"></canvas>
    
                        <div className="flex justify-center gap-2 mt-2 text-xs">
                          <input id="chartMinDate" className="border border-gray-300 rounded-md" type="date"  value="" min="" max="">
                            <input id="chartMaxDate" className="border border-gray-300 rounded-md" type="date"  value="" min="" max="">
                            </div>
                        </div>
    
                      </div>
                    </div>
                  </div>
                </div> */}

          {/* <!-- Group 2 --> */}
          <div className="flex mt-16 ml-24 gap-x-52">
            <div className="h-20 text-center border-2 map-flex w-52">
              Rak Penyimpanan Sementara
            </div>
            <div className="flex">
              <div className="w-40 h-20 text-center border-2 map-flex">
                Proses Pembakaran
              </div>
              <div className="relative flex items-center justify-center flex-none h-20 font-bold text-center text-gray-600 border-r-2 border-gray-500 border-y-2 w-96">
                <div className="absolute top-0 right-0 z-20 grid items-center justify-center bg-gray-200 border-b-2 border-gray-500 border-x-2 mr-28 w-14 h-14 text-3xs">
                  Proses Pencetakan
                </div>
                <div className="absolute top-0 right-0 z-20 grid items-center justify-center mr-12 bg-gray-200 border-b-2 border-gray-500 border-x-2 w-14 h-14 text-3xs">
                  Proses Pencetakan
                </div>
                <div className="relative z-10 grid items-center justify-center w-full h-full bg-gray-200 text-2xs">
                  <div className="absolute left-0 px-4 ml-6">Rak Penyimpanan Sementara</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}