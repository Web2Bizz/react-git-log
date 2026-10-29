import { createContext } from 'react'
import { GitContextBag } from 'types/GitContext'
import { Commit } from 'types/Commit'
import { DEFAULT_BRANCH_NAME, DEFAULT_COMMIT_HASH, DEFAULT_NODE_SIZE } from 'constants/constants'

const defaultCommit: Commit = {
  hash: DEFAULT_COMMIT_HASH,
  branch: 'unknown',
  parents: [],
  children: [],
  authorDate: new Date().toString(),
  message: 'Working tree index',
  committerDate: new Date().toString(),
  isBranchTip: false
}

const uninitialised = () => {
  // No-op: context used before provider initialisation.
}

export const GitContext = createContext<GitContextBag>({
  headCommit: defaultCommit,
  indexCommit: defaultCommit,
  currentBranch: DEFAULT_BRANCH_NAME,
  showTable: true,
  showBranchesTags: true,
  selectedCommit: undefined,
  setSelectedCommit: uninitialised,
  previewedCommit: undefined,
  setPreviewedCommit: uninitialised,
  graphOrientation: 'normal',
  setGraphOrientation: uninitialised,
  graphData: {
    children: new Map(),
    edges: [],
    graphWidth: 0,
    commits: [],
    positions: new Map(),
    parents: new Map(),
    hashToCommit: new Map(),
  },
  rowSpacing: 0,
  graphWidth: 300,
  nodeSize: DEFAULT_NODE_SIZE,
  setNodeSize: uninitialised,
  setGraphWidth: uninitialised,
  isServerSidePaginated: false,
  paging: {
    endIndex: 0,
    startIndex: 0,
  },
  isIndexVisible: true
})