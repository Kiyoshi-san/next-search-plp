import { Provider } from 'react-redux';
import { useStore } from "../redux/store";
import Layout from "../components/layout/Layout";
import "../styles/globals.scss";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                ></link>
                <script src="build/app.bundle.js"></script>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
