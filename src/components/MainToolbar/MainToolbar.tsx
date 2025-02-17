import * as styles from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export default function MainToolbar({ children }: Props) {
  return <div className={styles.wrapper}>{children}</div>;
}
