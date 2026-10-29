import { useMemo } from 'react'
import { GraphData, GraphDataBuilder } from 'data'
import { Commit } from 'types/Commit'
import { GitLogEntry } from 'types/GitLogEntry'
import { CommitFilter } from 'types/GitLog'
import { computeRelationships } from 'utils/computeRelationships'
import { temporalTopologicalSort } from 'utils/temporalTopologicalSort'

export type UseGitGraphDataArgs<T> = {
  entries: GitLogEntry<T>[]
  currentBranch: string
  headCommitHash?: string
  filter?: CommitFilter<T>
}

export type UseGitGraphDataResult<T> = {
  graphData: GraphData<T>
  allCommits: Commit<T>[]
}

/**
 * Builds the full graph pipeline: relationships, temporal
 * sort, filtering and column layout. Memoised on entries
 * identity, branch, head hash and filter reference.
 */
export const useGitGraphData = <T>({
  entries,
  currentBranch,
  headCommitHash,
  filter
}: UseGitGraphDataArgs<T>): UseGitGraphDataResult<T> => {
  return useMemo<UseGitGraphDataResult<T>>(() => {
    const { children, parents, hashToCommit } = computeRelationships(entries, headCommitHash)
    const sortedCommits = temporalTopologicalSort([...hashToCommit.values()], children, hashToCommit)
    const filteredCommits = filter?.(sortedCommits) ?? sortedCommits

    const graphDataBuilder = new GraphDataBuilder<T>({
      commits: sortedCommits,
      filteredCommits,
      children,
      parents,
      currentBranch
    })

    const { graphWidth, positions, edges } = graphDataBuilder.build()

    return {
      allCommits: sortedCommits,
      graphData: {
        children,
        parents,
        hashToCommit,
        graphWidth,
        positions,
        edges,
        commits: filteredCommits
      }
    }
  }, [currentBranch, entries, filter, headCommitHash])
}
