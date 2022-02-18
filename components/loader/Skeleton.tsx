import { CSSProperties } from 'react'
import s from './Skeleton.module.css'
import cn from 'classnames'

type Props = {
  style?: CSSProperties
  className?: string
}

const Skeleton = (props: Props) => {
  return (
    <div className={cn(s.skeleton_box, props.className)} style={props.style}>
      {/*  */}
    </div>
  )
}

export default Skeleton
