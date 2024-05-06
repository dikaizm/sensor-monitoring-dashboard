import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarContextProvider } from "../context/SidebarContext";
import { useToggleSidebar } from "../context/utils/sidebarContext";

interface AuthenticatedLayoutType {
  children: ReactNode
  className?: string
}

export default function AuthenticatedLayout({ children, className }: AuthenticatedLayoutType) {
  return (
    <SidebarContextProvider>
      <Topbar />
      <Sidebar />

      <InsiderLayout className={className}>
        {children}
      </InsiderLayout>
    </SidebarContextProvider>
  )
}

function InsiderLayout({ children, className }: AuthenticatedLayoutType) {
  const { isSidebarOpen } = useToggleSidebar()

  return (
    <div className={"min-h-screen pt-16 bg-slate-50 transition-all duration-75 " + (className ? className : '') + (isSidebarOpen ? ' sm:ml-56' : ' sm:ml-[4.5rem]')}>
      {children}
    </div>
  )
}