import { CSSProperties } from 'react'
import { CustomTableRow } from 'modules/Table'

export type TableContainerProps = {
  rowQuantity: number
  className?: string
  row?: CustomTableRow
  styleOverrides?: CSSProperties
}
