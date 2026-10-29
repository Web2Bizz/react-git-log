import { useContext } from 'react'
import { GitDataContext } from '../../context/git-data-context/GitDataContext'
import { GitSelectionContext } from '../../context/git-selection-context/GitSelectionContext'
import { GitViewContext } from '../../context/git-view-context/GitViewContext'
import { GitContextBag } from 'types/GitContext'

/**
 * Backwards-compatible facade over the three split contexts.
 * New code should prefer the slice hooks below to avoid
 * re-rendering on unrelated updates (e.g. hover).
 */
export const useGitContext = <T = unknown>(): GitContextBag<T> => {
  const data = useContext(GitDataContext) as GitContextBag<T>
  const selection = useContext(GitSelectionContext) as GitContextBag<T>
  const view = useContext(GitViewContext) as GitContextBag<T>

  return {
    ...data,
    ...selection,
    ...view
  }
}

/** Subscribes only to the data slice (commits, graph, paging). */
export const useGitData = <T = unknown>() => useContext(GitDataContext) as GitContextBag<T>

/** Subscribes only to selection state (hovered/selected commits). */
export const useGitSelection = <T = unknown>() => useContext(GitSelectionContext) as GitContextBag<T>

/** Subscribes only to view state (sizes, spacing, orientation). */
export const useGitView = () => useContext(GitViewContext)