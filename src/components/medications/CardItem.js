import React from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MedShowMode, show } from "../medDetail/medShowSlice";

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
  let currentMethod = "";
  item.treatment.forEach((treatmentItem, treatmentIdx) => {
    if (treatmentItem.method !== currentMethod) {
      treatmentStr += treatmentItem.method + " (";
      currentMethod = treatmentItem.method;
    }
    treatmentStr += treatmentItem.name;
    if (
      treatmentIdx < item.treatment.length - 1 &&
      treatmentItem.method === item.treatment[treatmentIdx + 1].method
    ) {
      treatmentStr += ", ";
    } else if (
      treatmentIdx === item.treatment.length - 1 ||
      treatmentItem.method !== item.treatment[treatmentIdx + 1].method
    ) {
      treatmentStr += ") ";
    }
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
            <Link to={`medication/${item._id}/edit`}>
              <Button variant="primary">Sửa</Button>
            </Link>

            <Link to={`medication/${item._id}`} className="ms-auto">
              <Button variant="primary">Chi tiết</Button>
            </Link>
          </Stack>
        </Container>
      </Card.Body>
    </Card>
  );
}
