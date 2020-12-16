import React from 'react'

import { ButtonComponent } from '../../types'
import './Button.scss'

const Button = ({ type, text, modifier, handleClick }: ButtonComponent) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={`button button--${modifier}`}
    >
      {text}
    </button>
  )
}

export default Button
