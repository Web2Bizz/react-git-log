import { GraphDataBuilder } from './GraphDataBuilder'
import { computeRelationships } from 'utils/computeRelationships'
import { temporalTopologicalSort } from 'utils/temporalTopologicalSort'
import { GitLogEntry } from 'types/GitLogEntry'

const entry = (hash: string, parents: string[] = [], branch = 'main'): GitLogEntry => ({
  hash,
  parents,
  branch,
  message: hash,
  committerDate: '2024-01-01T00:00:00Z'
})

const build = (entries: GitLogEntry[], currentBranch = 'main') => {
  const { children, parents, hashToCommit } = computeRelationships(entries)
  const sorted = temporalTopologicalSort([...hashToCommit.values()], children, hashToCommit)

  return new GraphDataBuilder({
    commits: sorted,
    children,
    parents,
    currentBranch
  }).build()
}

describe('GraphDataBuilder', () => {
  it('builds positions for a linear history', () => {
    const result = build([entry('a'), entry('b', ['a']), entry('c', ['b'])])

    expect(result.positions.size).toBe(3)
    expect(result.graphWidth).toBeGreaterThanOrEqual(1)
    expect(result.edges).toHaveLength(2)
  })

  it('handles a merge commit with two parents', () => {
    const result = build([
      entry('a'),
      entry('b'),
      entry('m', ['a', 'b'])
    ])

    expect(result.positions.size).toBe(3)
    expect(result.edges).toHaveLength(2)
  })

  it('handles root commits without parents', () => {
    const result = build([entry('a'), entry('b')])

    expect(result.positions.size).toBe(2)
    expect(result.edges).toHaveLength(0)
  })

  it('handles orphan parents from server-side pagination', () => {
    const result = build([entry('b', ['missing'])])

    expect(result.positions.size).toBe(1)
    expect(result.edges).toHaveLength(0)
  })

  it('returns empty graph for empty input', () => {
    const result = build([])

    expect(result.positions.size).toBe(0)
    expect(result.edges).toHaveLength(0)
  })
})
