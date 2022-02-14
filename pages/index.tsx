import { useState, useReducer, ReactNode } from 'react'
import { PrismicDocument } from '@prismicio/types'
import type { GetStaticProps } from 'next'
import Meta from '@components/meta'
import cn from 'classnames'
import { ShopFilter } from '@components/sidebar'
import { Search } from '@components/filter'
import { ProductCard } from '@components/product'
import { Grid } from '@components/core'
import { useScreenSize } from '@lib/hooks/useScreenSize'
import { ItemDetails } from '@components/sidebar'
import { client } from '@config/prismic'

type PageProps = {
  children?: ReactNode
  data?: PrismicDocument[]
}

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

const Home = (props: PageProps) => {
  const isMobile = useScreenSize(768)
  const [data, setData] = useState<any[]>(props.data || [])

  const desktopMainStyles = {
    marginTop: 80,
    width: !isMobile ? 'calc(100% - 320px)' : undefined,
    marginLeft: !isMobile ? 320 : undefined,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Meta />
      <div id="main-shop">
        {!isMobile && <ShopFilter />}
        <div className="p-4 relative md:p-8" style={desktopMainStyles}>
          <Search />
          <Grid.Container className="my-8">
            {/* <Grid.Items xs={12} sm={6} md={4}>
              <ProductCard
                onClick={() => dispatch({ type: 'open' })}
                data={data}
              />
            </Grid.Items> */}
            {data.map((product, index) => (
              <Grid.Items xs={12} sm={6} md={4} key={index}>
                <ProductCard
                  onClick={() => dispatch({ type: 'open' })}
                  data={product.data}
                />
              </Grid.Items>
            ))}
          </Grid.Container>
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getAllByType('products')

  return {
    props: { data },
  }
}
