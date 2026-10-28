import { Commit } from 'types/Commit'
import { GraphColumnState } from 'types/GraphColumn'

export type PlaceholderDatum = {
  commit: Commit
  columns: GraphColumnState[]
}

export type PlaceholderData = {
  placeholderData: PlaceholderDatum[]
}
