import { Table as TableComponent } from "./CompoundComponents/Table";
import TBody from "./CompoundComponents/TBody";
import {Th} from "./CompoundComponents/Th";
import {THead} from "./CompoundComponents/THead"
import { TRow } from "./CompoundComponents/TRow";
import {Td} from "./CompoundComponents/Td"
import Actions from "./CompoundComponents/Actions";



export const Table = {
    Root: TableComponent,
    Head: THead,
    Row: TRow,
    Th:Th,
    Body: TBody,
    Td: Td,
    Actions: Actions,
}