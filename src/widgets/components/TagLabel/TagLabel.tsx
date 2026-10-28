import { useGitContext } from 'hooks/useGitContext'
import { formatBranch } from 'utils/formatBranch'
import { useMemo } from 'react'
import styles from './TagLabel.module.scss'
import { Link } from '../Link'
import { TagIcon } from 'components/Icons'
import { TagLabelProps } from 'types/TagLabel'

export const TagLabel = ({ commit }: TagLabelProps) => {
  const { remoteProviderUrlBuilder } = useGitContext()

  const displayName = formatBranch(commit.branch)

  const linkHref = useMemo(() => {
    if (remoteProviderUrlBuilder) {
      return remoteProviderUrlBuilder({ commit }).branch
    }
  }, [commit, remoteProviderUrlBuilder])

  if (linkHref) {
    return (
      <>
        <Link
          href={linkHref}
          text={displayName}
          className={styles.tagName}
        />

        <TagIcon />
      </>
    )
  }

  return (
    <>
      <span className={styles.tagName}>
        {displayName}
      </span>

      <TagIcon  />
    </>
  )
}
