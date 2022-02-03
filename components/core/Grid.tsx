import React from 'react'
import cn from 'classnames'
import omit from 'lodash/omit'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
  container?: boolean
  item?: boolean
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
  alignItems?: 'center' | 'start' | 'end'
  justifyContent?: 'center' | 'start' | 'end' | 'between' | 'around'
  spacing?: number
}

const Grid = (props: Props) => {
  const {
    children,
    className,
    container,
    item,
    xs,
    sm,
    md,
    lg,
    xl,
    alignItems,
    justifyContent,
    spacing,
  } = props
  const elProps = omit(props, [
    'children',
    'className',
    'container',
    'item',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'alignItems',
    'justifyContent',
    'spacing',
  ])

  return (
    <div
      {...elProps}
      className={cn(
        {
          ['flex flex-row flex-wrap -mx-4']: container,
          ['flex-auto px-4 w-auto']: item,
        },
        {
          ['items-center']: alignItems === 'center',
          ['items-start']: alignItems === 'start',
          ['items-end']: alignItems === 'end',
        },
        {
          ['justify-start']: justifyContent === 'start',
          ['justify-end']: justifyContent === 'end',
          ['justify-center']: justifyContent === 'center',
          ['justify-between']: justifyContent === 'between',
          ['justify-around']: justifyContent === 'around',
        },
        spacing && `my-${spacing}`,
        {
          [`${typeof xs === 'number' ? 'grid-' + xs : 'auto'}`]: xs,
          [`${typeof sm === 'number' ? 'sm:grid-' + sm : 'auto'}`]: sm,
          [`${typeof md === 'number' ? 'md:grid-' + md : 'auto'}`]: md,
          [`${typeof lg === 'number' ? 'lg:grid-' + lg : 'auto'}`]: lg,
          [`${typeof xl === 'number' ? 'xl:grid-' + xl : 'auto'}`]: xl,
        },
        className && className
      )}
    >
      {children}
    </div>
  )
}

export default Grid
