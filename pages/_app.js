import { useRouter } from 'next/router'
import '../styles/globals.css'
import { Layout } from '../components/Layout'
import { AuthProvider } from '../components/AuthContext'



const noLayoutRoutes = ['/login', '/register', '/', '/home'];

function App({ Component, pageProps }) {
  const { pathname } = useRouter()

  return noLayoutRoutes.indexOf(pathname) > -1 ?
    <Component {...pageProps} />
    : (
    <AuthProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default App
