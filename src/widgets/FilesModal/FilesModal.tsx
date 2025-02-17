import Modal from "@components/Modal/Modal";
import Button from "@mui/material/Button";
import FilesView from "@components/FilesView/FilesView";
import { useContext } from "react";
import { FilesContext } from "@contexts/Files.context";

interface Props {
  title: string;
}

export default function FilesModal({ title }: Props) {
  const { isOpen, toggleOpen, clearFiles, files } = useContext(FilesContext);

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      buttons={
        <Button
          onClick={() => {
            toggleOpen();
            clearFiles();
          }}
        >
          Закрыть
        </Button>
      }
    >
      <FilesView files={files} />
    </Modal>
  );
}
