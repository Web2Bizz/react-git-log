import { useGitContext } from 'hooks/useGitContext'
import styles from './BranchLabel.module.scss'
import { formatBranch } from 'utils/formatBranch'
import { useMemo } from 'react'
import { Link } from '../Link'
import { BranchIcon } from 'components/Icons'
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
