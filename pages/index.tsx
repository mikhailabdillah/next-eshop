import { useState, ReactNode, useEffect } from 'react'
import { PrismicDocument } from '@prismicio/types'
import type { GetStaticProps } from 'next'
import Meta from '@components/meta'
import { ShopFilter } from '@components/sidebar'
import { Search } from '@components/filter'
import { ProductCard } from '@components/product'
import { Button, Grid } from '@components/core'
import { useScreenSize } from '@lib/hooks/useScreenSize'
import { ItemDetails } from '@components/sidebar'
import { client } from '@config/prismic'
import type { ProductCardData } from '@custom-types/products'

type PageProps = {
  children?: ReactNode
  data?: PrismicDocument[]
}

const Home = (props: PageProps) => {
  const isMobile = useScreenSize(1280)
  const isDesktop = useScreenSize(1440)
  const [data, setData] = useState<any[]>(props.data || [])
  const [wrapperWidth, setWrapperWidth] = useState('calc(100% - 320px)')
  const [charm, setCharm] = useState(false)
  const [current, setCurrent] = useState<ProductCardData>()

  const handleCharm = (product: any) => {
    setCurrent(product)
    if (!charm) {
      openCharm()
    }
    !isDesktop && wrapperWidth && setWrapperWidth('calc(100% - 640px)')
  }

  const openCharm = () => {
    setCharm(true)
  }

  const closeCharm = () => {
    setCharm(false)
    setCurrent(undefined)
    !isDesktop && wrapperWidth && setWrapperWidth('calc(100% - 320px)')
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
        <Button
          className={'fixed bottom-10 left-0 right-0 mx-auto w-48 z-[99]'}
          rounded
        >
          Filter
        </Button>
        <div
          className="p-4 relative md:p-8 transition-all duration-300 ease-in-out"
          style={desktopMainStyles}
        >
          <Search />
          <Grid.Container className="my-8">
            {data.map((product, index) => (
              <Grid.Items key={index}>
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
