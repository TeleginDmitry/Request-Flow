import CircularProgress from "@mui/material/CircularProgress";
import * as styles from "./style.module.css";

export default function Preloader() {
  return (
    <div className={styles.preloaderWrapper}>
      <CircularProgress />
      <p className={styles.preloaderText}>Загрузка...</p>
    </div>
  );
}
