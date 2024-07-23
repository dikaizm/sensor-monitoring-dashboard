import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { BiExport } from "react-icons/bi";
import PrimaryButton from "../components/PrimaryButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import appConfig from "@/config/env";
import Cookies from "js-cookie";
import { useSensorData } from "@/context/utils/sensorDataContext";
import ModalEdit from "@/components/ModalEdit";
import { reformatISODateTime } from "@/util/formatDate";
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { useUser } from "@/context/utils/userContext";
import { UserRole } from "@/types/constant";
import { FaChartColumn } from "react-icons/fa6";
import ModalChart from "@/components/ModalChart";

const isToday = (date: string) => {
  const today = new Date();
  const givenDate = new Date(date);
  return (
    today.getFullYear() === givenDate.getFullYear() &&
    today.getMonth() === givenDate.getMonth() &&
    today.getDate() === givenDate.getDate()
  );
};

export type ProductionResultType = {
  id: number;
  name: string;
  quantity: string | number;
  createdAt: string;
  updatedAt?: string;
  product?: {
    product_name: string
  }
}

export default function ProductionResultPage() {
  const { sensorData } = useSensorData()
  const { user } = useUser()
  const [productionResults, setProductionResults] = useState<ProductionResultType[]>([])
  const [totalQty, setTotalQty] = useState<number>(0)

  const [editProdModal, setEditProdModal] = useState<boolean>(false)
  const [idModal, setIdModal] = useState<number>(0)

  const [chartModal, setChartModal] = useState<boolean>(false)

  useEffect(() => {
    const filteredResults = productionResults.filter(item => !isToday(item.createdAt));
    const total = filteredResults.reduce((acc, item) => {
      return acc + (item.quantity as number);
    }, 0);

    setTotalQty(total + (sensorData.ultrasonic.value as number));
  }, [sensorData.ultrasonic.value, productionResults, editProdModal]);

  useEffect(() => {
    if (editProdModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup function to remove the class when the component unmounts
    return () => document.body.classList.remove('no-scroll');
  }, [editProdModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${appConfig.apiUrl}/api/production/ultrasonic`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Cookies.get('auth')}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch production results')
        }
        const data = await response.json()

        setProductionResults(data.data)

      } catch (error) {
        toast.error('Failed to fetch production results')
      }
    }

    fetchData()
  }, [editProdModal])

  useEffect(() => {
    // Update production results today data when sensor data changes
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayData = productionResults.find(item => {
      const itemDate = new Date(item.createdAt)
      return itemDate >= startOfDay && itemDate <= endOfDay
    })

    if (todayData) {
      const updatedResults = productionResults.map(item => {
        if (item.id === todayData.id) {
          item.quantity = sensorData.ultrasonic.value as number
        }
        return item
      })

      setProductionResults(updatedResults)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorData.ultrasonic.value])

  const handleExport = async () => {
    const toastId = toast.loading('Exporting data...');

    try {
      const response = await fetch(`${appConfig.apiUrl}/api/production/ultrasonic`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Cookies.get('auth')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      const data = await response.json();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Hasil Produksi Genteng');

      // Add header row
      if (data.data.length > 0) {
        worksheet.addRow(["No", "Nama", "Kuantitas", "Tanggal", "Tanggal Diperbarui"]);
      }

      const formattedData = data.data.map((item: ProductionResultType, index: number) => {
        return {
          id: index + 1,
          name: item.product?.product_name,
          quantity: item.quantity,
          createdAt: reformatISODateTime(item.createdAt),
          updatedAt: reformatISODateTime(item.updatedAt),
        };
      })

      // Add data rows
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formattedData.forEach((item: any) => {
        worksheet.addRow(Object.values(item));
      });

      // Generate buffer
      const excelBuffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'hasil-produksi-genteng.xlsx');

      toast.dismiss(toastId);
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Export error:', error); // For debugging
      toast.dismiss(toastId);
      toast.error('Failed to export data');
    }
  };

  const handleChartBtn = () => {
    setChartModal(true)
  }

  return (
    <>
      <AuthenticatedLayout>

        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold">Hasil Produksi</h1>

            {(user?.role === UserRole.ADMIN || user?.role === UserRole.MARKETING) && (
              <PrimaryButton style="outline" icon={<BiExport className="w-4 h-4" />} onClick={() => {
                handleExport()
              }}>Export Excel</PrimaryButton>
            )}
          </div>

          <div className="relative max-h-[34rem] mt-6 overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kuantitas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Diperbarui
                  </th>

                  {(user?.role === UserRole.ADMIN || user?.role === UserRole.MARKETING) && (
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <TableRow data={productionResults} setState={{
                  modal: setEditProdModal,
                  id: setIdModal
                }} />
              </tbody>
            </table>
          </div>

          <div className="w-full mt-4 bg-white border rounded">
            <div className="flex items-center justify-between p-4 font-semibold">
              <h4>Total Produksi</h4>
              <div className="flex items-center gap-2">
                <button type="button" className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600" onClick={handleChartBtn}>
                  <FaChartColumn className="w-5 h-5" />
                </button>
                <p className="px-3 py-1 text-white bg-green-600 rounded-full">{totalQty}</p>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>

      {editProdModal && (
        <ModalEdit id={idModal} title="Edit Hasil Produksi" onClose={() => setEditProdModal(false)} />
      )}

      {chartModal && (
        <ModalChart onClose={() => setChartModal(false)} />
      )}

    </>
  )
}

interface TableRowType {
  data: ProductionResultType[]
  setState: {
    modal: (state: boolean) => void
    id: (id: number) => void
  }
}

function TableRow({ data, setState }: TableRowType) {
  const { user } = useUser()

  return (
    <>
      {data.map((item, index) => {
        return (
          <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              {index + 1}
            </th>
            <td className="px-6 py-4">
              {item.product?.product_name}
            </td>
            <td className="px-6 py-4">
              {item.quantity}
            </td>
            <td className="px-6 py-4">
              {reformatISODateTime(item.createdAt)}
            </td>
            <td className="px-6 py-4">
              {reformatISODateTime(item.updatedAt)}
            </td>

            {(user?.role === UserRole.ADMIN || user?.role === UserRole.MARKETING) &&
              (
                <td className="px-6 py-4 text-right">
                  <button type="button" className="font-medium text-blue-600 hover:underline" onClick={() => {
                    setState.modal(true)
                    setState.id(item.id)
                  }}>Edit</button>
                </td>
              )}

          </tr>
        )
      })}
    </>
  )
}