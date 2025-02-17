export const historyStatuses = {
  REQUEST_CREATED: "Заявка создана",
  ACCEPTED_BY_WAREHOUSE: "Принято в обработку складом",
  STOCKS_SPECIFIED: "Указаны остатки",
  ACCEPTED_BY_CONTROLLER: "Принято в обработку контролёром",
  PROCESSED_BY_CONTROLLER: "Обработано контролёром",
  ACCEPTED_BY_SUPPLY: "Принято в обработку снабжением",
  MATERIALS_ARRIVED_AT_WAREHOUSE: "Материалы прибыли на склад",
  MATERIALS_ARRIVED_AT_SITE: "Материалы прибыли на объект",
  WAREHOUSE_SPECIFIED_BY_CLERK: "Указан склад кладовщиком",
  MATERIAL_ISSUED: "Материал выдан / получен",
  MOVED_TO_ARCHIVE: "Заявка перемещена в архив",
  REQUEST_DATA_CHANGED: "Изменены данные заявки",
  REQUEST_DELETED: "Заявка удалена",
  REQUEST_RETURNED_TO_PREVIOUS_STATUS:
    "Заявка возвращена к предыдущему статусу",
} as const;
