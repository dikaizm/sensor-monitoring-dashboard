import { ReactNode } from "react"

type BaseIconType = {
    children: ReactNode;
    className?: string;
}

export function BaseIcon({ children, className }: BaseIconType) {
    return (
        <div className={" " + className}>
            {children}
        </div>
    )
}