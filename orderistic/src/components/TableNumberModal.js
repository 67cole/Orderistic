import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";
import { viewTables } from "../api/TableApi";

export default function TableNumberModal() {
  const [show, setShow] = useState(false);

  const [tableAmount, setTableAmount] = useState(0);

  useEffect(() => {
    viewTables().then((data) => {
      setTableAmount(data.length);
    });
  });

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

  function handleTable(number) {
    chooseTable(number);
    setShow(false);
  }

  return (
    <Modal show={show} centered onHide>
      <Modal.Header>
        <Modal.Title>Select your table number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array(tableAmount)
          .fill()
          .map((table, key) => (
            <Button
              className="m-1"
              onClick={() => handleTable(key + 1)}
              key={key}
            >
              {key + 1}
            </Button>
          ))}
      </Modal.Body>
    </Modal>
  );
}
