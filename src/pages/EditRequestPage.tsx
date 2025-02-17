import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import RequestFields from "@widgets/RequestFields/RequestFields";
import { REQUESTS_PAGE } from "@configs/routes";
import { getRequestsById, updateRequest } from "@services/requests.service";
import { RequestType } from "@mytypes/api/request/request.types";
import { useFormik } from "formik";
import { defaultMaretial } from "@configs/defaultValues";
import useFetching from "@hooks/useFetching";
import {
  createMaterial,
  deleteMaterial,
  updateMetarial,
} from "@services/materials.service";
import { useEffect, useState } from "react";
import { uploadFiles } from "@services/files.service";
import { InitialValuesType } from "./types/initialValuesMaterials";
import { EditRequetsSkeleton } from "@widgets/skeletons/editRequestSkeleton/EditRequetsSkeleton";
import { createHistory } from "@services/history.service";
import { historyStatuses } from "@configs/historyStatuses";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export function EditRequestPage() {
  const navigate = useNavigate();
  const { requestId } = useParams();

  const user = useAppSelector(userSelector);

  const [deletedMaterials, setDeletedMaterials] = useState<number[]>([]);

  const { data, fetchQuery, isLoading } = useFetching<RequestType>({
    callback: async () => {
      if (!requestId) {
        navigate(REQUESTS_PAGE);
        throw new Error("Не удалось получить ID заявки!");
      }

      const numRequestId = parseInt(requestId);

      if (isNaN(numRequestId)) {
        navigate(REQUESTS_PAGE);
      }

      try {
        const request = await getRequestsById(numRequestId);

        changeFieldHandle("text", request.text);
        changeFieldHandle("materials", request.materials);

        return request;
      } catch (error) {
        navigate(REQUESTS_PAGE);
        throw new Error("Возникла ошибка при получении заявки!");
      }
    },
    condition: !!requestId,
  });

  const { handleSubmit, setFieldValue, values } = useFormik<InitialValuesType>({
    initialValues: {
      text: "",
      materials: [],
    },
    onSubmit,
  });

  async function onSubmit({ text, materials }: InitialValuesType) {
    if (!data || !user) return;

    try {
      await updateRequest({
        requestId: data.id,
        user_id: data.user.id,
        warehouse_id: data.warehouse?.id ?? null,
        request_status_id: data.request_status.current_status.id,
        text,
      });

      await createHistory({
        request_id: data.id,
        user_id: user.id,
        history_status: historyStatuses.REQUEST_DATA_CHANGED,
      });

      materials.forEach(async (material) => {
        const { link, name, note, quantity, unit, files, delivery_date } =
          material;

        if (!material.id) {
          const { id } = await createMaterial({
            link,
            name,
            note,
            quantity,
            unit,
            request_id: data.id,
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
        } else {
          await updateMetarial({
            id: material.id,
            link,
            name,
            note,
            quantity,
            unit,
            request_id: data.id,
            residue: 0,
            delivery_date: delivery_date
              ? dayjs(delivery_date).format("YYYY-MM-DD")
              : null,
          });
        }
      });

      deletedMaterials.forEach(async (materialId) => {
        await deleteMaterial(materialId);
      });

      toast.success("Успешно");
    } catch (error) {
      toast.success("Произошла ошибка");
    }
  }

  function changeFieldHandle(field: keyof InitialValuesType, value: any) {
    setFieldValue(field, value);
  }

  function addToDeletedMaterials(materialId: number) {
    setDeletedMaterials([...deletedMaterials, materialId]);
  }

  function onCreateMaterial() {
    setFieldValue("materials", [...values.materials, defaultMaretial]);
  }

  useEffect(() => {
    fetchQuery();
  }, []);

  if (isLoading) return <EditRequetsSkeleton />;

  if (!data) return <h1>Заявка не найдена</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <RequestFields
        addToDeletedMaterials={addToDeletedMaterials}
        changeFieldHandle={changeFieldHandle}
        onCreateMaterial={onCreateMaterial}
        values={values}
        title="Редактирование бланка заявки на стройматериалы"
        sendFormButTitle="Сохранить изменения"
        disableAddFileBut={true}
      />
    </form>
  );
}
