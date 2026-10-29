import { useMemo } from 'react'
import { Commit } from 'types/Commit'
import { INDEX_HASH } from 'constants/constants'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 * Builds the pseudo-commit representing the Git index
 * working tree, parented on the HEAD commit.
 */
export const useIndexCommit = <T>(headCommit: Commit<T> | undefined): Commit | undefined => {
  return useMemo<Commit | undefined>(() => {
    if (!headCommit) {
      return undefined
    }

    const today = dayjs.utc().toISOString()

    return {
      hash: INDEX_HASH,
      branch: headCommit.branch,
      parents: [headCommit.hash],
      children: [],
      authorDate: today,
      message: '// WIP',
      committerDate: today,
      isBranchTip: false
    }
  }, [headCommit])
}
