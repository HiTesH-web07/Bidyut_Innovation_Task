import React, { createContext, useState, useEffect } from 'react'
import { dummydata } from '../srore'

export const dataContext = createContext()

const UserContext = ({ children }) => {
  const [cate, setCate] = useState(dummydata)
  const [input, setInput] = useState("")
  const [showCart, setShowCart] = useState(false)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const data = {
    input,
    setInput,
    cate,
    setCate,
    showCart,
    setShowCart,
    user,
    setUser,
    logout,
  }

  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext
