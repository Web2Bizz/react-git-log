import { PropsWithChildren } from 'react'
import { GitLogPagedProps } from 'types/GitLog'
import { Tags } from '../tags'
import { GraphHTMLGrid } from '../graph'
import { Table } from '../table'
import { GitLogCore } from '../git-log-core'

export const GitLogPaged = <T,>({ children, branchName, ...props }: PropsWithChildren<GitLogPagedProps<T>>) => {
  return (
    <GitLogCore<T>
      {...props}
      isServerSidePaginated
      currentBranch={branchName}
      componentName="GitLogPaged"
    >
      {children}
    </GitLogCore>
  )
}

GitLogPaged.Tags = Tags
GitLogPaged.GraphHTMLGrid = GraphHTMLGrid
GitLogPaged.Table = Table