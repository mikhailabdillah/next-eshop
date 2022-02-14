import { PrismicDocument, RichTextField } from '@prismicio/types'
import type { PrismicImage } from './prismic'

export type ProductCardProps = PrismicDocument & {}

export type ProductCardData = {
  product_image?: PrismicImage
  product_name?: String
  product_price?: Number
  product_rating?: Number
  product_categories?: any
  product_descriptions?: RichTextField[]
  hide_item: Boolean
}
