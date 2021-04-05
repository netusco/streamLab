import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import '../styles/globals.css'
import { Layout } from '../components/Layout'
import UserContext from '../components/UserContext';
import authReqHeader from '../utils/authReqHeader'



const noLayoutRoutes = ['/login', '/register', '/', '/home'];

function App({ Component, pageProps }) {
  const [user, setUser] = useState()
  const { pathname } = useRouter()

  useEffect(() => {

    async function fetchUser() {
      const { data: { user, notifications } } = await axios.get(`http://localhost:3000/api/users/me`, authReqHeader)
      setUser({ ...user, notifications })
    }

    fetchUser()
  }, [])

  return noLayoutRoutes.indexOf(pathname) > -1 ?
    <Component {...pageProps} />
    : (
    <UserContext.Provider value={{ user, isAuthenticated: !!user }}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}

export default App
