import { createContext } from 'react'
import { TableContextBag } from 'types/TableContext'

export const TableContext = createContext<TableContextBag>({
  timestampFormat: 'YYYY-MM-DD HH:mm:ss'
})