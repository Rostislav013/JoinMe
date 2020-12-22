import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBell,
  faComment,
  faUserShield,
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons'

import Navbar from './components/Navbar'
import Routes from './Routes'
import Footer from './components/Footer'
import './App.scss'

library.add(
  fab,
  faBell,
  faComment,
  faUserShield,
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faUser
)

const App = () => {
  return (
    <>
      <Navbar />
      <Routes />
      <Footer />
    </>
  )
}

export default App
