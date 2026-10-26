import { Commit } from 'types/Commit'
import { GraphColumnState } from 'modules/Graph/strategies/Grid/components/GraphColumn'

export type PlaceholderDatum = {
  commit: Commit
  columns: GraphColumnState[]
}

export type PlaceholderData = {
  placeholderData: PlaceholderDatum[]
}
