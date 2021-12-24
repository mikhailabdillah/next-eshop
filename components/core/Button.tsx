import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react'
import cn from 'classnames'
import s from './Button.module.css'

type ButtonProps = {
  children: ReactNode
  className?: string
  id?: string
  target?: HTMLAttributeAnchorTarget
  onClick?: MouseEventHandler<HTMLButtonElement>
  full?: boolean
  size?: 'small' | 'large'
}

const Button = (props: ButtonProps) => {
  const { children, className, id, target, full, size, onClick } = props

  const ButtonAttr = {
    ...(id && {
      id: id,
    }),
    ...(target && {
      target: target,
    }),
    ...(onClick && {
      onClick: onClick,
    }),
  }
  return (
    <button
      className={cn(
        s.btn,
        full && 'w-full',
        { [s.btnSmall]: size === 'small', [s.btnLarge]: size === 'large' },
        className
      )}
      {...ButtonAttr}
    >
      <span className={s.btnLabel}>{children}</span>
    </button>
  )
}

export default Button
