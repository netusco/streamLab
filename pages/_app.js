import '../styles/globals.css'
import { Layout } from '../components/Layout'

function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {

  const user = ctx.req?.user || {}

  return { pageProps: { user } };
}

export default App
