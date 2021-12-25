import "antd/dist/antd.css";
import "../styles/globals.css";

import LogRocket from "logrocket";
LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET);

import Layout from "../components/visuals/Layout/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
