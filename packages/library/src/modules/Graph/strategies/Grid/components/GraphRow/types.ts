import { Commit } from 'types/Commit'
import { GraphColumnState } from 'modules/Graph/strategies/Grid/components/GraphColumn'

export type GraphRowProps = {
  id: number
  commit: Commit
  columns: GraphColumnState[]
}
