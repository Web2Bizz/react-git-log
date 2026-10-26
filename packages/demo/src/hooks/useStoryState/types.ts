export type StoryStateProps = {
  isServerSidePaginated?: boolean
  onChangeRepository?: (event: RepositoryChangedEvent) => void
}

export type RepositoryChangedEvent = {
  repository: string
  branchName: string
}
