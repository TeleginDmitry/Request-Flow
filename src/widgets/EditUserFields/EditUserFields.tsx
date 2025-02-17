import { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Select from "@components/Select/Select";
import { useAppSelector } from "@hooks/useAppSelector";
import { divisionsSelector } from "@store/divisions/divisions.selectors";
import { userRolesSelector } from "@store/userRoles/userRoles.selectors";
import { UserType } from "@mytypes/api/user/user.types";
import useFetching from "@hooks/useFetching";
import { updateUser } from "@services/users.service";
import toast from "react-hot-toast";

interface Props {
  user: UserType;
  abortClickHandle: () => void;
}

export default function EditUserFields({ user, abortClickHandle }: Props) {
  const divisions = useAppSelector(divisionsSelector);
  const roles = useAppSelector(userRolesSelector);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [division, setDivision] = useState<null | number>(null);
  const [role, setRole] = useState<null | number>(null);

  const { fetchQuery } = useFetching({
    callback: async () => {
      if (!name || !email || !password || !division || !role) return;

      const updatedUser = await updateUser({
        id: user.id,
        email,
        name,
        password,
        division_id: division,
        role_id: role,
      });

      return updatedUser;
    },
    onSuccess: () => {
      toast.success("Успешно");
    },
    onError: () => {
      toast.error("Что-то пошло не так");
    },
  });

  useEffect(() => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setDivision(user.division.id);
    setRole(user.role.id);
  }, [user]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        label="ФИО пользователя"
      />

      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        label="Email"
      />

      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        label="Пароль"
        type="password"
      />

      <Select
        label="Подразделение"
        value={`${division}`}
        values={divisions}
        onChange={(e) => setDivision(+e.target.value)}
      />

      <Select
        label="Роль"
        value={`${role}`}
        values={roles}
        onChange={(e) => setRole(+e.target.value)}
      />

      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button onClick={fetchQuery} variant="contained">
          Сохранить изменения
        </Button>

        <Button
          onClick={abortClickHandle}
          variant="contained"
          color="secondary"
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
}
