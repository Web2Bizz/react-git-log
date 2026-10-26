import { GitLogPagedProps, HTMLGridGraphProps, TableProps } from '@tomplum/react-git-log'

export type GitLogPagedStoryProps = GitLogPagedProps<unknown> & HTMLGridGraphProps & TableProps & {
  showTable: boolean
  showCommitNodeHashes: boolean
}
