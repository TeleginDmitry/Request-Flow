import { API_URL_LOCAL } from "@configs/api";
import { DivisionType } from "@mytypes/api/division/division.types";

async function getDivisions(): Promise<DivisionType[]> {
  return fetch(API_URL_LOCAL + "divisions").then((res) => res.json());
}

async function getDivisionById(id: number): Promise<DivisionType> {
  return fetch(API_URL_LOCAL + "divisions/" + id).then((res) => res.json());
}

async function createDivision(name: string): Promise<DivisionType> {
  return fetch(API_URL_LOCAL + "divisions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при создании отдела!");
    }

    return res.json();
  });
}

async function updateDivision(id: number, name: string): Promise<DivisionType> {
  return fetch(API_URL_LOCAL + "divisions/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при обновлении отдела!");
    }

    return res.json();
  });
}

export { getDivisions, createDivision, updateDivision, getDivisionById };
