import { createContext } from 'react'
import { GitSelectionContextBag } from 'types/GitContext'

const noop = () => {
  // No-op: context used before provider initialisation.
}

export const GitSelectionContext = createContext<GitSelectionContextBag>({
  selectedCommit: undefined,
  setSelectedCommit: noop,
  previewedCommit: undefined,
  setPreviewedCommit: noop,
  enableSelectedCommitStyling: true,
  enablePreviewedCommitStyling: true
})
