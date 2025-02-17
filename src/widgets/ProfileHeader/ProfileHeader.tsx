import ProfileHeaderImg from "@assets/images/profileHeader.webp";
import * as styles from "./style.module.css";

export default function ProfileHeader() {
  return <img className={styles.img} src={ProfileHeaderImg} alt="Профиль" />;
}
