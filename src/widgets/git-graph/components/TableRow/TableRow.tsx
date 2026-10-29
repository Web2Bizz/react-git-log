import styles from './TableRow.module.scss'
import { GitLogTableRowProps } from 'types/TableRow'
import { cloneElement, CSSProperties, memo, useCallback, useMemo } from 'react'
import { useTheme } from 'hooks/useTheme'
import { useGitContext } from 'hooks/useGitContext'
import { useSelectCommit } from 'hooks/useSelectCommit'
import { BACKGROUND_HEIGHT_OFFSET, DIMMED_TEXT_OPACITY, INDEX_HASH, ROW_HEIGHT, SELECTED_BG_OPACITY } from 'constants/constants'
import { CommitMessageData } from 'components/CommitMessageData'
import { AuthorData } from 'components/AuthorData'
import { TimestampData } from 'components/TimestampData'

export const TableRow = memo(({
  row,
  index,
  commit,
  isPlaceholder,
  rowStyleOverrides,
  dataStyleOverrides,
  ...props
}: GitLogTableRowProps) => {
  const {
    textColour,
    hoverColour,
    reduceOpacity,
    getCommitColour,
    shiftAlphaChannel
  } = useTheme()

  const { selectCommitHandler } = useSelectCommit()
  const { selectedCommit, previewedCommit, nodeSize, enableSelectedCommitStyling, enablePreviewedCommitStyling } = useGitContext()

  const isRowSelected = selectedCommit?.hash === commit.hash
  const isRowPreviewed = previewedCommit?.hash === commit.hash
  const isMergeCommit = commit.parents.length > 1

  const backgroundColour = useMemo(() => {
    if (isRowSelected && enableSelectedCommitStyling) {
      if (isPlaceholder) {
        return hoverColour
      }

      const colour = getCommitColour(commit)
      return reduceOpacity(colour, SELECTED_BG_OPACITY)
    }

    if (isRowPreviewed && enablePreviewedCommitStyling) {
      return hoverColour
    }

    return 'transparent'
  }, [getCommitColour, commit, isRowSelected, enableSelectedCommitStyling, isRowPreviewed, enablePreviewedCommitStyling, isPlaceholder, reduceOpacity, hoverColour])

  const backgroundStyles = useMemo(() => {
    const height = nodeSize + BACKGROUND_HEIGHT_OFFSET
    const padding = (ROW_HEIGHT - height) / 2
    const end = padding + height

    return {
      background: `linear-gradient(
        to bottom, 
        transparent ${padding}px, 
        ${backgroundColour} ${padding}px,
        ${backgroundColour} ${end}px,
        transparent ${end}px
      )`
    }
  }, [backgroundColour, nodeSize])

  const shouldRenderHyphenValue = commit.hash === INDEX_HASH || Boolean(isPlaceholder)
  const shouldReduceOpacity = !isPlaceholder && (isMergeCommit || commit.hash === INDEX_HASH)

  const tableDataStyle: CSSProperties = useMemo(() => ({
    lineHeight: `${ROW_HEIGHT}px`,
    color: shiftAlphaChannel(textColour, shouldReduceOpacity ? DIMMED_TEXT_OPACITY : 1),
    ...backgroundStyles,
    ...dataStyleOverrides
  }), [textColour, shiftAlphaChannel, shouldReduceOpacity, backgroundStyles, dataStyleOverrides])

  const handleMouseOut = useCallback(() => {
    selectCommitHandler.onMouseOut()
  }, [selectCommitHandler])

  const handleClick = useCallback(() => {
    selectCommitHandler.onClick(commit)
  }, [selectCommitHandler, commit])

  const handleMouseOver = useCallback(() => {
    selectCommitHandler.onMouseOver(commit)
  }, [selectCommitHandler, commit])

  const rowContainerProps = {
    id: `react-git-log-table-row-${index}`,
    onMouseOut: handleMouseOut,
    'data-testid': `react-git-log-table-row-${index}`,
    onClick: handleClick,
    onMouseOver: handleMouseOver
  }

  if (row) {
    const customRowElement = row({
      commit,
      selected: isRowSelected,
      previewed: isRowPreviewed,
      backgroundColour
    })

    return cloneElement(customRowElement, {
      ...rowContainerProps,
      ...customRowElement.props
    })
  }

  return (
    <div
      {...rowContainerProps}
      role='row'
      aria-selected={isRowSelected}
      style={rowStyleOverrides}
      className={styles.row}
      {...props}
    >
      <CommitMessageData
        index={index}
        style={tableDataStyle}
        commitMessage={commit.message}
        isIndex={commit.hash === INDEX_HASH}
      />

      <AuthorData
        index={index}
        author={commit.author}
        style={tableDataStyle}
        isPlaceholder={shouldRenderHyphenValue}
      />

      <TimestampData
        index={index}
        style={tableDataStyle}
        timestamp={commit.committerDate}
        isPlaceholder={shouldRenderHyphenValue}
      />
    </div>
  )
})
