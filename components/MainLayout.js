import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import Router, { useRouter } from "next/router";

export default function MainLayout({ children }) {
  const [state, setState] = useState({
    displayHeader: true,
    displayNavigation: true,
    displayFooter: true,
    fullScreen: false
  });

  const router = useRouter();

  useEffect(() => {
    applyLayout();
  }, []);

  Router.events.on("routeChangeComplete", () => {
    applyLayout();
  });

  const applyLayout = () => {
    switch (router.pathname) {
      case "/chat":
        setState({ displayHeader: true, displayNavigation: true, displayFooter: false, fullScreen: true });
        break;
      case "/auth/connexion":
        setState({ displayHeader: false, displayNavigation: false, displayFooter: false, fullScreen: true });
        break;
      case "/auth/inscription":
        setState({ displayHeader: false, displayNavigation: false, displayFooter: false, fullScreen: true });
        break;
      case "/auth/mot-de-passe-oublie":
        setState({ displayHeader: false, displayNavigation: false, displayFooter: false, fullScreen: true });
        break;
      case "/auth/changement-mot-de-passe":
        setState({ displayHeader: false, displayNavigation: false, displayFooter: false, fullScreen: true });
        break;
      default:
        setState({ displayHeader: true, displayNavigation: true, displayFooter: true, fullScreen: false });
        break;
    }
  };

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>UpGear</title>
        <meta
          name="description"
          content="UpGear est une plateforme pour acheter des équipements d'airsoft d'occasion de façon simple & sécurisée."
        />
        <meta property="og:image" content="https://upgear.fr/images/previews/website-preview.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header display={state.displayHeader} />
      <Navbar display={state.displayNavigation} />
      {children}
      <Footer display={state.displayFooter} />
    </div>
  );
}
