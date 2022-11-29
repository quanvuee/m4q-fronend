import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Stack,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { show } from "./medShowSlice";

export function CardItem({ item }) {
  const dispatch = useDispatch();
  const dateStr = new Date(item.time).toLocaleDateString("vi-VI");
  let symptomStr = "",
    treatmentStr = "";
  item.symptoms.forEach((symptom, index) => {
    symptomStr += symptom;
    if (index < item.symptoms.length - 1 && item.symptoms.length > 1) {
      symptomStr += ", ";
    } else {
      symptomStr += ".";
    }
  });
  item.treatment.forEach((treatmentItem) => {
    treatmentStr += treatmentItem.method + " (";
    treatmentItem.medicine.forEach((medicineItem, index) => {
      treatmentStr += medicineItem.name;
      if (
        index < treatmentItem.medicine.length - 1 &&
        treatmentItem.medicine.length > 1
      ) {
        treatmentStr += ", ";
      }
    });
    treatmentStr += ") ";
  });
  return (
    <Card>
      <Card.Header>
        <Container>
          <Row>
            <Col className="text-start">
              <strong>{item.conclusion}</strong>
            </Col>
            <Col className="text-end">{dateStr}</Col>
          </Row>
        </Container>
      </Card.Header>

      <Card.Body>
        <Container fluid style={{ padding: 0 }}>
          <Card.Text>
            <strong>Triệu chứng:</strong> {symptomStr} <br />{" "}
            <strong>Điều trị:</strong> {treatmentStr}
          </Card.Text>
          <Stack direction="horizontal" gap={3}>
            <Button
              variant="primary"
              // className="float-start"
              onClick={() => dispatch(show({ type: "edit", medItem: item }))}
            >
              Sửa
            </Button>
            <Button
              variant="primary"
              className="ms-auto"
              // className="float-end"
              onClick={() => dispatch(show({ type: "view", medItem: item }))}
            >
              Chi tiết
            </Button>
          </Stack>
        </Container>
      </Card.Body>
    </Card>
  );
}
