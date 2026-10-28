import { createContext } from 'react'
import { ThemeContextBag } from 'types/ThemeContext'
import { neonAuroraDarkColours } from 'hooks/useTheme'

export const ThemeContext = createContext<ThemeContextBag>({
  colours: neonAuroraDarkColours,
  theme: 'light'
})