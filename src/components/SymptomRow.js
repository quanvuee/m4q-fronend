import React,{ useEffect, useState }  from 'react';
import { BsFillPlusCircleFill, BsDashCircle } from "react-icons/bs";
import {
    Button,
    Form,
    Col,
    Row,
  } from "react-bootstrap";

export default ({
    symptom,
    sympIndex,
    onEdit,
    mode,
    onRemove,
    onAdd,
  }) => {
    const [sympText, setSympText] = useState("");
    useEffect(() => {
      if (symptom) setSympText(symptom);
    }, []);
  
    const onChangeSymptom = (event) => {
      setSympText(event.target.value);
      if (mode == "edit") {
        onEdit(sympIndex, sympText);
      }
    };
    const onClickRemove = () => {
      onRemove(sympIndex);
    };
    const onClickAdd = () => {
      if (sympText) {
        onAdd(sympText);
        setSympText("");
      }
    };
    return (
      <Row
        style={{
          width: "100%",
          marginLeft: 0,
          marginRight: 0,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {mode == "view" ? (
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Form.Control value={sympText} onChange={onChangeSymptom} readOnly />
          </Col>
        ) : (
          <Col xs={10} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Form.Control value={sympText} onChange={onChangeSymptom} />
          </Col>
        )}
  
        {mode != "view" ? (
          <Col xs={2} style={{ padding: 0 }}>
            {mode == "add" ? (
              <Button className="float-end" onClick={onClickAdd}>
                <BsFillPlusCircleFill />
              </Button>
            ) : (
              <Button className="float-end" onClick={onClickRemove}>
                <BsDashCircle />
              </Button>
            )}
          </Col>
        ) : null}
      </Row>
    );
  };
  