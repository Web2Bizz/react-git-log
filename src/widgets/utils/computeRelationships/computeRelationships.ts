import { Commit } from 'types/Commit'
import { GitLogEntry } from 'types/GitLogEntry'

export type RelationshipMaps<T> = {
  parents: Map<string, string[]>
  children: Map<string, string[]>
  hashToCommit: Map<string, Commit<T>>
  /** Parent hashes referenced by entries but missing from the input (e.g. server-side pagination). */
  orphanParents: string[]
}

export const computeRelationships = <T>(
  entries: GitLogEntry<T>[],
  headCommitHash?: string
): RelationshipMaps<T> => {
  const children = new Map<string, string[]>()
  const parents = new Map<string, string[]>()
  const hashToEntry = new Map<string, GitLogEntry<T>>()
  const orphanParents = new Set<string>()

  for (const entry of entries) {
    children.set(entry.hash, [])
    hashToEntry.set(entry.hash, entry)
  }

  for (const entry of entries) {
    const hash = entry.hash
    const parentHashes = [...entry.parents]
    parents.set(hash, parentHashes)

    for (const parentHash of parentHashes) {
      const currentChildren = children.get(parentHash)
      if (currentChildren) {
        currentChildren.push(hash)
      } else {
        orphanParents.add(parentHash)
      }
    }
  }

  const hashToCommit = new Map<string, Commit<T>>()

  for (const [hash, entry] of hashToEntry) {
    const childHashes = children.get(hash) ?? []
    hashToCommit.set(hash, {
      ...entry,
      children: [...childHashes],
      isBranchTip: headCommitHash
        ? hash === headCommitHash
        : childHashes.length === 0
    })
  }

  return { parents, children, hashToCommit, orphanParents: [...orphanParents] }
}