import * as styles from "./Loader.module.css";
import { CircularProgress } from "@mui/material";

export function Loader() {
  return (
    <div className={styles.wrapper}>
      <CircularProgress />
      <p className={styles.text}>Загрузка...</p>
    </div>
  );
}
