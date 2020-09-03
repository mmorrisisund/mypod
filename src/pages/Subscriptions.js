import React, { useContext } from 'react'

import { UserContext } from '../context/UserContext'
import { PodcastList } from '../components/PodcastList'

export const Subscriptions = () => {
  const { subscriptions } = useContext(UserContext)

  return (
    <section className='subscriptionsPage'>
      <PodcastList podcasts={subscriptions} />
    </section>
  )
}
