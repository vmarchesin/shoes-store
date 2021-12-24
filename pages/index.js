import Head from "next/head"
import NavMain from "../components/nav/navMain"
import ShoesItem from "../components/shoesItem"
import HomeItemLogo from "../components/logo/homeItemLogo"
import { SHOES_DATA } from "../data/shoesData"
import Layout from "../components/layout/layout"

export default function Home() {

  return (
    <>
      <Head>
        <title>Store | Demo</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Layout classMain="fullpage nopadding" noHeader noFooter>
        <section id="shop">
          <HomeItemLogo />

          {SHOES_DATA.map((item, index) => (
            <ShoesItem
              shoe={item}
              key={index}
              index={index}
            />
          ))}

          <div className="info fondo one par">
            <NavMain />
          </div>
         </section>
      </Layout>

    </>
  )
}
