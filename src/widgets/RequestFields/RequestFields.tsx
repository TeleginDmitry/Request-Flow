import { TextField, IconButton, Button } from "@mui/material";
import * as styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { REQUESTS_PAGE } from "@configs/routes";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Accordion from "@components/Accordion/Accordion";
import { InitialValuesType } from "@pages/types/initialValuesMaterials";

interface Props {
  values: InitialValuesType;
  title: string;
  sendFormButTitle: string;
  disableAddFileBut: boolean;
  changeFieldHandle: (field: keyof InitialValuesType, value: any) => void;
  onCreateMaterial: () => void;
  addToDeletedMaterials?: (materialId: number) => void;
}

export default function RequestFields({
  values,
  changeFieldHandle,
  title,
  sendFormButTitle = "Отправить",
  disableAddFileBut,
  onCreateMaterial,
  addToDeletedMaterials,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <h1 className={styles.title}>
        <IconButton onClick={() => navigate(REQUESTS_PAGE)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        {title}
      </h1>

      <div className={styles.form}>
        <TextField
          required
          name="name"
          label="Наименование объекта"
          value={values.text}
          onChange={(e) => changeFieldHandle("text", e.target.value)}
        />

        <Accordion
          values={values}
          addToDeletedMaterials={addToDeletedMaterials}
          changeFieldHandle={changeFieldHandle}
          disableAddFileBut={disableAddFileBut}
        />

        <div className={styles.formButtons}>
          <Button type="submit" variant="contained">
            {sendFormButTitle}
          </Button>
          <Button
            onClick={onCreateMaterial}
            variant="contained"
            color="secondary"
          >
            Добавить материал
          </Button>
        </div>
      </div>
    </>
  );
}
