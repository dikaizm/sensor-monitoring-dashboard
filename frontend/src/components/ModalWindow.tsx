import { ReactNode } from "react"

interface ModalWindowType {
  title: string
  children?: ReactNode
  onClose?: () => void
}

export default function ModalWindow({ title, children, onClose }: ModalWindowType) {

  return (
    <div className="absolute z-50 origin-bottom-left bg-white border rounded-lg bottom-10 left-10 drop-shadow-xl w-72">
      <div className="flex items-center justify-between p-2">
        <h4 className="text-base font-semibold">{title}</h4>
        
        {/* Close button */}
        <button type="button" className="text-slate-500 hover:text-slate-700" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <hr />

      <div className="flex flex-col gap-2 p-2">
        {children}
      </div>

    </div>
  )
}