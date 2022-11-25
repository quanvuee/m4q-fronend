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
            <Col className="text-left"><strong>{item.conclusion}</strong></Col>
            <Col className="text-right">{dateStr}</Col>
          </Row>
        </Container>
      </Card.Header>

      <Card.Body>
        <Container fluid style={{padding:0}}>
          {/* <Row>
            <Col> */}
              <Card.Text><strong>Triệu chứng:</strong> {symptomStr} <br/> <strong>Điều trị:</strong> {treatmentStr}</Card.Text>
            {/* </Col>
            <Col xs="auto"> */}
              <Button variant="primary" className="float-right" onClick={()=> dispatch(show('view'))}>
                Chi tiết
              </Button>
            {/* </Col>
          </Row> */}
        </Container>
      </Card.Body>
    </Card>
  );
}
