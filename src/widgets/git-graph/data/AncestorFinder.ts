type AncestorFinderProps = {
  parents: Map<string, string[]>
  visibleHashes: Set<string>
}

type Frame = {
  hash: string
  /** Index of the next parent to explore. */
  next: number
  /** Parent pushed onto the stack whose result we are waiting for. */
  waitingFor: string | null
}

/**
 * Finds the closest visible ancestor of a commit
 * when its direct parent is filtered out or lies
 * outside the current page of data.
 *
 * Iterative post-order walk that exactly mirrors the
 * original recursive DFS semantics: parents are explored
 * strictly in order, and the first parent's whole subtree
 * resolves before the next parent is considered. Cached
 * values are only consulted when "entering" a node, never
 * speculatively for siblings.
 */
export class AncestorFinder {
  private readonly cache = new Map<string, string | undefined>()

  private readonly _parents: Map<string, string[]>
  private readonly _visibleHashes: Set<string>

  constructor(props: AncestorFinderProps) {
    this._parents = props.parents
    this._visibleHashes = props.visibleHashes
  }

  public findClosestVisibleAncestor(hash: string): string | undefined {
    if (this.cache.has(hash)) {
      return this.cache.get(hash)
    }

    const stack: Frame[] = [{ hash, next: 0, waitingFor: null }]

    while (stack.length > 0) {
      const frame = stack[stack.length - 1]
      if (frame === undefined) {
        stack.pop()
        continue
      }

      // A pushed node may have been resolved while it waited
      // (memoised from an earlier top-level call).
      if (frame.next === 0 && frame.waitingFor === null && this.cache.has(frame.hash)) {
        stack.pop()
        continue
      }

      // A child we pushed has now resolved: read its result.
      if (frame.waitingFor !== null) {
        const childHash = frame.waitingFor
        frame.waitingFor = null
        const childResult = this.cache.get(childHash)
        if (childResult !== undefined) {
          this.cache.set(frame.hash, childResult)
          stack.pop()
          continue
        }
        // Child resolved to nothing: move on to the next parent.
      }

      const parentHashes = this._parents.get(frame.hash)
      if (!parentHashes || parentHashes.length === 0) {
        this.cache.set(frame.hash, undefined)
        stack.pop()
        continue
      }

      // Direct visible parents win immediately, in order.
      if (frame.next === 0) {
        let directHit: string | null = null
        for (const parentHash of parentHashes) {
          if (this._visibleHashes.has(parentHash)) {
            directHit = parentHash
            break
          }
        }
        if (directHit !== null) {
          this.cache.set(frame.hash, directHit)
          stack.pop()
          continue
        }
      }

      if (frame.next >= parentHashes.length) {
        this.cache.set(frame.hash, undefined)
        stack.pop()
        continue
      }

      const nextParent = parentHashes[frame.next]
      frame.next += 1
      if (nextParent === undefined) {
        continue
      }

      if (this.cache.has(nextParent)) {
        const cached = this.cache.get(nextParent)
        if (cached !== undefined) {
          this.cache.set(frame.hash, cached)
          stack.pop()
        }
        // Cached undefined: fall through to the next parent.
        continue
      }

      frame.waitingFor = nextParent
      stack.push({ hash: nextParent, next: 0, waitingFor: null })
    }

    return this.cache.get(hash)
  }
}
