import { GitLogPagedProps, GitLogProps } from '../../types'

export type GitLogCoreProps<T> = GitLogProps<T> & Omit<GitLogPagedProps<T>, 'headCommitHash' | 'branchName'> & {
  componentName: string
  headCommitHash?: string
  isServerSidePaginated?: boolean
}
