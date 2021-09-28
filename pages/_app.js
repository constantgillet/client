// import App from 'next/app'
import MainLayout from "../components/MainLayout";
import "antd/dist/antd.css";
import { GlobalStyle } from "../styles/style";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import { Provider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import withRedux, { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import { useEffect } from "react";
import { setCategories } from "../redux/actions/categoryActions";
import { getCategories } from "../lib/api/categoryAPI";
import DataFetcher from "../components/DataFetcher";
import CookieConsent from "../components/CookieConsent";

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
    <ReduxProvider store={store}>
      <GlobalStyle />
      <Provider
        session={pageProps.session}
        options={{
          clientMaxAge: 60 * 5
        }}
      >
        <DataFetcher>
          <CookieConsent />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </DataFetcher>
      </Provider>
    </ReduxProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  //console.log(ctx.store);

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  //Anything returned here can be accessed by the client
  return { pageProps: { pageProps } };
};

//makeStore function that returns a new store for every request
const makeStore = () => store;

const wrapper = createWrapper(makeStore);

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
