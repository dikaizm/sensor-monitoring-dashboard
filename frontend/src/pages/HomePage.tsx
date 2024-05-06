import { TbHeartRateMonitor } from "react-icons/tb"
import AppLogo from "../components/AppLogo"
import AuthenticatedLayout from "../components/AuthenticatedLayout"

export default function HomePage() {

  const isAuthenticated: boolean = true

  if (!isAuthenticated) {
    return (
      <div className="relative flex flex-col justify-between min-h-screen mx-auto bg-slate-50">
        <div className="relative flex justify-between gap-4 px-8 py-4">
          <a href="/">
            <AppLogo />
          </a>

          <div className="flex items-center gap-3">
            <a className="px-3 py-2 text-white bg-blue-500 rounded-lg" href="/login">Masuk</a>
            <a className="px-3 py-2 text-blue-500 border border-blue-500 rounded-lg" href="/register">Daftar Akun</a>
          </div>
        </div>

        <div className="flex items-center justify-center h-full px-6">
          <HomeBanner />
        </div>

        <div className="w-full py-8 text-center">
          <p className="text-sm text-slate-500">Copyright 2024</p>
        </div>
      </div>
    )
  }

  return (
    <AuthenticatedLayout className="h-screen">
      <div className="relative grid h-full p-6 place-content-center">
        <HomeBanner />
      </div>
    </AuthenticatedLayout>
  )
}

function HomeBanner() {
  return (
    <div className="p-8 bg-white border rounded-lg max-w-[32rem]">
      <div className="flex items-center gap-4 p-4 text-white bg-blue-500 border rounded-lg">
        <TbHeartRateMonitor className="w-10 h-10" />
        <h1 className="text-2xl font-semibold">Dashboard Monitoring Produksi</h1>
      </div>
      <p className="mt-6">PT XYZ adalah pabrik genteng berpusat di jatiwangi kabupaten majelengka Jawa Barat & sudah menjadi pabrik genteng yg dipercaya di kawasan Jawa Barat. Genteng dibuat dari tanah liat coklat dengan kualitas tanah yg sangat baik untuk pembuatan genteng.</p>
    </div>
  )
}