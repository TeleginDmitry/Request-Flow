import { useState } from "react";
import Modal from "@components/Modal/Modal";
import { Box, TextField, Button } from "@mui/material";
import Select from "@components/Select/Select";
import { useAppSelector } from "@hooks/useAppSelector";
import { userRolesSelector } from "@store/userRoles/userRoles.selectors";
import { divisionsSelector } from "@store/divisions/divisions.selectors";
import useFetching from "@hooks/useFetching";
import { createUser } from "@services/users.service";
import toast from "react-hot-toast";

interface Props {
  title: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

export default function CreateUserModal({ title, isOpen, toggleOpen }: Props) {
  const roles = useAppSelector(userRolesSelector);
  const divisions = useAppSelector(divisionsSelector);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [division, setDivision] = useState<null | number>(null);
  const [role, setRole] = useState<null | number>(null);

  const { fetchQuery } = useFetching({
    callback: async () => {
      if (!name || !email || !password || !division || !role) return;

      const user = await createUser({
        email,
        name,
        password,
        division_id: division,
        role_id: role,
      });

      return user;
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
          <Button type="submit">Создать пользователя</Button>
        </>
      }
      onSubmitForm={fetchQuery}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="ФИО пользователя"
          required
        />

        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
        />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Пароль"
          required
        />

        <Select
          value={`${division}`}
          values={divisions}
          onChange={(e) => setDivision(+e.target.value)}
          label="Выберите отдел"
          required
        />

        <Select
          value={`${role}`}
          values={roles}
          onChange={(e) => setRole(+e.target.value)}
          label="Выберите роль"
          required
        />
      </Box>
    </Modal>
  );
}
