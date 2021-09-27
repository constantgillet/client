import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import Router, { useRouter } from "next/router";
import MailNotVerified from "../pages/auth/email-non-verifie";
import { WEBSITE_URL } from "../lib/constants";
import { connect } from "react-redux";
import { useSession } from "next-auth/client";

function MainLayout({ children, user }) {
  const [state, setState] = useState({
    displayHeader: true,
    displayNavigation: true,
    displayFooter: true,
    fullScreen: false
  });

  const router = useRouter();

  const [session, loading] = useSession();

  useEffect(() => {
    applyLayout(router.pathname);
  }, [router.pathname]);

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

  let showMailNotVerified = false;

  if (session && !loading) {
    if (user && !user.email_verified) {
      showMailNotVerified = true;
    }
  }

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

const mapState = (state) => {
  return {
    user: state.user.user
  };
};

const mapDis = {};

export default connect(mapState, mapDis)(MainLayout);
