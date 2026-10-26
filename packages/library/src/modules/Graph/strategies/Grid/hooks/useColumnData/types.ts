import { GraphMatrixColumns } from 'modules/Graph/strategies/Grid/GraphMatrixBuilder/GraphMatrixColumns'

export type GraphColumnDataProps = {
  visibleCommits: number
}

export type RowIndexToColumnStates = Map<number, GraphMatrixColumns>

export type GraphColumnData = {
  columnData: RowIndexToColumnStates
  virtualColumns: number
}
