import { useContext } from 'react'
import { ThemeContext } from '../../context/theme-context/ThemeContext'

export const useThemeContext = () => useContext(ThemeContext)