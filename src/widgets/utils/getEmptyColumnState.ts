import { GraphColumnState } from 'components/GraphColumn'

export const getEmptyColumnState = ({ columns }: { columns: number }) => {
  return new Array<GraphColumnState>(columns).fill({})
}