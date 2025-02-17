import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props {
  materialIndex: number;
  uploadFilesHandle: (files: File[], materialIndex: number) => void;
  disableAddFileBut: boolean;
}

export default function UploadFileBut({
  materialIndex,
  uploadFilesHandle,
  disableAddFileBut,
}: Props) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const arrayFiles = Array.from(files);
    uploadFilesHandle(arrayFiles, materialIndex);
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{ marginTop: "10px", marginLeft: "10px" }}
      startIcon={<CloudUploadIcon />}
      disabled={disableAddFileBut}
    >
      Прикрепить файлы
      <VisuallyHiddenInput type="file" multiple onChange={handleFileUpload} />
    </Button>
  );
}
