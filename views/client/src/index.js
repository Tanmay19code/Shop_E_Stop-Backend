import React from "react";
import ReactDOM, {render} from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
