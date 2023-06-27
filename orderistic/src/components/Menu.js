import React, { useState } from "react";
import MenuCard from "./MenuCard";
import SearchBar from "./SearchBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { returnFoodData } from "../api/MenuApi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import MenuNav from "./MenuNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validStaff } from "../api/AuthApi";
function Menu() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  async function checkStaff() {
    if (
      currentUser !== null &&
      (await validStaff(currentUser.email)) === true
    ) {
      navigate("/staff-menu");
    }
  }

  checkStaff();

  const [searchString, setSearchString] = useState("");
  const [menu, setMenu] = React.useState([]);
  function reloadMenu() {
    returnFoodData().then((data) => {
      setMenu(data);
    });
  }
  React.useEffect(() => {
    reloadMenu();
  }, []);
  const search = (string) => {
    setSearchString(string);
  };
  return (
    <>
      <MenuNav />
      {/*
      <div className="nav-bar">

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        >
        <MenuIcon />
      </IconButton>
      <SearchBar onSearch={search} style={{ flex: "display" }} />
      </div>
  */}
      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4"
        style={{ margin: "40px 40px 40px 40px" }}
      >
        {menu.map((element, index) => (
          <Col key={index}>
            <MenuCard element={element} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Menu;
