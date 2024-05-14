import { MouseEvent, ReactNode } from "react"
import { MdClose } from "react-icons/md"

interface ModalAlertType {
  title: string
  children: ReactNode
  onClose: (event: MouseEvent<HTMLButtonElement>) => void
}

function ModalAlert({ title, children, onClose }: ModalAlertType) {
  return (
    <div className="fixed z-50 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg left-1/2 w-80 top-1/2 drop-shadow-xl">
      <div className="flex items-start justify-between gap-2 py-2 pl-4 pr-2">
        <h4 className="font-semibold">{title}</h4>
        <button onClick={onClose} type="button" className="p-1 rounded-full bg-slate-100"><MdClose className="w-5 h-5" /></button>
      </div>

      <div className="h-[1px] bg-slate-100"></div>

      <div className="px-4 pb-4 mt-3">
        {children}
      </div>
    </div>
  )
}

export default ModalAlert