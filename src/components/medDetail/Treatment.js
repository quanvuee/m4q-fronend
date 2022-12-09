import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";

export default ({ treatment,treatmentId }) => {

  useEffect(() => {
  });
  return treatment
    ? treatment.map((treatmentItem,treatmentIdx) => (
        <Card className={"mb-2"} key={treatmentId[treatmentIdx]}>
          <Card.Header>
            <Container>
              <Row>
                <Col className="text-start">
                  <strong>{treatmentItem.name}</strong>
                </Col>
                <Col className="text-end">
                  {treatmentItem.total.value + " " + treatmentItem.total.unit}
                </Col>
              </Row>
            </Container>
          </Card.Header>

          <Card.Body>
            <Card.Text>Demo</Card.Text>
            <Button variant="primary" className="float-end">
              Sửa
            </Button>
          </Card.Body>
        </Card>
      ))
    : null;
};
