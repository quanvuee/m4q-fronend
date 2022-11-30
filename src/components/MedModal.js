import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hide, MedShowMode, selectMedShow } from "./medShowSlice";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import SymptomRow from "./SymptomRow";

registerLocale("vi", vi);

var symptomCnt = 0;
const addSymptomId = (symptom) => {
  return {
    text: symptom,
    id: ++symptomCnt,
  };
};

export default () => {
  const show = useSelector(selectMedShow);
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [medItem, setMedItem] = useState({});

  useEffect(() => {
    if (show.type === MedShowMode.ADD) {
      setTitle("Thêm bản ghi");
    } else if (show.type === MedShowMode.VIEW) {
      setTitle("Chi tiết");
    } else if (show.type === MedShowMode.EDIT) {
      setTitle("Chỉnh sửa");
    }
    const newMedItem = { ...show.medItem };
    if (newMedItem.symptoms) {
      const symptompsWithId = newMedItem.symptoms.map((sympE) => {
        return addSymptomId(sympE);
      });
      newMedItem.symptoms = symptompsWithId;
    }
    setMedItem(newMedItem);
    setStartDate(newMedItem.time ? new Date(newMedItem.time) : new Date());
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
  const handleConclusionChange = (event) => {
    setMedItem({ ...medItem, conclusion: event.target.value });
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
                  <SymptomRow
                    symptom={symptom.text}
                    key={symptom.id}
                    sympIndex={index}
                    onEdit={handleEditSymptom}
                    onRemove={handleRemoveSymptom}
                    mode={
                      show.type == MedShowMode.VIEW
                        ? MedShowMode.VIEW
                        : show.type == MedShowMode.ADD || show.type == MedShowMode.EDIT
                        ? MedShowMode.EDIT
                        : ""
                    }
                  />
                ))
              : null}
            {show.type != MedShowMode.VIEW ? (
              <SymptomRow mode={MedShowMode.ADD} onAdd={handleAddSymptom} />
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Kết luận</Form.Label>
            {show.type === MedShowMode.VIEW ? (
              <Form.Control value={medItem.conclusion || ""} readOnly />
            ) : (
              <Form.Control
                value={medItem.conclusion || ""}
                onChange={handleConclusionChange}
              />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Thời gian</Form.Label>
            <ReactDatePicker
              className="form-control"
              locale={"vi"}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              readOnly={show.type===MedShowMode.VIEW}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {show.type == MedShowMode.VIEW ? (
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
