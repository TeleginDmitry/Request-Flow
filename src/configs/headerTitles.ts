import { isEqualUrl } from "@utils/helpers/isEqualUrl";
import {
  AUTH_PAGE,
  REQUESTS_PAGE,
  CREATE_REQUEST_PAGE,
  EDIT_REQUEST_SINGLE_PAGE,
  ARCHIVE_PAGE,
  SEARCH_PAGE,
  HISTORY_SINGLE_PAGE,
  PROFILE_PAGE,
  USERS_PAGE,
  USERS_SINGLE_PAGE,
  DIVISIONS_PAGE,
  EDIT_DIVISION_PAGE,
} from "./routes";

interface HeaderTitlesType {
  [key: string]: string;
}

export const headerTitles: HeaderTitlesType = {
  [REQUESTS_PAGE]: "Заявки",
  [CREATE_REQUEST_PAGE]: "Создание заявки",
  [EDIT_REQUEST_SINGLE_PAGE]: "Редактирование заявки",
  [AUTH_PAGE]: "Авторизация",
  [ARCHIVE_PAGE]: "Архив",
  [SEARCH_PAGE]: "Поиск",
  [HISTORY_SINGLE_PAGE]: "История",
  [PROFILE_PAGE]: "Мой профиль",
  [USERS_PAGE]: "Управление пользователями",
  [USERS_SINGLE_PAGE]: "Редактирование пользователя",
  [DIVISIONS_PAGE]: "Управление отделами",
  [EDIT_DIVISION_PAGE]: "Редактирование отдела",
};

export function getHeaderTitleByPath(path: string) {
  const key = Object.keys(headerTitles).find((key) => isEqualUrl(key, path));

  if (key) {
    return headerTitles[key];
  }

  return "Неизвестная страница";
}
