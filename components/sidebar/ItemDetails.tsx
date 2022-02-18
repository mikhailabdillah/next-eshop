import React, { useState, useMemo } from 'react'
import s from './ItemDetails.module.css'
import Image from 'next/image'
import Close from '@icons/Close'
import Modal from 'react-modal'
import type { ProductCardData } from '@custom-types/products'
import { Grid } from '@components/core'
import { Ratings } from '@components/ratings'
import { RichText } from 'prismic-reactjs'

type Props = {
  data: ProductCardData
  open: boolean
  onClose: () => void
}

const ItemDetails = (props: Props) => {
  const { data, open, onClose } = props
  const [item, setItem] = useState<ProductCardData>(data)

  const rate = item?.product_rating ? Math.round(item.product_rating / 2) : 5

  useMemo(() => {
    setItem(data)
  }, [data])

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        contentLabel="Item Details"
        shouldCloseOnOverlayClick={false}
        overlayElement={(props, contentElement) => <>{contentElement}</>}
        className={s.root}
      >
        <div className={s.main_content}>
          <button className={s.floating_button} onClick={onClose}>
            <Close />
          </button>
          {item.product_image?.url && (
            <Image
              src={item.product_image.url}
              alt={item.product_image.alt || 'Product'}
              width={item.product_image.dimensions.width}
              height={item.product_image.dimensions.height}
              layout="responsive"
            />
          )}
          <h2 className="text-2xl">{item.product_name}</h2>
          <Grid.Container
            justifyContent="between"
            alignItems="center"
            className="text-sm mb-4"
          >
            <Grid.Items>
              <div className="mb-1">Rate:</div>
              <div
                className={s.product_rating_info}
                title={`Ratings ${item.product_rating} of 10`}
              >
                <Ratings rate={rate} />
              </div>
            </Grid.Items>
            <Grid.Items>
              <div className="mb-1">Price:</div>
              <div className={s.product_price}>${item.product_price}</div>
            </Grid.Items>
          </Grid.Container>
          <div>
            <h3 className="text-lg">Description:</h3>
            {item.product_descriptions && (
              <RichText render={item.product_descriptions as any[]} />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ItemDetails
