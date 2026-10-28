import { useContext } from 'react'
import { TableContext } from '../../context/TableContext/TableContext'

export const useTableContext = () => useContext(TableContext)