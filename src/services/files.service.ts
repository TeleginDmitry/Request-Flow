import { API_URL_LOCAL } from "@configs/api";
import { FileType } from "@mytypes/api/file/file.types";

async function uploadFiles(formdata: FormData): Promise<FileType[]> {
  return fetch(API_URL_LOCAL + "files", {
    method: "POST",
    body: formdata,
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при загрузке файлов!");
    }

    return res.json();
  });
}

async function deleteFile(id: number) {
  return fetch(API_URL_LOCAL + `files/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Возникла ошибка при удалении файла!");
    }

    return res.json();
  });
}

export { uploadFiles, deleteFile };
