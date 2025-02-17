import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

import LeftMenu from "@components/LeftMenu/LeftMenu";
import SearchPanel from "@components/SearchPanel/SearchPanel";
import Account from "@components/Account/Account";
import { getHeaderTitleByPath } from "@configs/headerTitles";
import { useLocation } from "react-router-dom";

export default function Header() {
  const pathname = useLocation().pathname;

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar>
          <LeftMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getHeaderTitleByPath(pathname)}
          </Typography>
          <SearchPanel />
          <Account />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
