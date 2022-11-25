import React from "react";

import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { CardList } from "./components/CardList";
import { Container } from "react-bootstrap";
import AppHeader from "./components/AppHeader";
import MedModal from "./components/MedModal";

function App() {
  return (
    <Container fluid style={{padding:0}}>
      <AppHeader />
      <CardList />
      <MedModal />
    </Container>
  );
}

export default App;
