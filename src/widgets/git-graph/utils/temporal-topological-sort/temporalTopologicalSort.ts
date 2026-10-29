import { Commit } from 'types/Commit'

const toTimestamp = (value: string): number => {
  const parsed = new Date(value).getTime()
  return Number.isNaN(parsed) ? 0 : parsed
}

export const temporalTopologicalSort = <T>(
  commits: Commit<T>[],
  children: Map<string, string[]>,
  hashToCommit: Map<string, Commit<T>>
) => {
  const sorted: Commit<T>[] = []
  const seen = new Set<string>()
  const timestamps = new Map<string, number>(
    commits.map(commit => [commit.hash, toTimestamp(commit.committerDate)])
  )

  const commitsSortedByTime = [...commits].sort((a, b) => {
    return (timestamps.get(b.hash) ?? 0) - (timestamps.get(a.hash) ?? 0)
  })

  // Iterative post-order DFS matching the original recursive semantics:
  // a commit is appended only after its entire child subtree,
  // so children always precede their parents in the result.
  // Children are pushed in reverse so the first child is processed first.
  for (const entry of commitsSortedByTime) {
    if (seen.has(entry.hash)) {
      continue
    }

    const stack: { commit: Commit<T>; expanded: boolean }[] = [{ commit: entry, expanded: false }]

    while (stack.length > 0) {
      const top = stack[stack.length - 1]
      if (top === undefined) {
        stack.pop()
        continue
      }

      // Already expanded and waiting: its subtree is done, emit it.
      // This check must come before the seen-check, since expanded
      // nodes are in `seen` but not yet in `sorted`.
      if (top.expanded) {
        sorted.push(top.commit)
        stack.pop()
        continue
      }

      // Pushed twice via a diamond (or a cycle): skip the duplicate.
      if (seen.has(top.commit.hash)) {
        stack.pop()
        continue
      }

      top.expanded = true
      seen.add(top.commit.hash)

      const childHashes = children.get(top.commit.hash) ?? []
      for (let i = childHashes.length - 1; i >= 0; i--) {
        const childHash = childHashes[i]
        if (childHash === undefined) {
          continue
        }
        const child = hashToCommit.get(childHash)
        if (child && !seen.has(child.hash)) {
          stack.push({ commit: child, expanded: false })
        }
      }
    }
  }

  return sorted
}