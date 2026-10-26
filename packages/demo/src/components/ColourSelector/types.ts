export type ColourSelection = {
  id: string
  colors: string[]
}

export type ThemeSelectorProps = {
  selected: string
  onChange: (theme: ColourSelection) => void
}
