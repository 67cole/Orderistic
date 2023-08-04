import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../contexts/AuthContext";
import { viewTables } from "../../api/TableApi";
import { TextField } from "@mui/material";

export default function TableNumberModal() {
  const [show, setShow] = useState(false);

  const [tableAmount, setTableAmount] = useState(0);

  useEffect(() => {
    viewTables().then((data) => {
      setTableAmount(data.length);
    });
  }, []);

  const { chooseTable, tableNumber } = useAuth();
  const [userNumber, setUserNumber] = useState("");
  const [error, setError] = useState(false);

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
    if (number <= tableAmount && number > 0) {
      chooseTable(number);
      setShow(false);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <Modal show={show} centered onHide>
      <Modal.Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Modal.Title>Select your table number (1-{tableAmount})</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            type="number"
            onChange={(event) => {
              setUserNumber(parseInt(event.target.value));
            }}
          />
          {error && <p>Not a valid table number</p>}
          <Button
            variant="dark"
            style={{
              marginTop: "10px",
            }}
            onClick={() => handleTable(userNumber)}
          >
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
