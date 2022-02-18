import s from './Card.module.css'
import cn from 'classnames'
import { Grid } from '@components/core'
import { Ratings } from '@components/ratings'
import Heart from '@icons/Heart'
import Image from 'next/image'
import type { ProductCardData } from '@custom-types/products'

type Props = {
  className?: string
  onClick?: () => void
  data: ProductCardData
}

const ProductCard = (props: Props) => {
  const { className, onClick, data } = props

  const rate = data.product_rating ? Math.round(data.product_rating / 2) : 5

  return (
    <div className={cn(s.root, className)} onClick={onClick}>
      <div className={s.product_quick_action}>
        <button className={s.product_to_wishlist}>
          <Heart />
        </button>
      </div>
      <div className={s.product_thumbnail}>
        <div className="relative w-full h-full">
          {data.product_image?.url && (
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
        <h5 className={s.product_name}>{data.product_name}</h5>
        <Grid.Container
          justifyContent="between"
          alignItems="center"
          className="text-sm mb-4"
        >
          <Grid.Items>
            <div className="mb-1">Rate:</div>
            <div
              className={s.product_rating_info}
              title={`Ratings ${data.product_rating} of 10`}
            >
              <Ratings rate={rate} />
            </div>
          </Grid.Items>
          <Grid.Items>
            <div className="mb-1">Price:</div>
            <div className={s.product_price}>${data.product_price}</div>
          </Grid.Items>
        </Grid.Container>
      </div>
    </div>
  )
}

export default ProductCard
