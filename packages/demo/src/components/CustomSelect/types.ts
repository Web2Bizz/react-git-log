import { ReactNode } from 'react'
import { ThemeMode } from '@tomplum/react-git-log'

export type CustomSelectProps = {
  label: string
  value: string
  className?: string
  theme: ThemeMode
  width: number
  onChange: (value: string) => void
  options: { label: ReactNode; value: string }[]
}
