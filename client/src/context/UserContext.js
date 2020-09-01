/* eslint-env browser */
import React, { useState } from 'react'

export const UserContext = React.createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage())
  const [subscriptions, setSubscriptions] = useState(user.subscriptions)

  const updateSubscriptions = subscriptions => {
    const newUser = { ...user, subscriptions }

    saveUserToLocalStorage(newUser)
    setUser(newUser)
    setSubscriptions(subscriptions)
  }

  const addSubscription = subscription =>
    updateSubscriptions([...subscriptions, subscription])

  const removeSubscription = subscription => {
    updateSubscriptions(
      subscriptions.filter(
        sub => sub.collectionId !== subscription.collectionId
      )
    )
  }

  return (
    <UserContext.Provider
      value={{ user, subscriptions, addSubscription, removeSubscription }}
    >
      {children}
    </UserContext.Provider>
  )
}

const getUserFromLocalStorage = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : defaultUser

const saveUserToLocalStorage = user =>
  localStorage.setItem('user', JSON.stringify(user))

const defaultUser = {
  username: 'mike',
  email: 'mike@example.com',
  subscriptions: []
}
