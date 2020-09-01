import React, { useContext } from 'react'
import { MdAdd, MdClear } from 'react-icons/md'
import { IconContext } from 'react-icons'

import style from './style.module.css'
import { UserContext } from '../../context/UserContext'

export const TitleCard = ({ podcast }) => {
  const { subscriptions, addSubscription, removeSubscription } = useContext(
    UserContext
  )

  const isSubscribed = () =>
    subscriptions.find(
      subscription => subscription.collectionId === podcast.collectionId
    ) !== undefined

  const handleOnClick = () => {
    isSubscribed() ? removeSubscription(podcast) : addSubscription(podcast)
  }

  return (
    <div className={style.titleCard}>
      <img
        src={podcast.artworkUrl600}
        alt='cover'
        className={style.titleCardImage}
      />
      <div className={style.titleCardText}>
        <h1 className={style.titleCardHeading}>{podcast.collectionName}</h1>
        <hr />
        <button className={style.subscribeButton} onClick={handleOnClick}>
          <IconContext.Provider value={{ style: { height: 16, width: 16 } }}>
            <span className={style.subscribeButtonContent}>
              {isSubscribed() ? (
                <>
                  <MdClear />
                  unsubscribe
                </>
              ) : (
                <>
                  <MdAdd />
                  subscribe
                </>
              )}
            </span>
          </IconContext.Provider>
        </button>
      </div>
    </div>
  )
}
