import { RefObject } from 'react'

export type ResizeState = {
  ref: RefObject<HTMLDivElement | null>
  width: number
  startResizing: () => void
}
