import { useState, ReactNode, useEffect } from 'react'
import { PrismicDocument } from '@prismicio/types'
import type { GetStaticProps } from 'next'
import Meta from '@components/meta'
import { ShopFilter } from '@components/sidebar'
import { Search } from '@components/filter'
import { ProductCard } from '@components/product'
import { Grid } from '@components/core'
import { useScreenSize } from '@lib/hooks/useScreenSize'
import { ItemDetails } from '@components/sidebar'
import { client } from '@config/prismic'
import type { ProductCardData } from '@custom-types/products'

type PageProps = {
  children?: ReactNode
  data?: PrismicDocument[]
}

const Home = (props: PageProps) => {
  const isMobile = useScreenSize(768)
  const [data, setData] = useState<any[]>(props.data || [])
  const [wrapperWidth, setWrapperWidth] = useState('calc(100% - 320px)')
  const [charm, setCharm] = useState(false)
  const [current, setCurrent] = useState<ProductCardData>()

  const handleCharm = (product: any) => {
    setCurrent(product)
    if (!charm) {
      openCharm()
    }
    wrapperWidth && setWrapperWidth('calc(100% - 640px)')
  }

  const openCharm = () => {
    setCharm(true)
  }

  const closeCharm = () => {
    setCharm(false)
    setCurrent(undefined)
    wrapperWidth && setWrapperWidth('calc(100% - 320px)')
  }

  let desktopMainStyles = {
    marginTop: 80,
    width: !isMobile ? wrapperWidth : '100%',
    marginLeft: !isMobile ? 320 : undefined,
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    desktopMainStyles = { ...desktopMainStyles, width: wrapperWidth }
  }, [charm])

  return (
    <>
      <Meta />
      <div id="main-shop">
        {!isMobile && <ShopFilter />}
        <div
          className="p-4 relative md:p-8 transition-all duration-300 ease-in-out"
          style={desktopMainStyles}
        >
          <Search />
          <Grid.Container className="my-8">
            {data.map((product, index) => (
              <Grid.Items xs={12} sm={6} md={6} xl={4} key={index}>
                <ProductCard
                  onClick={() => handleCharm(product.data)}
                  data={product.data}
                />
              </Grid.Items>
            ))}
          </Grid.Container>
          {current && (
            <ItemDetails open={charm} onClose={closeCharm} data={current} />
          )}
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
