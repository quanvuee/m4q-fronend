import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { MedShowMode, show } from "./medShowSlice";

function AppHeader() {
  const dispatch = useDispatch();

  return (
    <Container fluid className="mt-2">
      <Button>Lọc</Button>
      <Button className="float-end" onClick={() => dispatch(show({type:MedShowMode.ADD}))}>
        Thêm
      </Button>
    </Container>
  );
}

export default AppHeader;
