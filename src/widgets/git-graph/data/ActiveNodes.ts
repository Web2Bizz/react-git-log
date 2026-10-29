import FastPriorityQueue from 'fastpriorityqueue'
import { INDEX_HASH } from 'constants/constants'

export class ActiveNodes {
  private readonly activeNodes = new Map<string, Set<number>>()
  private readonly activeNodesQueue = new FastPriorityQueue<[number, string]>((lhs, rhs) => lhs[0] < rhs[0])

  constructor() {
    this.activeNodes.set(INDEX_HASH, new Set<number>())
  }

  public removeOutdatedNodes(rowIndex: number) {
    while (!this.activeNodesQueue.isEmpty()) {
      const peeked = this.activeNodesQueue.peek()
      if (peeked === undefined || peeked[0] >= rowIndex) {
        break
      }

      const polled = this.activeNodesQueue.poll()
      if (polled !== undefined) {
        this.activeNodes.delete(polled[1])
      }
    }
  }

  public initialiseNewColumn(hash: string) {
    this.activeNodes.set(hash, new Set<number>())
  }

  public update(columnValues: number[]) {
    this.activeNodes.forEach(activeNode => {
      columnValues.forEach(columnValue => {
        activeNode.add(columnValue)
      })
    })
  }

  public enqueue(value: [number, string]) {
    this.activeNodesQueue.add(value)
  }

  public get(hash: string) {
    return this.activeNodes.get(hash)
  }
}