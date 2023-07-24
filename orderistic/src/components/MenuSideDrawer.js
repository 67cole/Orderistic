import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
function MenuSideDrawer(menu) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  function category() {
    const arrayCategory = menu.value.map((element) => element.category);
    const uniqueCategory = Array.from(new Set(arrayCategory)).filter(
      (element) => element
    );
    const categoryDisplay = uniqueCategory.map((element) => (
      <Typography
        variant="h6"
        padding="20px"
        onClick={() => setFilter(element)}
      >
        {element}
      </Typography>
    ));
    return categoryDisplay;
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h5" component="div">
            Menu Categories
            {category()}
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
export default MenuSideDrawer;
