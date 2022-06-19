import React from 'react'

import './search.css'

export default function Search(props) {
  return (
    <div className='search'>
      <input
        value={props?.location}
        onChange={event => props.setLocation(event.target.value)}
        onKeyPress={props?.searchLocation}
        placeholder='Enter Location'
        type="text" />
    </div>
  )
}
