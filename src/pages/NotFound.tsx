import NotFoundImg from "@assets/images/notFound.webp";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { REQUESTS_PAGE } from "@configs/routes";
import { CSSProperties } from "react";

export function NotFound() {
  const navigate = useNavigate();

  const wrapperStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    background: "var(--primary-color)",
  };

  const imgStyle: CSSProperties = {
    width: "100%",
    maxWidth: "400px",
  };

  const titleStyle: CSSProperties = {
    fontSize: "30px",
    color: "#fff",
    textAlign: "center",
  };

  const butStyle: CSSProperties = {
    background: "#fff",
    color: "var(--primary-color)",
  };

  return (
    <div style={wrapperStyle}>
      <img style={imgStyle} src={NotFoundImg} alt="Страница не найдена!" />
      <h1 style={titleStyle}>Страница не найдена!</h1>
      <Button
        onClick={() => navigate(REQUESTS_PAGE)}
        variant="contained"
        sx={butStyle}
      >
        На главную
      </Button>
    </div>
  );
}
