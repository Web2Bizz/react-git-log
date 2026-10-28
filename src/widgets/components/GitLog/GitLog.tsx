import { GitLogProps } from 'types/GitLog'
import { PropsWithChildren } from 'react'
import { Tags } from '../Tags'
import { GraphHTMLGrid } from '../Graph'
import { Table } from '../Table'
import { GitLogCore } from '../GitLogCore'

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
