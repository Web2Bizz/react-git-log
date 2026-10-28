import { GraphRowProps } from 'types/GraphRow'
import { GraphColumn } from 'components/GraphColumn'
import { useGraphContext } from 'hooks/useGraphContext'
import { INDEX_HASH } from 'constants/constants'

export const GraphRow = ({ id, commit, columns }: GraphRowProps) => {
  const { graphWidth, orientation } = useGraphContext()

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
            commitNodeIndex={columns.findIndex(col => col.isNode)}
            key={`row_${commit ? commit.hash : INDEX_HASH}_column_${normalisedIndex}}`}
            // If there is no state for the given index, then we're in a virtual column, so use an empty state
            state={columns[normalisedIndex] ?? {}}
          />
        )
      })}
    </>
  )
}
