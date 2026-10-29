import { GraphCore } from './core'
import { HTMLGridGraph } from './strategies/Grid'
import { HTMLGridGraphProps } from 'types/Graph'

export const GraphHTMLGrid = <T,>(props: HTMLGridGraphProps<T>) => {
  return (
    <GraphCore<T> {...props}>
      <HTMLGridGraph />
    </GraphCore>
  )
}