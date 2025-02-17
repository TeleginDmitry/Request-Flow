export const requestStatuses = {
  WAITING_FOR_WAREHOUSE_PROCESSING: "Ожидание обработки кладовщиком",
  CHECKING_REMAINS: "Проверяются остатки",
  WAITING_FOR_CONTROLLER_PROCESSING: "Ожидание обработки контролёром",
  PROCESSING_BY_CONTROLLER: "Обрабатывается контролёром",
  WAITING_FOR_SUPPLY_PROCESSING: "Ожидание обработки снабжением",
  PROCESSING_BY_SUPPLY: "Обрабатывается снабжением",
  MATERIALS_ARRIVED_AT_WAREHOUSE: "Материалы прибыли на склад",
  READY_FOR_ISSUE_AT_WAREHOUSE: "Готово к выдаче на складе",
  READY_FOR_ISSUE_AT_SITE: "Готово к выдаче на объекте",
  ISSUED: "Выдано",
  ARCHIVED: "В архиве",
} as const;
