import { ReactElement } from 'react'

export type RepositoryItemProps = {
  icon: ReactElement<{ className?: string }>
  name: string
  branch: string
}
