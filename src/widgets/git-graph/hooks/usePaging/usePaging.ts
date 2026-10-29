import { useMemo } from 'react'
import { GitLogEntry } from 'types/GitLogEntry'
import { GitLogPaging } from 'types/GitLog'
import { GraphPaging } from 'types/GitContext'

export type UsePagingArgs<T> = {
  entries: GitLogEntry<T>[]
  paging?: GitLogPaging
  showGitIndex: boolean
  isServerSidePaginated: boolean
  headCommitHash?: string
}

export type UsePagingResult = {
  pageIndices: GraphPaging
  isIndexVisible: boolean
}

/**
 * Derives the visible row window and index-node
 * visibility from paging configuration.
 */
export const usePaging = <T>({
  entries,
  paging,
  showGitIndex,
  isServerSidePaginated,
  headCommitHash
}: UsePagingArgs<T>): UsePagingResult => {
  const pageIndices = useMemo<GraphPaging>(() => {
    const page = paging?.page ?? 0
    const size = paging?.size ?? entries.length

    const startIndex = Math.max(0, page * size)
    const endIndex = Math.min(entries.length, startIndex + size)

    return { startIndex, endIndex }
  }, [entries.length, paging])

  const isIndexVisible = useMemo<boolean>(() => {
    if (!showGitIndex) {
      return false
    }

    if (isServerSidePaginated) {
      return entries.some(({ hash }) => hash === headCommitHash)
    }

    if (paging) {
      return pageIndices.startIndex === 0
    }

    return true
  }, [entries, headCommitHash, isServerSidePaginated, pageIndices.startIndex, paging, showGitIndex])

  return { pageIndices, isIndexVisible }
}
