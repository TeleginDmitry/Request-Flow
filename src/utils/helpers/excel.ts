import { RequestStateType } from "@store/requests/requests.slice";
import * as XLSX from "xlsx";

interface ExcelProps {
  filename?: string;
  opts?: XLSX.WritingOptions;
}

export function exportRequestsToExcel(
  requests: RequestStateType[],
  options: Partial<ExcelProps> = {}
) {
  if (!requests.length) return;

  const createdAt = new Date().toISOString().slice(0, 10);

  const { filename = `requests-${createdAt}.xlsx`, opts = {} } = options;

  // Подготовка данных для Excel
  const formattedData: any[] = [];

  requests.forEach((request) => {
    // Первая строка с информацией о заявке
    formattedData.push({
      "№": request.id,
      Отдел: request.user.division.name,
      Заказчик: request.user.name,
      Объект: request.text,
      Наименование: "", // Пустые поля для материалов
      "Кол-во": "",
      Описание: "",
    });

    // Строка заголовков для материалов
    formattedData.push({
      "№": "№",
      Отдел: "Наименование",
      Заказчик: "Кол-во",
      Объект: "Описание",
      Наименование: "Склад",
    });

    // Материалы
    request.materials.forEach((material, index) => {
      formattedData.push({
        "№": index + 1, // Нумерация материалов
        Отдел: material.name,
        Заказчик: material.quantity + " " + material.unit,
        Объект: material.note,
        Наименование: material.residue,
      });
    });

    // Пустая строка для разделения заявок
    formattedData.push({});
  });

  // Создание листа Excel
  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    skipHeader: true,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Заявки");

  // Генерация файла и его скачивание
  XLSX.writeFile(workbook, filename, opts);
}
