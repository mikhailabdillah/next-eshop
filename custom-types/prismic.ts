import { PrismicDocument } from '@prismicio/types'

export type DocumentProps = PrismicDocument & {}

export type PrismicImage = {
  alt: null | string
  copyright: null | string
  dimensions: {
    width: number
    height: number
  }
  url: null | string
}
