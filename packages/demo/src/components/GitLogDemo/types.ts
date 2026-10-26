import { GitLogProps, HTMLGridGraphProps, TableProps } from '@tomplum/react-git-log'

export type GitLogStoryProps = GitLogProps & HTMLGridGraphProps & TableProps & {
  pageSize?: number
  page?: number
  showTable: boolean
  showBranchesTags: boolean
  showCommitNodeHashes: boolean
  indexStatusFilesModified: number
  indexStatusFilesAdded: number
  indexStatusFilesDeleted: number
}
