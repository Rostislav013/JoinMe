import React from 'react'

import FormDropdownFileld from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import { eventCategories } from '../../util/constants/eventCategories'
import Button from '../Button'
import './EventSearch.scss'

const EventSearch = ({ handleSearch }: any) => {
  return (
    <div className='search-box'>
      <p className='search-box__title'>Search Event</p>
      <FormDropdownFileld
        label='Category'
        id='category'
        options={eventCategories}
        onBlur={() => console.log('blurred!!')}
      />
      <GoogleAutoComplete handleAddress={() => console.log('handlled!!')} />
      <div className='search-box__button'>
        <Button
          type='button'
          text='Search'
          modifier='primary'
          handleClick={handleSearch}
        />
      </div>
    </div>
  )
}

export default EventSearch
