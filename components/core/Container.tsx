import { FC } from 'react'
import s from './Container.module.css'

const Container: FC = (props) => {
  const { children } = props

  return <div className={s.root}>{children}</div>
}

export default Container
