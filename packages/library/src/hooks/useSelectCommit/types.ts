import { Commit } from 'types/Commit'

export type SelectCommitHandler = {
  selectCommitHandler: {
    onMouseOver: (commit: Commit) => void
    onMouseOut: () => void
    onClick: (commit: Commit) => void
  }
}
