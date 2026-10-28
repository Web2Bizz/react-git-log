import { useMemo } from 'react'
import { columns, placeholderCommits } from './data'
import { PlaceholderData } from 'types/usePlaceholderData'

export const usePlaceholderData = (): PlaceholderData => {
  const placeholderData = useMemo(() => {
    return placeholderCommits.map((commit, i) => ({
      commit,
      columns: columns[i].map(col => ({
        ...col,
        isPlaceholderSkeleton: true
      }))
    }))
  }, [])

  return {
    placeholderData
  }
}