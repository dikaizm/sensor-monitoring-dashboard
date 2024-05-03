import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { BiExport } from "react-icons/bi";
import PrimaryButton from "../components/PrimaryButton";

export default function ProductionResultPage() {
  return (
    <AuthenticatedLayout>

      <div className="p-6">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">Hasil Produksi</h1>

          <PrimaryButton style="outline" icon={<BiExport className="w-4 h-4" />}>Export</PrimaryButton>
        </div>

        <div className="relative mt-6 overflow-x-auto border sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
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
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRow data={productionResults} />
            </tbody>
          </table>
        </div>

      </div>

    </AuthenticatedLayout>
  )
}

function TableRow({ data }: { data: ProductionResultType[] }) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              {item.id}
            </th>
            <td className="px-6 py-4">
              {item.name}
            </td>
            <td className="px-6 py-4">
              {item.quantity}
            </td>
            <td className="px-6 py-4">
              {item.date}
            </td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
            </td>
          </tr>
        )
      })}
    </>
  )
}

type ProductionResultType = {
  id: number;
  name: string;
  quantity: number;
  date: string;
}

const productionResults: ProductionResultType[] = [
  {
    id: 1,
    name: "Basis Atas",
    quantity: 14,
    date: "14/10/2023"
  },
  {
    id: 2,
    name: "Basis Bawah",
    quantity: 10,
    date: "14/10/2023"
  },
  {
    id: 3,
    name: "Handle",
    quantity: 20,
    date: "14/10/2023"
  },
  {
    id: 4,
    name: "Pisau",
    quantity: 15,
    date: "14/10/2023"
  },
  {
    id: 5,
    name: "Lower",
    quantity: 12,
    date: "14/10/2023"
  },
  {
    id: 6,
    name: "Lock Grip",
    quantity: 8,
    date: "14/10/2023"
  },
  {
    id: 7,
    name: "Jam Kompas",
    quantity: 8,
    date: "14/10/2023"
  },
  {
    id: 8,
    name: "Strap",
    quantity: 8,
    date: "14/10/2023"
  }
]