import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Form, Link } from "react-router-dom";
import { MedShowMode, show } from "./medDetail/medShowSlice";

function AppHeader() {
  const dispatch = useDispatch();

  return (
    <Stack direction="horizontal"  >
      <Button>Lọc</Button>
      <Form action="medication/add" className="ms-auto">
        <Button type="submit">Thêm</Button>
      </Form>
    </Stack>
  );
}

export default AppHeader;
