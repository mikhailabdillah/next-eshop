import s from './Card.module.css'
import cn from 'classnames'
import { Grid } from '@components/core'
import Heart from '@icons/Heart'
import Image from 'next/image'

type Props = { className?: string; onClick?: () => void }

const ProductCard = (props: Props) => {
  const { className, onClick } = props

  return (
    <div className={cn(s.root, className)} onClick={onClick}>
      <div className={s.product_quick_action}>
        <button className={s.product_to_wishlist}>
          <Heart />
        </button>
      </div>
      <div className={s.product_thumbnail}>
        <div className="relative w-full h-full">
          <Image
            src="/products/products.jpg"
            alt="Product"
            width={680}
            height={510}
            layout="responsive"
          />
        </div>
      </div>
      <div className={s.product_info}>
        <h5 className={s.product_name}>Test Product</h5>
        <Grid container justifyContent="between" className="text-sm">
          <Grid item>
            <div className={s.product_rating_info}>(85)</div>
          </Grid>
          <Grid item>
            <div>$20</div>
            <div></div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ProductCard
