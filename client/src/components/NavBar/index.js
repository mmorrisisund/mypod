import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaHeadphonesAlt } from 'react-icons/fa'

import style from './style.module.css'

const links = [
  ['Search', '/', true],
  ['Subscriptions', '/subscriptions', false]
]

export const NavBar = () => {
  return (
    <nav className={style.navBar}>
      <Link to='/'>
        <div className={style.logoBox}>
          <FaHeadphonesAlt className={style.logoImage} />
          <p className={style.logoText}>myPod</p>
        </div>
      </Link>
      <ul className={style.links}>
        {links.map(([name, path, exact]) => (
          <li key={path}>
            <NavLink
              className={style.navLink}
              activeClassName={style.active}
              to={path}
              exact={exact}
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
