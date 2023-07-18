import React from "react";
import MenuNav from "./MenuNav";
import { Button } from "react-bootstrap";

export default function OrderComplete() {
  return (
    <>
      <MenuNav />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Thanks for Ordering</h1>
        <Button> View your orders here </Button>
      </div>
    </>
  );
}
