import React from "react";
import { Container } from "react-bootstrap";
import { CardItem } from "./CardItem";

var medList = [
  {
    id: 1,
    conclusion: "Viêm phế  quản",
    time: 1669264435000,
    symptoms: ["ho từng cơn", "thở khò khè", "rút lõm lồng ngực", "biếng ăn"],
    treatment: [
      {
        method: "Khí dung",
        medicine: [
          {
            name: "Ventolin",
            dosage: 1,
            frequency: "2 lần mỗi ngày",
            total: 5,
            unit: 'ống'
          },
          {
            name: "Pulmicort",
            dosage: 1,
            frequency: "2 lần mỗi ngày",
            total: 5,
            unit: 'ống'
          },
        ],
      },
    ],
  },
];

export function CardList() {
  return (
    <Container fluid className='mt-2'>
      {medList.map((medItem) => {
        return <CardItem item={medItem} key={medItem.id}/>;
      })}
    </Container>
  );
}
