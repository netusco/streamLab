import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import authReqHeader from '../utils/authReqHeader'


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        async function fetchUser() {
          const { data: { user, notifications } } = await axios.get(`http://localhost:3000/api/users/me`, authReqHeader)
          if(user) {
              setUser({ ...user, notifications })
              setLoading(false)
          }
        }
    
        fetchUser()
    }, [])

    const logout = () => {
        setUser(null)
        window.location.pathname = '/login'
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext