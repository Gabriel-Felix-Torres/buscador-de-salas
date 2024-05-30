import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NameForm from "./formulario";
import Lista from "./lista";
import { FormProvider } from "./context/FormContext";

const router = createBrowserRouter([
  {
    path: "/buscador-de-salas",
    element: <NameForm />,
  },
  {
    path: "/lista",
    element: <Lista />,
  },
]);

const root = document.getElementById("root");

// Usando ReactDOM.createRoot() para renderizar o componente
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <React.StrictMode>
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
