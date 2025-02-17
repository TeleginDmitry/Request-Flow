import * as styles from "./style.module.css";
import SummarizeIcon from "@mui/icons-material/Summarize";

interface Props {
  title?: string;
}

export default function EmptyTable({
  title = "Здесь пока нет записей",
}: Props) {
  return (
    <div className={styles.wrapper}>
      <SummarizeIcon className={styles.icon} />
      <p className={styles.title}>{title}</p>
    </div>
  );
}
