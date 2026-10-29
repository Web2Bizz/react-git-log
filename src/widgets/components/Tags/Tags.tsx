import styles from './Tags.module.scss'
import { BranchTag } from 'components/BranchTag'
import { useGitContext } from 'hooks/useGitContext'
import { useVisibleCommits } from 'hooks/useVisibleCommits'
import { useCallback, useMemo } from 'react'
import { ROW_HEIGHT } from 'constants/constants'
import { Commit } from 'types/Commit'
import { INDEX_HASH } from 'constants/constants'

const prepareCommits = (commits: Commit[]) => {
  const tagsSeen = new Map<string, boolean>()

  return commits.map(commit => {
    const isTag = commit.branch.includes('tags/')
    const hasBeenRendered = tagsSeen.has(commit.branch)

    const shouldRenderTag = isTag && !hasBeenRendered
    if (shouldRenderTag) {
      tagsSeen.set(commit.branch, true)
    }

    return {
      ...commit,
      isMostRecentTagInstance: shouldRenderTag
    }
  })
}

export const Tags = <T,>() => {
  const {
    previewedCommit,
    selectedCommit,
    indexCommit,
    graphData,
    paging,
    graphWidth,
    rowSpacing,
    isIndexVisible,
    graphOrientation,
    filter
  } = useGitContext<T>()

  const { tableData } = useVisibleCommits({
    commits: graphData.commits,
    filter,
    paging,
    indexCommit,
    isIndexVisible
  })

  const preparedCommits = useMemo(() => {
    return prepareCommits(tableData)
  }, [tableData])

  const tagLineWidth = useCallback((commit: Commit) => {
    const isNormalOrientation = graphOrientation === 'normal'
    const numberOfColumns = graphData.graphWidth
    const columnWidth = graphWidth / numberOfColumns
    // Tags container lost its right padding, so extend the dotted
    // line to still reach the commit node in the graph.
    const paddingCompensation = 10

    if (commit.hash === INDEX_HASH) {
      return (isNormalOrientation
        ? columnWidth / 2
        : ((numberOfColumns - 1) * columnWidth) + (columnWidth / 2)) + paddingCompensation
    }

    const columnIndex = graphData.positions.get(commit.hash)![1]
    const normalisedColumnIndex = isNormalOrientation
      ? columnIndex
      : numberOfColumns - 1 - columnIndex

    return (columnWidth * normalisedColumnIndex) + (columnWidth / 2) + paddingCompensation
  }, [graphWidth, graphData.graphWidth, graphData.positions, graphOrientation])

  return (
    <div className={styles.container}>
      {preparedCommits.map((commit, i) => {
        const shouldPreviewBranch = previewedCommit && commit.hash === previewedCommit.hash
        const selectedIsNotTip = selectedCommit && commit.hash === selectedCommit.hash
        const isIndexCommit = commit.hash === indexCommit?.hash

        const shouldRenderBranchTag = commit.isBranchTip
          || shouldPreviewBranch
          || selectedIsNotTip
          || commit.isMostRecentTagInstance
          || isIndexCommit

        if (shouldRenderBranchTag) {
          return (
            <BranchTag
              commit={commit}
              id={i.toString()}
              key={`tag-${commit.hash}`}
              height={ROW_HEIGHT + rowSpacing}
              lineWidth={tagLineWidth(commit)}
              lineRight={-tagLineWidth(commit)}
            />
          )
        } else {
          return (
            <div
              className={styles.tag}
              data-testid={`empty-tag-${i}`}
              id={`empty-tag-${commit.hash}`}
              key={`empty-tag-${commit.hash}`}
              style={{ height: ROW_HEIGHT + rowSpacing }}
            />
          )
        }
      })}
    </div>
  )
}
