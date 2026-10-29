import { createContext } from 'react'
import { GitViewContextBag } from 'types/GitContext'
import { DEFAULT_NODE_SIZE } from 'constants/constants'

const noop = () => {
  // No-op: context used before provider initialisation.
}

export const GitViewContext = createContext<GitViewContextBag>({
  rowSpacing: 0,
  graphWidth: 300,
  graphOrientation: 'normal',
  setGraphOrientation: noop,
  nodeSize: DEFAULT_NODE_SIZE,
  setNodeSize: noop
})
