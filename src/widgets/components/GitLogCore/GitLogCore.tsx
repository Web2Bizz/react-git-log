import { GitLogCoreProps } from 'types/GitLogCore'
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { GitDataContext } from 'context/GitDataContext'
import { GitSelectionContext } from 'context/GitSelectionContext'
import { GitViewContext } from 'context/GitViewContext'
import { GitDataContextBag, GitSelectionContextBag, GitViewContextBag } from 'types/GitContext'
import { Tags } from 'components/Tags'
import { GraphHTMLGrid, GraphOrientation } from 'components/Graph'
import { Table } from 'components/Table'
import { Layout } from 'components/Layout'
import { Commit } from 'types/Commit'
import { DEFAULT_NODE_SIZE, NODE_BORDER_WIDTH } from 'constants/constants'
import { ThemeContextProvider } from 'context/ThemeContext'
import { useCoreComponents } from 'hooks/useCoreComponents/useCoreComponents'
import { useGitGraphData } from 'hooks/useGitGraphData'
import { useHeadCommit } from 'hooks/useHeadCommit'
import { useIndexCommit } from 'hooks/useIndexCommit'
import { usePaging } from 'hooks/usePaging'

export const GitLogCore = <T,>({
  children,
  entries,
  showHeaders = false,
  rowSpacing = 0,
  theme = 'light',
  colours = 'rainbow-light',
  filter,
  classes,
  defaultGraphWidth,
  onSelectCommit,
  onPreviewCommit,
  urls,
  currentBranch,
  paging,
  headCommitHash,
  componentName,
  indexStatus,
  isServerSidePaginated = false,
  showGitIndex = true,
  enableSelectedCommitStyling = true,
  enablePreviewedCommitStyling = true
}: PropsWithChildren<GitLogCoreProps<T>>) => {
  const { tags, graph, table } = useCoreComponents({
    children,
    componentName
  })

  const { graphData, allCommits } = useGitGraphData({
    entries,
    currentBranch,
    headCommitHash,
    filter
  })

  const [nodeSize, setNodeSize] = useState(DEFAULT_NODE_SIZE)
  const [graphOrientation, setGraphOrientation] = useState<GraphOrientation>('normal')
  const [selectedCommit, setSelectedCommit] = useState<Commit<T>>()
  const [previewedCommit, setPreviewedCommit] = useState<Commit<T>>()

  const smallestAvailableGraphWidth = graphData.graphWidth * (nodeSize + (NODE_BORDER_WIDTH * 2))

  const [, setGraphWidth] = useState(defaultGraphWidth ?? smallestAvailableGraphWidth)

  const handleSelectCommit = useCallback((commit?: Commit<T>) => {
    setSelectedCommit(commit)
    onSelectCommit?.(commit)
  }, [onSelectCommit])

  const handlePreviewCommit = useCallback((commit?: Commit<T>) => {
    setPreviewedCommit(commit)
    onPreviewCommit?.(commit)
  }, [onPreviewCommit])

  const headCommit = useHeadCommit({
    allCommits,
    currentBranch,
    headCommitHash,
    isServerSidePaginated
  })

  const indexCommit = useIndexCommit(headCommit)

  const { pageIndices, isIndexVisible } = usePaging({
    entries,
    paging,
    showGitIndex,
    isServerSidePaginated,
    headCommitHash
  })

  const graphContainerWidthValue = useMemo<number>(() => {
    if (defaultGraphWidth && defaultGraphWidth >= smallestAvailableGraphWidth) {
      return defaultGraphWidth
    }

    return smallestAvailableGraphWidth
  }, [defaultGraphWidth, smallestAvailableGraphWidth])


  const dataValue = useMemo<GitDataContextBag<T>>(() => ({
    showTable: Boolean(table),
    showBranchesTags: Boolean(tags),
    classes,
    filter,
    remoteProviderUrlBuilder: urls,
    showHeaders,
    currentBranch,
    headCommit,
    indexCommit,
    graphData,
    paging: pageIndices,
    headCommitHash,
    isServerSidePaginated,
    isIndexVisible,
    indexStatus,
    setGraphWidth
  }), [
    classes,
    urls,
    filter,
    showHeaders,
    headCommit,
    currentBranch,
    indexCommit,
    graphData,
    pageIndices,
    setGraphWidth,
    table,
    tags,
    headCommitHash,
    isServerSidePaginated,
    isIndexVisible,
    indexStatus
  ])

  const selectionValue = useMemo<GitSelectionContextBag<T>>(() => ({
    selectedCommit,
    setSelectedCommit: handleSelectCommit,
    previewedCommit,
    setPreviewedCommit: handlePreviewCommit,
    enablePreviewedCommitStyling,
    enableSelectedCommitStyling
  }), [
    selectedCommit,
    previewedCommit,
    handleSelectCommit,
    handlePreviewCommit,
    enablePreviewedCommitStyling,
    enableSelectedCommitStyling
  ])

  const viewValue = useMemo<GitViewContextBag>(() => ({
    rowSpacing,
    graphWidth: graphContainerWidthValue,
    nodeSize,
    setNodeSize,
    graphOrientation,
    setGraphOrientation
  }), [
    rowSpacing,
    graphContainerWidthValue,
    nodeSize,
    graphOrientation
  ])

  return (
    <GitDataContext.Provider value={dataValue as GitDataContextBag}>
      <GitSelectionContext.Provider value={selectionValue as GitSelectionContextBag}>
        <GitViewContext.Provider value={viewValue}>
          <ThemeContextProvider theme={theme} colours={colours} graphWidth={graphData.graphWidth}>
            <Layout tags={tags} graph={graph} table={table} />
          </ThemeContextProvider>
        </GitViewContext.Provider>
      </GitSelectionContext.Provider>
    </GitDataContext.Provider>
  )
}

GitLogCore.Tags = Tags
GitLogCore.GraphHTMLGrid = GraphHTMLGrid
GitLogCore.Table = Table