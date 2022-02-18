import { PrismicDocument, RichTextField } from '@prismicio/types'
import type { PrismicImage } from './prismic'

export type ProductCardProps = PrismicDocument & {}

export type ProductCardData = {
  product_image?: PrismicImage
  product_name?: string
  product_price?: number
  product_rating?: number
  product_categories?: any
  product_descriptions: RichTextField[]
  hide_item: boolean
}
