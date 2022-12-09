import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hide, MedShowMode, selectMedShow } from "./medShowSlice";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import SymptomRow from "./SymptomRow";
import Treatment from "./Treatment";
import { nanoid } from "nanoid/non-secure";
import { useNavigate, useParams } from "react-router-dom";
import { selectMedbyId } from "../medications/medicationsSlice";

registerLocale("vi", vi);

var treatmentId = [],
  symptomId = [];

const MedDetail = ({ mode }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const newMedItem = useSelector((state) => selectMedbyId(state, params.medId));
  const [medItem, setMedItem] = useState(newMedItem);
  const [startDate, setStartDate] = useState(
    newMedItem.time ? new Date(newMedItem.time) : new Date()
  );
  const navigate = useNavigate();
  let title;
  if (mode === MedShowMode.ADD) {
    title = "Thêm bản ghi";
  } else if (mode === MedShowMode.VIEW) {
    title = "Chi tiết";
  } else if (mode === MedShowMode.EDIT) {
    title = "Chỉnh sửa";
  }
  if (newMedItem.symptoms) {
    symptomId = [];
    newMedItem.symptoms.forEach(() => {
      symptomId.push(nanoid());
    });
  }
  if (newMedItem.treatment) {
    treatmentId = [];
    newMedItem.treatment.forEach(() => {
      treatmentId.push(nanoid());
    });
  }

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
        ? { ...medItem, symptoms: [...medItem.symptoms, symptom] }
        : { ...medItem, symptoms: [symptom] }
    );
    symptomId.push(nanoid());
  };
  const handleRemoveSymptom = (sympIndex) => {
    setMedItem({
      ...medItem,
      symptoms: [
        ...medItem.symptoms.filter((sympItem, index) => index !== sympIndex),
      ],
    });
    symptomId.splice(sympIndex, 1);
  };
  const handleConclusionChange = (event) => {
    setMedItem({ ...medItem, conclusion: event.target.value });
  };
  return (
    <>
      <h3>{title}</h3>
      <Form>
        <Form.Group>
          <Form.Label>Triệu chứng</Form.Label>
          {medItem.symptoms
            ? medItem.symptoms.map((symptom, index) => (
                <SymptomRow
                  symptom={symptom}
                  key={symptomId[index]}
                  sympIndex={index}
                  onEdit={handleEditSymptom}
                  onRemove={handleRemoveSymptom}
                  mode={
                    mode == MedShowMode.VIEW
                      ? MedShowMode.VIEW
                      : mode == MedShowMode.ADD || mode == MedShowMode.EDIT
                      ? MedShowMode.EDIT
                      : ""
                  }
                />
              ))
            : null}
          {mode != MedShowMode.VIEW ? (
            <SymptomRow mode={MedShowMode.ADD} onAdd={handleAddSymptom} />
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label className={"mt-2"}>Kết luận</Form.Label>
          {mode === MedShowMode.VIEW ? (
            <Form.Control value={medItem.conclusion || ""} readOnly />
          ) : (
            <Form.Control
              value={medItem.conclusion || ""}
              onChange={handleConclusionChange}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label className={"mt-2"}>Thời gian</Form.Label>
          <ReactDatePicker
            className="form-control"
            locale={"vi"}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            readOnly={mode === MedShowMode.VIEW}
          />
        </Form.Group>
      </Form>
      <p className={"mt-2"}>Điều trị</p>
      <Treatment
        treatment={medItem.treatment || []}
        treatmentId={treatmentId}
      />

      {mode == MedShowMode.VIEW ? (
        <Button
          variant="secondary"
          onClick={() => {
            navigate(-1);
          }}
        >
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
    </>
  );
};

export const MedView = () => {
  return <MedDetail mode={MedShowMode.VIEW} />;
};

export const MedEdit = () => {
  return <MedDetail mode={MedShowMode.EDIT} />;
};

export const MedAdd = () => {
  return <MedDetail mode={MedShowMode.ADD} />;
};
