import appConfig from "@/config/env"
import { ProductionResultType } from "@/pages/ProductionResultPage"
import { reformatISODateTime } from "@/util/formatDate"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { MdClose } from "react-icons/md"

interface ModalEditType {
  id: number | string
  title: string
  onClose?: () => void
}

export default function ModalEdit({ id, title, onClose }: ModalEditType) {
  const [data, setData] = useState<ProductionResultType>({
    id: 0,
    name: '',
    quantity: '',
    createdAt: '',
    updatedAt: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${appConfig.apiUrl}/api/production/ultrasonic/${id}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${Cookies.get('auth')}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch production results')
        }

        const data = await response.json()
        setData(data.data)

      } catch (error) {
        toast.error('Failed to fetch production results')
      }
    }

    fetchData()
  }, [id])

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${appConfig.apiUrl}/api/production/ultrasonic/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          quantity: data?.quantity
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth')}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to update production result')
      }
      toast.success('Production result updated')
      onClose && onClose()
    } catch (error) {
      toast.error('Failed to update production result')
    }
  }

  return (
    <div id="modal_edit">
      <div className="absolute inset-0 z-50 w-screen h-screen bg-black bg-opacity-50"></div>

      <div className="fixed z-50 w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg left-1/2 sm:w-96 top-1/2 drop-shadow-xl">
        <div className="flex items-start justify-between gap-2 py-2 pl-4 pr-2">
          <h4 className="font-semibold">{title}</h4>
          <button onClick={onClose} type="button" className="p-1 rounded-full bg-slate-100"><MdClose className="w-5 h-5" /></button>
        </div>

        <div className="h-[1px] bg-slate-100"></div>

        <div className="flex flex-col gap-3 px-4 pb-4 mt-3">
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-gray-700">Quantity</label>
            <input type="number" className="w-full p-2 text-gray-500 border rounded-md" value={data?.quantity} onChange={(event) => {
              setData({ ...data, quantity: event.target.value } as ProductionResultType)
            }} />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-gray-700">Tanggal</label>
            <span className="text-gray-500 ">{reformatISODateTime(data?.createdAt)}</span>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-gray-700">Tanggal Diperbarui</label>
            <span className="text-gray-500 ">{reformatISODateTime(data?.updatedAt)}</span>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 text-sm border rounded-md" onClick={onClose}>Batal</button>
            <button type="button" className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}