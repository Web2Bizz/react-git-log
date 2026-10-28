import { AncestorFinder } from './AncestorFinder'

describe('AncestorFinder', () => {
  it('returns undefined when there are no parents', () => {
    const finder = new AncestorFinder({
      parents: new Map([['a', []]]),
      visibleHashes: new Set(['a'])
    })

    expect(finder.findClosestVisibleAncestor('a')).toBeUndefined()
  })

  it('returns the direct parent when it is visible', () => {
    const finder = new AncestorFinder({
      parents: new Map([['b', ['a']]]),
      visibleHashes: new Set(['a', 'b'])
    })

    expect(finder.findClosestVisibleAncestor('b')).toBe('a')
  })

  it('walks past filtered parents to the closest visible ancestor', () => {
    const finder = new AncestorFinder({
      parents: new Map([
        ['c', ['b']],
        ['b', ['a']]
      ]),
      visibleHashes: new Set(['a', 'c'])
    })

    expect(finder.findClosestVisibleAncestor('c')).toBe('a')
  })

  it('returns undefined when no ancestor is visible', () => {
    const finder = new AncestorFinder({
      parents: new Map([
        ['c', ['b']],
        ['b', ['a']]
      ]),
      visibleHashes: new Set(['c'])
    })

    expect(finder.findClosestVisibleAncestor('c')).toBeUndefined()
  })

  it('handles merge parents by returning the first visible one', () => {
    const finder = new AncestorFinder({
      parents: new Map([['m', ['a', 'b']]]),
      visibleHashes: new Set(['m', 'b'])
    })

    expect(finder.findClosestVisibleAncestor('m')).toBe('b')
  })

  it('handles unknown hashes without throwing', () => {
    const finder = new AncestorFinder({
      parents: new Map(),
      visibleHashes: new Set()
    })

    expect(finder.findClosestVisibleAncestor('missing')).toBeUndefined()
  })
})
