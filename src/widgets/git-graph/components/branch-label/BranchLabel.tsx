import { useGitContext } from 'hooks/use-git-context'
import styles from './BranchLabel.module.scss'
import { formatBranch } from 'utils/format-branch'
import { useMemo } from 'react'
import { Link } from '../link'
import { BranchIcon } from 'components/icons'
import { BranchLabelProps } from 'types/BranchLabel'

export const BranchLabel = ({ commit }: BranchLabelProps) => {
  const { remoteProviderUrlBuilder } = useGitContext()

  const displayName = formatBranch(commit.branch)

  const linkHref = useMemo(() => {
    const branchLink = remoteProviderUrlBuilder?.({ commit }).branch

    if (branchLink) {
      return branchLink
    }
  }, [commit, remoteProviderUrlBuilder])

  if (linkHref) {
    return (
      <>
        <Link
          href={linkHref}
          text={displayName}
          className={styles.branchName}
        />

        <BranchIcon
          className={styles.icon}
        />
      </>
    )
  }

  return (
    <>
      <span className={styles.branchName}>
        {displayName}
      </span>

      <BranchIcon
        className={styles.icon}
      />
    </>
  )
}
