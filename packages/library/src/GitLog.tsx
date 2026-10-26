import { GitLogProps } from './types'
import { PropsWithChildren } from 'react'
import { Tags } from './modules/Tags'
import { GraphHTMLGrid } from './modules/Graph'
import { Table } from './modules/Table'
import { GitLogCore } from './components/GitLogCore'

export const GitLog = <T = unknown>({ children, ...props }: PropsWithChildren<GitLogProps<T>>) => {
  return (
    <GitLogCore<T> {...props} componentName="GitLog">
      {children}
    </GitLogCore>
  )
}

GitLog.Tags = Tags
GitLog.GraphHTMLGrid = GraphHTMLGrid
GitLog.Table = Table