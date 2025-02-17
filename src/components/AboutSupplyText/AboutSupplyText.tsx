import { Typography } from "@mui/material";
import * as styles from "./style.module.css";

export default function AboutSupplyText() {
  return (
    <Typography className={styles.text} variant="body1" component="p">
      Supply — сервис для работы с заявками
    </Typography>
  );
}
