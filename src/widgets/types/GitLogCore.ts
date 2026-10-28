import { GitLogPagedProps, GitLogProps } from 'types/GitLog'

export type GitLogCoreProps<T> = GitLogProps<T> & Omit<GitLogPagedProps<T>, 'headCommitHash' | 'branchName'> & {
  componentName: string
  headCommitHash?: string
  isServerSidePaginated?: boolean
}
