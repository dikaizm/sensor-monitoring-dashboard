import { MouseEvent, ReactNode } from "react"

interface ButtonType {
    children: string
    type?: "button" | "submit" | "reset" | undefined
    icon?: ReactNode
    style?: 'fill' | 'outline'
    onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | ((event: MouseEvent<HTMLButtonElement>) => Promise<void>)
    width?: string
}

export default function PrimaryButton({ children, type = 'button', icon, style = 'fill', onClick, width = 'w-fit' }: ButtonType) {
    function getStyle(style?: 'fill' | 'outline') {
        return style === 'fill' ? 'bg-blue-500 text-white' : 'border border-slate-500'
    }

    return (
        <button type={type} onClick={onClick} className={"flex gap-2 items-center justify-center px-3 py-2 rounded-lg " + width + " " + getStyle(style)}>
            {icon}
            <span className="text-base font-semibold">{children}</span>
        </button>
    )
}