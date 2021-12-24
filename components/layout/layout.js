import Head from 'next/head'
import Footer from '../footer/footer'
import Header from '../header/header'


const Layout = ({title, noHeader, noFooter, classMain, children}) => {
  return (
    <>
      <Head>
        <title> { title !== undefined ? title : "Store | Demo"}</title>
      </Head>
      {!noHeader && <Header />}
      <main className={classMain ? classMain : ''}>
        {children}
      </main>
      {!noFooter && <Footer />}
    </>
  );
};

export default Layout;