import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContext } from "./context/AuthContext";
import { TasksProvider } from "./context/TaskContext";
import { TaskSettingsProvider } from "./context/ListSettingsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContext>
    <TasksProvider>
      <TaskSettingsProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </TaskSettingsProvider>
    </TasksProvider>
  </AuthContext>
);
