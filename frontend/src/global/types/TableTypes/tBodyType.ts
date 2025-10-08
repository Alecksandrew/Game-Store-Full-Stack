import type { HTMLAttributes, ReactNode } from "react"


export type TBodyProps = {
    children: ReactNode
} & HTMLAttributes<HTMLTableSectionElement>;