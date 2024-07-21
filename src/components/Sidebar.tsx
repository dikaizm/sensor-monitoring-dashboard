import { ReactNode } from 'react'
import { BiSolidFactory } from 'react-icons/bi'
import { GoHomeFill } from 'react-icons/go'
import { RiDatabase2Fill } from 'react-icons/ri'
import { useToggleSidebar } from '../context/utils/sidebarContext'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const { isSidebarOpen } = useToggleSidebar()

  return (
    <aside className={'fixed z-30 justify-between min-h-screen p-3 transition-transform duration-200 pt-20 bg-white border-r ' + (isSidebarOpen ? 'flex flex-col w-[14rem]' : 'sm:flex sm:flex-col hidden w-[4.5rem]')}>
      <section>
        <MenuItem link="/" icon={<GoHomeFill className='w-6 h-6' />}>Beranda</MenuItem>
        {/* <MenuItem link="/dashboard/line" icon={<BiSolidFactory className='w-6 h-6' />}>Lantai Produksi</MenuItem> */}

        <MenuItem link="/dashboard/line-3d" icon={<BiSolidFactory className='w-6 h-6' />}>Lantai Produksi</MenuItem>

        <MenuItem link="/dashboard/result" icon={<RiDatabase2Fill className='w-6 h-6' />}>Hasil Produksi</MenuItem>
      </section>

      {isSidebarOpen && (
        <section>
          <p className="text-xs text-slate-500">Copyright 2024</p>
        </section>
      )}
    </aside>
  )
}

interface MenuItemType {
  children: ReactNode
  icon: ReactNode
  link: string
}

function MenuItem({ children, icon, link }: MenuItemType) {
  const navigate = useNavigate()
  const { isSidebarOpen } = useToggleSidebar()

  const currentPath = window.location.pathname

  function isActive(path: string) {
    if (currentPath === path) return 'bg-slate-100 hover:bg-slate-200 '
    else return 'hover:bg-slate-100 '
  }

  function handleNavigate(link: string) {
    navigate(link)
  }

  return (
    <button onClick={() => { handleNavigate(link) }} className={'flex w-full items-center gap-4 rounded-lg p-3 ' + (isActive(link)) + (!isSidebarOpen ? 'justify-center' : '')}>
      {icon}
      {isSidebarOpen && (<span className='text-sm font-medium'>{children}</span>)}
    </button>
  )
}