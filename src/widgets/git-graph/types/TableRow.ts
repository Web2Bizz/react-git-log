import { Commit } from 'types/Commit'
import { CSSProperties } from 'react'
import { CustomTableRow } from 'types/Table'

export type GitLogTableRowProps = {
  index: number
  commit: Commit
  row?: CustomTableRow
  rowStyleOverrides?: CSSProperties
  dataStyleOverrides?: CSSProperties
  isPlaceholder?: boolean
}
