import { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { IconButton, Tooltip } from "@mui/material";
import * as styles from "./style.module.css";

interface Props {
  onClick?: () => void;
  color?:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  title?: string;
  size?: number;
}

export default function RefreshBut({
  onClick,
  color,
  title = "Обновить информацию",
  size = 24,
}: Props) {
  const [isRotateBut, setIsRotateBut] = useState(false);
  const refreshClickHandle = () => {
    onClick && onClick();
    setIsRotateBut(true);
    setTimeout(() => setIsRotateBut(false), 1000);
  };
  return (
    <Tooltip title={title}>
      <IconButton
        className={isRotateBut ? styles.refreshButActive : " "}
        onClick={refreshClickHandle}
        color={color}
        edge="end"
      >
        <CachedIcon sx={{ width: size, height: size }} />
      </IconButton>
    </Tooltip>
  );
}
