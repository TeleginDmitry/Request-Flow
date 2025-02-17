import * as styles from "./style.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IconButton } from "@mui/material";
import { Link, To } from "react-router-dom";

interface Props {
  title: string;
  link?: string | number;
}

export default function TitleBack({ title, link = -1 }: Props) {
  return (
    <div className={styles.titleWrapper}>
      <Link to={link as To}>
        <IconButton>
          <KeyboardBackspaceIcon color="action" />
        </IconButton>
      </Link>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
