import { useState } from "react";
import Modal from "@components/Modal/Modal";
import { Box, TextField, Button } from "@mui/material";
import useFetching from "@hooks/useFetching";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { createDivisionThunk } from "@store/divisions/divisions.actions";
import toast from "react-hot-toast";

interface Props {
  title: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

export function DivisionCreatingModal({ title, isOpen, toggleOpen }: Props) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const { fetchQuery } = useFetching({
    callback: async () => {
      if (!name) return;

      dispatch(createDivisionThunk(name));
    },
    onSuccess: () => {
      toast.success("Успешно");
      toggleOpen();
    },
    onError: () => {
      toast.error("Что-то пошло не так");
    },
  });

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      buttons={
        <>
          <Button onClick={toggleOpen}>Отмена</Button>
          <Button type="submit">Создать отдел</Button>
        </>
      }
      onSubmitForm={fetchQuery}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Название отдела"
          required
        />
      </Box>
    </Modal>
  );
}
