import s from './Header.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Avatar } from '@components/avatar'

const CartIcon = dynamic(() => import('../icon/Bag'))
const WishlistIcon = dynamic(() => import('../icon/Heart'))
const Badge = dynamic(() => import('@components/core/Badge'))

const Header = () => {
  return (
    <header className={s.root}>
      <nav aria-label="Main Navigation">
        <div className={s.brand}>
          <Link href={'/'}>
            <a className="italic text-primary">
              <span className="text-secondary">Next-</span>EShop
            </a>
          </Link>
        </div>
        <div className={s.menu}>
          <ul className={s.menu_list}>
            <li>
              <a href={'/'}>Shop</a>
            </li>
            <li>
              <a href={'/company'}>Company</a>
            </li>
            <li>
              <a href={'/help-center'}>Help</a>
            </li>
          </ul>
          <div className={s.menu_user}>
            <button className="w-12 h-12 text-secondary rounded-full mx-2 relative text-center hover:bg-gray-100">
              <CartIcon className="inline-block" />
              <Badge className="absolute top-0 right-0 w-5 h-5 rounded-full border-2 border-white">
                2
              </Badge>
            </button>
            <button className="w-12 h-12 text-secondary rounded-full mx-2 relative text-center hover:bg-gray-100">
              <WishlistIcon className="inline-block" />
              <Badge className="absolute top-0 right-0 w-5 h-5 rounded-full border-2 border-white">
                4
              </Badge>
            </button>
            <div className="mx-2">
              <Avatar />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
