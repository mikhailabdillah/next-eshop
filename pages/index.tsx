import type { NextPage } from 'next'
import Meta from '@components/meta'
import { ShopFilter } from '@components/sidebar'

const Home: NextPage = () => {
  return (
    <>
      <Meta />
      <div id="main-shop">
        <ShopFilter />
      </div>
    </>
  )
}

export default Home
