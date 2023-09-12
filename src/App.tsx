import "./globals.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Cadastro } from "./pages/Cadastro";

import { ReactNode, useContext } from "react";
import { Context } from "./context/AuthContext";

interface IProtectedProps {
  children: ReactNode;
}

function Protected({ children }: IProtectedProps) {
  const { user } = useContext(Context);

  if (user) {
    console.log("LOGADO");

    console.log(user);
    return children;
  } else if (user == null) {
    console.log("NÃO LOGADO");
    console.log(user);

    return <Navigate to="/" />;
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <Protected>
              <Home />
            </Protected>
          }
          path="/home"
        />

        <Route element={<Login />} path="/" />
        <Route element={<Cadastro />} path="/cadastro" />
      </Routes>
    </Router>
  );
}

export default App;
