import { useMemo } from 'react'
import { Commit } from 'types/Commit'
import { CommitFilter } from 'types/GitLog'
import { GraphPaging } from 'types/GitContext'

export type UseVisibleCommitsArgs<T> = {
  commits: Commit<T>[]
  filter?: CommitFilter<T>
  paging?: GraphPaging
  indexCommit?: Commit
  isIndexVisible: boolean
}

export type UseVisibleCommitsResult<T> = {
  visibleCommits: Commit<T>[]
  tableData: Commit<T>[]
}

/**
 * Single source of truth for the visible row window.
 * Applies the filter once, then slices the page, then
 * prepends the index pseudo-commit. Replaces the three
 * duplicated filter/slice implementations in GitLogCore,
 * GraphCore, Table and Tags.
 */
export const useVisibleCommits = <T>({
  commits,
  filter,
  paging,
  indexCommit,
  isIndexVisible
}: UseVisibleCommitsArgs<T>): UseVisibleCommitsResult<T> => {
  return useMemo<UseVisibleCommitsResult<T>>(() => {
    const filtered = filter?.(commits) ?? commits
    const visibleCommits = paging
      ? filtered.slice(paging.startIndex, paging.endIndex)
      : filtered

    const tableData = [...visibleCommits]
    if (isIndexVisible && indexCommit) {
      tableData.unshift(indexCommit as Commit<T>)
    }

    return { visibleCommits, tableData }
  }, [commits, filter, paging, indexCommit, isIndexVisible])
}
