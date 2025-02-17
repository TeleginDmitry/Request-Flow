import dayjs from "dayjs";

export interface InitialValuesType {
  searchValue: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  division: string;
}
