import { DIVISIONS_PAGE } from "@configs/routes";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { Box, Button, TextField } from "@mui/material";
import { DivisionType } from "@mytypes/api/division/division.types";
import { InitialValuesType } from "@pages/types/initialValuesDivisions";
import { updateDivisionThunk } from "@store/divisions/divisions.actions";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  division: DivisionType;
}

export function EditDivisionsFields({ division }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, setFieldValue, values } = useFormik<InitialValuesType>({
    initialValues: {
      name: "",
    },
    onSubmit,
  });

  async function onSubmit({ name }: InitialValuesType) {
    try {
      dispatch(updateDivisionThunk({ id: division.id, name }));
      toast.success("Успешно");

      navigate(DIVISIONS_PAGE);
    } catch (error) {
      toast.success("Что-то пошло не так");
    }
  }

  function changeFieldHandle(field: keyof InitialValuesType, value: any) {
    setFieldValue(field, value);
  }

  function cancelClickHandle() {
    const isAbort = window.confirm(
      "Вы действительно хотите отменить все изменения?"
    );
    isAbort && navigate(DIVISIONS_PAGE);
  }

  useEffect(() => {
    if (!division) return;

    setFieldValue("name", division.name);
  }, [division]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <TextField
        required
        name="name"
        label="Наименование отдела"
        value={values.name}
        onChange={(e) => changeFieldHandle("name", e.target.value)}
      />

      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button onClick={() => handleSubmit()} variant="contained">
          Сохранить изменения
        </Button>

        <Button
          onClick={cancelClickHandle}
          variant="contained"
          color="secondary"
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
}
