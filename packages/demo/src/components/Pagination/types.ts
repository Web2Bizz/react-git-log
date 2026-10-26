import { ThemeMode } from '@tomplum/react-git-log'

export type PaginationProps = {
  theme: ThemeMode
  currentPage: number
  pageSize: number
  total: number
  onChangePage: (pageNumber: number) => void
  onChangePageSize: (pageSize: number) => void
}
