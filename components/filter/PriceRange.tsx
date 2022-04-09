import s from './PriceRange.module.css'
import { Button } from '@components/core'

const PriceRange = () => {
  return (
    <div className={s.root}>
      <h6>Price Range</h6>
      <form>
        <div className={s.inputWrap}>
          <input type={'number'} placeholder="Min" />
          <input type={'number'} placeholder="Max" />
        </div>
        <Button full>Set Price</Button>
      </form>
    </div>
  )
}

export default PriceRange
