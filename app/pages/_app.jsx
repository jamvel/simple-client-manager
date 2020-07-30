/* eslint-disable react/prop-types */
import Wrapper from '@Stores';

function MyApp({ Component, pageProps }) {
  return (<Component {...pageProps} />);
}

export default Wrapper.withRedux(MyApp);
