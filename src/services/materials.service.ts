import { API_URL_LOCAL } from "@configs/api";
import {
  MaterialCreationType,
  MaterialUpdationType,
} from "./types/material.types";
import { MaterialType } from "@mytypes/api/material/material.types";

function createMaterial({
  link,
  name,
  note,
  quantity,
  request_id,
  residue,
  unit,
  delivery_date,
}: MaterialCreationType): Promise<MaterialType> {
  return fetch(API_URL_LOCAL + "materials", {
    method: "POST",
    body: JSON.stringify({
      link,
      name,
      note,
      quantity,
      request_id,
      residue,
      unit,
      delivery_date,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при создании материала!");
    }

    return res.json();
  });
}

async function updateMetarial({
  id,
  link,
  name,
  note,
  quantity,
  request_id,
  residue,
  unit,
  delivery_date,
}: MaterialUpdationType): Promise<MaterialType> {
  return fetch(API_URL_LOCAL + "materials/" + id, {
    method: "PUT",
    body: JSON.stringify({
      id,
      link,
      name,
      note,
      quantity,
      request_id,
      residue,
      unit,
      delivery_date,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при обновлении материала!");
    }

    return res.json();
  });
}

async function deleteMaterial(id: number) {
  return fetch(API_URL_LOCAL + `materials/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при удалении материала!");
    }

    return res.json();
  });
}

export { createMaterial, updateMetarial, deleteMaterial };
