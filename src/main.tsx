import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContext } from "./context/AuthContext";
import { TasksProvider } from "./context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContext>
    <TasksProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TasksProvider>
  </AuthContext>
);
