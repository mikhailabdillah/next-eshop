import React from 'react'
import s from './Ratings.module.css'
import cn from 'classnames'
import Star from '@icons/Star'

type Props = {
  className?: string
  rate: number
}

const Ratings = (props: Props) => {
  const { className, rate } = props

  let score = []
  for (let i = 0; i < 5; i++) {
    i < rate
      ? score.push(<Star color="#facc15" key={i} />)
      : score.push(<Star color="#e2e8f0" key={i} />)
  }

  return <div className={cn(s.root, className)}>{score}</div>
}

export default Ratings
