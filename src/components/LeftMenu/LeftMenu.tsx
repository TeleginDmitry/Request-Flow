import { useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Navbar } from "@components/Navbar/Navbar";

export default function TemporaryDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer() {
    setDrawerOpen((state) => !state);
  }

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <Navbar toggleDrawer={toggleDrawer}></Navbar>
      </Drawer>
    </div>
  );
}
