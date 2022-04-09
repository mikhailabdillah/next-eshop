import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react'
import cn from 'classnames'
import s from './Button.module.css'

type ButtonProps = {
  children?: ReactNode
  className?: string
  id?: string
  target?: HTMLAttributeAnchorTarget
  onClick?: MouseEventHandler<HTMLButtonElement>
  full?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
}

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    id,
    target,
    full,
    size = 'md',
    rounded,
    onClick,
  } = props

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
      type="button"
      className={cn(
        s.btn,
        full && s.btnBlock,
        rounded && s.btnFullRounded,
        {
          [s.btnVerySmall]: size === 'xs',
          [s.btnSmall]: size === 'sm',
          [s.btnNormal]: size === 'md',
          [s.btnLarge]: size === 'lg',
          [s.btnVeryLarge]: size === 'xl',
        },
        className
      )}
      {...ButtonAttr}
    >
      <span className={s.btnLabel}>{children}</span>
    </button>
  )
}

export default Button
