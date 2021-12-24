import s from './Header.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const CartIcon = dynamic(() => import('../icon/Bag'))
const WishlistIcon = dynamic(() => import('../icon/Heart'))

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
            <button className="p-3 text-secondary rounded-full mx-2">
              <CartIcon />
            </button>
            <button className="p-3 text-secondary rounded-full mx-2">
              <WishlistIcon />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
