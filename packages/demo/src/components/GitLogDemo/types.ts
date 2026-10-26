import { GitLogProps, HTMLGridGraphProps, TableProps } from '@tomplum/react-git-log'

export interface GitLogStoryProps extends GitLogProps, HTMLGridGraphProps, TableProps {
  pageSize?: number
  page?: number
  showTable: boolean
  showBranchesTags: boolean
  showCommitNodeHashes: boolean
  indexStatusFilesModified: number
  indexStatusFilesAdded: number
  indexStatusFilesDeleted: number
}