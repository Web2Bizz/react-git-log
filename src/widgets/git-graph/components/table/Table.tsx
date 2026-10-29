import styles from './Table.module.scss'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTheme } from 'hooks/use-theme'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useGitContext } from 'hooks/use-git-context'
import { useVisibleCommits } from 'hooks/use-visible-commits'
import { usePlaceholderData } from 'hooks/use-placeholder-data'
import { TableRow } from 'components/table-row'
import { TableContainer } from 'components/table-container'
import { TableProps } from 'types/Table'
import { TableContext, TableContextBag } from 'context/table-context'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

export const Table = <T,>({
  row,
  className,
  styles: styleOverrides,
  timestampFormat = 'YYYY-MM-DD HH:mm:ss'
}: TableProps) => {
  const { textColour, } = useTheme()
  const { placeholderData } = usePlaceholderData()
  const { showHeaders, graphData, paging, filter, indexCommit, isIndexVisible } = useGitContext<T>()

  const { tableData } = useVisibleCommits({
    commits: graphData.commits,
    filter,
    paging,
    indexCommit,
    isIndexVisible
  })

  const tableContextValue = useMemo<TableContextBag>(() => ({
    timestampFormat
  }), [timestampFormat])

  return (
    <TableContext.Provider value={tableContextValue}>
      <TableContainer
        row={row}
        className={className}
        rowQuantity={tableData.length}
        styleOverrides={styleOverrides?.table}
      >
        {showHeaders && (
          <div
            role='row'
            className={styles.head}
            id='react-git-log-table-head'
            style={styleOverrides?.thead}
            data-testid='react-git-log-table-head'
          >
            <div
              role='columnheader'
              className={styles.header}
              style={{ color: textColour }}
              id='react-git-log-table-header-commit-message'
              data-testid='react-git-log-table-header-commit-message'
            >
              Commit message
            </div>

            <div
              role='columnheader'
              className={styles.header}
              style={{ color: textColour }}
              id='react-git-log-table-header-author'
              data-testid='react-git-log-table-header-author'
            >
              Author
            </div>

            <div
              role='columnheader'
              className={styles.header}
              style={{ color: textColour }}
              id='react-git-log-table-header-timestamp'
              data-testid='react-git-log-table-header-timestamp'
            >
              Timestamp
            </div>
          </div>
        )}

        {tableData.length === 0 && placeholderData.map(({ commit }, i) => (
          <TableRow
            index={i}
            isPlaceholder
            commit={commit}
            rowStyleOverrides={styleOverrides?.tr}
            dataStyleOverrides={styleOverrides?.td}
            key={`git-log-empty-table-row-${commit.hash}`}
            data-testid={`react-git-log-empty-table-row-${i}`}
          />
        ))}

        {tableData.map((commit, i) => (
          <TableRow
            row={row}
            index={i}
            commit={commit}
            rowStyleOverrides={styleOverrides?.tr}
            dataStyleOverrides={styleOverrides?.td}
            key={`git-log-table-row-${commit.hash}`}
            data-testid={`react-git-log-table-row-${i}`}
          />
        ))}
      </TableContainer>
    </TableContext.Provider>
  )
}
