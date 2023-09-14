import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContext } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContext>
);
