import { GraphColumnState } from 'components/GraphColumn'

export const getEmptyColumnState = ({ columns }: { columns: number }): GraphColumnState[] => {
  return Array.from({ length: columns }, () => ({}))
}