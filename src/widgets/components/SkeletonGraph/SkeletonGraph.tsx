import { GraphRow } from 'components/GraphRow'
import { usePlaceholderData } from 'hooks/usePlaceholderData'

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