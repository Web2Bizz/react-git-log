import { computeRelationships } from './computeRelationships'
import { GitLogEntry } from 'types/GitLogEntry'

const entry = (hash: string, parents: string[] = [], branch = 'main'): GitLogEntry => ({
  hash,
  parents,
  branch,
  message: hash,
  committerDate: '2024-01-01T00:00:00Z'
})

describe('computeRelationships', () => {
  it('returns empty maps for empty input', () => {
    const result = computeRelationships([])
    expect(result.parents.size).toBe(0)
    expect(result.children.size).toBe(0)
    expect(result.hashToCommit.size).toBe(0)
    expect(result.orphanParents).toEqual([])
  })

  it('links parents to children and marks tips', () => {
    const result = computeRelationships([
      entry('a', []),
      entry('b', ['a'])
    ])

    expect(result.parents.get('b')).toEqual(['a'])
    expect(result.children.get('a')).toEqual(['b'])
    expect(result.hashToCommit.get('b')?.children).toEqual([])
    expect(result.hashToCommit.get('b')?.isBranchTip).toBe(true)
    expect(result.hashToCommit.get('a')?.isBranchTip).toBe(false)
  })

  it('marks head commit as tip when headCommitHash is provided', () => {
    const result = computeRelationships([
      entry('a', []),
      entry('b', ['a'])
    ], 'a')

    expect(result.hashToCommit.get('a')?.isBranchTip).toBe(true)
    expect(result.hashToCommit.get('b')?.isBranchTip).toBe(false)
  })

  it('collects orphan parents instead of ignoring them', () => {
    const result = computeRelationships([entry('b', ['missing'])])

    expect(result.orphanParents).toEqual(['missing'])
    expect(result.parents.get('b')).toEqual(['missing'])
    expect(result.hashToCommit.get('b')?.children).toEqual([])
  })

  it('supports merge commits with multiple parents', () => {
    const result = computeRelationships([
      entry('a', []),
      entry('b', []),
      entry('m', ['a', 'b'])
    ])

    expect(result.children.get('a')).toEqual(['m'])
    expect(result.children.get('b')).toEqual(['m'])
    expect(result.parents.get('m')).toEqual(['a', 'b'])
  })

  it('does not mutate the input entries', () => {
    const entries = [entry('a', []), entry('b', ['a'])]
    const snapshot = JSON.parse(JSON.stringify(entries))
    computeRelationships(entries)
    expect(entries).toEqual(snapshot)
  })
})
