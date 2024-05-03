import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

export default function HomePage() {
  return (
    <>
      <Topbar />
      <Sidebar />

      <main>
        <div>HomePage</div>
        <a href="/login">Login</a>
      </main>
    </>
  )
}