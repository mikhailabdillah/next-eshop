import React from 'react'
import s from './Container.module.css'

type Props = {
  children?: React.ReactNode
}

const Container = (props: Props) => {
  const { children } = props

  return <div className={s.root}>{children}</div>
}

export default Container
