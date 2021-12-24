import { useMemo } from 'react'
import s from './Categories.module.css'
import cat from '../../custom-types/categories.json'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

const Categories = () => {
  const data = useMemo(
    () =>
      cat.map((res, i) => (
        <li key={i}>
          <label className={s.check}>
            <input type={'checkbox'} value={0} />
            {res}
          </label>
        </li>
      )),
    []
  )

  return (
    <div className={s.root}>
      <h6>Categories</h6>
      <PerfectScrollbar className={s.scrollbar} style={{ height: 240 }}>
        <ul>{data}</ul>
      </PerfectScrollbar>
    </div>
  )
}

export default Categories
