import { ChangeEvent, ReactNode } from "react"

interface InputTextType {
    id: string
    label: string
    placeholder?: string
    type?: string
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    icon?: ReactNode
    disabled?: boolean
}

export default function InputText({ id, label, placeholder, type = 'text', value, onChange, icon, disabled = false }: InputTextType) {
    return (
        <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor={id}>{label}</label>
            <div className="relative w-full">
                {icon && <div className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2">{icon}</div>}
                <input className="w-full p-2 pl-10 border border-gray-400 rounded-lg" type={type} id={id} onChange={onChange} value={value} placeholder={placeholder} disabled={disabled} />
            </div>
        </div>
    )
}