import { API_URL_LOCAL } from "@configs/api";
import { TOKEN } from "@configs/index";
import { UserRoleType, UserType } from "@mytypes/api/user/user.types";
import { UserCreationType, UserModificationType } from "./types/user.types";

async function getUsers(): Promise<UserType[]> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при получении пользователей!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при получении пользователей!");
    });
}

async function getUserById(id: number): Promise<UserType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "users/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при получении пользователя!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при получении пользователя!");
    });
}

async function updateUser(user: UserModificationType): Promise<UserType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "users/" + user.id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при обновлении пользователя!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при обновлении пользователя!");
    });
}

async function createUser(user: UserCreationType): Promise<UserType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при создании пользователя!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при создании пользователя!");
    });
}

async function getUserRoles(): Promise<UserRoleType[]> {
  return fetch(API_URL_LOCAL + "roles")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при получении ролей!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при получении ролей!");
    });
}

async function blockUserById(id: number): Promise<UserType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "users/block/" + id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при блокировке пользователя!");
    }

    return res.json();
  });
}

async function unblockUserById(id: number): Promise<UserType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "users/unblock/" + id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при разблокировке пользователя!");
    }

    return res.json();
  });
}

export {
  getUserRoles,
  blockUserById,
  getUsers,
  getUserById,
  updateUser,
  createUser,
  unblockUserById,
};
