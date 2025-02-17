import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as styles from "./Navbar.module.css";
import { getNavbarMenu } from "@configs/navbarMenu";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import Logo from "../../assets/images/logo.webp";

interface Props {
  toggleDrawer: () => void;
}

export function Navbar({ toggleDrawer }: Props) {
  const navigate = useNavigate();

  const user = useAppSelector(userSelector);

  const menu = getNavbarMenu(user);

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={Logo} alt="Технолайн" />
      </div>

      <Divider />

      <List>
        {menu.map((item, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => navigate(item.link)}>
              <ListItemIcon> {item.icon} </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
