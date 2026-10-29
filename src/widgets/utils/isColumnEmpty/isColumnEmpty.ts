import { GraphColumnState } from 'components/GraphColumn'

export const isColumnEmpty = (state: GraphColumnState | undefined): boolean => {
  if (!state) {
    return true
  }

  return (
    !state.isNode &&
    !state.isHorizontalLine &&
    !state.isVerticalLine &&
    !state.isVerticalIndexLine &&
    !state.isLeftDownCurve &&
    !state.isLeftUpCurve &&
    !state.isPlaceholderSkeleton &&
    !state.isTopBreakPoint &&
    !state.isBottomBreakPoint &&
    !state.isColumnAboveEmpty &&
    !state.isColumnBelowEmpty &&
    (state.mergeSourceColumns?.length ?? 0) === 0
  )
}