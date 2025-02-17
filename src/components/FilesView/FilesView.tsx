import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton, Tooltip, Modal } from "@mui/material";
import * as styles from "./style.module.css";
import { FileType } from "@mytypes/api/file/file.types";
import { API_UPLOAD_URL } from "@configs/api";

interface Props {
  files: FileType[];
}

export default function FilesView({ files }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (fileUrl: string) => {
    setSelectedImage(fileUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (!files.length) return null;

  return (
    <div className={styles.filesContainer}>
      {files.map((file) => {
        return (
          <div key={file.id} className={styles.fileWrapper}>
            <div className={styles.imageWrapper}>
              <Tooltip className={styles.downloadButton} title="Скачать файл">
                <IconButton
                  href={API_UPLOAD_URL + file.file_name}
                  download={file.file_name}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={file.file_name}>
                <img
                  src={API_UPLOAD_URL + file.file_name}
                  alt={file.file_name}
                  className={styles.image}
                  onClick={() => handleOpen(API_UPLOAD_URL + file.file_name)}
                />
              </Tooltip>
            </div>

            <p className={styles.fileName}>{file.file_name}</p>
          </div>
        );
      })}

      {selectedImage && (
        <Modal open={open} onClose={handleClose} className={styles.modal}>
          <div className={styles.modalContent}>
            <img src={selectedImage} alt="Enlarged" className={styles.modalImage} />
          </div>
        </Modal>
      )}
    </div>
  );
}
