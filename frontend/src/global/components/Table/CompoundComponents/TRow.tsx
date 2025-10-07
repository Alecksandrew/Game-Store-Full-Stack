import type { tRow } from "../../../types/TableTypes/tRow";


export function TRow({children, ...props}:tRow){

    return <tr {...props}>{children}</tr>

}