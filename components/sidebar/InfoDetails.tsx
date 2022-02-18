import React, { useMemo, Fragment } from 'react'
import s from './InfoDetails.module.css'
import Image from 'next/image'
import Close from '@icons/Close'
import Modal from 'react-modal'
import type { ProductCardData } from '@custom-types/products'

type Props = {
  data: ProductCardData
  open: boolean
  onClose: () => void
}

const InfoDetails = (props: Props) => {
  const { data, open, onClose } = props

  return (
    <Modal
      isOpen={open}
      closeTimeoutMS={300}
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
        <div>I am a modal</div>
        <h2 className="text-lg">{data?.product_name}</h2>
      </div>
    </Modal>
  )
}

export default InfoDetails
