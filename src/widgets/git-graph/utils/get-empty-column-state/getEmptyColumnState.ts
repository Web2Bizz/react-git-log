import { GraphColumnState } from 'components/graph-column'

export const getEmptyColumnState = ({ columns }: { columns: number }): GraphColumnState[] => {
  return Array.from({ length: columns }, () => ({}))
}