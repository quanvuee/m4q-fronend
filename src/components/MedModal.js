import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  Col,
  Stack,
  Row,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hide, selectMedShow } from "./medShowSlice";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { BsFillPlusCircleFill, BsDashCircle } from "react-icons/bs";

registerLocale("vi", vi);

const AddSymptomRow = ({
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

var symptomCnt = 0;
const addSymptomId = (symptom) =>{
  return {
    text:symptom,
    id: ++ symptomCnt
  }
}
export default () => {
  const show = useSelector(selectMedShow);
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [medItem, setMedItem] = useState({});

  useEffect(() => {
    if (show.type === "add") {
      setTitle("Thêm bản ghi");
    } else if (show.type === "view") {
      setTitle("Chi tiết");
    } else if (show.type === "edit") {
      setTitle("Chỉnh sửa");
    }
    const newMedItem = { ...show.medItem };
    if (newMedItem.symptoms) {
      const symptompsWithId = newMedItem.symptoms.map(sympE => {
        return addSymptomId(sympE);
      });
      newMedItem.symptoms = symptompsWithId;
    }
    setMedItem(newMedItem);
 
    // console.log(medItem.symptoms)
  }, [show]);

  const hideModal = () => {
    setMedItem({});
    dispatch(hide());
  };

  const handleEditSymptom = (sympIndex, symptom) => {
    const symptoms = [...medItem.symptoms];
    symptoms[sympIndex] = symptom;
    setMedItem({ ...medItem, symptoms: [...symptoms] });
  };
  const handleAddSymptom = (symptom) => {
    setMedItem(
      medItem.symptoms
        ? { ...medItem, symptoms: [...medItem.symptoms, addSymptomId(symptom)] }
        : { ...medItem, symptoms: [addSymptomId(symptom)] }
    );
  };
  const handleRemoveSymptom = (sympIndex) => {
    setMedItem({
      ...medItem,
      symptoms: [
        ...medItem.symptoms.filter((sympItem, index) => index !== sympIndex),
      ],
    });
  };
  return (
    <Modal show={show.isShow} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Triệu chứng</Form.Label>
            {medItem.symptoms
              ? medItem.symptoms.map((symptom, index) => (
                  <AddSymptomRow
                    symptom={symptom.text}
                    key={symptom.id}
                    sympIndex={index}
                    onEdit={handleEditSymptom}
                    onRemove={handleRemoveSymptom}
                    mode={
                      show.type == "view"
                        ? "view"
                        : show.type == "add" || show.type == "edit"
                        ? "edit"
                        : ""
                    }
                  />
                ))
              : null}
            {show.type != "view" ? (
              <AddSymptomRow mode={"add"} onAdd={handleAddSymptom} />
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Kết luận</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Label>Thời gian</Form.Label>
            <ReactDatePicker
              className="form-control"
              locale={"vi"}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {show.type == "view" ? (
          <Button variant="secondary" onClick={hideModal}>
            Đóng
          </Button>
        ) : (
          <>
            <Button
              variant="secondary"
              className="float-start me-auto"
              onClick={hideModal}
            >
              Hủy
            </Button>
            <Button variant="primary" onClick={hideModal}>
              Lưu
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};
