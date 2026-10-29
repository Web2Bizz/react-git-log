import { GraphRow } from 'components/graph-row'
import { usePlaceholderData } from 'hooks/use-placeholder-data'

export const SkeletonGraph = () => {
  const { placeholderData } = usePlaceholderData()
  
  return (
    <>
      {placeholderData.map(({ commit, columns }, i) => (
        <GraphRow
          id={i}
          commit={commit}
          columns={columns}
          key={`skeleton-row_${commit.hash}`}
        />
      ))}
    </>
  )
}