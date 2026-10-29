import { GraphColumnState } from 'types/GraphColumn'
import { Commit } from 'types/Commit'

export type VerticalLineProps = {
  isIndex: boolean
  state: GraphColumnState
  columnIndex: number
  columnColour: string
  commit: Commit
  indexCommitNodeBorder: string
}
