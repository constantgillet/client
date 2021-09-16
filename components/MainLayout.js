import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import MailNotVerified from "../pages/auth/email-non-verifie";
import { WEBSITE_URL } from "../lib/constants";

export default function MainLayout({ children }) {
  const [state, setState] = useState({
    displayHeader: true,
    displayNavigation: true,
    displayFooter: true,
    fullScreen: false
  });

  const [session, loading] = useSession();

  const router = useRouter();

  useEffect(() => {
    applyLayout();

    Router.events.on("routeChangeComplete", (e) => {
      applyLayout(e);
    });
  }, []);

  const applyLayout = (newPathname) => {
    switch (newPathname) {
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
      case "/auth/changer-mot-de-passe":
        setState({ displayHeader: false, displayNavigation: false, displayFooter: false, fullScreen: true });

        break;
      default:
        setState({ displayHeader: true, displayNavigation: true, displayFooter: true, fullScreen: false });
        break;
    }
  };

  let showMailNotVerified = session && !loading && !session.user.emailVerified ? true : false;

  if (router.pathname == "/auth/verification") {
    showMailNotVerified = false;
  }

  return (
    <div>
      <Header display={state.displayHeader} />
      <Navbar display={state.displayNavigation} />
      {showMailNotVerified ? <MailNotVerified /> : children}
      <Footer display={state.displayFooter} />
    </div>
  );
}
