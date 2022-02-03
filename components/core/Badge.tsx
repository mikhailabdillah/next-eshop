import { ReactNode } from 'react'
import s from './Badge.module.css'
import cn from 'classnames'

type Props = {
  className?: string
  children?: ReactNode
}

const Badge = ({ className, children }: Props) => {
  return <span className={cn(s.badge, className)}>{children}</span>
}

export default Badge
