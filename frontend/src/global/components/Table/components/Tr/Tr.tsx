import type { TrProps } from "./types";

export function Tr({children, ...props}:TrProps){

    return <tr {...props}>{children}</tr>

}