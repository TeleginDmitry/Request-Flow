import RequestFields from "@widgets/RequestFields/RequestFields";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import { defaultMaretial } from "@configs/defaultValues";
import { useFormik } from "formik";
import { createRequest } from "@services/requests.service";
import { createHistory } from "@services/history.service";
import { REQUESTS_PAGE } from "@configs/routes";
import { createMaterial } from "@services/materials.service";
import { uploadFiles } from "@services/files.service";
import { InitialValuesType } from "./types/initialValuesMaterials";
import { historyStatuses } from "@configs/historyStatuses";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export function CreateRequestPage() {
  const user = useAppSelector(userSelector);

  const navigate = useNavigate();

  const { handleSubmit, setFieldValue, values } = useFormik<InitialValuesType>({
    initialValues: {
      text: "",
      materials: [defaultMaretial],
    },
    onSubmit,
  });

  function changeFieldHandle(field: keyof InitialValuesType, value: any) {
    setFieldValue(field, value);
  }

  function onCreateMaterial() {
    setFieldValue("materials", [...values.materials, defaultMaretial]);
  }

  async function onSubmit({ text, materials }: InitialValuesType) {
    if (!user) return;

    try {
      const request = await createRequest({ text, user_id: user.id });

      await createHistory({
        request_id: request.id,
        user_id: user.id,
        history_status: historyStatuses.REQUEST_CREATED,
      });

      materials.forEach(
        async ({ link, name, note, quantity, unit, files, delivery_date }) => {
          const { id } = await createMaterial({
            link,
            name,
            note,
            quantity,
            unit,
            request_id: request.id,
            residue: 0,
            delivery_date: delivery_date
              ? dayjs(delivery_date).format("YYYY-MM-DD")
              : null,
          });

          files.forEach(async ({ file }) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("material_id", id.toString());

            await uploadFiles(formData);
          });
        }
      );

      toast.success("Успешно");

      navigate(REQUESTS_PAGE);
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <RequestFields
          onCreateMaterial={onCreateMaterial}
          title="Создание бланка заявки на стройматериалы"
          sendFormButTitle="Создать заявку"
          disableAddFileBut={false}
          values={values}
          changeFieldHandle={changeFieldHandle}
        />
      </form>
    </>
  );
}
