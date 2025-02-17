import { API_URL_LOCAL } from "@configs/api";
import {
  RequestCreationType,
  RequestServiceType,
  RequestStatusType,
  RequestUpdationType,
} from "./types/requests.types";
import { getUrlByParametrs } from "@utils/helpers/getUrlByParametrs";
import { RequestType } from "@mytypes/api/request/request.types";
import { PaginationType } from "@mytypes/pagination/pagination.types";
import { TOKEN } from "@configs/index";

async function getRequests({
  filters,
  sortParams,
}: RequestServiceType): Promise<PaginationType<RequestType>> {
  const url = getUrlByParametrs(API_URL_LOCAL + "requests", {
    ...filters,
    ...sortParams,
  });

  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при получении заявок!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при получении заявок!");
    });
}

async function getRequestsById(requestId: number): Promise<RequestType> {
  const url = API_URL_LOCAL + "requests/" + requestId;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при получении заявки!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при получении заявки!");
    });
}

async function createRequest({
  text,
  request_status_id,
  user_id,
  warehouse_id,
}: RequestCreationType): Promise<RequestType> {
  return fetch(API_URL_LOCAL + "requests", {
    method: "POST",
    body: JSON.stringify({
      text,
      request_status_id,
      user_id,
      warehouse_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при создании заявки!");
    }

    return res.json();
  });
}

async function updateRequest({
  requestId,
  text,
  request_status_id,
  user_id,
  warehouse_id,
}: RequestUpdationType): Promise<RequestType> {
  return fetch(API_URL_LOCAL + "requests/" + requestId, {
    method: "PUT",
    body: JSON.stringify({
      text,
      request_status_id,
      user_id,
      warehouse_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при обновлении заявки!");
    }

    return res.json();
  });
}

async function deleteRequestById(requestId: number): Promise<RequestType> {
  return fetch(API_URL_LOCAL + "requests/" + requestId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при обновлении отдела!");
    }

    return res.json();
  });
}

async function changeStatus({
  requestId,
  status,
}: RequestStatusType): Promise<RequestType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "requests/status/" + requestId, {
    method: "PATCH",
    body: JSON.stringify({
      status,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при обновлении статуса!");
    }

    return res.json();
  });
}

async function previousStatus(requestId: number): Promise<RequestType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "requests/status/previous/" + requestId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при обновлении статуса!");
    }

    return res.json();
  });
}

export {
  getRequests,
  getRequestsById,
  createRequest,
  updateRequest,
  deleteRequestById,
  changeStatus,
  previousStatus,
};
