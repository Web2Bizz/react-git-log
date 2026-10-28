import { GraphRow } from 'components/GraphRow'
import { GraphColumnState } from 'components/GraphColumn'
import { useMemo } from 'react'
import { useGitContext } from 'hooks/useGitContext'
import { useGraphContext } from 'hooks/useGraphContext'

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
        key={'index'}
        commit={indexCommit}
        columns={indexColumns}
      />
    )
  }

  return null
}
