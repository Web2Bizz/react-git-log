import { isColumnEmpty } from 'utils/is-column-empty'
import { GraphMatrixColumns } from 'components/graph/strategies/grid/graph-matrix-builder/GraphMatrixColumns'

export class GraphMatrix {
  private readonly _matrix = new Map<number, GraphMatrixColumns>
  private readonly _graphWidth: number

  constructor(graphWidth: number) {
    this._graphWidth = graphWidth
  }

  public getColumns(rowIndex: number) {
    return this._matrix.get(rowIndex) ?? this.emptyColumnState()
  }

  public setColumns(rowIndex: number, columns: GraphMatrixColumns) {
    this._matrix.set(rowIndex, columns)
  }

  public hasRowColumns(rowIndex: number) {
    return this._matrix.has(rowIndex)
  }

  public isColumnBelowEmpty(rowIndex: number, columnIndex: number) {
    const row = this._matrix.get(rowIndex + 1)
    if (!row) {
      return false
    }

    return isColumnEmpty(row.columns[columnIndex])
  }

  public isColumnAboveEmpty(rowIndex: number, columnIndex: number) {
    const row = this._matrix.get(rowIndex - 1)
    if (!row) {
      return false
    }

    return isColumnEmpty(row.columns[columnIndex])
  }

  public isColumnAboveBreakPoint(rowIndex: number, columnIndex: number) {
    const row = this._matrix.get(rowIndex - 1)
    if (!row) {
      return false
    }

    return row.columns[columnIndex]?.isBottomBreakPoint ?? false
  }

  public hasCommitNodeAt(rowIndex: number, columnIndex: number) {
    const row = this._matrix.get(rowIndex)
    if (!row) {
      return false
    }

    return row.columns[columnIndex]?.isNode ?? false
  }

  public get value() {
    return this._matrix
  }

  private emptyColumnState() {
    return GraphMatrixColumns.empty(this._graphWidth)
  }
}