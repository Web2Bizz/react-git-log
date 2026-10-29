import { GraphColumnState } from 'components/graph-column'
import { getEmptyColumnState } from 'utils/get-empty-column-state'

export class GraphMatrixColumns {
  private readonly _columns: GraphColumnState[]

  constructor(columns: GraphColumnState[]) {
    this._columns = columns
  }

  public static empty(columnQuantity: number) {
    return new GraphMatrixColumns(getEmptyColumnState({
      columns: columnQuantity
    }))
  }

  public update(columnIndex: number, state: GraphColumnState) {
    this._columns[columnIndex] = {
      ...(this._columns[columnIndex] ?? {}),
      ...state
    }
  }

  public hasCommitNode(index: number) {
    return this._columns[index]?.isNode ?? false
  }

  public get columns() {
    return this._columns
  }

  public get length() {
    return this._columns.length
  }
}