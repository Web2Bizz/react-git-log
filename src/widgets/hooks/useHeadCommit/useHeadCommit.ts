import { useMemo } from 'react'
import { Commit } from 'types/Commit'

export type UseHeadCommitArgs<T> = {
  allCommits: Commit<T>[]
  currentBranch: string
  headCommitHash?: string
  isServerSidePaginated: boolean
}

/**
 * Resolves the HEAD commit either by explicit hash
 * (server-side pagination) or by current branch name.
 */
export const useHeadCommit = <T>({
  allCommits,
  currentBranch,
  headCommitHash,
  isServerSidePaginated
}: UseHeadCommitArgs<T>): Commit<T> | undefined => {
  return useMemo<Commit<T> | undefined>(() => {
    if (isServerSidePaginated) {
      return allCommits.find(({ hash }) => {
        return hash === headCommitHash
      })
    }

    return allCommits.find(({ branch }) => {
      return branch.includes(currentBranch)
    })
  }, [allCommits, currentBranch, headCommitHash, isServerSidePaginated])
}
