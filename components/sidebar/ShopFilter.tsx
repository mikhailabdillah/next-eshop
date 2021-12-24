import s from './ShopFilter.module.css'
import { Categories, PriceRange } from '@components/filter'

const ShopFilter = () => {
  return (
    <div className={s.root}>
      <div>Filter</div>
      <div className={s.filterContent}>
        <Categories />
        <PriceRange />
      </div>
    </div>
  )
}

export default ShopFilter
