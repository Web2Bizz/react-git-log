import { useGitContext } from 'hooks/use-git-context'
import { GetCommitNodeColoursArgs, ThemeFunctions } from 'types/useTheme'
import { useCallback, useMemo } from 'react'
import { Commit } from 'types/Commit'
import { useThemeContext } from 'hooks/use-theme-context'
import { FALLBACK_COMMIT_COLOUR, HOVER_TRANSITION_DURATION, INDEX_HASH, SELECTED_BG_OPACITY } from 'constants/constants'

export const useTheme = (): ThemeFunctions => {
  const { graphData } = useGitContext()
  const { theme, colours } = useThemeContext()

  const hoverColour = useMemo(() => {
    if (theme === 'dark') {
      return 'rgba(70,70,70,0.8)'
    }

    return 'rgba(231, 231, 231, 0.5)'
  }, [theme])

  const textColour = useMemo(() => {
    if (theme === 'dark') {
      return 'rgb(255, 255, 255)'
    }

    return 'rgb(0, 0, 0)'
  }, [theme])

  const shiftAlphaChannel = useCallback((rgb: string, opacity: number) => {
    const matches = rgb?.match(/\d+/g)

    if (rgb && matches !== null) {
      const [r_fg, g_fg, b_fg] = matches.map(Number)
      const backgroundRgb = theme === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
      const bgMatches = backgroundRgb.match(/\d+/g)
      const [r_bg, g_bg, b_bg] = (bgMatches ?? ['0', '0', '0']).map(Number)

      const r_new = Math.round((r_fg ?? 0) * opacity + (r_bg ?? 0) * (1 - opacity))
      const g_new = Math.round((g_fg ?? 0) * opacity + (g_bg ?? 0) * (1 - opacity))
      const b_new = Math.round((b_fg ?? 0) * opacity + (b_bg ?? 0) * (1 - opacity))

      return `rgb(${r_new}, ${g_new}, ${b_new})`
    }

    return rgb
  }, [theme])

  const reduceOpacity = useCallback((rgb: string, opacity: number) => {
    return `rgba(${rgb?.replace('rgb(', '').replace(')', '')}, ${opacity})`
  }, [])

  const getGraphColumnColour = useCallback((columnIndex: number) => {
    if (colours.length === 0) {
      return FALLBACK_COMMIT_COLOUR
    }

    const colour = colours[columnIndex]

    if (!colour) {
      return colours[columnIndex % colours.length] ?? FALLBACK_COMMIT_COLOUR
    }

    return colour
  }, [colours])

  const getCommitColour = useCallback((commit: Commit) => {
    if (commit.hash === INDEX_HASH) {
      return getGraphColumnColour(0)
    }

    const position = graphData.positions.get(commit.hash)

    if (position) {
      const columnIndex = position[1]
      return getGraphColumnColour(columnIndex)
    }

    return FALLBACK_COMMIT_COLOUR
  }, [getGraphColumnColour, graphData.positions])

  const getCommitNodeColours = useCallback((args: GetCommitNodeColoursArgs) => {
    return {
      backgroundColour: shiftAlphaChannel(args.columnColour, SELECTED_BG_OPACITY),
      borderColour: args.columnColour
    }
  }, [shiftAlphaChannel])

  const getGraphColumnSelectedBackgroundColour = useCallback((columnIndex: number) => {
    return reduceOpacity(getGraphColumnColour(columnIndex), SELECTED_BG_OPACITY)
  }, [getGraphColumnColour, reduceOpacity])

  const getTooltipBackground = useCallback((commit: Commit) => {
    if (theme === 'dark') {
      return shiftAlphaChannel(getCommitColour(commit), 0.2)
    }

    return shiftAlphaChannel(getCommitColour(commit), 0.1)
  }, [getCommitColour, shiftAlphaChannel, theme])

  return {
    theme,
    hoverColour,
    textColour,
    getTooltipBackground,
    reduceOpacity,
    getCommitColour,
    shiftAlphaChannel,
    getGraphColumnColour,
    getCommitNodeColours,
    getGraphColumnSelectedBackgroundColour,
    hoverTransitionDuration: HOVER_TRANSITION_DURATION
  }
}
