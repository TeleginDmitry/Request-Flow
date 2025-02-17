import * as styles from "./Backdoor.module.css";

interface Props {
  onClick: () => void;
}

export function Backdoor({ onClick }: Props) {
  return <div className={styles.backdoor} onClick={onClick}></div>;
}
