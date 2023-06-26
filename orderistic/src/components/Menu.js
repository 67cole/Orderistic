import React, { useState } from "react";
import MenuCard from './MenuCard';
import SearchBar from "./SearchBar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuNav from "./MenuNav";
function Menu() {
  const [searchString, setSearchString] = useState("");
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
      <MenuCard />
    </>
  )
}

export default Menu;