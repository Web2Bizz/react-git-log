import { HTMLAttributes } from 'react'

export type LinkProps = HTMLAttributes<HTMLAnchorElement> & {
  text: string
  href?: string
  className?: string
}
