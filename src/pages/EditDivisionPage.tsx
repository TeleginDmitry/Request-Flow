import { DIVISIONS_PAGE } from "@configs/routes";
import useFetching from "@hooks/useFetching";
import { DivisionType } from "@mytypes/api/division/division.types";
import { getDivisionById } from "@services/divisions.service";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EditDivisionsFields } from "@widgets/EditDivisionsFields/EditDivisionsFields";

export function EditDivisionPage() {
  const navigate = useNavigate();
  const { divisionId } = useParams();

  const { data, fetchQuery, isLoading } = useFetching<DivisionType>({
    callback: async () => {
      if (!divisionId) {
        navigate(DIVISIONS_PAGE);
        throw new Error("Не удалось получить ID отдела!");
      }

      const numDivisionId = parseInt(divisionId);

      if (isNaN(numDivisionId)) {
        navigate(DIVISIONS_PAGE);
      }

      try {
        const division = await getDivisionById(numDivisionId);

        return division;
      } catch (error) {
        navigate(DIVISIONS_PAGE);
        throw new Error("Возникла ошибка при получении отдела!");
      }
    },
    condition: !!divisionId,
  });

  useEffect(() => {
    fetchQuery();
  }, []);

  if (!data) return <h1>Отдел не найден</h1>;

  return (
    <form>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <IconButton onClick={() => navigate(DIVISIONS_PAGE)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <h1>Редактирование отдела</h1>
      </Box>

      <EditDivisionsFields division={data}></EditDivisionsFields>
    </form>
  );
}
