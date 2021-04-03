import Header from './Header';

const Layout = ({ children,  ...pageProps }) => {
    return (
      <div>
        <Header {...pageProps}>Header</Header>
        <div>{children}</div>
        
      </div>
    )
  }

  export default Layout