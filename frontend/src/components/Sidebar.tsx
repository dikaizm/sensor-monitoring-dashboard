import { ReactNode } from 'react'
import { BiSolidFactory } from 'react-icons/bi'
import { GoHomeFill } from 'react-icons/go'
import { RiDatabase2Fill } from 'react-icons/ri'

export default function Sidebar() {
  return (
    <aside className='fixed z-40 flex flex-col justify-between w-[14rem] min-h-screen p-3 pt-20 bg-white border-r'>
      <section>
        <MenuItem link="/" icon={<GoHomeFill className='w-6 h-6' />}>Beranda</MenuItem>
        <MenuItem link="/dashboard/line" icon={<BiSolidFactory className='w-6 h-6' />}>Lantai Produksi</MenuItem>
        <MenuItem link="/dashboard/result" icon={<RiDatabase2Fill className='w-6 h-6' />}>Hasil Produksi</MenuItem>
      </section>

      <section>
        <p className="text-xs text-slate-500">Copyright 2024</p>
      </section>
    </aside>
  )
}

interface MenuItemType {
  children: ReactNode
  icon: ReactNode
  link: string
}

function MenuItem({ children, icon, link }: MenuItemType) {
  const currentPath = window.location.pathname

  function isActive(path: string) {
    if (currentPath === path) return 'bg-slate-100 hover:bg-slate-200'
    else return 'hover:bg-slate-100'
  }

  return (
    <a href={link} className={'flex items-center gap-4 p-3 rounded-lg ' + (isActive(link))}>
      {icon}
      <span className='text-sm font-medium'>{children}</span>
    </a>
  )
}