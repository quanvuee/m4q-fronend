import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CardItem } from "./CardItem";
import { fetchMedications, selectAllMeds } from "./medicationsSlice";

var medList = [
  {
    id: 1,
    conclusion: "Viêm phế  quản",
    time: 1669264435000,
    symptoms: ["ho từng cơn", "thở khò khè", "rút lõm lồng ngực", "biếng ăn"],
    treatment: [
      {
        name: "Ventolin",
        method: "Khí dung",
        dosage: {
          value: 1,
          unit: "ống",
        },
        frequency: "2 lần mỗi ngày",
        total: {
          value: 5,
          unit: "ống",
        },
      },
      {
        name: "Pulmicort",
        method: "Khí dung",
        dosage: {
          value: 1,
          unit: "ống",
        },
        frequency: "2 lần mỗi ngày",
        total: {
          value: 5,
          unit: "ống",
        },
      },
      {
        name: "Babycanyl",
        method: "Uống",
        dosage: {
          value: 3,
          unit: "ml",
        },
        frequency: "ngày 2 lần sau ăn",
        total: {
          value: 1,
          unit: "lọ",
        },
      },
    ],
  },
];

export function CardList() {
  const dispatch = useDispatch();
  const medications = useSelector(selectAllMeds);
  const medStatus = useSelector((state) => state.medications.status);
  const error = useSelector((state) => state.medications.error);
  useEffect(() => {
    if (medStatus === "idle") {
      dispatch(fetchMedications());
    }
  }, [medStatus,dispatch]);
  let content;
  if (medStatus === "idle") {
    console.log("idle")
    content = <Spinner text="Loading .." />;
  } else if (medStatus === "succeeded") {
    console.log("succeeded")
    content = (
      <Container fluid className="mt-2">
        {medications.map((medItem) => {
          return <CardItem item={medItem} key={medItem._id} />;
        })}
      </Container>
    );
  } else if (medStatus === "failed") {
    console.log("failed")
    content = (<div>{error}</div>);
  }
  return <>{content}</>;
}
