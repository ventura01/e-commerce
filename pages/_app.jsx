import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import store from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import cartReducer, { getTotals } from "../redux/cartSlice";


function MyApp({ Component, pageProps }) {
  store.dispatch(getTotals());
  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
