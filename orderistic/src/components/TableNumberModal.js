import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";

export default function TableNumberModal() {
  const [show, setShow] = useState(false);

  const tables = [
    { key: 1, number: 1 },
    { key: 2, number: 2 },
    { key: 3, number: 3 },
    { key: 4, number: 4 },
    { key: 5, number: 5 },
    { key: 6, number: 6 },
    { key: 7, number: 7 },
    { key: 8, number: 8 },
    { key: 9, number: 9 },
    { key: 10, number: 10 },
  ];
  const { chooseTable, tableNumber } = useAuth();

  function checkTableNumber() {
    if (tableNumber === 0) {
      setShow(true);
    } else {
    }
  }

  useEffect(() => {
    checkTableNumber();
  });

  function handleTable(table) {
    chooseTable(table.number);
    setShow(false);
  }

  return (
    <Modal show={show} centered onHide>
      <Modal.Header>
        <Modal.Title>Select your table number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tables.map((table, key) => (
          <Button className="m-1" onClick={() => handleTable(table)}>
            {table.number}
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
}
