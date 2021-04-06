import { useRouter } from 'next/router'
import '../styles/globals.css'
import { AdminLayout } from '../components/Layout'
import { AuthProvider } from '../components/AuthContext'



const noLayoutRoutes = ['/login', '/register', '/', '/home'];

function App({ Component, pageProps }) {
  const { pathname } = useRouter()

  return noLayoutRoutes.indexOf(pathname) > -1 ?
    <Component {...pageProps} />
    : (
    <AuthProvider>
      <AdminLayout {...pageProps}>
        <Component {...pageProps} />
      </AdminLayout>
    </AuthProvider>
  )
}

export default App
