import appConfig from "@/config/env"
import { SalesResultType } from "@/pages/ProductionResultPage"
import Cookies from "js-cookie"
import { useState } from "react"
import toast from "react-hot-toast"
import { MdClose } from "react-icons/md"

interface ModalAddType {
  title: string
  onClose?: () => void
}

export default function ModalAdd({ title, onClose }: ModalAddType) {
  const [data, setData] = useState<SalesResultType>({
    id: 0,
    name: '',
    quantity: '',
    date: ''
  })

  const handleAdd = async () => {
    try {
      const response = await fetch(`${appConfig.apiUrl}/api/sales`, {
        method: 'POST',
        body: JSON.stringify({
          quantity: data.quantity,
          date: data.date
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth')}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to add sales record')
      }

      toast.success('New sales added')
      onClose && onClose()
    } catch (error) {
      toast.error('Failed to add sales record')
    }
  }

  return (
    <div id="modal_add">
      <div className="absolute inset-0 z-50 w-screen h-screen bg-black bg-opacity-50"></div>

      <div className="fixed z-50 w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg left-1/2 sm:w-96 top-1/2 drop-shadow-xl">
        <div className="flex items-start justify-between gap-2 py-2 pl-4 pr-2">
          <h4 className="font-semibold">{title}</h4>
          <button onClick={onClose} type="button" className="p-1 rounded-full bg-slate-100"><MdClose className="w-5 h-5" /></button>
        </div>

        <div className="h-[1px] bg-slate-100"></div>

        <div className="flex flex-col gap-3 px-4 pb-4 mt-3">
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-gray-700" htmlFor="product_name">Nama</label>
            <input
              id="product_name"
              type="text"
              className="w-full p-2 text-gray-500 border rounded-md"
              value="Genteng"
              disabled
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-gray-700" htmlFor="quantity">Kuantitas</label>
            <input
              id="quantity"
              type="number"
              className="w-full p-2 text-gray-500 border rounded-md"
              value={data.quantity}
              placeholder="Input quantity"
              onChange={(event) => setData({ ...data, quantity: event.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-gray-700" htmlFor="date">Tanggal</label>
            <input
              id="date"
              type="date"
              className="w-full p-2 text-gray-500 border rounded-md"
              value={data.date}
              onChange={(event) => setData({ ...data, date: event.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 text-sm border rounded-md" onClick={onClose}>Batal</button>
            <button type="button" className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md" onClick={handleAdd}>Tambah</button>
          </div>
        </div>
      </div>
    </div>
  )
}