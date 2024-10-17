import React from 'react'
import { Icon } from 'react-icons-kit'
import {search} from 'react-icons-kit/oct/search'

function SearchBar() {
  return (
    <div id='searchbar'>
      <input type="text" placeholder="Search..." />
      <button type="submit"><Icon icon={search} size={15} /></button>
    </div>
  )
}

export default SearchBar
