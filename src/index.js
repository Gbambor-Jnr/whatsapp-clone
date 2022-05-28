import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./components/store/ContextProvider";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById("root")
);
