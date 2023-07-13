import React from "react";
import SearchBar from "./SearchBar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function MenuSearchBar() {
	const [searchString, setSearchString] = React.useState("");
	const search = (string) => {
			setSearchString(string);
	};
	return (
		<>
		{
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
		}
	</>
	)
}
export default MenuSearchBar;