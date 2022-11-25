import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { show } from "./medShowSlice";

function AppHeader() {
  const dispatch = useDispatch();

  return (
    <Container fluid className="mt-2">
      <Button>Lọc</Button>
      <Button className="float-right" onClick={() => dispatch(show("add"))}>
        Thêm
      </Button>
    </Container>
  );
}

export default AppHeader;
