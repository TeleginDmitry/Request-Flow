import { API_URL_LOCAL } from "@configs/api";
import { HistoryType } from "@mytypes/api/history/history.types";
import { HistoryCreationType } from "./types/history.types";

async function createHistory({
  request_id,
  history_status,
  user_id,
}: HistoryCreationType): Promise<HistoryType> {
  return fetch(API_URL_LOCAL + "history", {
    method: "POST",
    body: JSON.stringify({
      request_id,
      history_status,
      user_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при создании истории!");
    }

    return res.json();
  });
}

async function getHistoryByRequestId(
  requestId: number
): Promise<HistoryType[]> {
  return fetch(API_URL_LOCAL + "history/" + requestId).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при получении истории!");
    }

    return res.json();
  });
}

export { createHistory, getHistoryByRequestId };
