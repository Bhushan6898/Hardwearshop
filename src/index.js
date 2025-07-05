import React from "react";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";
import { ToastContainer } from "react-toastify";
import './i18n'; // Import i18n configuration
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import store from './store/storage'; 
const persistedState = loadState();

// const store = createStore(rootReducer, persistedState);

// store.subscribe(() => {
//   saveState(store);
// });




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <I18nextProvider i18n={i18n}> <App /></I18nextProvider>
   
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
