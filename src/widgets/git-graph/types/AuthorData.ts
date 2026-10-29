import { CSSProperties } from 'react'
import { CommitAuthor } from 'types/Commit'

export type AuthorDataProps = {
  index: number
  style: CSSProperties
  author?: CommitAuthor
  isPlaceholder: boolean
}
