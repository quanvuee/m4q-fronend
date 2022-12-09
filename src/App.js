import React from "react";

import logo from "./logo.svg";
import "./App.css";
import { CardList } from "./components/medications/CardList";
import { Container } from "react-bootstrap";
import AppHeader from "./components/AppHeader";
import { MedAdd, MedEdit, MedView } from "./components/medDetail/MedDetail";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const Root = () => {
  return (
    <>
      <AppHeader />
      <CardList />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "medication/:medId",
    element: <MedView />,
  },
  {
    path: "medication/:medId/edit",
    element: <MedEdit />,
  },
  {
    path: "medication/add",
    element: <MedAdd />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
