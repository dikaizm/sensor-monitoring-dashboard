import appConfig from '@/config/env';
import { useSensorData } from '@/context/utils/sensorDataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import Cookies from 'js-cookie';
import { ChangeEvent, useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import toast from 'react-hot-toast';
import { MdClose } from "react-icons/md";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function ModalChart({ onClose }: { onClose: () => void }) {
  const { sensorData } = useSensorData()

  const [year, setYear] = useState<number>(getCurrentYear());
  const [month, setMonth] = useState<number>(getCurrentMonth());
  const [data, setData] = useState<number[]>([]);
  const [totalQty, setTotalQty] = useState<number>(0);

  const chartOptions = {
    responsive: true,
  }

  const chartData = {
    labels: generateDates(year, month),
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
    ]
  }

  useEffect(() => {
    if (month === getCurrentMonth() && year === getCurrentYear()) {
      const todayDate = new Date().getDate()
      const filteredResults = data.filter((_, idx) => idx !== todayDate - 1)
      const total = filteredResults.reduce((acc, item) => acc + item, 0)
      setTotalQty(total + (sensorData.ultrasonic.value as number))
    }
  }, [data, sensorData.ultrasonic.value, year, month])

  useEffect(() => {
    if (month === getCurrentMonth() && year === getCurrentYear()) {
      const todayDate = new Date().getDate();
      const updatedData = [...data];

      updatedData[todayDate - 1] = sensorData.ultrasonic.value as number;

      // Update the state
      setData(updatedData);
    }
  }, [sensorData.ultrasonic.value, year, month]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${appConfig.apiUrl}/api/production/ultrasonic?filterMonth=${month}&filterYear=${year}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Cookies.get('auth')}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch production results')
        }

        const data = await response.json()
        // Fill data with 0 if on certain date there is no production
        const dates = generateDates(year, month)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const productionData = data.data.map((item: any) => item.createdAt)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const productionQty = data.data.map((item: any) => item.quantity)
        const filledData = dates.map(date => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const idx = productionData.findIndex((item: any) => new Date(item).getDate() === date)
          return idx !== -1 ? productionQty[idx] : 0
        })

        setData(filledData)
        setTotalQty(productionQty.reduce((acc: number, curr: number) => acc + curr, 0))

      } catch (error) {
        toast.error('Failed to fetch production results')
      }
    }

    fetchData();
  }, [year, month])

  return (
    <div id="modal_chart">
      <div className="absolute inset-0 z-50 w-screen h-screen bg-black bg-opacity-50"></div>

      <div className="fixed z-50 w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg left-1/2 sm:w-[36rem] top-1/2 drop-shadow-xl">
        <div className="flex items-start justify-between gap-2 py-2 pl-4 pr-2">
          <h4 className="font-semibold">Grafik Total Produksi</h4>
          <button onClick={onClose} type="button" className="p-1 rounded-full bg-slate-100 hover:bg-slate-200"><MdClose className="w-5 h-5" /></button>
        </div>

        <div className="h-[1px] bg-slate-100"></div>

        <div className="flex flex-col gap-3 px-4 pb-4 mt-3">
          <div className='flex items-center justify-between'>
            <MonthlyTotal totalQty={totalQty} />

            <div className='flex items-center gap-2'>
              <SelectYear target={year} onChange={(e) => setYear(Number(e.target.value))} />
              <SelectMonth target={month} onChange={(e) => setMonth(Number(e.target.value))} />
            </div>
          </div>

          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  )
}

function MonthlyTotal({ totalQty }: { totalQty: number }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500">Total Produksi</h4>
      <p className="font-bold text-blue-500">{totalQty}</p>
    </div>
  )
}

type SelectType = {
  target: number
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function SelectYear({ target, onChange }: SelectType) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

  return (
    <select className="w-1/2 p-2 text-gray-500 border rounded-md" value={target} onChange={onChange}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

function SelectMonth({ target, onChange }: SelectType) {
  return (
    <select className="w-1/2 p-2 text-gray-500 border rounded-md" value={target} onChange={onChange}>
      <option value="1">Januari</option>
      <option value="2">Februari</option>
      <option value="3">Maret</option>
      <option value="4">April</option>
      <option value="5">Mei</option>
      <option value="6">Juni</option>
      <option value="7">Juli</option>
      <option value="8">Agustus</option>
      <option value="9">September</option>
      <option value="10">Oktober</option>
      <option value="11">November</option>
      <option value="12">Desember</option>
    </select>
  )
}

function getFirstAndLastDateOfMonth(year: number, month: number): { firstDate: number, lastDate: number } {
  // JavaScript months are 0-based (0 = January, 11 = December)
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  return {
    firstDate: firstDate.getDate(),
    lastDate: lastDate.getDate(),
  };
}

function generateDates(year: number, month: number): number[] {
  const { firstDate, lastDate } = getFirstAndLastDateOfMonth(year, month);
  return Array.from({ length: lastDate - firstDate + 1 }, (_, i) => i + firstDate);
}

function getCurrentYear(): number {
  return new Date().getFullYear();
}

function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}