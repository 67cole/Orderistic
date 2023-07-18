import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";

export default function TableNumberModal() {
  const [show, setShow] = useState(false);

  const tables = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
    { id: 7, number: 7 },
    { id: 8, number: 8 },
    { id: 9, number: 9 },
    { id: 10, number: 10 },
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
