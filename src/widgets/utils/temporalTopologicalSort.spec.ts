import { temporalTopologicalSort } from './temporalTopologicalSort'
import { Commit } from 'types/Commit'

const commit = (hash: string, committerDate = '2024-01-01T00:00:00Z'): Commit => ({
  hash,
  parents: [],
  children: [],
  branch: 'main',
  message: hash,
  committerDate,
  isBranchTip: false
})

describe('temporalTopologicalSort', () => {
  it('returns empty array for empty input', () => {
    expect(temporalTopologicalSort([], new Map(), new Map())).toEqual([])
  })

  it('does not mutate the input array', () => {
    const input = [commit('a'), commit('b')]
    const snapshot = [...input]
    temporalTopologicalSort(input, new Map(), new Map())
    expect(input).toEqual(snapshot)
  })

  it('sorts newest commits first', () => {
    const oldCommit = commit('old', '2023-01-01T00:00:00Z')
    const newCommit = commit('new', '2024-01-01T00:00:00Z')
    const hashToCommit = new Map([
      ['old', oldCommit],
      ['new', newCommit]
    ])

    const result = temporalTopologicalSort(
      [oldCommit, newCommit],
      new Map([['old', []], ['new', []]]),
      hashToCommit
    )

    expect(result.map(c => c.hash)).toEqual(['new', 'old'])
  })

  it('handles invalid dates without NaN ordering', () => {
    const bad = commit('bad', 'not-a-date')
    const good = commit('good', '2024-01-01T00:00:00Z')
    const hashToCommit = new Map([['bad', bad], ['good', good]])

    const result = temporalTopologicalSort(
      [bad, good],
      new Map([['bad', []], ['good', []]]),
      hashToCommit
    )

    expect(result).toHaveLength(2)
    expect(result.map(c => c.hash)).toContain('bad')
    expect(result.map(c => c.hash)).toContain('good')
  })

  it('skips missing children without throwing', () => {
    const a = commit('a')
    const hashToCommit = new Map([['a', a]])

    const result = temporalTopologicalSort(
      [a],
      new Map([['a', ['missing']]]),
      hashToCommit
    )

    expect(result.map(c => c.hash)).toEqual(['a'])
  })

  it('visits each commit once even with shared children', () => {
    const a = commit('a')
    const b = commit('b')
    const hashToCommit = new Map([['a', a], ['b', b]])

    const result = temporalTopologicalSort(
      [a, b],
      new Map([['a', ['b']], ['b', []]]),
      hashToCommit
    )

    expect(result.map(c => c.hash).sort()).toEqual(['a', 'b'])
  })
})
