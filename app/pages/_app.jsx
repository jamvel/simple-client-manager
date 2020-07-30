/* eslint-disable react/prop-types */
import axios from 'axios';
import Wrapper from '@Stores';
import '@Styles/globals.css';

// set axios base url for relative urls calls on server
axios.defaults.baseURL = process.env.axiosBaseUrl;

function MyApp({ Component, pageProps }) {
  return (<Component {...pageProps} />);
}

export default Wrapper.withRedux(MyApp);
