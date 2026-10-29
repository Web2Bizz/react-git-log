import { CommitNodeLocation } from 'types/GraphData'
import { Commit } from 'types/Commit'
import { GraphMatrix } from 'components/graph/strategies/grid/graph-matrix-builder/GraphMatrix'

export type GraphMatrixBuilderProps = {
  graphWidth: number
  commits: Commit[]
  positions: Map<string, CommitNodeLocation>
  visibleCommits: number
  headCommit?: Commit
  headCommitHash?: string
  isIndexVisible: boolean
}

export type GraphBreakPointCheck = {
  location: CommitNodeLocation
  check: (matrix: GraphMatrix) => boolean
  position: GraphBreakPointPosition
}

export type GraphBreakPointPosition = 'top' | 'bottom'
