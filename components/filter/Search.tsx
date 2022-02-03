import { ChangeEvent, useState } from 'react'
import s from './Search.module.css'

const Search = () => {
  const [val, setVal] = useState('')
  const handleChange = (value: string) => {
    return setVal(value)
  }

  return (
    <div className={s.searchBar}>
      <input
        type={'search'}
        value={val}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type here..."
      />
    </div>
  )
}

export default Search
