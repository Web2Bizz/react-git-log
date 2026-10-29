import { GitLogProps } from 'types/GitLog'
import { PropsWithChildren } from 'react'
import { Tags } from '../tags'
import { GraphHTMLGrid } from '../graph'
import { Table } from '../table'
import { GitLogCore } from '../git-log-core'

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
