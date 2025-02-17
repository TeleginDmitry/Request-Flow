import ActionsContext from "../contexts/Actions.context";
import { Outlet, useNavigate } from "react-router-dom";
import { EDIT_REQUEST_PAGE, HISTORY_PAGE } from "@configs/routes";
import {
  changeStatus,
  deleteRequestById,
  previousStatus,
} from "@services/requests.service";
import { requestStatuses } from "@configs/requestStatuses";
import { MaterialType } from "@mytypes/api/material/material.types";
import { useContext } from "react";
import { BalanceContext } from "@contexts/Balance.context";
import { createHistory } from "@services/history.service";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import { historyStatuses } from "@configs/historyStatuses";
import toast from "react-hot-toast";

export function ActionsProvider() {
  const { setMaterials, toggleOpen, setRequestId } = useContext(BalanceContext);

  const user = useAppSelector(userSelector);

  const navigate = useNavigate();

  async function deleteHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите удалить данную заявку?"
    );

    if (!isHandle) return;

    try {
      await deleteRequestById(requestId);

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.REQUEST_DELETED,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  function editHandle(requestId: number) {
    navigate(EDIT_REQUEST_PAGE + "/" + requestId);
  }

  function historyHandle(requestId: number) {
    navigate(`${HISTORY_PAGE + "/" + requestId}`);
  }

  function balanceHandle(materials: MaterialType[], requestId: number) {
    setMaterials(materials);
    setRequestId(requestId);

    toggleOpen();
  }

  async function archiveHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите переместить данную заявку в архив?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.ARCHIVED,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.MOVED_TO_ARCHIVE,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function materialsArrivedObjectHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что материалы пришли на объект?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.READY_FOR_ISSUE_AT_SITE,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.MATERIALS_ARRIVED_AT_SITE,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function materialsArrivedWarehouseHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что материалы пришли на склад?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.READY_FOR_ISSUE_AT_WAREHOUSE,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.MATERIALS_ARRIVED_AT_WAREHOUSE,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function previousStatusHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите восстановить предыдущий статус?"
    );

    if (!isHandle) return;

    try {
      await previousStatus(requestId);
      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.REQUEST_RETURNED_TO_PREVIOUS_STATUS,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function acceptRequestWarehouseHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите принять данную заявку?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.CHECKING_REMAINS,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.ACCEPTED_BY_WAREHOUSE,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function acceptRequestControlHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите принять данную заявку?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.PROCESSING_BY_CONTROLLER,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.ACCEPTED_BY_CONTROLLER,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function acceptRequestSnabHandle(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите принять данную заявку?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.PROCESSING_BY_SUPPLY,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.ACCEPTED_BY_SUPPLY,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function confirmAndSendToSnab(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите подтвердить данную заявку?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.WAITING_FOR_SUPPLY_PROCESSING,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.PROCESSED_BY_CONTROLLER,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  async function materialTransferred(requestId: number) {
    if (!user) return;

    const isHandle = window.confirm(
      "Вы уверены, что хотите материалы получены?"
    );

    if (!isHandle) return;

    try {
      await changeStatus({
        requestId,
        status: requestStatuses.ISSUED,
      });

      await createHistory({
        request_id: requestId,
        user_id: user.id,
        history_status: historyStatuses.MATERIAL_ISSUED,
      });

      toast.success("Успешно");
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  }

  return (
    <ActionsContext.Provider
      value={{
        confirmAndSendToSnab,
        materialTransferred,
        acceptRequestControlHandle,
        acceptRequestSnabHandle,
        acceptRequestWarehouseHandle,
        archiveHandle,
        balanceHandle,
        deleteHandle,
        editHandle,
        historyHandle,
        materialsArrivedObjectHandle,
        materialsArrivedWarehouseHandle,
        previousStatusHandle,
      }}
    >
      <Outlet></Outlet>
    </ActionsContext.Provider>
  );
}
