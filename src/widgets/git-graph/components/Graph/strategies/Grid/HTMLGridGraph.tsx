import styles from 'components/Graph/core/GraphCore.module.scss'
import { ROW_HEIGHT } from 'constants/constants'
import { SkeletonGraph } from 'components/SkeletonGraph'
import { IndexPseudoRow } from 'components/IndexPseudoRow'
import { GraphRow } from 'components/GraphRow'
import { useGraphContext } from 'hooks/useGraphContext'
import { useGitContext } from 'hooks/useGitContext'
import { getEmptyColumnState } from 'utils/getEmptyColumnState'
import { CSSProperties, useMemo } from 'react'
import { placeholderCommits } from 'hooks/usePlaceholderData/data'
import { GRAPH_MARGIN_TOP } from 'components/Graph/constants'

export const HTMLGridGraph = () => {
  const { graphWidth, visibleCommits, columnData } = useGraphContext()
  const { isIndexVisible, rowSpacing, paging } = useGitContext()

  const commitQuantity = useMemo(() => {
    // If there is no data being shown, then we'll
    // be rendering the skeleton graph placeholder which
    // shows fake commits.
    if (visibleCommits.length === 0) {
      return placeholderCommits.length
    }

    // If the index node is visible, then we show one
    // extra commit in the form of the index pseudo-node.
    if (isIndexVisible) {
      return visibleCommits.length + 1
    }

    // Else, just the number of visible commits, relative
    // to the current pagination configuration.
    return visibleCommits.length
  }, [isIndexVisible, visibleCommits.length])

  const wrapperStyles: CSSProperties = {
    gridTemplateColumns: `repeat(${graphWidth}, 1fr)`,
    gridTemplateRows: `repeat(${commitQuantity}, ${ROW_HEIGHT + rowSpacing}px)`,
    marginTop: GRAPH_MARGIN_TOP
  }

  return (
    <div className={styles.graph} style={wrapperStyles}>
      {visibleCommits.length === 0 && (
        <SkeletonGraph />
      )}

      {isIndexVisible && (
        <IndexPseudoRow />
      )}

      {visibleCommits.map((commit, index) => {
        const empty = getEmptyColumnState({ columns: graphWidth })
        const rowIndex = paging ? index + paging?.startIndex + 1 : index
        const columns = columnData.get(rowIndex)?.columns ?? empty

        return (
          <GraphRow
            id={index + 1}
            commit={commit}
            key={commit.hash}
            columns={columns}
          />
        )
      })}
    </div>
  )
}
