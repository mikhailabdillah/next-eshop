import React, { useMemo } from 'react'
import s from './InfoDetails.module.css'
import Trash from '@icons/Trash'
import { Dialog } from '@headlessui/react'

type Props = {
  children?: React.ReactNode
  open: boolean
  onClose: () => void
}

const InfoDetails = (props: Props) => {
  const { children, open, onClose } = props

  return (
    <>
      <Dialog open={open} onClose={onClose} className={s.root}>
        {/* <Dialog.Overlay className={s.overlay} /> */}
        <button className={s.floating_button}>
          <Trash />
        </button>
        <div className={s.main_content}>
          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>
          {children}
        </div>
      </Dialog>
    </>
  )
}

export default InfoDetails
