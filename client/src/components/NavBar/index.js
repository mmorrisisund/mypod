import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHeadphonesAlt } from 'react-icons/fa'

import style from './style.module.css'

const links = [
  ['Search', '/search'],
  ['Subscriptions', '/subscriptions']
]

export const NavBar = () => {
  return (
    <nav className={style.navBar}>
      <div className={style.logoBox}>
        <FaHeadphonesAlt className={style.logoImage} />
        <p className={style.logoText}>myPod</p>
      </div>
      <ul className={style.links}>
        {links.map(([name, path]) => (
          <li key={path}>
            <NavLink
              className={style.navLink}
              activeClassName={style.active}
              to={path}
              style={{ fontSize: '1.5rem' }}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
