import { createContext } from 'react'
import { ThemeContextBag } from 'types/ThemeContext'
import { neonAuroraDarkColours } from 'hooks/use-theme'

export const ThemeContext = createContext<ThemeContextBag>({
  colours: neonAuroraDarkColours,
  theme: 'light'
})