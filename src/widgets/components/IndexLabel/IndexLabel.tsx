import styles from './IndexLabel.module.scss'
import { GitIcon } from 'components/GitIcon'

export const IndexLabel = () => {
  return (
    <>
      <span className={styles.indexLabel}>
        index
      </span>

      <GitIcon className={styles.icon} />
    </>
  )
}