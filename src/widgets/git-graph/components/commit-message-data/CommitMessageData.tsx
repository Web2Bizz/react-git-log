import styles from './CommitMessageData.module.scss'
import { CommitMessageDataProps } from 'types/CommitMessageData'
import { IndexStatus } from 'components/index-status'

export const CommitMessageData = ({ index, isIndex, commitMessage, style }: CommitMessageDataProps) => {
  return (
    <div
      title={commitMessage}
      className={styles.message}
      id={`react-git-log-table-data-commit-message-${index}`}
      style={{ ...style, display: isIndex ? 'flex' : undefined }}
      data-testid={`react-git-log-table-data-commit-message-${index}`}
    >
      {commitMessage}

      {isIndex && (
        <IndexStatus />
      )}
    </div>
  )
}