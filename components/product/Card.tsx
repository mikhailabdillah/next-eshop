import s from './Card.module.css'
import cn from 'classnames'
import { Grid } from '@components/core'
import Heart from '@icons/Heart'
import Image from 'next/image'
import type { ProductCardData } from '@custom-types/products'

type Props = {
  className?: string
  onClick?: () => void
  data?: ProductCardData
}

const ProductCard = (props: Props) => {
  const { className, onClick, data } = props

  return (
    <div className={cn(s.root, className)} onClick={onClick}>
      <div className={s.product_quick_action}>
        <button className={s.product_to_wishlist}>
          <Heart />
        </button>
      </div>
      <div className={s.product_thumbnail}>
        <div className="relative w-full h-full">
          {data?.product_image?.url && (
            <Image
              src={data.product_image.url}
              alt={data.product_image.alt || 'Product'}
              width={data.product_image.dimensions.width}
              height={data.product_image.dimensions.height}
              layout="responsive"
            />
          )}
        </div>
      </div>
      <div className={s.product_info}>
        <h5 className={s.product_name}>{data?.product_name}</h5>
        <Grid.Container justifyContent="between" className="text-sm">
          <Grid.Items>
            <div className={s.product_rating_info}>(85)</div>
          </Grid.Items>
          <Grid.Items>
            <div>${data?.product_price}</div>
          </Grid.Items>
        </Grid.Container>
      </div>
    </div>
  )
}

export default ProductCard
