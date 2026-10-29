import { createContext } from 'react'
import { GitDataContextBag } from 'types/GitContext'

const noop = () => {
  // No-op: context used before provider initialisation.
}

export const GitDataContext = createContext<GitDataContextBag>({
  currentBranch: 'master',
  headCommit: undefined,
  headCommitHash: undefined,
  indexCommit: undefined,
  graphData: {
    children: new Map(),
    edges: [],
    graphWidth: 0,
    commits: [],
    positions: new Map(),
    parents: new Map(),
    hashToCommit: new Map()
  },
  remoteProviderUrlBuilder: undefined,
  classes: undefined,
  indexStatus: undefined,
  isServerSidePaginated: false,
  paging: {
    endIndex: 0,
    startIndex: 0
  },
  isIndexVisible: true,
  filter: undefined,
  showTable: true,
  showBranchesTags: true,
  showHeaders: undefined,
  setGraphWidth: noop
})
