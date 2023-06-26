import React, { useState } from "react";
import MenuCard from './MenuCard';
import SearchBar from "./SearchBar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { returnData } from "../api/MenuApi";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MenuNav from "./MenuNav";
function Menu() {
  const [searchString, setSearchString] = useState("");
  const [menu, setMenu] = React.useState([]);
  function reloadMenu() {
    returnData()
      .then((data) => {
        setMenu(data);
      })
  }
  React.useEffect(() => {
    reloadMenu();
  }, [])
  const search = (string) => {
    setSearchString(string);
  }
  return (
    <>
    <MenuNav />
    <IconButton
		size="large"
		edge="start"
		color="inherit"
		aria-label="menu"
		sx={{ mr: 2 }}
		>
		<MenuIcon />
    </IconButton>
    <SearchBar onSearch={search} style={{ flex:"display" }} />
    <Row xs={1} md={2} lg={3} className="g-4" style={{ margin: "40px 40px 40px 40px"}}>
      {menu.map((element, index) => (
        <Col key={index} >
          <MenuCard element={element}/>
        </Col>
      ))}
    </Row>
    
    </>

  )
}

export default Menu;