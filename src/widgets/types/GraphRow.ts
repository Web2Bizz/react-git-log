import { Commit } from 'types/Commit'
import { GraphColumnState } from 'types/GraphColumn'

export type GraphRowProps = {
  id: number
  commit: Commit
  columns: GraphColumnState[]
}
