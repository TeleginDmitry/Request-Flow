import * as styles from "./style.module.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import UploadFileBut from "@components/UploadFileBut/UploadFileBut";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { ChangeEvent } from "react";
import { InitialValuesType } from "@pages/types/initialValuesMaterials";
import dayjs from "dayjs";

interface Props {
  values: InitialValuesType;
  changeFieldHandle: (field: keyof InitialValuesType, value: any) => void;
  disableAddFileBut: boolean;
  addToDeletedMaterials?: (materialId: number) => void;
}

export default function MaterialsAccordion({
  values,
  changeFieldHandle,
  disableAddFileBut,
  addToDeletedMaterials,
}: Props) {
  const deleteMaterial = (index: number, materialId: number | undefined) => {
    const newMaterials = [...values.materials];
    newMaterials.splice(index, 1);
    changeFieldHandle("materials", newMaterials);

    if (materialId) {
      addToDeletedMaterials?.(materialId);
    }
  };

  const changeNameInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newMaterials = [...values.materials];
    newMaterials[index] = {
      ...values.materials[index],
      name: e.target.value,
    };
    changeFieldHandle("materials", newMaterials);
  };

  const changeCountInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newMaterials = [...values.materials];
    newMaterials[index] = {
      ...values.materials[index],
      quantity: +e.target.value,
    };
    changeFieldHandle("materials", newMaterials);
  };

  const changeUnitInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newMaterials = [...values.materials];
    newMaterials[index] = {
      ...values.materials[index],
      unit: e.target.value,
    };
    changeFieldHandle("materials", newMaterials);
  };

  const changeNoteInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newMaterials = [...values.materials];
    newMaterials[index] = {
      ...values.materials[index],
      note: e.target.value,
    };
    changeFieldHandle("materials", newMaterials);
  };

  const changeLinkInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newMaterials = [...values.materials];
    newMaterials[index] = {
      ...values.materials[index],
      link: e.target.value,
    };
    changeFieldHandle("materials", newMaterials);
  };

  const uploadFilesHandle = async (files: File[], index: number) => {
    const newMaterials = [...values.materials];
    newMaterials[index] = {
      ...values.materials[index],
      files: [
        ...newMaterials[index].files,
        ...files.map((file) => ({
          file_name: file.name,
          file,
          uploadLink: URL.createObjectURL(file),
        })),
      ],
    };
    changeFieldHandle("materials", newMaterials);
  };

  const deleteUploadFile = (materialIndex: number, fileIndex: number) => {
    const newMaterials = [...values.materials];
    const newFiles = [...newMaterials[materialIndex].files];
    newFiles.splice(fileIndex, 1);
    newMaterials[materialIndex] = {
      ...values.materials[materialIndex],
      files: newFiles,
    };
    changeFieldHandle("materials", newMaterials);
  };

  return (
    <div>
      {values.materials.map((material, index) => (
        <Accordion key={"material-" + index}>
          <AccordionSummary
            sx={{ flexDirection: "row-reverse", gap: 1 }}
            expandIcon={<ExpandMoreIcon />}
          >
            <div className={styles.accordionTitle}>
              <Typography>{material.name}</Typography>
              {values.materials.length > 1 && (
                <IconButton
                  onClick={() => deleteMaterial(index, material.id)}
                  sx={{ marginLeft: "auto" }}
                >
                  <DeleteIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              )}
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={styles.fieldsWrapper}>
              <TextField
                required
                value={values.materials[index].name}
                onChange={(e) => changeNameInput(e, index)}
                label="Наименование материала"
                type="text"
                className={styles.materialNameField}
              />
              <TextField
                required
                value={values.materials[index].quantity}
                onChange={(e) => changeCountInput(e, index)}
                label="Кол-во"
                type="number"
                className={styles.countField}
              />
              <TextField
                required
                value={values.materials[index].unit}
                onChange={(e) => changeUnitInput(e, index)}
                label="Единица измерения"
                type="text"
                className={styles.unitField}
              />
            </div>

            <TextField
              value={values.materials[index].note}
              onChange={(e) => changeNoteInput(e, index)}
              sx={{ marginTop: 1 }}
              label="Примечание (необязательно)"
              type="text"
              multiline
              fullWidth
              rows={3}
            />

            <TextField
              value={values.materials[index].link}
              onChange={(e) => changeLinkInput(e, index)}
              sx={{ marginTop: 1 }}
              label="Ссылка (необязательно)"
              type="text"
              fullWidth
            />

            <UploadFileBut
              materialIndex={index}
              uploadFilesHandle={uploadFilesHandle}
              disableAddFileBut={disableAddFileBut}
            />

            {values.materials[index].files &&
              (values.materials[index].files.length > 0 ? (
                <div className={styles.filesWrapper}>
                  <h3 className={styles.filesTitle}>Прикрепленные файлы:</h3>
                  {values.materials[index].files.map((file, fileIndex) => (
                    <div className={styles.fileItem} key={"file-" + fileIndex}>
                      <IconButton href={file.uploadLink} download>
                        <DownloadIcon />
                      </IconButton>
                      <p className={styles.fileItemName}>{file.file_name}</p>
                      <IconButton
                        disabled={disableAddFileBut}
                        onClick={() => deleteUploadFile(index, fileIndex)}
                      >
                        <CloseIcon
                          fontSize="small"
                          sx={
                            disableAddFileBut
                              ? { opacity: 0.5 }
                              : { color: "red" }
                          }
                        />
                      </IconButton>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.filesWrapper}>
                  <p className={styles.filesInform}>
                    <InsertDriveFileIcon />
                    <span>Файлы не прикреплены!</span>
                  </p>
                </div>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
