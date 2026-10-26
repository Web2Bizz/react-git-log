import { GitLogPagedProps, HTMLGridGraphProps, TableProps } from '@tomplum/react-git-log'

export interface GitLogPagedStoryProps extends GitLogPagedProps<unknown>, HTMLGridGraphProps, TableProps {
  showTable: boolean
  showCommitNodeHashes: boolean
}