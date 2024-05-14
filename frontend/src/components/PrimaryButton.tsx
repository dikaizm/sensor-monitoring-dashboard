import { MouseEvent, ReactNode } from "react"

interface ButtonType {
    children: string
    type?: "button" | "submit" | "reset" | undefined
    icon?: ReactNode
    style?: 'fill' | 'outline'
    onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | ((event: MouseEvent<HTMLButtonElement>) => Promise<void>)
}

export default function PrimaryButton({ children, type = 'button', icon, style = 'fill', onClick }: ButtonType) {
    function getStyle(style?: 'fill' | 'outline') {
        return style === 'fill' ? 'bg-blue-500 text-white' : 'border border-slate-500'
    }

    return (
        <button type={type} onClick={onClick} className={"flex w-full gap-3 items-center justify-center px-2 py-2 rounded-lg " + getStyle(style)}>
            <span className="font-semibold">{children}</span>
            {icon}
        </button>
    )
}