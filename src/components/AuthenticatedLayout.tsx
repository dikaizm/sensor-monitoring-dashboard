import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';
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

      <Toaster
        containerClassName='toaster-wrapper'
        containerStyle={{
          fontSize: '0.75rem',
        }}
        toastOptions={{
          style: {
            background: '#282B39',
            color: '#fff',
            borderRadius: '999px',
            border: '1px solid #5E6982',
          }
        }}
      />

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
    <div className={"relative min-h-screen pt-16 bg-slate-50 transition-all duration-75 " + (className ? className : '') + (isSidebarOpen ? ' sm:ml-56' : ' sm:ml-[4.5rem]')}>
      {children}
    </div>
  )
}