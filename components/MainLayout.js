import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"

export default function MainLayout({
    children,
}) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <title>UpGear</title>
                <meta name="description" content="UpGear est une plateforme pour acheter des équipements d'airsoft d'occasion de façon simple & sécurisée." />
                <meta property="og:image" content="https://upgear.fr/images/previews/website-preview.png"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}