import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import { Layout } from '../components/Layout'
import UserContext from '../components/UserContext';



const noLayoutRoutes = ['/login', '/register', '/', '/home'];

function App({ Component, pageProps, currentUser }) {
  const [user, setUser] = useState()
  const { pathname } = useRouter()

  useEffect(() => {
    if(currentUser) {
      setUser(currentUser)
    }
  }, [currentUser])

  return noLayoutRoutes.indexOf(pathname) > -1 ?
    <Component {...pageProps} />
    : (
    <UserContext.Provider value={{ user }}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {

  const user = ctx.req?.user

  return { currentUser: user };
}

export default App
