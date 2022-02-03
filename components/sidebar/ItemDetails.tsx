import React, { Fragment } from 'react'
import s from './ItemDetails.module.css'
import Trash from '@icons/Trash'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  children?: React.ReactNode
  open: boolean
  onClose: () => void
}

const ItemDetails = (props: Props) => {
  const { children, open, onClose } = props

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog onClose={onClose} className={s.root}>
          {/* <Dialog.Overlay className={s.overlay} /> */}
          <Transition.Child
            as={'div'}
            className={s.main_content}
            enter="transition-all duration-300 ease-in-out"
            enterFrom={s.animate_modal}
            enterTo="translate-x-0 opacity-100"
            leave="transition-all duration-300 ease-in-out"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo={s.animate_modal}
          >
            <button className={s.floating_button}>
              <Trash />
            </button>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            {children}
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default React.memo(ItemDetails)
