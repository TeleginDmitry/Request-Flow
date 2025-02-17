import { useContext } from "react";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import {
  ADMIN,
  CONTROL,
  CUSTOMER,
  SUPPLIER,
  WAREHOUSE,
} from "@configs/userRoles";
import ActionsContext from "@contexts/Actions.context";
import { ToggleMaterialsButton } from "@components/RequestButtons/ToggleMaterialsButton";
import { HistoryButton } from "@components/RequestButtons/HistoryButton";
import { RequestType } from "@mytypes/api/request/request.types";
import { DeleteButton } from "@components/RequestButtons/DeleteButton";
import { EditButton } from "@components/RequestButtons/EditButton";
import { PreviousStatusButton } from "@components/RequestButtons/PreviousStatusButton";
import { ArchiveButton } from "@components/RequestButtons/ArchiveButton";
import { MaterialsArrivedWarehouseButton } from "@components/RequestButtons/MaterialsArrivedWarehouseButton";
import { MaterialsArrivedObjectButton } from "@components/RequestButtons/MaterialsArrivedObjectButton";
import { AcceptButton } from "@components/RequestButtons/AcceptButton";
import { MaterialsEditControlButton } from "@components/RequestButtons/MaterialsEditControlButton";
import { BalanceButton } from "@components/RequestButtons/BalanceButton";
import { MaterialTransferredButton } from "@components/RequestButtons/MaterialTransferredButton";
import { requestStatuses } from "@configs/requestStatuses";

interface GroupButtonsProps {
  request: RequestType;
  userId: number;
}

export function UserButtons({ request }: GroupButtonsProps) {
  const actions = useContext(ActionsContext);

  if (!actions) return null;

  const { deleteHandle, editHandle, archiveHandle } = actions;

  switch (request.request_status.current_status.name) {
    case requestStatuses.WAITING_FOR_WAREHOUSE_PROCESSING:
      return (
        <>
          <DeleteButton onClick={() => deleteHandle(request.id)} />
          <EditButton onClick={() => editHandle(request.id)} />
        </>
      );
    case requestStatuses.ISSUED:
      return <ArchiveButton onClick={() => archiveHandle(request.id)} />;
    default:
      return null;
  }
}

// Кнопки зав.складом
export function WarehouseButtons({ userId, request }: GroupButtonsProps) {
  const actions = useContext(ActionsContext);

  if (!actions) return null;

  const {
    deleteHandle,
    editHandle,
    acceptRequestWarehouseHandle,
    balanceHandle,
    materialsArrivedWarehouseHandle,
    archiveHandle,
    materialTransferred,
  } = actions;

  switch (request.request_status.current_status.name) {
    case requestStatuses.WAITING_FOR_WAREHOUSE_PROCESSING:
      return (
        <>
          {userId === request.user.id && (
            <>
              <DeleteButton onClick={() => deleteHandle(request.id)} />
              <EditButton onClick={() => editHandle(request.id)} />
            </>
          )}
          <AcceptButton
            onClick={() => acceptRequestWarehouseHandle(request.id)}
          />
        </>
      );
    case requestStatuses.CHECKING_REMAINS:
      return (
        <BalanceButton
          onClick={() => balanceHandle(request.materials, request.id)}
        />
      );
    case requestStatuses.MATERIALS_ARRIVED_AT_WAREHOUSE:
      return (
        <MaterialsArrivedWarehouseButton
          onClick={() => materialsArrivedWarehouseHandle(request.id)}
        />
      );
    case requestStatuses.READY_FOR_ISSUE_AT_WAREHOUSE:
      return (
        <MaterialTransferredButton
          onClick={() => materialTransferred(request.id)}
        />
      );
    case requestStatuses.READY_FOR_ISSUE_AT_SITE:
      return (
        <MaterialTransferredButton
          onClick={() => materialTransferred(request.id)}
        />
      );
    case requestStatuses.ISSUED:
      if (userId !== request.user.id) return null;
      return <ArchiveButton onClick={() => archiveHandle(request.id)} />;
    default:
      return null;
  }
}

// Кнопки снабжения
export function SnabButtons({ userId, request }: GroupButtonsProps) {
  const actions = useContext(ActionsContext);

  if (!actions) return null;

  const {
    deleteHandle,
    editHandle,
    acceptRequestSnabHandle,
    previousStatusHandle,
    materialsArrivedWarehouseHandle,
    materialsArrivedObjectHandle,
    archiveHandle,
  } = actions;

  switch (request.request_status.current_status.name) {
    case requestStatuses.WAITING_FOR_WAREHOUSE_PROCESSING:
      if (userId !== request.user.id) return null;
      return (
        <>
          <DeleteButton onClick={() => deleteHandle(request.id)} />
          <EditButton onClick={() => editHandle(request.id)} />
        </>
      );
    case requestStatuses.WAITING_FOR_SUPPLY_PROCESSING:
      return (
        <>
          <EditButton onClick={() => editHandle(request.id)} />
          <AcceptButton onClick={() => acceptRequestSnabHandle(request.id)} />
        </>
      );
    case requestStatuses.PROCESSING_BY_SUPPLY:
      return (
        <>
          <EditButton onClick={() => editHandle(request.id)} />
          <PreviousStatusButton
            onClick={() => previousStatusHandle(request.id)}
          />
          <MaterialsArrivedWarehouseButton
            onClick={() => materialsArrivedWarehouseHandle(request.id)}
          />
          <MaterialsArrivedObjectButton
            onClick={() => materialsArrivedObjectHandle(request.id)}
          />
        </>
      );
    case requestStatuses.MATERIALS_ARRIVED_AT_WAREHOUSE:
      return (
        <PreviousStatusButton
          onClick={() => previousStatusHandle(request.id)}
        />
      );
    case requestStatuses.READY_FOR_ISSUE_AT_WAREHOUSE:
      return (
        <PreviousStatusButton
          onClick={() => previousStatusHandle(request.id)}
        />
      );
    case requestStatuses.READY_FOR_ISSUE_AT_SITE:
      return (
        <PreviousStatusButton
          onClick={() => previousStatusHandle(request.id)}
        />
      );
    case requestStatuses.ISSUED:
      if (userId !== request.user.id) return null;
      return <ArchiveButton onClick={() => archiveHandle(request.id)} />;
    default:
      return null;
  }
}

// Кнопки контролёра
export function ControlButtons({ userId, request }: GroupButtonsProps) {
  const actions = useContext(ActionsContext);

  if (!actions) return null;

  const {
    deleteHandle,
    editHandle,
    acceptRequestControlHandle,
    archiveHandle,
    confirmAndSendToSnab,
  } = actions;

  switch (request.request_status.current_status.name) {
    case requestStatuses.WAITING_FOR_WAREHOUSE_PROCESSING:
      if (userId !== request.user.id) return null;
      return (
        <>
          <DeleteButton onClick={() => deleteHandle(request.id)} />
          <EditButton onClick={() => editHandle(request.id)} />
        </>
      );
    case requestStatuses.WAITING_FOR_CONTROLLER_PROCESSING:
      return (
        <>
          <AcceptButton
            onClick={() => acceptRequestControlHandle(request.id)}
          />
        </>
      );
    case requestStatuses.PROCESSING_BY_CONTROLLER:
      return (
        <>
          <EditButton onClick={() => editHandle(request.id)} />
          <MaterialsEditControlButton
            onClick={() => confirmAndSendToSnab(request.id)}
          />
        </>
      );
    case requestStatuses.ISSUED:
      if (userId !== request.user.id) return null;
      return <ArchiveButton onClick={() => archiveHandle(request.id)} />;
    default:
      return null;
  }
}

// Кнопки администратора
export function AdminButtons({ request }: GroupButtonsProps) {
  const actions = useContext(ActionsContext);

  if (!actions) return null;

  const { deleteHandle, editHandle, previousStatusHandle } = actions;

  return (
    <>
      <DeleteButton onClick={() => deleteHandle(request.id)} />
      <EditButton onClick={() => editHandle(request.id)} />
      {request.id > 1 && (
        <PreviousStatusButton
          onClick={() => previousStatusHandle(request.id)}
        />
      )}
    </>
  );
}

interface Props {
  request: RequestType;
  hideButtons: boolean;
  toggleOpen: () => void;
  isOpen: boolean;
}

export function Tools({ isOpen, toggleOpen, hideButtons, request }: Props) {
  const actions = useContext(ActionsContext);

  const user = useAppSelector(userSelector);

  if (!user || !actions) return null;

  const { historyHandle } = actions;

  return (
    <>
      <ToggleMaterialsButton
        onClick={toggleOpen}
        isOpen={isOpen}
      ></ToggleMaterialsButton>

      <HistoryButton onClick={() => historyHandle(request.id)}></HistoryButton>

      {!hideButtons && !user.isBlocked && (
        <>
          {user.role.name === ADMIN && (
            <AdminButtons userId={user.id} request={request} />
          )}

          {user.role.name === CUSTOMER && (
            <UserButtons userId={user.id} request={request} />
          )}

          {user.role.name === WAREHOUSE && (
            <WarehouseButtons userId={user.id} request={request} />
          )}

          {user.role.name === SUPPLIER && (
            <SnabButtons userId={user.id} request={request} />
          )}

          {user.role.name === CONTROL && (
            <ControlButtons userId={user.id} request={request} />
          )}
        </>
      )}
    </>
  );
}
