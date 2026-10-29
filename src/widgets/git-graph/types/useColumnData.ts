import { GraphMatrixColumns } from 'components/graph/strategies/grid/graph-matrix-builder/GraphMatrixColumns'

export type GraphColumnDataProps = {
  visibleCommits: number
}

export type RowIndexToColumnStates = Map<number, GraphMatrixColumns>

export type GraphColumnData = {
  columnData: RowIndexToColumnStates
  virtualColumns: number
}
