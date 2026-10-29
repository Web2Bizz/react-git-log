import { GraphRowProps } from 'types/GraphRow'
import { GraphColumn } from 'components/graph-column'
import { useGraphContext } from 'hooks/use-graph-context'
import { INDEX_HASH } from 'constants/constants'
import { memo, useMemo } from 'react'

export const GraphRow = memo(({ id, commit, columns }: GraphRowProps) => {
  const { graphWidth, orientation } = useGraphContext()

  const commitNodeIndex = useMemo(() => {
    return columns.findIndex(col => col.isNode)
  }, [columns])

  return (
    <>
      {new Array(graphWidth).fill(0).map((_, index) => {
        const normalisedIndex = orientation === 'normal'
        ? index
        : graphWidth - 1 - index

        return (
          <GraphColumn
            rowIndex={id}
            commit={commit}
            index={normalisedIndex}
            commitNodeIndex={commitNodeIndex}
            key={`row_${commit ? commit.hash : INDEX_HASH}_column_${normalisedIndex}}`}
            // If there is no state for the given index, then we're in a virtual column, so use an empty state
            state={columns[normalisedIndex] ?? {}}
          />
        )
      })}
    </>
  )
})
