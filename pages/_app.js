// import App from 'next/app'
import MainLayout from "../components/MainLayout";
import "antd/dist/antd.css";
import { GlobalStyle } from "../styles/style";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import { Provider } from "next-auth/client";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Provider
        session={pageProps.session}
        options={{
          clientMaxAge: 60 * 5
        }}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  );
}

export default MyApp;
