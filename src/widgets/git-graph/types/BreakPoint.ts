import { CSSProperties } from 'react'
import { BreakPointTheme } from 'types/useTheme'

export type BreakPointProps = {
  position: BreakPointPosition
  className?: string
  color: string
  style?: Partial<Record<BreakPointTheme, CSSProperties>>
}

export type BreakPointPosition = 'top' | 'bottom'
