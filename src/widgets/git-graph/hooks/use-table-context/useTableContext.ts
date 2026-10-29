import { useContext } from 'react'
import { TableContext } from '../../context/table-context/TableContext'

export const useTableContext = () => useContext(TableContext)