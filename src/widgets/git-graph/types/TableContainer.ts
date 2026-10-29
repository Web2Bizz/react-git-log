import { CSSProperties } from 'react'
import { CustomTableRow } from 'types/Table'

export type TableContainerProps = {
  rowQuantity: number
  className?: string
  row?: CustomTableRow
  styleOverrides?: CSSProperties
}
