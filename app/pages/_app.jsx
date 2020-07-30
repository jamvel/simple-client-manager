/* eslint-disable react/prop-types */
import Wrapper from '@Stores';
import '@Styles/globals.css';
import axios from 'axios';

// set axios base url for relative urls calls on server
axios.defaults.baseURL = process.env.axiosBaseUrl;

function MyApp({ Component, pageProps }) {
  return (<Component {...pageProps} />);
}

export default Wrapper.withRedux(MyApp);
