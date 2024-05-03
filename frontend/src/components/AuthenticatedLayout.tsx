import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AuthenticatedLayoutType {
  children: ReactNode
  className?: string
}

export default function AuthenticatedLayout({ children, className }: AuthenticatedLayoutType) {
  return (
    <>
      <Topbar />
      <Sidebar />

      <main className={"min-h-screen pt-16 sm:ml-56 bg-slate-50 " + className}>
        {children}
      </main>
    </>
  )
}