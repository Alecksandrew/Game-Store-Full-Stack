import type { TBodyProps } from "../../../types/TableTypes/tBodyType";


export default function TBody({children, ...props}:TBodyProps){
    return <tbody {...props}>{children}</tbody>
}