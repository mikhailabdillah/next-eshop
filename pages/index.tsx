import { useState, useReducer } from 'react'
import type { NextPage } from 'next'
import Meta from '@components/meta'
import cn from 'classnames'
import { ShopFilter } from '@components/sidebar'
import { Search } from '@components/filter'
import { ProductCard } from '@components/product'
import { Grid } from '@components/core'
import { useScreenSize } from '@lib/hooks/useScreenSize'
import { ItemDetails } from '@components/sidebar'

const initialState = { open: false }

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'open':
      return { open: true }
    case 'close':
      return { open: false }
    default:
      throw new Error()
  }
}

const Home: NextPage = () => {
  const isMobile = useScreenSize(768)

  const desktopMainStyles = {
    marginTop: 80,
    width: !isMobile ? 'calc(100% - 320px)' : undefined,
    marginLeft: !isMobile ? 320 : undefined,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // const [open, setOpen] = useState(false)
  // const handleModal = () => {
  //   return setOpen(!open)
  // }

  // const handleModalClose = () => {
  //   return setOpen(false)
  // }

  return (
    <>
      <Meta />
      <div id="main-shop">
        {!isMobile && <ShopFilter />}
        <div className="p-4 relative md:p-8" style={desktopMainStyles}>
          <Search />
          <Grid container className="my-8">
            <Grid item className={cn('grid-12', 'sm:grid-6', 'md:grid-4')}>
              <ProductCard onClick={() => dispatch({ type: 'open' })} />
            </Grid>
            <Grid item className={cn('grid-12', 'sm:grid-6', 'md:grid-4')}>
              <ProductCard onClick={() => dispatch({ type: 'open' })} />
            </Grid>
            <Grid item className={cn('grid-12', 'sm:grid-6', 'md:grid-4')}>
              <ProductCard onClick={() => dispatch({ type: 'open' })} />
            </Grid>
          </Grid>
          <ItemDetails
            open={state.open}
            onClose={() => dispatch({ type: 'close' })}
          />
        </div>
      </div>
    </>
  )
}

export default Home
