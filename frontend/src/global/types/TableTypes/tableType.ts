import type { ReactNode, TableHTMLAttributes } from "react"

export type tableProps = {
    children: ReactNode
} & TableHTMLAttributes<HTMLTableElement>