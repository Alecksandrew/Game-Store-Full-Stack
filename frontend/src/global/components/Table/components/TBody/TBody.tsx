import type { TBodyProps } from "./types";



export function TBody({children, ...props}:TBodyProps){
    return <tbody {...props}>{children}</tbody>
}