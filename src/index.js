import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </AuthProvider>
  </React.StrictMode>
);
