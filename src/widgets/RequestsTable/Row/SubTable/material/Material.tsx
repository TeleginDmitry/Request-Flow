import IconButton from "@mui/material/IconButton";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { TableCell, TableRow, Tooltip, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MaterialType } from "@mytypes/api/material/material.types";
import { useContext, useState } from "react";
import { FilesContext } from "@contexts/Files.context";
import { getDayMonthDate } from "@utils/helpers/timeFunctions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "@components/Modal/Modal";
import { RequestStatusesType } from "@mytypes/request_statuses";
import { requestStatuses } from "@configs/requestStatuses";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import { SUPPLIER } from "@configs/userRoles";
import dayjs from "dayjs";
import { updateMetarial } from "@services/materials.service";
import toast from "react-hot-toast";

interface Props {
  material: MaterialType;
  requestStatus: RequestStatusesType;
  index: number;
}

export function Material({ material, requestStatus, index }: Props) {
  const { showFiles, toggleOpen } = useContext(FilesContext);

  const user = useAppSelector(userSelector);

  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  function toggleOpenDatePicker() {
    setIsOpenDatePicker((state) => !state);
  }

  function handleChangeDatePicker(date: dayjs.Dayjs | null) {
    setSelectedDate(date);
  }

  async function onSubmitDatePicker() {
    if (!selectedDate) return;

    const delivery_date = selectedDate.format("YYYY-MM-DD");
    try {
      await updateMetarial({
        ...material,
        delivery_date,
      });

      toggleOpenDatePicker();

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  const isSUPPLIER = user?.role.name === SUPPLIER;

  const isVisibleDatePicker =
    (requestStatus === requestStatuses.WAITING_FOR_SUPPLY_PROCESSING ||
      requestStatus === requestStatuses.PROCESSING_BY_SUPPLY) &&
    isSUPPLIER;

  const link = material.link;

  return (
    <TableRow data-testid="material" key={material.id}>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{material.name}</TableCell>
      <TableCell align="right">
        {material.quantity} {material.unit}
      </TableCell>
      <TableCell align="right">{material.residue}</TableCell>
      <TableCell align="right">{material.note}</TableCell>
      {isSUPPLIER && (
        <TableCell align="right">
          {material.delivery_date
            ? getDayMonthDate(material.delivery_date)
            : "Не указана"}
        </TableCell>
      )}

      <TableCell align="right">
        {isVisibleDatePicker ? (
          <Tooltip title="Ориентовочная дата поставки">
            <IconButton onClick={toggleOpenDatePicker} color="primary">
              <LocalShippingIcon />
            </IconButton>
          </Tooltip>
        ) : null}

        <Modal
          title="Ориентировочная дата поставки"
          buttons={
            <>
              <Button onClick={toggleOpenDatePicker}>Отмена</Button>
              <Button onClick={onSubmitDatePicker} type="submit">
                Сохранить
              </Button>
            </>
          }
          isOpen={isOpenDatePicker}
          toggleOpen={toggleOpenDatePicker}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={handleChangeDatePicker}
              value={selectedDate}
              sx={{ width: "100%" }}
              format="DD/MM/YY"
              label="Выбрать дату..."
            />
          </LocalizationProvider>
        </Modal>

        {link && link.trim().length > 0 ? (
          <Tooltip title="Ссылка">
            <Link to={link} target="_blank">
              <IconButton color="primary">
                <InsertLinkIcon />
              </IconButton>
            </Link>
          </Tooltip>
        ) : (
          <IconButton disabled>
            <InsertLinkIcon />
          </IconButton>
        )}

        {material.files?.length ? (
          <Tooltip title="Вложения">
            <IconButton
              onClick={() => {
                showFiles(material.files);
                toggleOpen();
              }}
              color="primary"
            >
              <SummarizeIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton disabled>
            <SummarizeIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
