import { GraphRow } from 'components/graph-row'
import { GraphColumnState } from 'components/graph-column'
import { useMemo } from 'react'
import { useGitContext } from 'hooks/use-git-context'
import { useGraphContext } from 'hooks/use-graph-context'
import { INDEX_HASH } from 'constants/constants'

export const IndexPseudoRow = () => {
  const { indexCommit } = useGitContext()
  const { graphWidth, isHeadCommitVisible } = useGraphContext()

  const indexColumns = useMemo(() => {
    const columns = new Array<GraphColumnState>(graphWidth).fill({})

    columns[0] = {
      isNode: true,
      isVerticalLine: true,
      isBottomBreakPoint: !isHeadCommitVisible
    }

    return columns
  }, [graphWidth, isHeadCommitVisible])

  if (indexCommit) {
    return (
      <GraphRow
        id={0}
        key={INDEX_HASH}
        commit={indexCommit}
        columns={indexColumns}
      />
    )
  }

  return null
}
