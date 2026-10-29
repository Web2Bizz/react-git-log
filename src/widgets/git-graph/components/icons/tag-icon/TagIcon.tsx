import Icon from 'assets/tag.svg?react'
import { useTheme } from 'hooks/use-theme'
import styles from './TagIcon.module.scss'
import classNames from 'classnames'
import { TagIconProps } from 'types/TagIcon'

export const TagIcon = ({ className }: TagIconProps) => {
  const { textColour } = useTheme()

  return (
    <Icon
      id='tag-icon'
      data-testid='tag-icon'
      style={{ stroke: textColour }}
      className={classNames(styles.icon, className)}
    />
  )
}